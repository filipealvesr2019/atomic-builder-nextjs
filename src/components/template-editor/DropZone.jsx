'use client';

import React from 'react';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import templates from '@/templates-cms/registry';

// --- Elementos Básicos (Estilizados e Alinhados) ---
const BasicText = ({ content, align = 'left', color = '#1f2937' }) => (
  <div style={{ 
    width: '100%',
    padding: '20px 24px',
    textAlign: align, 
    color, 
    fontFamily: 'system-ui, -apple-system, sans-serif',
    lineHeight: '1.7',
    fontSize: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    marginBottom: '4px'
  }}>
    {content || 'Novo texto'}
  </div>
);

const BasicImage = ({ src, alt, width = '100%' }) => (
  <div style={{ 
    width: '100%',
    marginBottom: '4px'
  }}>
    {src ? (
      <img 
        src={src} 
        alt={alt || 'Imagem'} 
        style={{ 
          width: '100%', 
          height: 'auto',
          display: 'block',
          borderRadius: '4px',
          objectFit: 'cover'
        }} 
      />
    ) : (
      <div style={{ 
        width: '100%',
        height: '280px',
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#60a5fa'
      }}>
        <svg style={{ width: '48px', height: '48px', marginBottom: '12px', opacity: 0.6 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span style={{ fontSize: '13px', fontWeight: '500', color: '#3b82f6' }}>Imagem</span>
      </div>
    )}
  </div>
);

const BasicButton = ({ text, url, align = 'center', backgroundColor = '#2563eb', color = '#fff' }) => (
  <div style={{ 
    width: '100%',
    padding: '16px 24px',
    textAlign: align,
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    marginBottom: '4px'
  }}>
    <a 
      href={url || '#'} 
      style={{ 
        display: 'inline-block',
        padding: '12px 32px', 
        backgroundColor, 
        color, 
        textDecoration: 'none', 
        borderRadius: '6px',
        fontWeight: '600',
        fontSize: '15px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.2s'
      }}
    >
      {text || 'Botão'}
    </a>
  </div>
);

const BasicContainer = ({ children }) => (
  <div style={{ 
    width: '100%',
    padding: '32px', 
    border: '2px dashed #d1d5db',
    borderRadius: '8px',
    minHeight: '120px',
    backgroundColor: '#f9fafb',
    marginBottom: '4px'
  }}>
    {children || (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af',
        padding: '32px'
      }}>
        <svg style={{ width: '40px', height: '40px', marginBottom: '12px', opacity: 0.4 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>Arraste elementos aqui</p>
      </div>
    )}
  </div>
);

const BasicSpacer = ({ height = '40px' }) => (
  <div style={{ 
    height, 
    width: '100%',
    marginBottom: '4px',
    position: 'relative'
  }}>
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '24px',
      right: '24px',
      height: '1px',
      background: '#e5e7eb',
      transform: 'translateY(-50%)'
    }}></div>
  </div>
);

// Mapeamento de elementos básicos
const BASIC_ELEMENTS = {
  text: BasicText,
  image: BasicImage,
  button: BasicButton,
  container: BasicContainer,
  spacer: BasicSpacer
};

function SortableBlock({ block, templateId, isSelected, onClick, onDelete, children }) {
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

  if (BASIC_ELEMENTS[block.type]) {
    BlockComponent = BASIC_ELEMENTS[block.type];
  } else {
    const templateConfig = templates[templateId];
    if (templateConfig && templateConfig.sections && templateConfig.sections[block.type]) {
      BlockComponent = templateConfig.sections[block.type];
    }
  }

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
      {/* Overlay de Ações (Moderno) */}
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

      {/* Conteúdo do Bloco */}
      <div className={isSelected ? "" : ""}>
        {BlockComponent ? (
          <BlockComponent {...block.props}>
            {children}
          </BlockComponent>
        ) : (
          <div className="p-4 text-center bg-red-50 border border-red-200 text-red-600 rounded">
            Bloco desconhecido: {block.type}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente recursivo para renderizar blocos
const BlockRenderer = ({ block, templateId, selectedBlock, onBlockClick, onDeleteBlock }) => {
    // Se for um Container, precisa renderizar seus filhos
    if (block.type === 'container') {
        return (
            <SortableBlock
                block={block}
                templateId={templateId}
                isSelected={selectedBlock?.id === block.id}
                onClick={onBlockClick}
                onDelete={onDeleteBlock}
            >
                <div className="mt-2">
                    <SortableContext 
                        items={block.children ? block.children.map(c => c.id) : []} 
                        strategy={verticalListSortingStrategy}
                        id={block.id}
                    >
                        {block.children && block.children.length > 0 ? (
                            block.children.map(child => (
                                <BlockRenderer 
                                    key={child.id} 
                                    block={child} 
                                    templateId={templateId}
                                    selectedBlock={selectedBlock}
                                    onBlockClick={onBlockClick}
                                    onDeleteBlock={onDeleteBlock}
                                />
                            ))
                        ) : null}
                    </SortableContext>
                </div>
            </SortableBlock>
        );
    }

    return (
        <SortableBlock
            block={block}
            templateId={templateId}
            isSelected={selectedBlock?.id === block.id}
            onClick={onBlockClick}
            onDelete={onDeleteBlock}
        />
    );
};

export default function DropZone({ blocks, templateId, selectedBlock, onBlockClick, onDeleteBlock }) {
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
        <div className="flex flex-col pb-20">
          {blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              templateId={templateId}
              selectedBlock={selectedBlock}
              onBlockClick={onBlockClick}
              onDeleteBlock={onDeleteBlock}
            />
          ))}
        </div>
      )}
    </div>
  );
}
