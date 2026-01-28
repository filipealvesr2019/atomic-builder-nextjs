'use client';

import React from 'react';
import templates from '@/templates-cms/registry';
import { useParams, notFound } from 'next/navigation';

export default function DynamicProductsPreview() {
    const params = useParams();
    const { templateId } = params;
    const templateConfig = templates[templateId];

    if (!templateConfig) {
        notFound();
    }

    const ProductsLayout = templateConfig.layouts?.products;
    if (!ProductsLayout) {
        return (
            <div className="p-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Products Page Not Found</h1>
                <p>This template does not have a products layout defined.</p>
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

    return (
        <ProductsLayout
            sections={sections}
            theme={{}}
            baseUrl={`/iframe-preview/${templateId}`}
        />
    );
}
