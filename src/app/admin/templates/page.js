'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash, X, Eye } from 'lucide-react';
import styles from './templates.module.css';
import BlockRenderer from '@/components/editor/BlockRenderer';

export default function TemplatesList() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState('');

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
    if (!confirm('Tem certeza que deseja excluir este template?')) return;

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
    setImportProgress('Validando template...');
    
    try {
      console.log('[UPLOAD] Arquivos recebidos:', files.length);
      console.log('[UPLOAD] Primeiro arquivo:', files[0]?.name, files[0]?.webkitRelativePath);
      
      // Encontrar template.json (buscar por nome E caminho)
      const templateJsonFile = files.find(f => 
        f.name === 'template.json' || 
        (f.webkitRelativePath && f.webkitRelativePath.endsWith('template.json'))
      );
      
      console.log('[UPLOAD] template.json encontrado?', !!templateJsonFile);
      
      if (!templateJsonFile) {
        // Mostrar lista de arquivos para debug
        console.error('[UPLOAD] Arquivos disponíveis:', files.map(f => f.name).join(', '));
        throw new Error('Arquivo template.json não encontrado! O template deve seguir a estrutura CMS-compatível.');
      }
      
      const templateConfig = JSON.parse(await templateJsonFile.text());
      console.log('[UPLOAD] Template config:', templateConfig.name);
      
      setImportProgress(`Instalando "${templateConfig.name}"...`);
      
      // Determinar o ID do template a partir do nome da pasta
      let templateId = 'custom-template';
      if (files[0].webkitRelativePath) {
        const pathParts = files[0].webkitRelativePath.split('/');
        if (pathParts.length > 0 && pathParts[0]) {
          templateId = pathParts[0].toLowerCase().replace(/[^a-z0-9-]/g, '-');
        }
      }
      
      // Copiar arquivos para src/templates-cms/[templateId]/
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
        const error = await uploadResponse.json();
        throw new Error(error.error || 'Falha ao fazer upload');
      }
      
      setImportProgress('Registrando template...');
      
      // Salvar no banco de dados
      await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: templateConfig.name,
          type: 'theme',
          templateId: templateId,
          sections: {}, // Props padrão
          content: [],
          isPublic: false
        }),
      });

      setImportProgress(`Concluído! Template "${templateConfig.name}" instalado.`);
      
      setTimeout(() => {
        setImporting(false);
        setIsImportModalOpen(false);
        fetchTemplates();
      }, 1500);
      
    } catch (err) {
      console.error('Erro ao importar template:', err);
      setImportProgress(`Erro: ${err.message}`);
      setTimeout(() => {
        setImporting(false);
      }, 3000);
    }
  };



  console.log('[DEBUG] Templates component rendering, isImportModalOpen:', isImportModalOpen);
  
  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className={styles.header}>
        <h1>Templates</h1>
        <button 
          onClick={() => {
            console.log('[DEBUG] Import button clicked');
            setIsImportModalOpen(true);
          }} 
          className={styles.createButton}
          style={{ border: '2px solid red' }} // Debug: make sure it's visible
        >
          <Plus size={20} />
          Importar Pasta
        </button>
      </div>

      <div className={styles.grid}>
        {templates.map((template) => (
          <div 
            key={template._id} 
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <h3>{template.name}</h3>
              <span className={styles.type}>{template.type}</span>
            </div>
            {template.type === 'theme' && template.pages && (
              <p style={{ color: '#666', fontSize: '0.875rem', margin: '0.5rem 0' }}>
                {template.pages.length} página(s)
              </p>
            )}
            <div className={styles.actions}>
              <Link
                href={`/admin/editor/${template._id}`}
                className={styles.actionButton}
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Edit size={18} />
                Editar
              </Link>
              
              <Link 
                href={`/admin/demo-preview/${template._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
                style={{ background: '#10b981', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Eye size={18} />
                Ver Tema
              </Link>
              
              <button
                onClick={(e) => handleDelete(e, template._id)}
                className={`${styles.actionButton} ${styles.delete}`}
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className={styles.modalOverlay} onClick={() => !importing && setIsImportModalOpen(false)}>
          <div className={styles.modalContent} style={{ height: 'auto', maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Importar Tema (Pasta)</h2>
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
                  <h3 style={{ marginBottom: '1rem' }}>Upload de Template CMS-Compatível</h3>
                  <p style={{ marginBottom: '1.5rem', color: '#666', lineHeight: '1.6' }}>
                    Selecione a pasta do seu template. O template deve conter um arquivo <code>template.json</code> 
                    e seguir a <a href="/docs/template-spec" target="_blank" style={{ color: '#2563eb' }}>estrutura CMS-compatível</a>.
                  </p>
                  
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
                    <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#0369a1' }}>Estrutura esperada:</strong>
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
