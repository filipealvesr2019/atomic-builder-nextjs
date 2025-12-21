'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTemplateLayout, getTemplate } from '@/templates-cms/registry';
import styles from '../../demo-preview.module.css'; // Reuse preview styles
import PreviewWrapper from '@/components/preview/PreviewWrapper';

export default function CategoryPage() {
  const params = useParams(); // { id, slug } "slug" here is the category name
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id === 'ursula-demo') {
        // Special case for static demo preview
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
      } else {
        // Fallback for demo IDs that might not be in DB but are valid themes
        // This makes "ursula-demo" work even if logic above missed or if used elsewhere
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

  // 1. Get Theme Configuration
  if (template.type === 'theme' && template.templateId) {
      const templateConfig = getTemplate(template.templateId);
      if (!templateConfig) return <div>Theme Registry Error</div>;

      const HeaderComponent = templateConfig.sections?.header;
      const FooterComponent = templateConfig.sections?.footer;
      const LatestPostsComponent = templateConfig.sections?.['latest-posts']; 
      const HeroComponent = templateConfig.sections?.hero;

      // 2. Prepare Section Props (Header/Footer)
      const sectionProps = {};
      
      // Defaults from Home (Global)
      const homePage = template.pages?.find(p => p.slug === 'home');
      const homeBlocks = homePage?.content || template.pageContent || []; 
      
      const globalBlocks = homeBlocks.filter(b => ['header', 'footer'].includes(b.type)); 
      
      // We try to find "header" and "footer" props from existing content to keep consistency
      globalBlocks.forEach(block => {
          if (['header', 'footer'].includes(block.type)) {
              sectionProps[block.type] = block.props;
          }
      });
      
      // Fallback to registry defaults if missing
      const defaults = templateConfig.defaultContent?.pages?.[0]?.content || [];
      const defaultHeader = defaults.find(b => b.type === 'header')?.props;
      const defaultFooter = defaults.find(b => b.type === 'footer')?.props;

      if (!sectionProps.header) sectionProps.header = defaultHeader;
      if (!sectionProps.footer) sectionProps.footer = defaultFooter;

      // 3. Filter Posts by Category
      const categorySlug = params.slug; 
      
      // Where are the posts? 
      // In a real CMS, they are in a database.
      // In this demo, they might be in the 'latest-posts' section props of the Home page or we simulated them.
      let allPosts = [];
      const postsBlock = homeBlocks.find(b => b.type === 'latest-posts');
      
      if (postsBlock && postsBlock.props && Array.isArray(postsBlock.props.posts)) {
          allPosts = postsBlock.props.posts;
      } else {
          // Fallback to mock data from defaultContent if not in saved template
           const defaultPostsBlock = defaults.find(b => b.type === 'latest-posts');
           if (defaultPostsBlock) {
               allPosts = defaultPostsBlock.props.posts || [];
           }
      }

      // Perform Filter (Case insensitive)
      const filteredPosts = allPosts.filter(post => 
          post.category?.toLowerCase() === categorySlug.toLowerCase()
      );

      return (
        <PreviewWrapper templateName={`Category: ${categorySlug}`}>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                {HeaderComponent && <HeaderComponent {...(sectionProps.header || {})} />}
                
                {/* Category Hero */}
                {HeroComponent && (
                    <HeroComponent 
                        title={categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
                        subtitle="Category Archive"
                        buttonText="" // Hide button
                        backgroundImage="https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    />
                )}
                
                {/* Main Content: Post Grid */}
                <main style={{ flex: 1, background: '#fff' }}>
                     {/* Re-use LatestPosts component but override title/posts */}
                     {LatestPostsComponent ? (
                         <LatestPostsComponent 
                            subtitle=""
                            title="Latest Articles"
                            posts={filteredPosts}
                         />
                     ) : (
                         <div style={{padding: '4rem'}}>No Component for Posts</div>
                     )}
                     
                     {filteredPosts.length === 0 && (
                         <p style={{textAlign:'center', paddingBottom: '4rem', color: '#999'}}>No posts found in this category.</p>
                     )}
                </main>

                {/* Footer */}
                {FooterComponent && <FooterComponent {...(sectionProps.footer || {})} />}
            </div>
        </PreviewWrapper>
      );
  }

  return <div>Only Themes Supported for Categories</div>;
}
