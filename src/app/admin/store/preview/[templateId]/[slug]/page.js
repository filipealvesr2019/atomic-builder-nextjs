'use client';

import React, { useState, useEffect } from 'react';
import templates from '@/templates-cms/registry';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, DownloadCloud, Monitor, Smartphone } from 'lucide-react';

export default function TemplatePagePreview() {
  const params = useParams();
  const { templateId, slug } = params; // slug comes from the [slug] directory
  const templateConfig = templates[templateId];
  const [viewport, setViewport] = useState('desktop');
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Detectar se é dispositivo mobile real
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!templateConfig) {
    return <div className="p-10 text-center">Template not found</div>;
  }

  // Find the page in default content
  const defaultContent = templateConfig.defaultContent || { pages: [] };
  
  // Try to find page by slug
  const pageContent = defaultContent.pages?.find(p => p.slug === slug);
  
  if (!pageContent) {
      return (
          <div className="p-10 text-center flex flex-col items-center justify-center min-h-screen">
              <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
              <p className="mb-6">The page "{slug}" does not exist in this template.</p>
              <Link href={`/admin/store/preview/${templateId}`} className="text-blue-600 hover:underline">
                  Back to Home
              </Link>
          </div>
      );
  }

  // Determine Layout
  // Check if there is a specific layout for this slug, otherwise use a generic 'page' layout or fallback to 'home' (though likely not desired for inner pages)
  // For Emma, we defined 'services' layout in registry.
  let PageLayout = templateConfig.layouts?.[slug];
  
  // If no specific layout for this slug, maybe there's a generic 'page' layout?
  if (!PageLayout) {
      PageLayout = templateConfig.layouts?.page || templateConfig.layouts?.home;
  }

  // Prepare sections
  const sections = {};
  if (pageContent?.content) {
      pageContent.content.forEach(block => {
          sections[block.type] = block.props;
      });
  }

  // Definir largura do viewport simulado
  const getViewportStyle = () => {
    if (isMobileDevice || viewport === 'desktop') {
      return { width: '100%' };
    }
    // Mobile simulation on desktop
    return { 
      width: '375px', 
      height: '800px', // Fixed height to simulate device screen
      overflowY: 'auto', // Scroll inside the device
      margin: '0 auto',
      boxShadow: '0 0 40px rgba(0,0,0,0.15)',
      borderRadius: '24px', // More rounded like a phone
      border: '8px solid #333', // Bezel
      backgroundColor: '#fff',
      transform: 'translate3d(0,0,0)', // Creates containing block for fixed position children
      position: 'relative'
    };
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
        {/* Sticky Header for Actions */}
        <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link href={`/admin/store/preview/${templateId}`} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    color: '#4b5563', 
                    textDecoration: 'none',
                    fontWeight: 500
                }}>
                    <ArrowLeft size={18} />
                    <span className="hidden sm:inline">Back to Home</span>
                </Link>
                <div className="hidden sm:block" style={{ height: '24px', width: '1px', backgroundColor: '#e5e7eb' }}></div>
                <h1 className="hidden sm:block" style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                    {templateConfig.name} <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: '0.875rem', marginLeft: '8px' }}>/ {pageContent.name}</span>
                </h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Viewport Toggle - Only show on desktop */}
                {!isMobileDevice && (
                  <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      backgroundColor: '#f3f4f6', 
                      padding: '4px', 
                      borderRadius: '8px' 
                  }}>
                    <button
                      onClick={() => setViewport('desktop')}
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: viewport === 'desktop' ? '#ffffff' : 'transparent',
                          color: viewport === 'desktop' ? '#111827' : '#6b7280',
                          boxShadow: viewport === 'desktop' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                          transition: 'all 0.2s ease'
                      }}
                      title="Desktop view"
                    >
                      <Monitor size={16} />
                      <span className="hidden md:inline">Desktop</span>
                    </button>
                    <button
                      onClick={() => setViewport('mobile')}
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: viewport === 'mobile' ? '#ffffff' : 'transparent',
                          color: viewport === 'mobile' ? '#111827' : '#6b7280',
                          boxShadow: viewport === 'mobile' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                          transition: 'all 0.2s ease'
                      }}
                      title="Mobile view"
                    >
                      <Smartphone size={16} />
                      <span className="hidden md:inline">Mobile</span>
                    </button>
                  </div>
                )}
                
                <Link href="/admin/store" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    borderRadius: '6px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'background-color 0.2s'
                }}>
                    <DownloadCloud size={16} />
                    <span className="hidden sm:inline">Install This Theme</span>
                </Link>
            </div>
        </div>

        {/* Template Render */}
        <div className={`template-preview-frame ${viewport === 'mobile' && !isMobileDevice ? 'py-6' : ''}`}>
            <div style={getViewportStyle()}>
                {PageLayout ? (
                    <PageLayout 
                        sections={sections}
                        content={pageContent.content}
                        theme={{}} 
                        forceMobile={viewport === 'mobile' && !isMobileDevice}
                    />
                ) : (
                    <div className="p-10 text-center text-red-500">
                        This template does not have a layout for this page type.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
