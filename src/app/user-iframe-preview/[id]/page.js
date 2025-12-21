'use client';

import React, { useState, useEffect } from 'react';
import templates from '@/templates-cms/registry';
import { useParams } from 'next/navigation';

export default function UserIframePreview() {
  const params = useParams();
  const { id } = params;
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await fetch(`/api/templates/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTemplate(data);
        }
      } catch (error) {
        console.error('Failed to fetch user template', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [id]);

  if (loading) return null;
  if (!template) return <div className="p-10 text-center">Template not found</div>;

  const templateConfig = templates[template.templateId];
  if (!templateConfig) return <div className="p-10 text-center">Config not found</div>;

  const HomeLayout = templateConfig.layouts?.home;

  // Prepare sections from user-saved content
  const homePage = template.pages?.find(p => p.slug === 'home') || { content: template.pageContent || [] };
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
                theme={template.theme || {}} 
            />
        ) : (
            <div className="p-10 text-center text-red-500">
                This template does not have a Home layout defined.
            </div>
        )}
    </div>
  );
}
