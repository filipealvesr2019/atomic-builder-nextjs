'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTemplate } from '@/templates-cms/registry';
import styles from '../../demo-preview.module.css'; 
import PreviewWrapper from '@/components/preview/PreviewWrapper'; 

// Components
import Header from '@/templates-cms/ursula-theme/sections/Header';
import Footer from '@/templates-cms/ursula-theme/sections/Footer';
import SinglePost from '@/templates-cms/ursula-theme/sections/SinglePost';

export default function PostPage() {
  const params = useParams(); // { id, slug }
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    // 1. Get Template Config
    const ursulaConfig = getTemplate('ursula-theme');
    if (ursulaConfig && ursulaConfig.defaultContent) {
        setTemplate({
            type: 'theme',
            templateId: 'ursula-theme',
            pages: ursulaConfig.defaultContent.pages
        });

        // 2. Find the Post Data
        // We look into the 'home' page content to find 'latest-posts' and search there.
        // This is a "mock" database lookup.
        const homePage = ursulaConfig.defaultContent.pages.find(p => p.slug === 'home');
        let foundPost = null;

        if (homePage) {
            const latestPostsBlock = homePage.content.find(b => b.type === 'latest-posts');
            if (latestPostsBlock && latestPostsBlock.props && latestPostsBlock.props.posts) {
                foundPost = latestPostsBlock.props.posts.find(p => p.slug === params.slug);
            }
        }
        
        // If not found in home, we could check other places, but for now fallback to query or null
        // If found, we can construct the full post data merging with a generic "single-post" template
        if (foundPost) {
             const defaultSingle = ursulaConfig.defaultContent.pages.find(p => p.slug === 'single-post');
             const defaultPostProps = defaultSingle?.content?.find(b => b.type === 'single-post')?.props || {};

             setPostData({
                 ...defaultPostProps, // Default text/gallery
                 title: foundPost.title,
                 category: foundPost.category,
                 date: `${foundPost.date} ${foundPost.month} 2024`,
                 mainImage: foundPost.image,
                 // We keep the generic content from defaultPostProps since mock posts don't have full text
             });
        } else {
             // Fallback if slug not found (though links should be correct)
             setPostData(null);
        }

        setLoading(false);
    } else {
        setLoading(false);
    }
  }, [params.id, params.slug]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!template || !postData) {
      // If post not found, maybe show the generic one or 404
      // For this demo, let's just show the generic one as a fallback
       const ursulaConfig = getTemplate('ursula-theme');
       const defaultSingle = ursulaConfig?.defaultContent?.pages?.find(p => p.slug === 'single-post');
       if (defaultSingle) {
           const props = defaultSingle.content.find(b => b.type === 'single-post')?.props;
             return (
               <PreviewWrapper templateName="Ursula Post (Fallback)">
                    {({ forceMobile }) => (
                       <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                           <Header forceMobile={forceMobile} logoText="Ursula" logoSub="Theme" 
                                links={[
                                     { text: 'Home', href: `/admin/store/preview/ursula-theme` },
                                     { text: 'Our Blog', href: `/admin/demo-preview/${params.id}/blog` }
                                ]} 
                           />
                           <SinglePost {...props} forceMobile={forceMobile} />
                           <Footer forceMobile={forceMobile} sections={{}} />
                       </div>
                    )}
               </PreviewWrapper>
           );
       }
      return <div className={styles.error}>Post not found</div>;
  }

  // Get generic header/footer props
  const homePage = template.pages?.find(p => p.slug === 'home');
  const defaults = template.pages?.find(p => p.slug === 'home')?.content || [];
  const headerProps = defaults.find(b => b.type === 'header')?.props || {};
  const footerProps = defaults.find(b => b.type === 'footer')?.props || {};

  return (
    <PreviewWrapper templateName={`Ursula - ${postData.title}`}>
        {({ forceMobile }) => (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Header {...headerProps} forceMobile={forceMobile} />
                
                <SinglePost 
                    {...postData} 
                    forceMobile={forceMobile} 
                />

                <Footer {...footerProps} forceMobile={forceMobile} />
            </div>
        )}
    </PreviewWrapper>
  );
}
