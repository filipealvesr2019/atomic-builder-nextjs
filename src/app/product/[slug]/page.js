import React from 'react';
import templates from '@/templates-cms/registry';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const templateId = 'digital-brand-theme';
    const templateConfig = templates[templateId];
    const products = templateConfig.defaultContent?.pages?.[0]?.content?.find(c => c.type === 'featured')?.props?.products || [];
    const product = products.find(p => p.slug === slug);

    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} - Relevates`,
        description: product.description
    };
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const templateId = 'digital-brand-theme';
    const templateConfig = templates[templateId];

    if (!templateConfig) notFound();

    const ProductDetailLayout = templateConfig.layouts?.['product-detail'];
    if (!ProductDetailLayout) notFound();

    // Get products from default content
    const homePage = templateConfig.defaultContent?.pages?.find(p => p.slug === 'home') || templateConfig.defaultContent?.pages?.[0];
    const featuredSection = homePage?.content?.find(c => c.type === 'featured');
    const products = featuredSection?.props?.products || [];

    const product = products.find(p => p.slug === slug);

    if (!product) {
        notFound();
    }

    // Prep sections for header/footer
    const sections = {};
    if (homePage?.content) {
        homePage.content.forEach(block => {
            sections[block.type] = block.props;
        });
    }

    return (
        <ProductDetailLayout
            sections={sections}
            product={product}
            theme={{}}
        />
    );
}
