import React from 'react';
import WidgetRenderer from './WidgetRenderer';
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';
import { Plus } from 'lucide-react';

export default function ContainerRenderer({ container, children }) {
  const viewMode = useAtomValue(viewModeAtom);

  if (!container) return null;

  const { settings, widgets = [], id } = container;
  
  // Revised getProp: defaults if value is empty string
  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    return val !== undefined && val !== null && val !== '' ? val : defaultValue;
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

  // Restore the "Visual Marking" that was lost from DropZone
  const visualStyles = {
    border: '1px dashed #e0e0e0',
    borderRadius: '4px',
    backgroundColor: 'rgba(250, 250, 250, 0.3)',
    transition: 'border-color 0.2s ease',
  };

  const boxStyles = {
    width: width,
    minHeight: minHeight,
    padding: getProp('padding', '20px'),
    boxSizing: 'border-box',
    position: 'relative',
    ...visualStyles // Apply the markings
  };

  const isEmpty = !children && (!widgets || widgets.length === 0);

  // DEBUG LOG
  console.log(`[Container ${container.id}]`);
  console.log(`-- Height applied:`, minHeight);

  if (isEmpty) {
    return (
      <div 
        data-container-id={id}
        className="builder-container empty"
        style={{
          ...boxStyles,
          ...flexStyles,
          minHeight: '100px', // Visual specific for empty drop target
          borderColor: '#ccc',
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
