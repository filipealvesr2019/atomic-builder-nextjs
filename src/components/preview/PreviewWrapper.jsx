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
                    {children}
                 </div>
             </div>
        </div>
    </div>
  );
}
