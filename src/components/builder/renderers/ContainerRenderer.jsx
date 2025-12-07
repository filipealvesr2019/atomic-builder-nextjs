import React from 'react';
import WidgetRenderer from './WidgetRenderer';
import { useAtomValue } from 'jotai';
import { viewModeAtom } from '@/store/viewModeStore';
import { resolveResponsiveProp } from '@/store/viewModeStore';
import { Plus, FolderPlus, Settings, Trash2 } from 'lucide-react';
import styles from './ContainerRenderer.module.css';

/**
 * ContainerRenderer
 * Renders a container (Flexbox or Grid) with Elementor-style visual cues.
 */
export default function ContainerRenderer({ container, children }) {
  const viewMode = useAtomValue(viewModeAtom);

  if (!container) return null;

  const { settings, widgets = [], id } = container;

  const getProp = (key, fallback) => {
    return resolveResponsiveProp(settings?.[key], viewMode) || fallback;
  };

  const layoutType = getProp('layoutType', 'flex');

  // Check if empty (no children passed from DnD wrapper and no widgets)
  const isEmpty = !children && (!widgets || widgets.length === 0);

  // Base Container Styles
  const containerStyle = {
    width: getProp('width', '100%'),
    minHeight: isEmpty ? '120px' : getProp('minHeight', '50px'),
    padding: getProp('padding', '20px'),
    backgroundColor: getProp('backgroundColor', 'transparent'),
    backgroundImage: getProp('backgroundImage'),
    backgroundSize: getProp('backgroundSize', 'cover'),
    backgroundPosition: getProp('backgroundPosition', 'center'),
    boxSizing: 'border-box',
    textAlign: getProp('textAlign', 'left'),
    position: 'relative',
  };

  // Layout Styles (Flex or Grid)
  let layoutStyle = {};
  if (layoutType === 'grid') {
    layoutStyle = {
      display: 'grid',
      gridTemplateColumns: getProp('gridTemplateColumns', '1fr'),
      gridTemplateRows: getProp('gridTemplateRows', 'auto'),
      gap: getProp('gap', '10px'),
    };
  } else {
    layoutStyle = {
      display: 'flex',
      flexDirection: getProp('direction', 'column'),
      flexWrap: getProp('wrap', 'nowrap'),
      alignItems: isEmpty ? 'center' : getProp('alignItems', 'flex-start'),
      justifyContent: isEmpty ? 'center' : getProp('justifyContent', 'flex-start'),
      gap: getProp('gap', '10px'),
    };
  }

  // Merge Styles
  const style = { ...containerStyle, ...layoutStyle };

  // Empty Placeholder Style (Elementor-like)
  const emptyPlaceholderStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: '100px',
    border: '2px dashed #d0d5dd',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  // If empty, render the Elementor-style placeholder
  if (isEmpty) {
    return (
      <div 
        data-container-id={id} 
        className="builder-container is-empty"
        style={style}
      >
        <div 
          style={emptyPlaceholderStyle}
          className={styles.emptyPlaceholder}
        >
          {/* Action Icons Row */}
          <div className={styles.actionRow}>
            <button className={styles.actionButton}>
              <Plus size={18} />
            </button>
            <button className={styles.actionButton}>
              <FolderPlus size={16} />
            </button>
          </div>
          {/* Text */}
          <span className={styles.placeholderText}>Arraste widget aqui</span>
        </div>
      </div>
    );
  }

  // If has content, render normally
  return (
    <div 
      data-container-id={id} 
      className="builder-container"
      style={style}
    >
      {children ? children : widgets.map(widget => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
