'use client';

import React from 'react';
import templates from '@/templates-cms/registry';
import { useParams } from 'next/navigation';

export default function AboutPreview() {
    const params = useParams();
    const { templateId } = params;
    const templateConfig = templates[templateId];

    if (!templateConfig) {
        return <div className="p-10 text-center">Template not found</div>;
    }

    const AboutLayout = templateConfig.layouts?.about;

    if (!AboutLayout) {
        return (
            <div className="p-10 text-center text-red-500">
                This template does not have an About layout defined.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <AboutLayout
                content={{}}
                baseUrl={`/iframe-preview/${templateId}`}
            />
        </div>
    );
}
