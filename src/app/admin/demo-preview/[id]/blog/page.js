'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTemplateLayout, getTemplate } from '@/templates-cms/registry';
import styles from '../demo-preview.module.css'; 

export default function BlogPage() {
  const params = useParams(); // { id }
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id === 'ursula-demo') {
        const ursulaConfig = getTemplate('ursula-theme');
        if (ursulaConfig && ursulaConfig.defaultContent) {
           setTemplate({
               type: 'theme',
               templateId: 'ursula-theme',
               pages: ursulaConfig.defaultContent.pages
           });
           setLoading(false);
           return;
        }
    }

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
      }
    } catch (error) {
      console.error('Error fetching template:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
  );
  if (!template) return <div className={styles.error}>Template not found</div>;

  if (template.type === 'theme' && template.templateId) {
      const templateConfig = getTemplate(template.templateId);
      if (!templateConfig) return <div>Theme Registry Error</div>;

      const HeaderComponent = templateConfig.sections?.header;
      const FooterComponent = templateConfig.sections?.footer;
      const LatestPostsComponent = templateConfig.sections?.['latest-posts']; 
      const HeroComponent = templateConfig.sections?.hero;

      // Prepare Section Props
      const sectionProps = {};
      const homePage = template.pages?.find(p => p.slug === 'home');
      const homeBlocks = homePage?.content || template.pageContent || []; 
      const globalBlocks = homeBlocks.filter(b => ['header', 'footer'].includes(b.type)); 
      
      globalBlocks.forEach(block => {
          if (['header', 'footer'].includes(block.type)) {
              sectionProps[block.type] = block.props;
          }
      });
      
      const defaults = templateConfig.defaultContent?.pages?.[0]?.content || [];
      const defaultHeader = defaults.find(b => b.type === 'header')?.props;
      const defaultFooter = defaults.find(b => b.type === 'footer')?.props;

      if (!sectionProps.header) sectionProps.header = defaultHeader;
      if (!sectionProps.footer) sectionProps.footer = defaultFooter;

      // Get All Posts (No Filtering)
      let allPosts = [];
      const postsBlock = homeBlocks.find(b => b.type === 'latest-posts');
      
      if (postsBlock && postsBlock.props && Array.isArray(postsBlock.props.posts)) {
          allPosts = postsBlock.props.posts;
      } else {
           const defaultPostsBlock = defaults.find(b => b.type === 'latest-posts');
           if (defaultPostsBlock) {
               allPosts = defaultPostsBlock.props.posts || [];
           }
      }

      return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            {HeaderComponent && <HeaderComponent {...(sectionProps.header || {})} />}
            
            {/* Blog Hero */}
            {HeroComponent && (
                <HeroComponent 
                    title="Our Blog"
                    subtitle=""
                    buttonText="" 
                    backgroundImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                />
            )}
            
            {/* Main Content: All Posts */}
            <main style={{ flex: 1, background: '#fff' }}>
                 {LatestPostsComponent ? (
                     <LatestPostsComponent 
                        subtitle=""
                        title="Latest Articles"
                        posts={allPosts}
                     />
                 ) : (
                     <div style={{padding: '4rem'}}>No Component for Posts</div>
                 )}
            </main>

            {/* Footer */}
            {FooterComponent && <FooterComponent {...(sectionProps.footer || {})} />}
        </div>
      );
  }

  return <div>Only Themes Supported</div>;
}
