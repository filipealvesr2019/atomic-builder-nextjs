import React from 'react';
import { useDroppable } from '@dnd-kit/core';
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
  const layoutType = getProp('layoutType', 'flex'); // 'flex' | 'grid'
  
  // Flex Props
  const direction = getProp('direction', 'column');
  const justifyContent = getProp('justifyContent', 'flex-start');
  const alignItems = getProp('alignItems', 'center');
  
  // Grid Props
  let gridColumns = getProp('gridTemplateColumns', '1fr');
  const gridRows = getProp('gridTemplateRows', 'auto');
  const gridGap = getProp('gap', '10px');
  const gridJustifyItems = getProp('justifyItems', 'stretch');
  const gridAlignItems = getProp('alignItems', 'stretch');

  // Smart Grid Logic: If user provides a raw number (e.g. "3") for columns, convert to repeat(3, 1fr)
  if (layoutType === 'grid' && gridColumns && !isNaN(gridColumns)) {
      gridColumns = `repeat(${gridColumns}, 1fr)`;
  }

  const width = getProp('width', '100%');
  const minHeight = getProp('minHeight', '350px');

  // Base Styles
  const baseStyles = {
    display: layoutType === 'grid' ? 'grid' : 'flex',
    gap: getProp('gap', '10px'),
  };

  // Conditional Styles
  let layoutStyles = {};

  if (layoutType === 'grid') {
      layoutStyles = {
          ...baseStyles,
          gridTemplateColumns: gridColumns,
          gridTemplateRows: gridRows,
          justifyItems: gridJustifyItems,
          alignItems: gridAlignItems,
      };
  } else {
      // Flex Defaults
      layoutStyles = {
          ...baseStyles,
          flexDirection: direction,
          justifyContent: justifyContent,
          alignItems: alignItems,
          flexWrap: getProp('wrap', 'nowrap'),
      };
  }

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

  const { setNodeRef, isOver } = useDroppable({
    id: `temp-drop-${container.id}`,
    disabled: !isEmpty, // Only active when empty
  });

  if (isEmpty) {
    return (
      <div 
        data-container-id={id}
        className="builder-container empty"
        style={{
          ...boxStyles,
          ...layoutStyles,
          minHeight: '100px', // Visual specific for empty drop target
          borderColor: isOver ? '#2196f3' : '#ccc', // Visual feedback
          backgroundColor: isOver ? 'rgba(33, 150, 243, 0.1)' : boxStyles.backgroundColor,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* The droppable target is THIS inner area */}
        <div 
            ref={setNodeRef}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        >
            <Plus size={24} color={isOver ? '#2196f3' : '#ccc'} />
            <span style={{ color: isOver ? '#2196f3' : '#ccc', fontSize: '12px', marginTop: '8px' }}>
                Arraste aqui para aninhar
            </span>
        </div>
      </div>
    );
  }

  // Append Zone Droppable
  const { setNodeRef: setAppendRef, isOver: isAppendOver } = useDroppable({
    id: `append-zone-${container.id}`,
    disabled: isEmpty, // Only needed when NOT empty (empty handles it via temp-drop)
  });

  return (
    <div 
      data-container-id={id}
      className="builder-container"
      style={{
        ...boxStyles,
        ...layoutStyles,
        position: 'relative', // Ensure relative positioning for absolute overlays if needed
      }}
    >
      {children ? children : widgets.map(widget => (
        <WidgetRenderer key={widget.id} widget={widget} parentDirection={direction} />
      ))}
      
      {/* Append Zone - Always available at the end */}
      {!isEmpty && (
        <div
            ref={setAppendRef}
            className="append-zone"
            style={{
                flexShrink: 0, // Prevent shrinking
                width: direction === 'row' ? '20px' : '100%',
                height: direction === 'row' ? 'auto' : '20px',
                minWidth: '20px',
                minHeight: '20px',
                margin: '4px',
                borderRadius: '4px',
                border: '1px dashed transparent',
                backgroundColor: isAppendOver ? 'rgba(33, 150, 243, 0.2)' : 'transparent',
                borderColor: isAppendOver ? '#2196f3' : 'transparent',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'copy'
            }}
            title="Adicionar ao final"
        >
             {isAppendOver && <Plus size={14} color="#2196f3" />}
        </div>
      )}
    </div>
  );
}
