import React from 'react';
import dbConnect from '@/lib/db';
import templates from '@/templates-cms/registry';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'All Products - CREATIX',
    description: 'Browse our full collection of premium digital assets.'
};

export default async function ProductsPage() {
    // For now, we simulate finding the template. 
    const templateId = 'creatix-theme';
    const templateConfig = templates[templateId];

    if (!templateConfig) {
        notFound();
    }

    const ProductsLayout = templateConfig.layouts?.products;
    if (!ProductsLayout) {
        notFound();
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
        />
    );
}
