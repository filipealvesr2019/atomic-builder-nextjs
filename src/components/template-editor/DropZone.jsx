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
    container: block.category === NODE_TYPES.CONTAINER ? block : undefined,
    section: block.category === NODE_TYPES.SECTION ? block : undefined,
    onUpdateBlock: onUpdateBlock // Pass update function
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group mb-2 transition-all rounded-sm ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2 z-10' : 'hover:ring-1 hover:ring-blue-300 hover:bg-gray-50/50'
      } ${isOver ? 'border-b-4 border-blue-500' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(block);
      }}
    >
      {/* Action Overlay */}
      <div className={`absolute -top-3 right-2 z-20 flex items-center bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden transition-all ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
        <div 
          {...attributes} 
          {...listeners}
          className="p-1.5 cursor-grab hover:bg-gray-50 border-r border-gray-100 text-gray-500"
          title="Arrastar"
        >
          <GripVertical size={14} />
        </div>
        <span className="px-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{block.type}</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(block.id);
          }}
          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors border-l border-gray-100"
          title="Excluir"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Render Block Content */}
      <div className={isSelected ? "" : ""}>
        {BlockComponent ? (
          <BlockComponent {...componentProps}>
            {children}
          </BlockComponent>
        ) : (
          <div className="p-4 text-center bg-red-50 border border-red-200 text-red-600 rounded">
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
        // Actually, flexbox handles remaining space if we only set one?
        // Better: Adjust both to maintain ratio?
        // Simple approach: Update left child width. Flexbox 'grow' defaults might interfere.
        // We should ensure all children have explicit widths if we start resizing.
        
        // Safe update: Update both neighbors
        onUpdateBlock(leftChild.id, { width: `${newLeftWidth}%` });
        onUpdateBlock(rightChild.id, { width: `${newRightWidth}%` });
    };

    // If it's a Container or Section, render children
    if (block.children && (block.category === NODE_TYPES.CONTAINER || block.category === NODE_TYPES.SECTION)) {
        const isRow = block.props?.direction === 'row';

        return (
            <SortableBlock
                block={block}
                templateId={templateId}
                isSelected={selectedBlock?.id === block.id}
                onClick={onBlockClick}
                onDelete={onDeleteBlock}
                onUpdateBlock={onUpdateBlock}
            >
                {/* We need a min-height or padding to have a drop area if empty */}
                <div 
                    ref={parentRef}
                    style={{ 
                        minHeight: '50px', 
                        width: '100%', 
                        border: block.children.length === 0 ? '1px dashed #ccc' : 'none',
                        display: isRow ? 'flex' : 'block',
                        flexDirection: isRow ? 'row' : 'column'
                    }}
                >
                    <SortableContext 
                        items={block.children.map(c => c.id)} 
                        strategy={verticalListSortingStrategy}
                        id={block.id}
                    >
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
                </div>
            </SortableBlock>
        );
    }
    
    // ... (leaf node return)
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
      className={`min-h-full bg-white shadow-sm transition-colors ${isOver ? 'bg-blue-50 ring-2 ring-blue-300' : ''}`}
      style={{ minHeight: '400px' }}
    >
      {blocks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-300 m-8 rounded-lg bg-gray-50 text-gray-400 pointer-events-none">
          <p className="text-xl font-medium mb-2">Comece a construir</p>
          <p className="text-sm">Arraste layouts ou elementos da barra lateral para cá</p>
        </div>
      ) : (
        <div className="flex flex-col pb-20 p-4">
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
