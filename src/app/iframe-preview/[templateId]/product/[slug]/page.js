'use client';

import React from 'react';
import templates from '@/templates-cms/registry';
import { useParams, notFound } from 'next/navigation';

export default function DynamicProductPreview() {
    const params = useParams();
    const { templateId, slug } = params;
    const templateConfig = templates[templateId];

    if (!templateConfig) {
        notFound();
    }

    const ProductDetailLayout = templateConfig.layouts?.['product-detail'];
    if (!ProductDetailLayout) {
        return (
            <div className="p-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Detail Page Not Found</h1>
                <p>This template does not have a product detail layout defined.</p>
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

    // Find the product
    const allProducts = sections.featured?.products || [];
    const product = allProducts.find(p => p.id === slug || p.slug === slug);

    if (!product) {
        return (
            <div className="p-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <p>Could not find product with ID/Slug: {slug}</p>
            </div>
        );
    }

    return (
        <ProductDetailLayout
            sections={sections}
            product={product}
            baseUrl={`/iframe-preview/${templateId}`}
        />
    );
}
