'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlockRenderer from '@/components/editor/BlockRenderer';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import styles from './demo-preview.module.css';

export default function DemoPreviewPage() {
  const params = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState('desktop'); // 'mobile', 'tablet', 'desktop'

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
      } else {
        console.error('Template não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar template:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className={styles.error}>
        <h2>Template não encontrado</h2>
      </div>
    );
  }

  // Renderizar template CMS-compatível
  const renderContent = () => {
    if (template.type === 'theme' && template.templateId) {
      // Usar templates-cms registry
      const { getTemplateLayout } = require('@/templates-cms/registry');
      const LayoutComponent = getTemplateLayout(template.templateId, 'home');
      
      if (!LayoutComponent) {
        return (
          <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed #f0ad4e' }}>
            <h2>Template não encontrado</h2>
            <p>O template <code>{template.templateId}</code> não está registrado.</p>
            <p><strong>Templates disponíveis:</strong></p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><code>minimal-business</code></li>
            </ul>
          </div>
        );
      }
      
      // Renderizar com props do banco de dados ou defaults
      const sectionProps = template.sections || {};
      
      return <LayoutComponent sections={sectionProps} />;
    }
    
    // Fallback: templates antigos (iframe)
    if (template.url) {
      return (
        <iframe
          src={template.url}
          style={{
            width: '100%',
            height: '100vh',
            border: 'none'
          }}
          title={template.name}
        />
      );
    }
    
    // Fallback para templates com blocos
    if (template.content && template.content.length > 0) {
      return template.content.map((block) => (
        <BlockRenderer key={block.id} block={block} readOnly={true} />
      ));
    }
    
    return (
      <div className={styles.emptyState}>
        <p>Nenhum conteúdo disponível</p>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          Configure o template nas configurações
        </p>
      </div>
    );
  };

  // Definir largura do viewport
  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  return (
    <div className={styles.previewContainer}>
      {/* Barra de Ferramentas no Topo */}
      <div className={styles.toolbar}>
        <div className={styles.viewportButtons}>
          <button
            className={`${styles.viewportBtn} ${viewport === 'mobile' ? styles.active : ''}`}
            onClick={() => setViewport('mobile')}
            title="Mobile (375px)"
          >
            <Smartphone size={20} />
            <span>Mobile</span>
          </button>
          <button
            className={`${styles.viewportBtn} ${viewport === 'tablet' ? styles.active : ''}`}
            onClick={() => setViewport('tablet')}
            title="Tablet (768px)"
          >
            <Tablet size={20} />
            <span>Tablet</span>
          </button>
          <button
            className={`${styles.viewportBtn} ${viewport === 'desktop' ? styles.active : ''}`}
            onClick={() => setViewport('desktop')}
            title="Desktop (100%)"
          >
            <Monitor size={20} />
            <span>Desktop</span>
          </button>
        </div>
        <div className={styles.templateInfo}>
          <span className={styles.templateName}>{template.name}</span>
        </div>
      </div>

      {/* Área de Preview com Viewport Responsivo */}
      <div className={styles.previewWrapper}>
        <div 
          className={styles.previewContent}
          style={{ 
            width: getViewportWidth(),
            maxWidth: '100%',
            margin: viewport === 'desktop' ? '0' : '0 auto',
            transition: 'width 0.3s ease'
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
