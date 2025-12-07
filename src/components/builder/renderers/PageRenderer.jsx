import React from 'react';
import SectionRenderer from './SectionRenderer';
import styles from './PageRenderer.module.css';

/**
 * PageRenderer
 * The root component for the Page Builder Engine.
 * Takes the full page JSON structure and renders it.
 */
export default function PageRenderer({ pageData }) {
  if (!pageData || !pageData.sections) {
    return <div className={styles.emptyPage}>Empty Page or Invalid Data</div>;
  }

  return (
      <div className={styles.pageRoot}>
        {pageData.sections.map(section => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </div>
  );
}
