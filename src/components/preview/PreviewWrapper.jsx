'use client';

import React, { useState, useEffect } from 'react';
import PreviewToolbar from './PreviewToolbar';

export default function PreviewWrapper({ children, templateName = "Ursula" }) {
  const [viewport, setViewport] = useState('desktop');
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Detect if real mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getViewportStyle = () => {
    if (isMobileDevice || viewport === 'desktop') {
      return { 
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
      };
    }
    // Mobile simulation on desktop
    return { 
      width: '375px', 
      minWidth: '375px',
      margin: '20px auto', // Add margin for better visualization
      boxShadow: '0 0 40px rgba(0,0,0,0.15)',
      borderRadius: '24px', 
      border: '8px solid #333', 
      backgroundColor: '#fff',
      flex: 'none', // Don't stretch
      overflow: 'hidden', // Contain content
      position: 'relative'
    };
  };

  return (
    <div style={{ 
        minHeight: '100vh', 
        backgroundColor: viewport === 'desktop' ? '#fff' : '#e5e7eb', // Grey background vs White
        display: 'flex', 
        flexDirection: 'column'
    }}>
        <style>{`
        /* GLOBAL PREVIEW OVERRIDES - Injected via PreviewWrapper */
        
        /* Grid Sections (CategoryGrid, LatestPosts) */
        .is-mobile-preview .ursula-mobile-grid {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            grid-template-columns: 1fr !important;
            padding: 3rem 1.5rem !important;
        }
        
        .is-mobile-preview .ursula-mobile-grid > a,
        .is-mobile-preview .ursula-mobile-grid > div {
            width: 100% !important;
            margin-bottom: 2rem !important;
            max-width: 100% !important;
        }

        /* Stack Sections (FeaturedContent, ClientLove) */
        .is-mobile-preview .ursula-mobile-stack {
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
            padding: 2rem 1rem !important;
        }
        
        .is-mobile-preview .ursula-mobile-stack > div {
            width: 100% !important;
            padding: 0 !important;
            text-align: center !important;
        }
        
        /* Hero Section */
        .is-mobile-preview .ursula-mobile-hero {
            height: 350px !important;
            padding: 0 1rem !important;
        }
        .is-mobile-preview .ursula-mobile-hero h2 {
            font-size: 2.2rem !important;
            margin-bottom: 1.5rem !important;
            line-height: 1.2 !important;
        }
        
        /* Fix images in grid */
        .is-mobile-preview .ursula-mobile-grid img {
            width: 100% !important;
            height: auto !important;
            object-fit: cover !important;
        }

        /* Footer Stacking */
        .is-mobile-preview footer .container, 
        .is-mobile-preview [class*="Footer_container"] {
             grid-template-columns: 1fr !important;
             display: flex !important;
             flex-direction: column !important;
        }
      `}</style>
        <PreviewToolbar 
            templateName={templateName}
            viewport={viewport}
            setViewport={setViewport}
            isMobileDevice={isMobileDevice}
        />
        
        {/* Content Area */}
        <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            overflowY: 'auto'
        }}>
             <div style={getViewportStyle()} className={viewport === 'mobile' ? 'is-mobile-preview' : ''}>
                 <div style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
                    {typeof children === 'function' 
                        ? children({ forceMobile: viewport === 'mobile' }) 
                        : children
                    }
                 </div>
             </div>
        </div>
    </div>
  );
}
