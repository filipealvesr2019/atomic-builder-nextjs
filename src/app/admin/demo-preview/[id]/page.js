'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import BlockRenderer from '@/components/editor/BlockRenderer';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import styles from './demo-preview.module.css';

export default function DemoPreviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
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
    // 1. Determine Active Page Content
    let activeBlocks = [];
    const pageSlug = searchParams.get('page') || 'home';

    if (template.pages && template.pages.length > 0) {
        const activePage = template.pages.find(p => p.slug === pageSlug);
        
        if (activePage) {
            activeBlocks = activePage.content || [];
        } else if (pageSlug === 'home') {
             // Fallback to first page if 'home' is requested but not explicitly named 'home'
             activeBlocks = template.pages[0].content || [];
        } else {
             // Requested a specific page that doesn't exist -> Show 404
             return (
                 <div style={{ padding: '4rem', textAlign: 'center', color: '#666' }}>
                     <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page "{pageSlug}" Not Found</h2>
                     <p>This page exists in the menu but hasn't been created in the template yet.</p>
                     <button 
                         onClick={() => {
                             const url = new URL(window.location);
                             url.searchParams.set('page', 'home');
                             window.location.href = url.toString();
                         }}
                         style={{ 
                             marginTop: '1.5rem', 
                             padding: '0.5rem 1rem', 
                             background: '#000', 
                             color: '#fff', 
                             border: 'none', 
                             borderRadius: '4px',
                             cursor: 'pointer'
                         }}
                     >
                         Return to Home
                     </button>
                 </div>
             );
        }
    } else {
        activeBlocks = template.pageContent || template.content || [];
    }

    console.log('[DemoPreview] Active Slug:', pageSlug);
    console.log('[DemoPreview] Active Blocks:', activeBlocks);

    if (template.type === 'theme' && template.templateId) {
      // Usar templates-cms registry
      const { getTemplateLayout } = require('@/templates-cms/registry');
      const LayoutComponent = getTemplateLayout(template.templateId, 'home'); // Assuming 'home' layout is generic enough or we need map from page.layout
      
      if (!LayoutComponent) {
        return (
          <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed #f0ad4e' }}>
            <h2>Template não encontrado</h2>
            <p>O template <code>{template.templateId}</code> não está registrado.</p>
          </div>
        );
      }
      
      // Helper to transform URLs to demo-preview format (PATH BASED)
      const transformUrl = (url) => {
        if (!url || url.startsWith('http') || url === '#') return url;
        
        // If it's already a full path, leave it
        if (url.startsWith('/admin/demo-preview')) return url;

        // Clean slug
        const cleanSlug = url.replace(/^\/|\/$/g, '').replace('?page=', '');
        
        if (cleanSlug === 'home' || cleanSlug === '') {
            return `/admin/demo-preview/${params.id}`;
        }
        
        return `/admin/demo-preview/${params.id}/${cleanSlug}`;
      };

      // 2. Map Blocks to Section Props
      const sectionProps = {};
      
      // A) Extract Global Defaults from Home Page (Header & Footer)
      const homePage = template.pages?.find(p => p.slug === 'home');
      const homeBlocks = homePage?.content || template.pageContent || [];
      
      const globalBlocks = homeBlocks.filter(b => ['header', 'footer'].includes(b.type));
      globalBlocks.forEach(block => {
          sectionProps[block.type] = block.props;
      });

      // B) Overlay Current Page Blocks
      if (activeBlocks && activeBlocks.length > 0) {
          activeBlocks.forEach(block => {
              sectionProps[block.type] = block.props;
          });
      }

      // C) Final Fallback to Template Defaults
      const defaults = template.sections || {};
      for (const [key, value] of Object.entries(defaults)) {
          if (!sectionProps[key]) {
              sectionProps[key] = value;
          }
      }

      // D) Intercept and Transform Links for Preview Context
      ['header', 'footer'].forEach(sectionType => {
        if (sectionProps[sectionType]) {
          const props = { ...sectionProps[sectionType] };
          let modified = false;

          const smartTransform = (link) => {
             let url = link.url || link.href; 
             const text = link.text;
             
             if (url && url !== '#' && !url.startsWith('http')) {
                 return transformUrl(url);
             }
             
             if ((!url || url === '#') && text) {
                 const slug = text.toLowerCase().replace(/\s+/g, '-');
                 const pageExists = template.pages?.some(p => p.slug === slug);
                 if (pageExists) {
                     return `/admin/demo-preview/${params.id}/${slug}`;
                 }
             }
             
             return url;
          };

          // Transform 'links' array (Header)
          if (Array.isArray(props.links)) {
            props.links = props.links.map(link => ({
              ...link,
              href: smartTransform(link)
            }));
            modified = true;
          }

          // Transform 'companyLinks' array (Footer)
          if (Array.isArray(props.companyLinks)) {
            props.companyLinks = props.companyLinks.map(link => ({
              ...link,
              url: smartTransform(link)
            }));
            modified = true;
          }

          // Transform 'supportLinks' array (Footer)
          if (Array.isArray(props.supportLinks)) {
            props.supportLinks = props.supportLinks.map(link => ({
              ...link,
              url: smartTransform(link)
            }));
            modified = true;
          }

          if (modified) {
            sectionProps[sectionType] = props;
          }
        }
      });
      
      console.log('[DemoPreview] Final Section Props (Transformed):', sectionProps);
      
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
    
    // Fallback para templates com blocos (Generic Renderer)
    if (activeBlocks && activeBlocks.length > 0) {
      return activeBlocks.map((block) => (
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
