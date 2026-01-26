import React from 'react';
import dbConnect from '@/lib/db';
import templates from '@/templates-cms/registry';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
    return {
        title: `${categoryName} - Relevates`,
        description: `Browse our collection of ${slug} assets.`
    };
}

export default async function CategoryPageRoute({ params }) {
    const { slug } = await params;

    // For now, we simulate finding the template. 
    // In a real scenario, this would come from a site configuration.
    const templateId = 'digital-brand-theme';
    const templateConfig = templates[templateId];

    if (!templateConfig) {
        notFound();
    }

    const CategoryLayout = templateConfig.layouts?.category;
    if (!CategoryLayout) {
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

    // The category UI expects categoryId to be capitalized for display
    const categoryId = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <CategoryLayout
            sections={sections}
            categoryId={categoryId}
            theme={{}}
        />
    );
}
