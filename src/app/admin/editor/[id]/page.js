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
        distance: 5,
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
        
        if (data.pageContent && data.pageContent.length > 0) {
          setBlocks(data.pageContent);
        } else if (data.templateId) {
          let defaultBlocks = [];
          if (data.templateId === 'rustic-store-cms') {
            defaultBlocks = [
              { id: 'header-1', type: 'header', category: 'section', props: {} },
              { id: 'hero-1', type: 'hero', category: 'section', props: {} },
              { id: 'products-1', type: 'products', category: 'section', props: {} },
              { id: 'about-1', type: 'about', category: 'section', props: {} },
              { id: 'newsletter-1', type: 'newsletter', category: 'section', props: {} },
              { id: 'contact-1', type: 'contact', category: 'section', props: {} },
              { id: 'footer-1', type: 'footer', category: 'section', props: {} }
            ];
          } else if (data.templateId === 'minimal-business') {
            defaultBlocks = [
              { id: 'header-1', type: 'header', category: 'section', props: {} },
              { id: 'hero-1', type: 'hero', category: 'section', props: {} },
              { id: 'features-1', type: 'features', category: 'section', props: {} },
              { id: 'footer-1', type: 'footer', category: 'section', props: {} }
            ];
          } else if (data.templateId === 'business-theme-cms') {
            defaultBlocks = [
              { id: 'header-1', type: 'header', category: 'section', props: {} },
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

  const findContainer = (id, items) => {
    if (items.find(item => item.id === id)) return 'root';
    for (const item of items) {
      if (item.children) {
        if (item.children.find(child => child.id === id)) return item.id;
        const found = findContainer(id, item.children);
        if (found) return found;
      }
    }
    return null;
  };

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

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragId(null);

    if (!over) return;

    if (active.id.startsWith('lib-')) {
      const parts = active.id.split('-');
      const category = parts[1];
      const type = parts.slice(2).join('-');
      
      let initialProps = {};
      let children = [];

      if (category === 'element') {
        if (type === 'text') initialProps = { content: 'Novo texto' };
        if (type === 'button') initialProps = { text: 'Clique Aqui' };
        if (type === 'container') {
           initialProps = { padding: '20px', background: 'transparent' };
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
        if (over.id === 'drop-zone') {
          return [...items, newBlock];
        }

        const overBlock = findBlockById(items, over.id);
        
        if (overBlock && overBlock.type === 'container') {
            const newItems = JSON.parse(JSON.stringify(items));
            const targetContainer = findBlockById(newItems, over.id);
            if (!targetContainer.children) targetContainer.children = [];
            targetContainer.children.push(newBlock);
            return newItems;
        }

        const overContainerId = findContainer(over.id, items);
        
        if (overContainerId === 'root') {
             const overIndex = items.findIndex((item) => item.id === over.id);
             const newItems = [...items];
             newItems.splice(overIndex + 1, 0, newBlock);
             return newItems;
        } else if (overContainerId) {
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

  const handleBlockClick = (block) => {
    console.log('[Editor] Bloco clicado:', block);
    setSelectedBlock(block);
  };

  const handlePropsChange = (blockId, newProps) => {
    console.log('[Editor] Props alteradas:', blockId, newProps);
    
    // Função recursiva para atualizar props em qualquer nível
    const updateBlockProps = (items) => {
      return items.map(block => {
        if (block.id === blockId) {
          return { ...block, props: { ...block.props, ...newProps } };
        }
        if (block.children) {
          return { ...block, children: updateBlockProps(block.children) };
        }
        return block;
      });
    };

    setBlocks(prevBlocks => updateBlockProps(prevBlocks));
    
    if (selectedBlock && selectedBlock.id === blockId) {
      setSelectedBlock(prev => ({ ...prev, props: { ...prev.props, ...newProps } }));
    }
  };

  const handleDeleteBlock = (blockId) => {
    // Função recursiva para deletar
    const deleteBlock = (items) => {
      return items.filter(block => block.id !== blockId).map(block => {
        if (block.children) {
          return { ...block, children: deleteBlock(block.children) };
        }
        return block;
      });
    };

    setBlocks(prevBlocks => deleteBlock(prevBlocks));
    
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/templates/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pageContent: blocks,
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
    return <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-500">Carregando editor...</div>;
  }

  if (!template) {
    return <div className="flex items-center justify-center h-screen bg-gray-50 text-red-500">Template não encontrado</div>;
  }

  return (
    <div className={styles.editorContainer}>
      {/* Header Compacto */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/admin/templates" className={styles.backLink}>
            <ArrowLeft size={18} />
          </Link>
          <h1>{template.name}</h1>
        </div>
        <div>
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className={styles.saveButton}
          >
            <Save size={14} />
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
          {/* Sidebar Dinâmica (Esquerda) */}
          <aside className={styles.sidebarLeft}>
            {selectedBlock ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className={styles.sidebarHeader}>
                  <h3 className={styles.sidebarTitle}>Editar {selectedBlock.type}</h3>
                  <button 
                    onClick={() => setSelectedBlock(null)}
                    className={styles.backButton}
                    title="Voltar para biblioteca"
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', width: '16px', height: '16px' }}>
                        {[...Array(9)].map((_, i) => <div key={i} style={{ background: 'currentColor', borderRadius: '1px' }} />)}
                    </div>
                  </button>
                </div>
                <div className={styles.sidebarContent}>
                  <PropsPanel
                    block={selectedBlock}
                    templateId={template.templateId}
                    onPropsChange={(newProps) => handlePropsChange(selectedBlock.id, newProps)}
                  />
                </div>
              </div>
            ) : (
              <BlockLibrary templateId={template.templateId} />
            )}
          </aside>
          
          {/* Área de Preview (Direita) */}
          <main className={styles.previewArea}>
            {/* Device Frame */}
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
        </div>
        
        <DragOverlay>
          {activeDragId ? (
            <div className={styles.dragOverlayItem}>
              {activeDragId.startsWith('lib-element-text') ? '📝 Texto' :
               activeDragId.startsWith('lib-element-image') ? '🖼️ Imagem' :
               activeDragId.startsWith('lib-element-button') ? '🔘 Botão' :
               activeDragId.startsWith('lib-element-container') ? '📦 Container' :
               activeDragId.startsWith('lib-element-spacer') ? '↔️ Espaçador' :
               activeDragId.startsWith('lib-section') ? '📄 Seção' :
               'Movendo Bloco'}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
