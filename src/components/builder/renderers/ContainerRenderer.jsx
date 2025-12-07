import React from 'react';
import WidgetRenderer from './WidgetRenderer';
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';
import { Plus } from 'lucide-react';

export default function ContainerRenderer({ container, children }) {
  const viewMode = useAtomValue(viewModeAtom);

  if (!container) return null;

  const { settings, widgets = [], id } = container;
  
  // Revised getProp to be strictly generic
  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    
    // Explicitly allow empty string if that's what's passed (meaning 'auto' usually)
    // But for Flex props, we usually want explicit values.
    // If val is strictly undefined or null, use default.
    return val !== undefined && val !== null ? val : defaultValue;
  };

  // Resolve Values
  const direction = getProp('direction', 'column');
  const justifyContent = getProp('justifyContent', 'flex-start');
  const alignItems = getProp('alignItems', 'stretch');
  const width = getProp('width', '100%');
  const minHeight = getProp('minHeight', '350px');

  const flexStyles = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justifyContent,
    alignItems: alignItems,
    flexWrap: getProp('wrap', 'nowrap'),
    gap: getProp('gap', '10px'),
  };

  const boxStyles = {
    width: width,
    minHeight: minHeight,
    padding: getProp('padding', '20px'),
    backgroundColor: getProp('backgroundColor', 'transparent'),
    boxSizing: 'border-box',
    position: 'relative',
  };

  const isEmpty = !children && (!widgets || widgets.length === 0);

  // DEBUG LOG
  console.log(`[Container ${container.id}] Mode: ${viewMode}`);
  console.log(`-- AlignItems Raw:`, settings?.alignItems);
  console.log(`-- AlignItems Resolved:`, alignItems);
  console.log(`-- Styles:`, flexStyles);

  if (isEmpty) {
    return (
      <div 
        data-container-id={id}
        className="builder-container empty"
        style={{
          ...boxStyles,
          ...flexStyles,
          minHeight: '100px',
          border: '1px dashed #ccc',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Plus size={24} color="#ccc" />
        <span style={{ color: '#ccc', fontSize: '12px' }}>Container Vazio</span>
      </div>
    );
  }

  return (
    <div 
      data-container-id={id}
      className="builder-container"
      style={{
        ...boxStyles,
        ...flexStyles,
      }}
    >
      {children ? children : widgets.map(widget => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
