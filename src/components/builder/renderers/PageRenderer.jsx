import React from 'react';
import SectionRenderer from './SectionRenderer';

/**
 * PageRenderer
 * The root component for the Page Builder Engine.
 * Takes the full page JSON structure and renders it.
 */
export default function PageRenderer({ pageData }) {
  if (!pageData || !pageData.sections) {
    return <div className="p-10 text-center text-gray-500">Empty Page or Invalid Data</div>;
  }

  return (
      <div className="builder-page-root" style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {pageData.sections.map(section => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </div>
  );
}
