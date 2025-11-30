'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import templates from '@/templates-cms/registry';

// --- Elementos Básicos (Simples para MVP) ---
const BasicText = ({ content, align = 'left', color = '#000' }) => (
  <div style={{ textAlign: align, color, padding: '1rem' }}>
    {content || 'Texto padrão. Clique para editar.'}
  </div>
);

const BasicImage = ({ src, alt, width = '100%' }) => (
  <div style={{ padding: '1rem' }}>
    <img 
      src={src || 'https://via.placeholder.com/400x200'} 
      alt={alt || 'Imagem'} 
      style={{ width, maxWidth: '100%', borderRadius: '4px' }} 
    />
  </div>
);

const BasicButton = ({ text, url, align = 'center', backgroundColor = '#2563eb', color = '#fff' }) => (
  <div style={{ textAlign: align, padding: '1rem' }}>
    <a 
      href={url || '#'} 
      style={{ 
        display: 'inline-block', 
        padding: '10px 20px', 
        backgroundColor, 
        color, 
        textDecoration: 'none', 
        borderRadius: '4px',
        fontWeight: '500'
      }}
    >
      {text || 'Clique Aqui'}
    </a>
  </div>
);

const BasicContainer = ({ children }) => (
  <div style={{ padding: '2rem', border: '1px dashed #ccc', minHeight: '100px' }}>
    {children || <p className="text-gray-400 text-center">Container Vazio</p>}
  </div>
);

const BasicSpacer = ({ height = '50px' }) => (
  <div style={{ height, background: 'transparent' }} />
);

// Mapeamento de elementos básicos
const BASIC_ELEMENTS = {
  text: BasicText,
  image: BasicImage,
  button: BasicButton,
  container: BasicContainer,
  spacer: BasicSpacer
};

function SortableBlock({ block, templateId, isSelected, onClick, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  let BlockComponent = null;

  // 1. Verificar se é um Elemento Básico
  if (BASIC_ELEMENTS[block.type]) {
    BlockComponent = BASIC_ELEMENTS[block.type];
  } 
  // 2. Verificar se é uma Seção do Template
  else {
    const templateConfig = templates[templateId];
    if (templateConfig && templateConfig.sections && templateConfig.sections[block.type]) {
      BlockComponent = templateConfig.sections[block.type];
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group mb-1 transition-all ${
        isSelected ? 'ring-2 ring-blue-500 z-10' : 'hover:ring-1 hover:ring-blue-300'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(block);
      }}
    >
      {/* Overlay de Ações (aparece no hover ou select) */}
      <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 flex items-center bg-blue-500 text-white rounded-full shadow-lg overflow-hidden transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} scale-75 hover:scale-100`}>
        <div 
          {...attributes} 
          {...listeners}
          className="p-1.5 cursor-move hover:bg-blue-600 border-r border-blue-400"
          title="Arrastar"
        >
          <GripVertical size={14} />
        </div>
        <span className="px-2 text-xs font-bold uppercase">{block.type}</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(block.id);
          }}
          className="p-1.5 hover:bg-red-500 transition-colors"
          title="Excluir"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Conteúdo do Bloco */}
      <div className={isSelected ? "" : "pointer-events-none"}>
        {BlockComponent ? (
          <BlockComponent {...block.props} />
        ) : (
          <div className="p-4 text-center bg-red-50 border border-red-200 text-red-600 rounded">
            Bloco desconhecido: {block.type}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DropZone({ blocks, templateId, selectedBlock, onBlockClick, onDeleteBlock }) {
  const { setNodeRef } = useSortable({ id: 'drop-zone' });

  return (
    <div ref={setNodeRef} className="min-h-full bg-white shadow-sm">
      {blocks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed border-gray-300 m-8 rounded-lg bg-gray-50 text-gray-400">
          <p className="text-xl font-medium mb-2">Comece a construir</p>
          <p className="text-sm">Arraste layouts ou elementos da barra lateral para cá</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              templateId={templateId}
              isSelected={selectedBlock?.id === block.id}
              onClick={onBlockClick}
              onDelete={onDeleteBlock}
            />
          ))}
        </div>
      )}
    </div>
  );
}
