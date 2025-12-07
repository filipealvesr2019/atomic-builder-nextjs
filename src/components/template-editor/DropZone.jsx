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
import styles from './DropZone.module.css';

function SortableBlock({ block, templateId, isSelected, onClick, onDelete, onUpdateBlock, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isOver,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
  const componentProps = {
    id: block.id,
    settings: block.props, // Atomic components expect 'settings'
    ...block.props,       // Legacy components expect spread props
    container: block.category === NODE_TYPES.CONTAINER ? { ...block, settings: block.props } : undefined,
    section: block.category === NODE_TYPES.SECTION ? block : undefined,
    onUpdateBlock: onUpdateBlock // Pass update function
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.blockWrapper} ${
        isSelected ? styles.blockWrapperSelected : ''
      } ${isOver ? styles.blockWrapperOver : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(block);
      }}
    >
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
      <div>
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
  );
}

// Recursive Block Renderer
import ResizeHandle from './ResizeHandle';

const BlockRenderer = ({ block, templateId, selectedBlock, onBlockClick, onDeleteBlock, onUpdateBlock }) => {
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
