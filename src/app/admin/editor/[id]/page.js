'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
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

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragId(null);

    console.log('[DnD] Drag End - Active:', active.id, 'Over:', over?.id);

    if (!over) {
      console.log('[DnD] Cancelado: Soltou fora de uma área válida');
      return;
    }

    // Se arrastou da biblioteca (começa com lib-)
    if (active.id.startsWith('lib-')) {
      // Formato: lib-element-text ou lib-section-hero
      const parts = active.id.split('-');
      const category = parts[1]; // element ou section
      const type = parts.slice(2).join('-'); // text, hero, etc

      // Props iniciais dependendo do tipo
      let initialProps = {};
      if (category === 'element') {
        if (type === 'text') initialProps = { content: 'Novo texto' };
        if (type === 'button') initialProps = { text: 'Clique Aqui' };
      }
      
      // Adicionar novo bloco
      const newBlock = {
        id: `block-${Date.now()}`,
        type: type,
        category: category,
        props: initialProps
      };
      
      setBlocks((items) => [...items, newBlock]);
      return;
    }

    // Se reordenou blocos existentes
    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  const handlePropsChange = (blockId, newProps) => {
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
        collisionDetection={closestCenter} 
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
