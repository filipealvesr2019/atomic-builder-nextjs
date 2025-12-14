'use client';

import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import * as LucideIcons from 'lucide-react';
import { Type, Image as ImageIcon, Square, Box, Layout, ShoppingBag, Minus } from 'lucide-react';  
import styles from './BlockLibrary.module.css';
import { NODE_TYPES, WIDGET_TYPES } from '@/components/builder/constants';
import templates from '@/templates-cms/registry';
import { useAtom } from 'jotai';
import { languageAtom } from '@/atoms/languageAtom';
import { translations } from '@/locales/translations';

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
  const [language] = useAtom(languageAtom);
  const t = translations[language].editor;

  // Get current template config
  const currentTemplate = templateId ? templates[templateId] : null;
  const templateSections = currentTemplate ? Object.entries(currentTemplate.sections || {}) : [];

  const atomicBlocks = [
    { id: WIDGET_TYPES.HEADING, name: 'Heading', icon: Type, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.TEXT, name: 'Text Editor', icon: Type, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.BUTTON, name: 'Button', icon: Square, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.IMAGE, name: 'Image', icon: ImageIcon, category: NODE_TYPES.WIDGET },
    { id: NODE_TYPES.CONTAINER, name: 'Container', icon: Box, category: NODE_TYPES.CONTAINER },
    { id: WIDGET_TYPES.PRODUCT_LIST, name: 'Product List', icon: ShoppingBag, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.ICON_BOX, name: 'Icon Box', icon: LucideIcons.Star, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.ICON_LIST, name: 'Icon List', icon: LucideIcons.List, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.IMAGE_BOX, name: 'Image Box', icon: LucideIcons.Image, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.DIVIDER, name: 'Divider', icon: Minus, category: NODE_TYPES.WIDGET },
    { id: WIDGET_TYPES.SPACER, name: 'Spacer', icon: Square, category: NODE_TYPES.WIDGET },
  ];

  return (
    <div className={styles.libraryContainer}>
      <h3 className={styles.libraryTitle}>{t.elements}</h3>
      
      {/* Tabs */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'atomic' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('atomic')}
        >
          {t.basic}
        </button>
        {templateSections.length > 0 && (
          <button
            className={`${styles.tabButton} ${activeTab === 'sections' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('sections')}
          >
            {t.sections}
          </button>
        )}
      </div>

      <div className={styles.libraryGrid}>
        {activeTab === 'atomic' ? (
          atomicBlocks.map((block) => (
            <DraggableLibraryItem 
              key={block.id} 
              id={block.id} 
              title={t.blocks[block.id] || block.name} 
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
