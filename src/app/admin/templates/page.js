'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash, X, Eye, Settings } from 'lucide-react';
import styles from './templates.module.css';
import BlockRenderer from '@/components/editor/BlockRenderer';
import { useAtom } from 'jotai';
import { languageAtom } from '@/atoms/languageAtom';
import { translations } from '@/locales/translations';

export default function TemplatesList() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState('');
  
  const [language] = useAtom(languageAtom);
  const t = translations[language].templates;

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/templates');
      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
      }
    } catch (error) {
      console.error('Failed to fetch templates', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm(t.deleteConfirm)) return;

    try {
      const res = await fetch(`/api/templates/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTemplates(templates.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete template', error);
    }
  };

  const handleTemplateImport = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setImporting(true);
    setImportProgress(t.loading);
    
    try {
      const templateJsonFile = files.find(f => 
        f.name === 'template.json' || 
        (f.webkitRelativePath && f.webkitRelativePath.endsWith('template.json'))
      );
      
      if (!templateJsonFile) {
        throw new Error('template.json not found');
      }
      
      const templateConfig = JSON.parse(await templateJsonFile.text());
      
      setImportProgress(`Installing "${templateConfig.name}"...`);
      
      let templateId = 'custom-template';
      if (files[0].webkitRelativePath) {
        const pathParts = files[0].webkitRelativePath.split('/');
        if (pathParts.length > 0 && pathParts[0]) {
          templateId = pathParts[0].toLowerCase().replace(/[^a-z0-9-]/g, '-');
        }
      }
      
      const formData = new FormData();
      formData.append('templateId', templateId);
      formData.append('templateConfig', JSON.stringify(templateConfig));
      
      for (const file of files) {
        formData.append('files', file, file.webkitRelativePath || file.name);
      }
      
      const uploadResponse = await fetch('/api/templates/upload-cms', {
        method: 'POST',
        body: formData
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }
      
      setImportProgress('Registering template...');
      
      await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: templateConfig.name,
          type: 'theme',
          templateId: templateId,
          sections: {}, 
          content: [],
          isPublic: false
        }),
      });

      setImportProgress('Done!');
      
      setTimeout(() => {
        setImporting(false);
        setIsImportModalOpen(false);
        fetchTemplates();
      }, 1500);
      
    } catch (err) {
      console.error('Error importing:', err);
      setImportProgress(`Error: ${err.message}`);
      setTimeout(() => {
        setImporting(false);
      }, 3000);
    }
  };

  const [loadedIframes, setLoadedIframes] = useState({});

  const handleIframeLoad = (id) => {
    setLoadedIframes(prev => ({ ...prev, [id]: true }));
  };

  if (loading) return <div>{t.loading}</div>;

  return (
    <div>
      <div className={styles.header}>
        <h1>{t.title}</h1>
        <button 
          onClick={() => setIsImportModalOpen(true)} 
          className={styles.createButton}
        >
          <Plus size={20} />
          {t.import}
        </button>
      </div>

      <div className={styles.grid}>
        {templates.map((template) => (
          <div 
            key={template._id} 
            className={styles.card}
          >
            <div className={styles.cardPreview}>
              {!loadedIframes[template._id] && <div className={styles.loadingSpinner} />}
              <iframe 
                src={`/user-iframe-preview/${template._id}`}
                className={`${styles.previewIframe} ${loadedIframes[template._id] ? styles.previewIframeVisible : ''}`}
                title={`${template.name} preview`}
                scrolling="no"
                onLoad={() => handleIframeLoad(template._id)}
              />
              <div className={styles.previewOverlay} />
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3>{template.name}</h3>
                <div className={styles.headerRight}>
                  <button
                    onClick={(e) => handleDelete(e, template._id)}
                    className={styles.deleteLink}
                    title={t.delete}
                  >
                    <Trash size={16} />
                  </button>
                  <span className={styles.type}>{template.type}</span>
                </div>
              </div>
              {template.type === 'theme' && template.pages && (
                <p style={{ color: '#666', fontSize: '0.875rem', margin: '0.5rem 0' }}>
                  {template.pages.length} {t.pagesCount}
                </p>
              )}
              <div className={styles.actions}>
                <Link
                  href={`/admin/editor/${template._id}`}
                  className={styles.actionButton}
                >
                  <Edit size={16} />
                  {t.edit}
                </Link>
                
                <Link 
                  href={`/user-iframe-preview/${template._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionButton} ${styles.previewButton}`}
                >
                  <Eye size={16} />
                  {t.viewTheme}
                </Link>
  
                <Link
                  href={`/admin/templates/${template._id}/settings`}
                  className={`${styles.actionButton} ${styles.configButton}`}
                >
                  <Settings size={16} />
                  {t.config}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className={styles.modalOverlay} onClick={() => !importing && setIsImportModalOpen(false)}>
          <div className={styles.modalContent} style={{ height: 'auto', maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{t.importModalTitle}</h2>
              {!importing && (
                <button className={styles.closeButton} onClick={() => setIsImportModalOpen(false)}>
                  <X size={24} />
                </button>
              )}
            </div>
            <div className={styles.modalBody}>
              {importing ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>{importProgress}</p>
                </div>
              ) : (
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>{t.uploadTitle}</h3>
                  <p 
                    style={{ marginBottom: '1.5rem', color: '#666', lineHeight: '1.6' }}
                    dangerouslySetInnerHTML={{ __html: t.selectFolder }}
                  />
                  
                  <input 
                    type="file" 
                    webkitdirectory="" 
                    directory="" 
                    multiple 
                    onChange={handleTemplateImport}
                    style={{ 
                      padding: '1.5rem', 
                      border: '2px dashed #2563eb', 
                      borderRadius: '0.5rem', 
                      width: '100%',
                      cursor: 'pointer',
                      background: '#f8fafc'
                    }}
                  />
                  
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #bae6fd' }}>
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#0369a1' }}>{t.expectedStructure}</strong>
                    <pre style={{ fontSize: '0.875rem', color: '#0c4a6e', margin: 0, lineHeight: '1.5' }}>{`meu-template/
├── template.json
├── sections/
│   ├── Hero.jsx
│   └── Hero.module.css
└── layouts/
    └── HomePage.jsx`}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className={styles.modalOverlay} onClick={() => setPreviewTemplate(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Preview: {previewTemplate.name}</h2>
              <button className={styles.closeButton} onClick={() => setPreviewTemplate(null)}>
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              {previewTemplate.type === 'theme' && previewTemplate.pages ? (
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Páginas do Tema:</h3>
                  {previewTemplate.pages.map((page, idx) => (
                    <div key={idx} style={{ marginBottom: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                      <h4 style={{ marginBottom: '0.5rem' }}>{page.name}</h4>
                      {page.content && page.content.map((block) => (
                        <BlockRenderer key={block.id} block={block} readOnly={true} />
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {previewTemplate.content && previewTemplate.content.map((block) => (
                    <BlockRenderer key={block.id} block={block} readOnly={true} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
