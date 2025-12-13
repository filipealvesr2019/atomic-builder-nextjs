'use client';

import React from 'react';
import templates from '@/templates-cms/registry';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, DownloadCloud } from 'lucide-react';

export default function BlueprintPreview() {
  const params = useParams();
  const { templateId } = params;
  const templateConfig = templates[templateId];

  if (!templateConfig) {
    return <div className="p-10 text-center">Template not found</div>;
  }

  // Get Home Layout
  const HomeLayout = templateConfig.layouts?.home;

  // Function to simulate installation (just redirects to store for now, or could handle install logic)
  // In a real flow, we might want to install directly from here.
  
  // Prepare sections from default content
  const defaultContent = templateConfig.defaultContent || { pages: [] };
  const homePage = defaultContent.pages?.find(p => p.slug === 'home') || defaultContent.pages?.[0];
  const sections = {};
  
  if (homePage?.content) {
      homePage.content.forEach(block => {
          // Use block.id as key if it matches section names, or block.type as fallback
          // For Ursula, IDs are like 'ursula-header' but keys expected are 'header'
          // We used type in default-content for Ursula: type: 'header', type: 'hero' etc.
          // HomePage expects keys: header, hero, categories, featured-content, client-love, latest-posts, footer
          
          sections[block.type] = block.props;
      });
  }

  return (
    <div className="relative min-h-screen bg-white">
        {/* Sticky Header for Actions */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                <Link href="/admin/store" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <ArrowLeft size={18} />
                    Back to Store
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="font-bold text-gray-900">{templateConfig.name} <span className="text-gray-400 font-normal text-sm">Preview Mode</span></h1>
            </div>
            
            <div className="flex items-center gap-2">
                <Link href="/admin/store" className="px-4 py-2 bg-blue-600 text-white rounded font-medium flex items-center gap-2 hover:bg-blue-700">
                    <DownloadCloud size={16} />
                    Install This Theme
                </Link>
            </div>
        </div>

        {/* Template Render */}
        <div className="template-preview-frame">
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
    </div>
  );
}
