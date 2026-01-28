'use client';

import React from 'react';
import templates from '@/templates-cms/registry';
import { useParams, notFound } from 'next/navigation';

export default function DynamicCategoryPreview() {
    const params = useParams();
    const { templateId, slug } = params;
    const templateConfig = templates[templateId];

    if (!templateConfig) {
        notFound();
    }

    const CategoryLayout = templateConfig.layouts?.category;
    if (!CategoryLayout) {
        return (
            <div className="p-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Category Page Not Found</h1>
                <p>This template does not have a category layout defined.</p>
            </div>
        );
    }

    // Prep sections from default content
    const defaultContent = templateConfig.defaultContent || { pages: [] };
    const homePage = defaultContent.pages?.find(p => p.slug === 'home') || defaultContent.pages?.[0];
    const sections = {};

    if (homePage?.content) {
        homePage.content.forEach(block => {
            sections[block.type] = block.props;
        });
    }

    // Find the category from the categories section
    const categoryData = sections.categories?.items?.find(cat => cat.id === slug);

    return (
        <CategoryLayout
            sections={sections}
            category={categoryData || { name: slug, id: slug }}
            theme={{}}
            baseUrl={`/iframe-preview/${templateId}`}
        />
    );
}
