'use client';

import { useState } from 'react';
import { 
  Type, 
  Image, 
  Square, 
  MousePointer2,
  Columns,
  Grid3x3,
  Layout,
  Box,
  Heading1,
  AlignLeft,
  LayoutGrid
} from 'lucide-react';
import styles from './EditorSidebar.module.css';

const ELEMENTS = [
  { id: 'text', name: 'Texto', icon: Type, type: 'text' },
  { id: 'heading', name: 'Título', icon: Heading1, type: 'text', props: { tag: 'h1' } },
  { id: 'paragraph', name: 'Parágrafo', icon: AlignLeft, type: 'text', props: { tag: 'p' } },
  { id: 'image', name: 'Imagem', icon: Image, type: 'image' },
  { id: 'button', name: 'Botão', icon: MousePointer2, type: 'button' },
  { id: 'spacer', name: 'Espaçador', icon: Square, type: 'spacer' },
];

const BLOCKS = [
  { id: 'header', name: 'Header', icon: Layout, type: 'container', props: { blockType: 'header' } },
  { id: 'footer', name: 'Footer', icon: Box, type: 'container', props: { blockType: 'footer' } },
  { id: 'card', name: 'Card', icon: Square, type: 'container', props: { blockType: 'card' } },
  { id: 'grid', name: 'Grid', icon: Grid3x3, type: 'container', props: { blockType: 'grid' } },
  { id: 'columns', name: 'Colunas', icon: Columns, type: 'container', props: { blockType: 'columns' } },
  { id: 'section', name: 'Seção', icon: LayoutGrid, type: 'container', props: { blockType: 'section' } },
];

export default function EditorSidebar({ onAddBlock }) {
  const [activeTab, setActiveTab] = useState('elements');

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: item.type,
      props: item.props || {},
      content: item.type === 'text' ? `Novo ${item.name}` : ''
    }));
  };

  const items = activeTab === 'elements' ? ELEMENTS : BLOCKS;

  return (
    <div className={styles.sidebar}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'elements' ? styles.active : ''}`}
          onClick={() => setActiveTab('elements')}
        >
          Elements
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'blocks' ? styles.active : ''}`}
          onClick={() => setActiveTab('blocks')}
        >
          Blocks
        </button>
      </div>

      <div className={styles.itemsGrid}>
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={styles.item}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={() => onAddBlock && onAddBlock(item.type, item.props)}
            >
              <div className={styles.iconWrapper}>
                <Icon size={24} />
              </div>
              <span className={styles.itemName}>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
