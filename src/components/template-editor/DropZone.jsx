'use client';

import React from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import templates from '@/templates-cms/registry';
import { NODE_TYPES, WIDGET_TYPES } from '@/components/builder/constants';
import { getWidgetComponent } from '@/components/builder/WidgetRegistry';
import ContainerRenderer from '@/components/builder/renderers/ContainerRenderer';
import SectionRenderer from '@/components/builder/renderers/SectionRenderer';
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';
import styles from './DropZone.module.css';

function SortableBlock({ block, templateId, isSelected, onClick, onDelete, onUpdateBlock, parentDirection = 'column', children }) {
  const viewMode = useAtomValue(viewModeAtom);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
  } = useSortable({ id: block.id });

  // Resolve layout props for the wrapper
  const getProp = (key) => resolveResponsiveProp(block.props?.[key], viewMode);
  const width = getProp('width');
  const height = getProp('height'); // Added height
  const align = getProp('align');
  const alignSelf = getProp('alignSelf');
  
  // Layout & Spacing
  const margin = getProp('margin');
  const padding = getProp('padding');
  const zIndex = getProp('zIndex');

  // Background & Border
  const backgroundColor = getProp('backgroundColor');
  const backgroundImage = getProp('backgroundImage');
  const backgroundSize = getProp('backgroundSize');
  const backgroundPosition = getProp('backgroundPosition');
  const backgroundRepeat = getProp('backgroundRepeat');
  
  const border = getProp('border');
  const borderWidth = getProp('borderWidth');
  const borderStyle = getProp('borderStyle');
  const borderColor = getProp('borderColor');
  const borderRadius = getProp('borderRadius');
  const boxShadow = getProp('boxShadow');

  // Responsive Visibility
  const hideOnDesktop = block.props?.hideOnDesktop;
  const hideOnTablet = block.props?.hideOnTablet;
  const hideOnMobile = block.props?.hideOnMobile;

  const isHidden = (viewMode === 'desktop' && hideOnDesktop) ||
                   (viewMode === 'tablet' && hideOnTablet) ||
                   (viewMode === 'mobile' && hideOnMobile);

  // If hidden in current viewMode, render nothing (or a faint indicator in edit mode)
  // For editor, we might want to show a "hidden" indicator instead of null
  // For now, we'll just reduce opacity and show a label
  const hiddenStyle = isHidden ? { opacity: 0.3, pointerEvents: 'none' } : {};

  // Map align to alignSelf
  const alignMap = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end',
    'stretch': 'stretch'
  };

  // Determine alignment based on parent direction
  // If parent is Row, align-self controls VERTICAL axis, so we disable it to let alignItems work.
  const isColumn = parentDirection.includes('column');
  const finalAlignSelf = isColumn 
    ? (alignMap[align] || alignSelf || 'auto')
    : 'auto';

  // WIDGETS THAT HANDLE THEIR OWN STYLES (Padding/Background/Border)
  // For these, we pass the styles DOWN to the component and set 0 on the wrapper.
  const DELEGATED_STYLES_WIDGETS = ['button'];
  const shouldDelegate = DELEGATED_STYLES_WIDGETS.includes(block.type);

  // Split Styles:
  // 1. Layout & Positioning (Applied to Outer DND Wrapper)
  const outerStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: width || 'auto',
    height: height || 'auto', // Added height
    alignSelf: finalAlignSelf,
    maxWidth: '100%',
    margin: margin || '0px', // Margin ALWAYS stays on wrapper for spacing
    zIndex: zIndex || 'auto',
    position: 'relative',
    borderRadius: borderRadius || '0px', // Match radius for selection ring
  };

  // 2. Visual Box Model (Applied to Inner Styling Wrapper)
  const innerStyle = {
    display: 'flex', // Ensure it acts as a container
    flexDirection: 'column', 
    width: '100%',
    height: '100%',
    
    // If delegated, these should be transparent/0 on the wrapper
    padding: shouldDelegate ? '0px' : (padding || '0px'),
    backgroundColor: shouldDelegate ? 'transparent' : (backgroundColor || 'transparent'),
    backgroundImage: shouldDelegate ? 'none' : (backgroundImage ? `url(${backgroundImage})` : 'none'),
    backgroundSize: backgroundSize || 'cover',
    backgroundPosition: backgroundPosition || 'center',
    backgroundRepeat: backgroundRepeat || 'no-repeat',
    
    border: shouldDelegate ? 'none' : (border || 'none'),
    borderWidth: shouldDelegate ? '0px' : (borderWidth || (borderStyle && borderStyle !== 'none' ? '1px' : '0px')),
    borderStyle: shouldDelegate ? 'none' : (borderStyle || 'none'),
    borderColor: shouldDelegate ? 'transparent' : (borderColor || 'transparent'),
    borderRadius: borderRadius || '0px', // Wrapper always needs radius to clip correctly or match shape
    
    boxShadow: shouldDelegate ? 'none' : (boxShadow || 'none'),
    
    boxSizing: 'border-box'
  };

  let BlockComponent = null;

  // Determine which component to render
  if (block.category === NODE_TYPES.WIDGET) {
    BlockComponent = getWidgetComponent(block.type);
  } else if (block.category === NODE_TYPES.CONTAINER) {
    // For container, we use the ContainerRenderer but pass children (which are the DnD wrappers)
    BlockComponent = ContainerRenderer;
  } else if (block.category === NODE_TYPES.SECTION && block.type === 'section') { // Atomic Section
     BlockComponent = SectionRenderer;
  } else {
    // Legacy/Old Section-Blocks from Registry
    const templateConfig = templates[templateId];
    if (templateConfig && templateConfig.sections && templateConfig.sections[block.type]) {
      BlockComponent = templateConfig.sections[block.type];
    }
  }

  // Wrapper Props for atomic components
  // If delegated, we pass the REAL values. If NOT delegated, we override with 0/none.
  const overrideStyle = shouldDelegate ? {} : {
      padding: '0px',
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      border: 'none',
      borderWidth: '0px',
      borderRadius: '0px',
      boxShadow: 'none'
  };
  
  // Implicitly, if delegated, the component receives the original visual props from 'block.props'
  // But we still need to make sure we don't pass 'margin' down, as wrapper handles it.
  const overrides = {
      margin: '0px', // Margin always handled by wrapper
      ...overrideStyle
  };

  const componentProps = {
    id: block.id,
    settings: {
        ...block.props,
        ...overrides 
    }, 
    ...block.props,       // Legacy components expect spread props
    ...overrides,         // Legacy override
    
    container: block.category === NODE_TYPES.CONTAINER ? { ...block, settings: { ...block.props, ...overrides } } : undefined,
    section: block.category === NODE_TYPES.SECTION ? block : undefined,
    onUpdateBlock: onUpdateBlock // Pass update function
  };

  // Custom CSS Injection
  // We replace 'selector' with a unique ID targeting the wrapper
  // Note: We use data-block-id for robustness
  const customCss = block.props?.customCss || '';
  const uniqueClass = `block-${block.id}`;
  const parsedCss = customCss ? customCss.replace(/selector/g, `.${uniqueClass}`) : '';

  return (
    <div
      ref={setNodeRef}
      id={block.props?.cssId || undefined}
      style={{ ...outerStyle, ...hiddenStyle }}
      className={`${styles.blockWrapper} ${uniqueClass} ${block.props?.cssClasses || ''} ${
        isSelected ? styles.blockWrapperSelected : ''
      } ${isOver ? styles.blockWrapperOver : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(block);
      }}
    >
      {/* Inject Custom CSS */}
      {parsedCss && <style>{parsedCss}</style>}
      
      {/* Inner Visual Wrapper */}
      <div style={innerStyle} className="visual-wrapper">
          {/* Action Overlay */}
          <div className={styles.actionOverlay}>
            <div 
              {...attributes} 
              {...listeners}
              className={styles.dragHandle}
              title="Arrastar"
            >
              <GripVertical size={14} />
            </div>
            <span className={styles.blockType}>{block.type}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(block.id);
              }}
              className={styles.deleteButton}
              title="Excluir"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {/* Render Block Content */}
          <div style={{ display: 'contents' }}>
            {BlockComponent ? (
              <BlockComponent {...componentProps}>
                {children}
              </BlockComponent>
            ) : (
              <div className={styles.unknownBlock}>
                Unknown Block: {block.type}
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

// Recursive Block Renderer
import ResizeHandle from './ResizeHandle';

const BlockRenderer = ({ block, templateId, selectedBlock, onBlockClick, onDeleteBlock, onUpdateBlock, parentDirection = 'column' }) => {
    const viewMode = useAtomValue(viewModeAtom);
    const parentRef = React.useRef(null);

    // Resize Handler
    const handleResize = (index, deltaX) => {
        if (!parentRef.current) return;
        
        const leftChild = block.children[index];
        const rightChild = block.children[index + 1];
        
        const parentWidth = parentRef.current.offsetWidth;
        const deltaPercentage = (deltaX / parentWidth) * 100;
        
        // Helper to get numeric width
        const getWidth = (w) => parseFloat(w) || (100 / block.children.length); // Default to equal share if undefined

        let leftWidth = getWidth(leftChild.props.width);
        let rightWidth = getWidth(rightChild.props.width);
        
        const newLeftWidth = Math.max(5, Math.min(95, leftWidth + deltaPercentage)); // Min 5%, Max 95%
        const newRightWidth = Math.max(5, Math.min(95, rightWidth - deltaPercentage)); // Adjust right neighbor to keep total same?
        
        // Safe update: Update both neighbors
        onUpdateBlock(leftChild.id, { width: `${newLeftWidth}%` });
        onUpdateBlock(rightChild.id, { width: `${newRightWidth}%` });
    };

    // If it's a Container or Section, render children
    if (block.children && (block.category === NODE_TYPES.CONTAINER || block.category === NODE_TYPES.SECTION)) {
        const isRow = block.props?.direction === 'row';
        // Note: We removed the 'isEmpty' check here because ContainerRenderer handles it (rendering 'PlaceHere' etc).
        // Actually, for better UX, we might want to keep some placeholder logic, but it MUST NOT interfere with layout.
        // For now, let's keep it simple: Pass children to SortableBlock. ContainerRenderer will render them.

        return (
            <SortableBlock
                block={block}
                templateId={templateId}
            isSelected={selectedBlock?.id === block.id}
            onClick={onBlockClick}
            onDelete={onDeleteBlock}
            onUpdateBlock={onUpdateBlock}
            parentDirection={parentDirection}
        >
                {/* 
                   CRITICAL FIX: 
                   Removed the ghost wrapper 'div' that was here.
                   Now we directly render SortableContext.
                   This allows 'BlockComponent' (ContainerRenderer) in SortableBlock
                   to receive these children and apply its OWN styles (flex, align, etc.)
                   without being overridden by a parent div with hardcoded styles.
                */}
                 <SortableContext 
                    items={block.children.map(c => c.id)} 
                    strategy={verticalListSortingStrategy}
                    id={block.id}
                >
                    {/* 
                       We need a fragment or a display:contents div because SortableContext needs a parent? 
                       Actually SortableContext just provides context. The children are rendered below.
                       We map them directly.
                    */}
                    {block.children.map((child, index) => (
                        <React.Fragment key={child.id}>
                            <BlockRenderer 
                                block={child} 
                                templateId={templateId}
                                selectedBlock={selectedBlock}
                                onBlockClick={onBlockClick}
                                onDeleteBlock={onDeleteBlock}
                                onUpdateBlock={onUpdateBlock}
                                parentDirection={resolveResponsiveProp(block.props?.direction, viewMode) || 'column'}
                            />
                            {isRow && index < block.children.length - 1 && (
                                <ResizeHandle 
                                    leftBlockId={child.id}
                                    rightBlockId={block.children[index+1].id}
                                    onResize={(deltaX) => handleResize(index, deltaX)}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </SortableContext>
            </SortableBlock>
        );
    }
    
    // Leaf node return
    return (
        <SortableBlock
            block={block}
            templateId={templateId}
            isSelected={selectedBlock?.id === block.id}
            onClick={onBlockClick}
            onDelete={onDeleteBlock}
            onUpdateBlock={onUpdateBlock}
            parentDirection={parentDirection}
        />
    );
};


export default function DropZone({ blocks, templateId, selectedBlock, onBlockClick, onDeleteBlock, onUpdateBlock }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'drop-zone' });

  return (
    <div 
      ref={setNodeRef} 
      className={`${styles.dropZone} ${isOver ? styles.dropZoneOver : ''}`}
      style={{ minHeight: '400px' }}
    >
      {blocks.length === 0 ? (
        <div className={styles.emptyDropZone}>
          <p className={styles.emptyDropZoneTitle}>Comece a construir</p>
          <p className={styles.emptyDropZoneText}>Arraste layouts ou elementos da barra lateral para cá</p>
        </div>
      ) : (
        <div className={styles.dropZoneContent}>
          <SortableContext 
             items={blocks.map(b => b.id)} 
             strategy={verticalListSortingStrategy}
          >
            {blocks.map((block) => (
                <BlockRenderer
                key={block.id}
                block={block}
                templateId={templateId}
                selectedBlock={selectedBlock}
                onBlockClick={onBlockClick}
                onDeleteBlock={onDeleteBlock}
                onUpdateBlock={onUpdateBlock}
                />
            ))}
          </SortableContext>
        </div>
      )}
    </div>
  );
}
