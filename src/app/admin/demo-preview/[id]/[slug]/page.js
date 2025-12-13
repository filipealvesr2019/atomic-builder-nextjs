'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BlockRenderer from '@/components/editor/BlockRenderer';
import { Monitor, Tablet, Smartphone, ArrowLeft } from 'lucide-react';
import styles from '../demo-preview.module.css'; // Adjust import path if needed

export default function DemoPage() {
  const params = useParams(); // { id: ..., slug: ... }
  const router = useRouter();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState('desktop');

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

  const renderContent = () => {
    // 1. Determine Active Page Content using params.slug
    let activeBlocks = [];
    const pageSlug = params.slug || 'home';

    if (template.pages && template.pages.length > 0) {
        const activePage = template.pages.find(p => p.slug === pageSlug);
        
        if (activePage) {
            activeBlocks = activePage.content || [];
        } else {
             // 404 for sub-page
             return (
                 <div style={{ padding: '4rem', textAlign: 'center', color: '#666' }}>
                     <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page "{pageSlug}" Not Found</h2>
                     <p>This page exists in the URL but hasn't been created in the template yet.</p>
                     <button 
                         onClick={() => router.push(`/admin/demo-preview/${params.id}`)}
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
        // Fallback for single-page templates or old structure
        // If they are on a slug but it's a single page template, maybe redirect home?
        // or just show content.
        activeBlocks = template.pageContent || template.content || [];
    }

    if (template.type === 'theme' && template.templateId) {
      const { getTemplateLayout } = require('@/templates-cms/registry');
      const LayoutComponent = getTemplateLayout(template.templateId, 'home'); 
      
      if (!LayoutComponent) {
        return <div>Template Not Registered</div>;
      }
      
      // Transform URLs to PATH format: /admin/demo-preview/[id]/[slug]
      const transformUrl = (url) => {
        if (!url || url.startsWith('http') || url === '#') return url;
        
        // If it's already a full path, leave it (unless we want to force it)
        if (url.startsWith('/admin/demo-preview')) return url;

        // Basic slug extraction
        const cleanSlug = url.replace(/^\/|\/$/g, '').replace('?page=', '');
        
        // Handle "Home" link (empty slug or '/') -> go to root ID
        if (cleanSlug === 'home' || cleanSlug === '') {
            return `/admin/demo-preview/${params.id}`;
        }

        return `/admin/demo-preview/${params.id}/${cleanSlug}`;
      };

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

      const sectionProps = {};
      
      // Defaults from Home
      const homePage = template.pages?.find(p => p.slug === 'home');
      const homeBlocks = homePage?.content || template.pageContent || [];
      const globalBlocks = homeBlocks.filter(b => ['header', 'footer'].includes(b.type));
      globalBlocks.forEach(block => { sectionProps[block.type] = block.props; });

      // Overlay Current Page
      if (activeBlocks && activeBlocks.length > 0) {
          activeBlocks.forEach(block => { sectionProps[block.type] = block.props; });
      }

      // Template Defaults
      const defaults = template.sections || {};
      for (const [key, value] of Object.entries(defaults)) {
          if (!sectionProps[key]) sectionProps[key] = value;
      }

      // Apply Transformations
      ['header', 'footer'].forEach(sectionType => {
        if (sectionProps[sectionType]) {
          const props = { ...sectionProps[sectionType] };
          let modified = false;

          if (Array.isArray(props.links)) {
            props.links = props.links.map(link => ({...link, href: smartTransform(link)}));
            modified = true;
          }
          if (Array.isArray(props.companyLinks)) {
            props.companyLinks = props.companyLinks.map(link => ({...link, url: smartTransform(link)}));
            modified = true;
          }
          if (Array.isArray(props.supportLinks)) {
            props.supportLinks = props.supportLinks.map(link => ({...link, url: smartTransform(link)}));
            modified = true;
          }

          if (modified) sectionProps[sectionType] = props;
        }
      });
      
      return <LayoutComponent sections={sectionProps} />;
    }
    
    // Generic renderer fallback
    if (activeBlocks && activeBlocks.length > 0) {
      return activeBlocks.map((block) => (
        <BlockRenderer key={block.id} block={block} readOnly={true} />
      ));
    }
    
    return <div>No content</div>;
  };

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      case 'desktop': default: return '100%';
    }
  };

  return (
    <div className={styles.previewContainer}>
      <div className={styles.toolbar}>
        <div className={styles.viewportButtons}>
            {/* ... simplified buttons for brevity, essentially same ... */}
           <button onClick={() => router.push(`/admin/demo-preview/${params.id}`)} title="Back to Home" style={{marginRight: '1rem', background: 'none', border:'none', cursor:'pointer', color: '#fff'}}>
                <ArrowLeft size={20}/>
            </button>
           <button className={`${styles.viewportBtn} ${viewport === 'mobile' ? styles.active : ''}`} onClick={() => setViewport('mobile')}><Smartphone size={20} /></button>
           <button className={`${styles.viewportBtn} ${viewport === 'tablet' ? styles.active : ''}`} onClick={() => setViewport('tablet')}><Tablet size={20} /></button>
           <button className={`${styles.viewportBtn} ${viewport === 'desktop' ? styles.active : ''}`} onClick={() => setViewport('desktop')}><Monitor size={20} /></button>
        </div>
        <div className={styles.templateInfo}>
          <span className={styles.templateName}>{template.name} - /{params.slug}</span>
        </div>
      </div>

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
