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

  // Renderizar apenas o conteúdo da primeira página (index/home) para temas
  const renderContent = () => {
    if (template.type === 'theme' && template.pages && template.pages.length > 0) {
      console.log('[DEMO-PREVIEW] Páginas disponíveis:', template.pages.map(p => p.name));
      
      // Encontrar a página index/home com prioridade clara
      let homePage = template.pages.find(page => page.name === 'index');
      
      if (!homePage) {
        homePage = template.pages.find(page => {
          const name = page.name.toLowerCase();
          return name === 'home' || name === 'homepage';
        });
      }
      
      // Se AINDA não encontrar, usar a primeira página
      if (!homePage) {
        console.log('[DEMO-PREVIEW] Página index não encontrada, usando primeira página:', template.pages[0].name);
        homePage = template.pages[0];
      } else {
        console.log('[DEMO-PREVIEW] Página selecionada:', homePage.name);
      }
      
      // Se a página tem HTML original, renderizá-lo
      if (homePage.rawHtml) {
        const RawHTMLRenderer = require('@/components/editor/RawHTMLRenderer').default;
        return <RawHTMLRenderer html={homePage.rawHtml} css={homePage.rawCss} />;
      }
      
      // Fallback: usar sistema de blocos
      if (homePage.content && homePage.content.length > 0) {
        return homePage.content.map((block) => (
          <BlockRenderer key={block.id} block={block} readOnly={true} />
        ));
      }
    } else if (template.content && template.content.length > 0) {
      return template.content.map((block) => (
        <BlockRenderer key={block.id} block={block} readOnly={true} />
      ));
    }
    
    return (
      <div className={styles.emptyState}>
        <p>Nenhum conteúdo disponível</p>
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
