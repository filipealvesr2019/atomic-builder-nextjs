'use client';

import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, Image as ImageIcon, Square, Box, Layout } from 'lucide-react'; 
import styles from './BlockLibrary.module.css';
import { NODE_TYPES, WIDGET_TYPES } from '@/components/builder/constants';
import templates from '@/templates-cms/registry';

function DraggableLibraryItem({ id, title, icon: Icon, category }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `lib-${category}-${id}`, 
    data: { 
        type: id, 
        category: category,
        isLibraryItem: true 
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div 
      ref={setNodeRef} 
      {...listeners} 
      {...attributes} 
      className={styles.libraryItem}
      style={style}
    >
      <div className={styles.iconContainer}>
        {Icon && <Icon size={20} />}
      </div>
      <span className={styles.itemTitle}>{title}</span>
    </div>
  );
}

export default function BlockLibrary({ templateId }) {
  const [activeTab, setActiveTab] = useState('atomic'); // 'atomic' | 'sections'

  // Get current template config
  const currentTemplate = templateId ? templates[templateId] : null;
  const templateSections = currentTemplate ? Object.entries(currentTemplate.sections || {}) : [];

  const atomicBlocks = [
    { id: WIDGET_TYPES.HEADING, name: 'Heading', icon: Type, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.TEXT, name: 'Text', icon: Type, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.BUTTON, name: 'Button', icon: Square, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.IMAGE, name: 'Image', icon: ImageIcon, category: NODE_TYPES.WIDGET },
    { id: NODE_TYPES.CONTAINER, name: 'Container', icon: Box, category: NODE_TYPES.CONTAINER },
  ];

  return (
    <div className={styles.libraryContainer}>
      <h3 className={styles.libraryTitle}>Elements</h3>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`flex-1 py-2 text-sm font-medium ${activeTab === 'atomic' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('atomic')}
        >
          Basic
        </button>
        {templateSections.length > 0 && (
          <button
            className={`flex-1 py-2 text-sm font-medium ${activeTab === 'sections' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('sections')}
          >
            Sections
          </button>
        )}
      </div>

      <div className={styles.libraryGrid}>
        {activeTab === 'atomic' ? (
          atomicBlocks.map((block) => (
            <DraggableLibraryItem 
              key={block.id} 
              id={block.id} 
              title={block.name} 
              icon={block.icon} 
              category={block.category} 
            />
          ))
        ) : (
          templateSections.map(([key, Component]) => (
            <DraggableLibraryItem 
                key={key} 
                id={key} // ID used for type
                title={Component.cmsConfig?.name || key} 
                icon={Layout} 
                category={NODE_TYPES.SECTION} 
            />
          ))
        )}
      </div>
    </div>
  );
}
