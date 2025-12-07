import React from 'react';
import WidgetRenderer from './WidgetRenderer';
import { useAtomValue } from 'jotai';
import { viewModeAtom } from '@/store/viewModeStore';
import { resolveResponsiveProp } from '@/store/viewModeStore';
import { Plus, FolderPlus, Settings, Trash2 } from 'lucide-react';

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
    gap: getProp('gap', '10px'),
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
    };
  } else {
    layoutStyle = {
      display: 'flex',
      flexDirection: getProp('direction', 'column'),
      flexWrap: getProp('wrap', 'nowrap'),
      alignItems: isEmpty ? 'center' : getProp('alignItems', 'flex-start'),
      justifyContent: isEmpty ? 'center' : getProp('justifyContent', 'flex-start'),
    };
  }

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

  const style = { ...containerStyle, ...layoutStyle };

  // If empty, render the Elementor-style placeholder
  if (isEmpty) {
    return (
      <div 
        data-container-id={id} 
        className="builder-container is-empty group"
        style={style}
      >
        <div 
          style={emptyPlaceholderStyle}
          className="hover:border-blue-400 hover:bg-blue-50/30"
        >
          {/* Action Icons Row */}
          <div className="flex items-center gap-2 mb-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-blue-600 transition-colors shadow-md">
              <Plus size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-blue-600 transition-colors shadow-md">
              <FolderPlus size={16} />
            </button>
          </div>
          {/* Text */}
          <span className="text-sm text-gray-400 font-medium">Arraste widget aqui</span>
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
