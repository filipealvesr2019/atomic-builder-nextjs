'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTemplate } from '@/templates-cms/registry';
import styles from '../demo-preview.module.css'; 

// Import Sections
// Note: We need to ensure these components exist or this will crash. 
// I will create them in subsequent steps.
import Header from '@/templates-cms/ursula-theme/sections/Header';
import Hero from '@/templates-cms/ursula-theme/sections/Hero';
import Footer from '@/templates-cms/ursula-theme/sections/Footer';
import AboutIntro from '@/templates-cms/ursula-theme/sections/AboutIntro';
import Team from '@/templates-cms/ursula-theme/sections/Team';
import Quote from '@/templates-cms/ursula-theme/sections/Quote';
import NewsletterSplit from '@/templates-cms/ursula-theme/sections/NewsletterSplit';
import ContactSection from '@/templates-cms/ursula-theme/sections/ContactSection';
import InstagramRow from '@/templates-cms/ursula-theme/sections/InstagramRow';
// Add others if needed
import LatestPosts from '@/templates-cms/ursula-theme/sections/LatestPosts';

const SECTION_MAP = {
    'header': Header,
    'hero': Hero,
    'footer': Footer,
    'about-intro': AboutIntro,
    'team': Team,
    'quote': Quote,
    'newsletter-split': NewsletterSplit,
    'contact-section': ContactSection,
    'instagram-row': InstagramRow,
    'latest-posts': LatestPosts
};

export default function GenericPage() {
  const params = useParams(); // { id, slug }
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
    setLoading(false);
  }, [params.id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!template) return <div className={styles.error}>Page not found</div>;

  const page = template.pages?.find(p => p.slug === params.slug);

  if (!page) return <div className={styles.error}>Page "{params.slug}" not found</div>;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {page.content?.map((block, idx) => {
            const Component = SECTION_MAP[block.type];
            if (!Component) return <div key={idx} style={{padding:'20px', textAlign:'center'}}>Feature {block.type} not implemented yet</div>;
            
            return <Component key={idx} {...block.props} />;
        })}
    </div>
  );
}
