'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, DownloadCloud, Monitor, Smartphone } from 'lucide-react';

export default function PreviewToolbar({
    templateName = "Template",
    viewport = 'desktop',
    setViewport,
    isMobileDevice = false,
    backLink = "/admin/store",
    installLink = "/admin/store",
    onInstall
}) {
    return (
        <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 9999, // Ensure it's above everything
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link href={backLink} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    color: '#4b5563', 
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.9rem'
                }}>
                    <ArrowLeft size={18} />
                    <span className="hidden sm:inline">Back to Store</span>
                </Link>
                <div className="hidden sm:block" style={{ height: '24px', width: '1px', backgroundColor: '#e5e7eb' }}></div>
                <h1 className="hidden sm:block" style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                    {templateName} <span style={{ fontWeight: 400, color: '#9ca3af', fontSize: '0.875rem', marginLeft: '8px' }}>Preview Mode</span>
                </h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Viewport Toggle - Only show on desktop if setViewport provided */}
                {!isMobileDevice && setViewport && (
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
                
                {onInstall ? (
                    <button onClick={onInstall} style={installBtnStyle}>
                        <DownloadCloud size={16} />
                        <span className="hidden sm:inline">Install This Theme</span>
                    </button>
                ) : (
                    <Link href={installLink} style={installBtnStyle}>
                        <DownloadCloud size={16} />
                        <span className="hidden sm:inline">Install This Theme</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

const installBtnStyle = {
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
    transition: 'background-color 0.2s',
    border: 'none',
    cursor: 'pointer'
};
