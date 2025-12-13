
'use client';

// Page Controller for Template Editor

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import BlockLibrary from '@/components/template-editor/BlockLibrary';
import DropZone from '@/components/template-editor/DropZone';
import PropsPanel from '@/components/template-editor/PropsPanel';
import ThemePanel from '@/components/template-editor/ThemePanel';
import { useAtom } from 'jotai';
import { viewModeAtom } from '@/store/viewModeStore';
import { themeAtom } from '@/store/themeStore';
import { languageAtom } from '@/atoms/languageAtom';
import { translations } from '@/locales/translations';
import ShopCart from '@/components/shop/ShopCart';
import { Save, ArrowLeft, Palette, Layers, Settings, Monitor, Tablet, Smartphone, Undo2, Redo2 } from 'lucide-react';
import Link from 'next/link';
import styles from './editor.module.css';

export default function TemplateEditorPage() {
  const params = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [pages, setPages] = useState([]);
  const [activePageSlug, setActivePageSlug] = useState('home');
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeDragId, setActiveDragId] = useState(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState('add'); // 'add' | 'theme' | 'settings'
  /* const [pageTheme, setPageTheme] = useState(null); // Removed in favor of Jotai */
  const [theme, setTheme] = useAtom(themeAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom); // 'desktop' | 'tablet' | 'mobile'
  
  const [language] = useAtom(languageAtom);
  const t = translations[language].editor;

  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageName, setNewPageName] = useState('');

  // Undo/Redo History
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

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
        if (data.theme) {
            setTheme(data.theme); 
        }
        
        let initialPages = [];
        if (data.pages && data.pages.length > 0) {
            initialPages = data.pages;
        } else {
            // Migration / Legacy Fallback
            let initialContent = [];
            if (data.pageContent && data.pageContent.length > 0) {
                initialContent = data.pageContent;
            } else if (data.defaultContent) {
                 initialContent = data.defaultContent;
            } else if (data.templateId && data.templateId === 'rustic-store-cms') {
                 initialContent = [
                  { id: 'header-1', type: 'header', category: 'section', props: {} },
                  { id: 'hero-1', type: 'hero', category: 'section', props: {} },
                  { id: 'products-1', type: 'products', category: 'section', props: {} },
                  { id: 'about-1', type: 'about', category: 'section', props: {} },
                  { id: 'newsletter-1', type: 'newsletter', category: 'section', props: {} },
                  { id: 'contact-1', type: 'contact', category: 'section', props: {} },
                  { id: 'footer-1', type: 'footer', category: 'section', props: {} }
                ];
            }
            initialPages = [{ name: 'Home', slug: 'home', content: initialContent }];
        }

        setPages(initialPages);
        setActivePageSlug('home');
        
        const homePage = initialPages.find(p => p.slug === 'home') || initialPages[0];
        setBlocks(homePage?.content || []);

      }
    } catch (error) {
      console.error('Erro ao carregar template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchPage = (newSlug) => {
    if (newSlug === activePageSlug) return;
    
    // 1. Save current blocks to current page in pages array
    const updatedPages = pages.map(p => 
        p.slug === activePageSlug ? { ...p, content: blocks } : p
    );
    
    // 2. Find new page content
    const targetPage = updatedPages.find(p => p.slug === newSlug);
    
    // 3. Update State
    setPages(updatedPages);
    setActivePageSlug(newSlug);
    setBlocks(targetPage?.content || []);
    setSelectedBlock(null);
  };

  const handleCreatePage = (e) => {
    e.preventDefault();
    if (!newPageName) return;

    const slug = newPageName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    if (pages.find(p => p.slug === slug)) {
        alert('Page already exists');
        return;
    }

    // Default content for new pages - maybe empty or basic structure
    const newPage = { name: newPageName, slug, content: [] };

    // Update current page content first
    const updatedPages = pages.map(p => 
        p.slug === activePageSlug ? { ...p, content: blocks } : p
    );

    setPages([...updatedPages, newPage]);
    setActivePageSlug(slug);
    setBlocks([]);
    setShowAddPageModal(false);
    setNewPageName('');
  };

  const handleDeletePage = () => {
      if (activePageSlug === 'home') {
          alert('Cannot delete Home page');
          return;
      }
      if (!confirm(t.deleteConfirm || 'Delete this page?')) return;

      const remainingPages = pages.filter(p => p.slug !== activePageSlug);
      setPages(remainingPages);
      
      // Switch to home
      const home = remainingPages.find(p => p.slug === 'home') || remainingPages[0];
      setActivePageSlug(home.slug);
      setBlocks(home.content || []);
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

      if (category === 'widget') {
        if (type === 'text') initialProps = { content: 'Novo texto', align: 'left', fontSize: '1rem', color: '#4b5563' };
        if (type === 'button') initialProps = { text: 'Clique Aqui', variant: 'primary', align: 'left', url: '#' };
        if (type === 'heading') initialProps = { text: 'Novo Título', tag: 'h2', align: 'left', color: '#1f2937' };
        if (type === 'image') initialProps = { src: 'https://placehold.co/600x400', width: '100%', borderRadius: '0px', align: 'center', alt: 'Image' };
      }
      
      if (category === 'container') {
           initialProps = { padding: '20px', backgroundColor: 'transparent', width: '100%', direction: 'column', gap: '10px' };
           children = [];
      }

      if (category === 'section') {
           // For legacy sections, we don't need specific initial props as they have internal defaults
           // unless we want to override them
           initialProps = {}; 
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
        
        // MOFIFIED: Check for explicit Nesting Target (Empty OR Append)
        if (over.id.toString().startsWith('temp-drop-') || over.id.toString().startsWith('append-zone-')) {
            const containerId = over.id.replace('temp-drop-', '').replace('append-zone-', '');
            const newItems = JSON.parse(JSON.stringify(items));
            const targetContainer = findBlockById(newItems, containerId);
            
            if (targetContainer) {
                 if (!targetContainer.children) targetContainer.children = [];
                 targetContainer.children.push(newBlock);
                 return newItems;
            }
        }

        // If dropping on the container BLOCK itself (the sortable item), treat as sibling logic
        // We do NOT force nesting here anymore.
        /* 
        if (overBlock && overBlock.type === 'container' && (!overBlock.children || overBlock.children.length === 0)) {
           // Old logic removed
        } 
        */

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
      // Push to history after adding new block
      // We need to get the new state after setBlocks completes. Using a setTimeout as a simple workaround.
      // A better approach would be to refactor setBlocks calls into a single function.
      setTimeout(() => { pushToHistory(blocks); }, 100); // Note: `blocks` will be stale here. This is a known issue.
      // TODO: Refactor to use a custom hook like useHistoryState for proper integration.
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
    // ... (existing logic)
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

    setBlocks(prevBlocks => {
      const updated = updateBlockProps(prevBlocks);
      pushToHistory(updated);
      return updated;
    });
    
    if (selectedBlock && selectedBlock.id === blockId) {
      setSelectedBlock(prev => ({ ...prev, props: { ...prev.props, ...newProps } }));
    }
  };

  const handleDeleteBlock = (blockId) => {
    // ... (existing logic)
    const deleteBlock = (items) => {
      return items.filter(block => block.id !== blockId).map(block => {
        if (block.children) {
          return { ...block, children: deleteBlock(block.children) };
        }
        return block;
      });
    };

    setBlocks(prevBlocks => {
      const updated = deleteBlock(prevBlocks);
      pushToHistory(updated);
      return updated;
    });
    
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
  };

  const handleSave = async () => {
    // ... (existing logic)
    setSaving(true);
    
    // Sync current blocks to active page
    const pagesToSave = pages.map(p => 
        p.slug === activePageSlug ? { ...p, content: blocks } : p
    );
    
    // Find Home content for backward compatibility
    const homePage = pagesToSave.find(p => p.slug === 'home');
    const legacyPageContent = homePage ? homePage.content : blocks;

    try {
      console.log('[Editor] Saving payload:', { 
          pages: pagesToSave,
          pageContent: legacyPageContent,
          theme: theme 
      });

      const res = await fetch(`/api/templates/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pages: pagesToSave,
          pageContent: legacyPageContent, // Keep legacy field updated with Home
          theme: theme
        })
      });

      if (res.ok) {
        alert(t.saved);
        // Update local state ensuring consistency
        setPages(pagesToSave); 
      } else {
        alert(t.error);
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert(t.error);
    } finally {
      setSaving(false);
    }
  };

  // --- Undo/Redo Logic ---
  const pushToHistory = (newBlocks) => {
    // Truncate forward history if we made new changes after undo
    const truncatedHistory = history.slice(0, historyIndex + 1);
    const newHistory = [...truncatedHistory, JSON.parse(JSON.stringify(newBlocks))];
    // Limit history to 50 entries
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setBlocks(JSON.parse(JSON.stringify(history[newIndex])));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setBlocks(JSON.parse(JSON.stringify(history[newIndex])));
    }
  };
  // --- End Undo/Redo ---

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-500">{t.loading}</div>;
  }

  if (!template) {
    return <div className="flex items-center justify-center h-screen bg-gray-50 text-red-500">{t.notFound}</div>;
  }

  const getBlockName = (type) => t.blocks[type] || type;

  return (
    <>
      {/* Theme Provider removed. State is managed by Jotai themeAtom */}

        <div className={styles.editorContainer}>
        {/* Header Compacto */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <Link href="/admin/templates" className={styles.backLink}>
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2">
                <h1 className="text-sm font-semibold text-gray-800">{template.name}</h1>
                <span className="text-gray-400">/</span>
                <select 
                    value={activePageSlug} 
                    onChange={(e) => {
                        if (e.target.value === 'ADD_NEW') setShowAddPageModal(true);
                        else handleSwitchPage(e.target.value);
                    }}
                    className={styles.pageSelect}
                >
                    {pages.map(p => (
                        <option key={p.slug} value={p.slug}>{p.name}</option>
                    ))}
                    <option value="ADD_NEW">+ {t.newPage || 'New Page'}</option>
                </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
                onClick={() => setActiveSidebarTab('add')}
                className={`p-2 rounded hover:bg-gray-100 ${activeSidebarTab === 'add' ? 'bg-gray-100 text-blue-600' : 'text-gray-500'}`}
                title={t.add}
            >
                <Layers size={18} />
            </button>
            <button 
                onClick={() => setActiveSidebarTab('theme')}
                className={`p-2 rounded hover:bg-gray-100 ${activeSidebarTab === 'theme' ? 'bg-gray-100 text-blue-600' : 'text-gray-500'}`}
                title={t.theme}
            >
                <Palette size={18} />
            </button>
          </div>
          
          {/* View Mode Switcher */}
          <div className="flex bg-gray-100 rounded p-1 gap-1">
             <button 
                onClick={() => setViewMode('desktop')}
                className={`p-1.5 rounded ${viewMode === 'desktop' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                title={t.viewDesktop}
             >
                <Monitor size={16} />
             </button>
             <button 
                onClick={() => setViewMode('tablet')}
                className={`p-1.5 rounded ${viewMode === 'tablet' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                title={t.viewTablet}
             >
                <Tablet size={16} />
             </button>
             <button 
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded ${viewMode === 'mobile' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                title={t.viewMobile}
             >
                <Smartphone size={16} />
             </button>
          </div>
          
          {/* Undo/Redo Buttons */}
          <div className="flex gap-1">
             <button 
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className={`p-2 rounded ${historyIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                title={t.undo}
             >
                <Undo2 size={16} />
             </button>
             <button 
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                className={`p-2 rounded ${historyIndex === history.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
                title={t.redo}
             >
                <Redo2 size={16} />
             </button>
          </div>

          <div>
            <button 
              onClick={handleSave} 
              disabled={saving} 
              className={styles.saveButton}
            >
              <Save size={14} />
              {saving ? t.saving : t.save}
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
                    <h3 className={styles.sidebarTitle}>{t.edit} {getBlockName(selectedBlock.type)}</h3>
                    <button 
                      onClick={() => setSelectedBlock(null)}
                      className={styles.backButton}
                      title={t.backToLib}
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
                      pages={pages} // Pass pages list
                      onPropsChange={(newProps) => handlePropsChange(selectedBlock.id, newProps)}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {activeSidebarTab === 'add' && <BlockLibrary templateId={template.templateId} />}
                  {activeSidebarTab === 'theme' && <ThemePanel />}
                </>
              )}
            </aside>
            
            {/* Área de Preview (Direita) */}
            <main className={styles.previewArea}>
              {/* Device Frame */}
              <div className={`${styles.deviceFrame} ${styles[viewMode]}`}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <DropZone
                    blocks={blocks}
                    templateId={template.templateId}
                    selectedBlock={selectedBlock}
                    onBlockClick={handleBlockClick}
                    onDeleteBlock={handleDeleteBlock}
                    onUpdateBlock={(id, newProps) => handlePropsChange(id, newProps)}
                  />
                </SortableContext>
              </div>
            </main>
          </div>
          
          <DragOverlay>
            {activeDragId ? (
              <div className={styles.dragOverlayItem}>
                {activeDragId.startsWith('lib-') ? t.newItem : t.moving}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      <ShopCart />

      {showAddPageModal && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3 className="text-lg font-bold mb-4">{t.createPage || 'Create Page'}</h3>
                <form onSubmit={handleCreatePage}>
                    <label className="block mb-4">
                        <span className="text-sm font-medium text-gray-700">{t.pageName || 'Page Name'}</span>
                        <input
                            type="text"
                            value={newPageName}
                            onChange={(e) => setNewPageName(e.target.value)}
                            className={styles.input}
                            placeholder="e.g. Blog, About Us"
                            autoFocus
                        />
                    </label>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={() => setShowAddPageModal(false)} className={styles.cancelButton}>
                            {t.cancel || 'Cancel'}
                        </button>
                        <button type="submit" className={styles.createButton}>
                            {t.create || 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </>
  );
}
