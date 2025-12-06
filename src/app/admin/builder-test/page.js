'use client';

import React from 'react';
import PageRenderer from '@/components/builder/renderers/PageRenderer';
import { NODE_TYPES, WIDGET_TYPES } from '@/components/builder/constants';

/**
 * MOCK DATA for the Atomic Page Builder
 * This structure represents what will be saved in the database.
 * 
 * Hierarchy:
 * Page
 *  └── Section (e.g., Hero)
 *       └── Container (e.g., Column 1)
 *            ├── Widget (Heading)
 *            ├── Widget (Text)
 *            └── Widget (Button)
 */
const mockPageData = {
  id: 'test-page-001',
  name: 'Page Builder Test',
  sections: [
    {
      id: 'section-hero',
      type: NODE_TYPES.SECTION,
      settings: {
        padding: '80px 20px',
        backgroundColor: '#f3f4f6'
      },
      containers: [
        {
          id: 'container-hero-content',
          type: NODE_TYPES.CONTAINER,
          settings: {
            width: '100%',
            direction: 'column',
            alignItems: 'center',
            gap: '20px'
          },
          widgets: [
            {
              id: 'widget-heading-1',
              type: WIDGET_TYPES.HEADING,
              settings: {
                text: 'Welcome to the New Page Builder',
                tag: 'h1',
                align: 'center',
                color: '#111827'
              }
            },
            {
              id: 'widget-text-1',
              type: WIDGET_TYPES.TEXT,
              settings: {
                content: 'This page is rendered entirely from a JSON object using our new recursive Atomic Rendering Engine. It demonstrates the flexibility of Sections, Containers, and Widgets.',
                align: 'center',
                fontSize: '1.2rem'
              }
            },
            {
              id: 'widget-button-1',
              type: WIDGET_TYPES.BUTTON,
              settings: {
                text: 'Get Started',
                variant: 'primary',
                align: 'center',
                url: '#'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'section-2',
      type: NODE_TYPES.SECTION,
      settings: {
        padding: '60px 20px',
        backgroundColor: '#ffffff'
      },
      containers: [
        {
          id: 'container-col-1',
          type: NODE_TYPES.CONTAINER,
          settings: {
            width: '50%',
            padding: '20px',
            backgroundColor: '#e5e7eb'
          },
          widgets: [
            {
              id: 'widget-heading-2',
              type: WIDGET_TYPES.HEADING,
              settings: { text: 'Column 1', tag: 'h3' }
            },
            {
              id: 'widget-text-2',
              type: WIDGET_TYPES.TEXT,
              settings: { content: 'This is the first column in a multi-column section.', fontSize: '0.9rem' }
            }
          ]
        },
        {
          id: 'container-col-2',
          type: NODE_TYPES.CONTAINER,
          settings: {
            width: '50%',
            padding: '20px',
            backgroundColor: '#d1d5db'
          },
          widgets: [
            {
              id: 'widget-heading-3',
              type: WIDGET_TYPES.HEADING,
              settings: { text: 'Column 2', tag: 'h3' }
            },
            {
              id: 'widget-text-3',
              type: WIDGET_TYPES.TEXT,
              settings: { content: 'This is the second column. Notice how we can control width and background color per container.', fontSize: '0.9rem' }
            }
          ]
        }
      ]
    }
  ]
};

export default function PageBuilderTest() {
  return (
    <div>
      <div style={{ padding: '20px', background: '#333', color: '#fff' }}>
        <h2>Page Builder Engine Test</h2>
        <p>Below is the rendered result of the Mock JSON Data.</p>
      </div>
      <PageRenderer pageData={mockPageData} />
    </div>
  );
}
