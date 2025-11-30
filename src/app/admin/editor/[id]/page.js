'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import BlockLibrary from '@/components/template-editor/BlockLibrary';
import DropZone from '@/components/template-editor/DropZone';
import PropsPanel from '@/components/template-editor/PropsPanel';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './editor.module.css';

export default function TemplateEditorPage() {
  const params = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeDragId, setActiveDragId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requer mover 5px para iniciar o arraste (evita cliques acidentais)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (params.id) {
      fetchTemplate();
    }
  }, [params.id]);

  const fetchTemplate = async () => {
    try {
      const res = await fetch(`/api/templates/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setTemplate(data);
        
        // Se já tiver pageContent salvo, usa ele.
        if (data.pageContent && data.pageContent.length > 0) {
          setBlocks(data.pageContent);
        } 
        // Se não, carrega as seções padrão do template (definidas no template.json/registry)
        else if (data.templateId) {
          let defaultBlocks = [];
          
          if (data.templateId === 'rustic-store-cms') {
            defaultBlocks = [
              { id: 'hero-1', type: 'hero', category: 'section', props: {} },
              { id: 'products-1', type: 'products', category: 'section', props: {} },
              { id: 'about-1', type: 'about', category: 'section', props: {} },
              { id: 'newsletter-1', type: 'newsletter', category: 'section', props: {} },
              { id: 'contact-1', type: 'contact', category: 'section', props: {} }
            ];
          } else if (data.templateId === 'minimal-business') {
            defaultBlocks = [
              { id: 'hero-1', type: 'hero', category: 'section', props: {} },
              { id: 'features-1', type: 'features', category: 'section', props: {} },
              { id: 'footer-1', type: 'footer', category: 'section', props: {} }
            ];
          } else if (data.templateId === 'business-theme-cms') {
            defaultBlocks = [
              { id: 'hero-1', type: 'hero', category: 'section', props: {} },
              { id: 'features-1', type: 'features', category: 'section', props: {} },
              { id: 'contact-1', type: 'contact', category: 'section', props: {} }
            ];
          }
          
          setBlocks(defaultBlocks);
        } else {
          setBlocks([]);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event) => {
    console.log('[DnD] Drag Start:', event.active.id);
    setActiveDragId(event.active.id);
  };

  // Função auxiliar para encontrar o container de um item
  const findContainer = (id, items) => {
    // Se o item é um container raiz
    if (items.find(item => item.id === id)) {
      return 'root';
    }

    // Procura recursivamente
    for (const item of items) {
      if (item.children) {
        if (item.children.find(child => child.id === id)) {
          return item.id;
        }
        const found = findContainer(id, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) return;

    // Se é um item da biblioteca, não faz nada no DragOver (só no DragEnd)
    if (active.id.startsWith('lib-')) return;

    const activeContainer = findContainer(active.id, blocks);
    const overContainer = findContainer(overId, blocks);

    if (!activeContainer || !overContainer) return;

    // Se moveu para um container diferente
    if (activeContainer !== overContainer) {
      setBlocks((items) => {
        const activeItems = activeContainer === 'root' ? items : findBlockById(items, activeContainer).children;
        const overItems = overContainer === 'root' ? items : findBlockById(items, overContainer).children;
        
        const activeIndex = activeItems.findIndex((i) => i.id === active.id);
        const overIndex = overItems.findIndex((i) => i.id === overId);

        let newIndex;
        if (overId in items) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;
          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        // Lógica complexa de mover entre arrays... 
        // Para simplificar neste passo, vamos focar apenas no DragEnd para inserção inicial
        // e deixar o reorder aninhado para o próximo passo se for muito complexo agora.
        return items; 
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragId(null);

    if (!over) return;

    // 1. Novo Bloco da Biblioteca
    if (active.id.startsWith('lib-')) {
      const parts = active.id.split('-');
      const category = parts[1];
      const type = parts.slice(2).join('-');
      
      let initialProps = {};
      let children = []; // Containers podem ter filhos

      if (category === 'element') {
        if (type === 'text') initialProps = { content: 'Novo texto' };
        if (type === 'button') initialProps = { text: 'Clique Aqui' };
        if (type === 'container') {
           initialProps = { padding: '20px', background: '#f9f9f9' };
           children = [];
        }
      }
      
      const newBlock = {
        id: `block-${Date.now()}`,
        type: type,
        category: category,
        props: initialProps,
        children: children
      };
      
      setBlocks((items) => {
        // Se soltou no container raiz (drop-zone)
        if (over.id === 'drop-zone') {
          return [...items, newBlock];
        }

        // Achar o bloco sobre o qual soltamos
        const overBlock = findBlockById(items, over.id);
        
        // CASO 1: Soltou DIRETAMENTE sobre um Container (inserir dentro)
        if (overBlock && overBlock.type === 'container') {
            const newItems = JSON.parse(JSON.stringify(items));
            const targetContainer = findBlockById(newItems, over.id);
            
            if (!targetContainer.children) targetContainer.children = [];
            targetContainer.children.push(newBlock);
            
            return newItems;
        }

        // CASO 2: Soltou sobre um item normal (inserir depois dele, no mesmo nível)
        const overContainerId = findContainer(over.id, items);
        
        if (overContainerId === 'root') {
             const overIndex = items.findIndex((item) => item.id === over.id);
             const newItems = [...items];
             newItems.splice(overIndex + 1, 0, newBlock);
             return newItems;
        } else if (overContainerId) {
            // Soltou sobre um item que está dentro de um container
            const newItems = JSON.parse(JSON.stringify(items));
            const parent = findBlockById(newItems, overContainerId);
            if (parent && parent.children) {
                const overIndex = parent.children.findIndex(item => item.id === over.id);
                parent.children.splice(overIndex + 1, 0, newBlock);
            }
            return newItems;
        }

        return [...items, newBlock];
      });
      return;
    }

    // 2. Reordenar Blocos Existentes (Lógica Simples por enquanto)
    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            return arrayMove(items, oldIndex, newIndex);
        }
        return items;
      });
    }
  };

  // Função auxiliar para achar bloco por ID recursivamente
  const findBlockById = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findBlockById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleBlockClick = (block) => {
    console.log('[Editor] Bloco clicado:', block);
    setSelectedBlock(block);
  };

  const handlePropsChange = (blockId, newProps) => {
    console.log('[Editor] Props alteradas:', blockId, newProps);
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, props: { ...block.props, ...newProps } } : block
    ));
    
    // Atualiza também o selectedBlock para refletir no painel imediatamente
    if (selectedBlock && selectedBlock.id === blockId) {
      setSelectedBlock(prev => ({ ...prev, props: { ...prev.props, ...newProps } }));
    }
  };

  const handleDeleteBlock = (blockId) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Salva o pageContent no template
      const res = await fetch(`/api/templates/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pageContent: blocks,
          // Também podemos atualizar o 'content' ou 'sections' se necessário para retrocompatibilidade
        })
      });

      if (res.ok) {
        alert('Template salvo com sucesso!');
      } else {
        alert('Erro ao salvar template');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar template');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (!template) {
    return <div className={styles.error}>Template não encontrado</div>;
  }

  return (
    <div className={styles.editorContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/admin/templates" className={styles.backLink}>
            <ArrowLeft size={20} />
          </Link>
          <h1>Editando: {template.name}</h1>
        </div>
        <div className={styles.headerRight}>
          <button onClick={handleSave} disabled={saving} className={styles.saveButton}>
            <Save size={18} />
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </header>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.mainContent}>
          <aside className={styles.sidebarLeft}>
            <BlockLibrary templateId={template.templateId} />
          </aside>
          
          <main className={styles.previewArea}>
            <div className={styles.deviceFrame}>
              <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                <DropZone
                  blocks={blocks}
                  templateId={template.templateId}
                  selectedBlock={selectedBlock}
                  onBlockClick={handleBlockClick}
                  onDeleteBlock={handleDeleteBlock}
                />
              </SortableContext>
            </div>
          </main>

          <aside className={styles.sidebarRight}>
            <PropsPanel
              block={selectedBlock}
              templateId={template.templateId}
              onPropsChange={(newProps) => handlePropsChange(selectedBlock.id, newProps)}
            />
          </aside>
        </div>
        
        <DragOverlay>
          {activeDragId ? (
            <div className={styles.dragOverlayItem}>
              {activeDragId.startsWith('lib-') ? 'Novo Bloco' : 'Movendo Bloco'}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
