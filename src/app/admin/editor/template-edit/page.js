'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { blocksAtom, pageMetaAtom, selectedBlockIdAtom } from '@/store/editorStore';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import styles from '../editor.module.css';
import BlockRenderer from '@/components/editor/BlockRenderer';
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableBlock from '@/components/editor/SortableBlock';
import RawHTMLRenderer from '@/components/editor/RawHTMLRenderer';

import EditorSidebar from '@/components/editor/EditorSidebar';

export default function TemplateEditPage() {
  const router = useRouter();
  const [blocks, setBlocks] = useAtom(blocksAtom);
  const [pageMeta, setPageMeta] = useAtom(pageMetaAtom);
  const [selectedBlockId, setSelectedBlockId] = useAtom(selectedBlockIdAtom);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [templateData, setTemplateData] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    // Load template data from localStorage
    const data = localStorage.getItem('templateEditData');
    if (data) {
      const parsed = JSON.parse(data);
      setTemplateData(parsed);
      loadTemplatePage(parsed.templateId, undefined); // Always detect home page
    } else {
      alert('Dados do template não encontrados');
      router.push('/admin/templates');
    }
  }, [setBlocks, setPageMeta, router]);

  const loadTemplatePage = async (templateId, pageIndex) => {
    try {
      const res = await fetch(`/api/templates/${templateId}`);
      if (!res.ok) throw new Error('Failed to fetch template');
      const template = await res.json();
      const pages = template.pages || [];
      // Determine which page to load
      let idx = pageIndex;
      if (idx === undefined || !pages[idx]) {
        // First try to find 'index' page (the real home with all components)
        const homeIdx = pages.findIndex(p => {
          const name = (p.name || '').toLowerCase();
          const slug = (p.slug || '').toLowerCase();
          return name === 'index' || slug === 'index';
        });
        
        // If no index, try home, homepage, or hero
        if (homeIdx === -1) {
          const fallbackIdx = pages.findIndex(p => {
            const name = (p.name || '').toLowerCase();
            const slug = (p.slug || '').toLowerCase();
            return (
              name === 'home' ||
              name === 'homepage' ||
              name === 'hero' ||
              slug === 'home' ||
              slug === 'homepage'
            );
          });
          idx = fallbackIdx !== -1 ? fallbackIdx : 0;
        } else {
          idx = homeIdx;
        }
      }
      // Set blocks and page meta
      setBlocks(pages[idx].content || []);
      setPageMeta({ title: pages[idx].name });
      // Update templateData with all pages and selected index
      setTemplateData({
        templateId: template._id,
        pageIndex: idx,
        pageName: pages[idx].name,
        blocks: pages[idx].content || [],
        allPages: pages,
      });
    } catch (error) {
      console.error('Failed to load page', error);
    } finally {
      setLoading(false);
    }
  };

  const switchPage = (pageIndex) => {
    if (!templateData) return;
    
    // Save current page to localStorage before switching
    const updatedData = {
      ...templateData,
      pageIndex: pageIndex,
      pageName: templateData.allPages[pageIndex].name,
      blocks: templateData.allPages[pageIndex].content || []
    };
    
    localStorage.setItem('templateEditData', JSON.stringify(updatedData));
    
    // Load the new page
    loadTemplatePage(templateData.templateId, pageIndex);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = async () => {
    if (!templateData) return;
    
    setSaving(true);
    try {
      // Fetch current template
      const res = await fetch(`/api/templates/${templateData.templateId}`);
      if (!res.ok) throw new Error('Failed to fetch template');
      
      const template = await res.json();
      
      // Update the specific page with current blocks
      const updatedPages = [...template.pages];
      updatedPages[templateData.pageIndex] = {
        ...updatedPages[templateData.pageIndex],
        content: blocks
      };

      // Save back to template
      const updateRes = await fetch(`/api/templates/${templateData.templateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pages: updatedPages }),
      });

      if (!updateRes.ok) throw new Error('Failed to save');
      
      alert('Template salvo com sucesso!');
      
      // Update allPages in templateData
      setTemplateData({
        ...templateData,
        allPages: updatedPages
      });
    } catch (error) {
      console.error('Failed to save', error);
      alert('Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  const addBlock = (type, props = {}) => {
    const newBlock = {
      id: uuidv4(),
      type,
      props: props,
      content: type === 'text' ? 'Novo texto...' : '',
    };
    
    // If it's a container block, add empty children array
    if (type === 'container') {
      newBlock.children = [];
    }
    
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id, updatedBlock) => {
    setBlocks(blocks.map((b) => (b.id === id ? updatedBlock : b)));
  };

  const handleSelectBlock = (id) => {
    setSelectedBlockId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.background = '#f0f9ff';
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.background = 'transparent';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.style.background = 'transparent';
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      
      const newBlock = {
        id: uuidv4(),
        type: data.type,
        props: data.props || {},
        content: data.content || '',
      };
      
      // If it's a container block, add empty children array
      if (data.type === 'container') {
        newBlock.children = [];
      }
      
      setBlocks([...blocks, newBlock]);
    } catch (error) {
      console.error('Erro ao processar drop:', error);
    }
  };

  if (loading) return <div>Carregando editor...</div>;

  return (
    <div className={styles.container}>
      <EditorSidebar onAddBlock={addBlock} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} onClick={() => setSelectedBlockId(null)}>
        <header className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
            <span>Editando Template:</span>
            
            {/* Page Selector Dropdown */}
            {templateData?.allPages && templateData.allPages.length > 1 ? (
              <select
                value={templateData.pageIndex}
                onChange={(e) => {
                  e.stopPropagation();
                  switchPage(parseInt(e.target.value));
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#ffffff',
                  color: '#374151',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  minWidth: '150px',
                }}
              >
                {templateData.allPages.map((page, idx) => (
                  <option key={idx} value={idx}>
                    {page.name}
                  </option>
                ))}
              </select>
            ) : (
              <strong>{pageMeta.title}</strong>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => router.back()} 
              className={styles.saveButton}
              style={{ background: '#6b7280' }}
            >
              Voltar
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleSave(); }} className={styles.saveButton} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar Template'}
            </button>
          </div>
        </header>
        
        <main 
          className={styles.canvas}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.canvasContent} style={{ padding: '2rem' }}>
            {/* Mostrar preview do HTML original se disponível */}
            {templateData?.allPages?.[templateData.pageIndex]?.rawHtml && (
              <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', border: '2px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <strong style={{ color: '#374151' }}>Preview do Template Original:</strong>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    (Esta é a visualização do HTML/CSS original importado)
                  </span>
                </div>
                {(() => {
                  const currentPage = templateData.allPages[templateData.pageIndex];
                  return <RawHTMLRenderer html={currentPage.rawHtml} css={currentPage.rawCss} />;
                })()}
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fef3c7', borderRadius: '0.375rem', fontSize: '0.875rem', color: '#92400e' }}>
                  ⚠️ <strong>Nota:</strong> Os blocos abaixo são uma versão simplificada extraída do template. Para ver o template completo, use o botão "Ver Tema" na lista de templates.
                </div>
              </div>
            )}
            
            {/* Editor de blocos */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks}
                strategy={verticalListSortingStrategy}
              >
                {blocks.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#9ca3af' }}>Adicione blocos usando o menu lateral</p>
                ) : (
                  blocks.map((block) => (
                    <SortableBlock key={block.id} id={block.id}>
                      <BlockRenderer
                        block={block}
                        onUpdate={updateBlock}
                        onSelect={handleSelectBlock}
                        isSelected={selectedBlockId === block.id}
                      />
                    </SortableBlock>
                  ))
                )}
              </SortableContext>
            </DndContext>
          </div>
        </main>
      </div>

      <PropertiesPanel />
    </div>
  );
}
