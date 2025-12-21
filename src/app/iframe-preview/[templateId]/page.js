'use client';

import React, { useState, useEffect } from 'react';
import templates from '@/templates-cms/registry';
import { useParams, useSearchParams } from 'next/navigation';

export default function IframePreview() {
  const params = useParams();
  const { templateId } = params;
  const templateConfig = templates[templateId];

  if (!templateConfig) {
    return <div className="p-10 text-center">Template not found</div>;
  }

  // Get Home Layout
  const HomeLayout = templateConfig.layouts?.home;

  // Prepare sections from default content
  const defaultContent = templateConfig.defaultContent || { pages: [] };
  const homePage = defaultContent.pages?.find(p => p.slug === 'home') || defaultContent.pages?.[0];
  const sections = {};
  
  if (homePage?.content) {
      homePage.content.forEach(block => {
          sections[block.type] = block.props;
      });
  }

  return (
    <div className="min-h-screen bg-white">
        {HomeLayout ? (
            <HomeLayout 
                sections={sections}
                theme={{}} 
            />
        ) : (
            <div className="p-10 text-center text-red-500">
                This template does not have a Home layout defined.
            </div>
        )}
    </div>
  );
}
