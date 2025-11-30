'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2 } from 'lucide-react';
import { getTemplate } from '@/templates-cms/registry'; // Note: This might fail on client side if registry uses fs
// We need a way to render the component. Since we are in app dir, we can't easily dynamically import from a variable path in client component without some setup.
// However, for this MVP, we might need to rely on a mapping or pass the component rendering logic differently.
// Actually, registry.js imports components directly, so it bundles them. It should work if registry.js doesn't use Node.js APIs.
// Let's check registry.js content again. It imports components. 
// BUT, `getTemplate` is not exported for client usage usually if it's not a pure JS file.
// Let's try to import it. If it fails, we'll need a different strategy (e.g. a mapping file safe for client).

// Workaround: Create a client-safe registry or mapping. 
// For now, let's assume we can import the registry if it doesn't use 'fs'.
// The previous view of registry.js showed it just imports components and exports an object. That is client-safe!

import templates from '@/templates-cms/registry';

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

  // Encontrar o componente correto para renderizar
  const templateConfig = templates[templateId];
  // O registry atual exporta layouts, mas precisamos das SEÇÕES individuais.
  // O registry.js atual NÃO exporta as seções individualmente, apenas o layout 'home'.
  // PRECISAREMOS ATUALIZAR O REGISTRY.JS para exportar as seções ou ter uma forma de acessá-las.
  
  // Por enquanto, vamos tentar carregar dinamicamente ou assumir que o layout exporta as seções?
  // Não, o layout é um componente funcional.
  
  // SOLUÇÃO: Vamos atualizar o registry.js para incluir 'sections' no objeto do template.
  // Mas primeiro, vamos fazer o código defensivo aqui.
  
  let BlockComponent = null;
  
  // Tentar encontrar a seção no templateConfig se estiver disponível
  if (templateConfig && templateConfig.sections && templateConfig.sections[block.type]) {
    BlockComponent = templateConfig.sections[block.type];
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group mb-4 border-2 transition-all ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-300'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(block);
      }}
    >
      {/* Handle de arraste e botões de ação */}
      <div className={`absolute top-0 right-0 z-10 flex items-center bg-white shadow-sm border rounded-bl-lg overflow-hidden ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
        <div 
          {...attributes} 
          {...listeners}
          className="p-2 cursor-move hover:bg-gray-100 border-r border-gray-200"
          title="Arrastar para reordenar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(block.id);
          }}
          className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700"
          title="Remover bloco"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Renderização do Bloco */}
      <div className="pointer-events-none"> {/* Desabilita interação interna para facilitar drag */}
        {BlockComponent ? (
          <BlockComponent {...block.props} />
        ) : (
          <div className="p-8 text-center bg-gray-100 border border-dashed border-gray-300 rounded">
            <p className="text-gray-500">Bloco: <strong>{block.type}</strong></p>
            <p className="text-xs text-gray-400">Componente não encontrado no registry</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DropZone({ blocks, templateId, selectedBlock, onBlockClick, onDeleteBlock }) {
  const { setNodeRef } = useSortable({ id: 'drop-zone' }); // Apenas para aceitar drops se necessário

  return (
    <div ref={setNodeRef} className="min-h-full p-4 pb-20">
      {blocks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-400">
          <p className="text-lg font-medium">Arraste blocos aqui</p>
          <p className="text-sm">Selecione blocos da biblioteca à esquerda</p>
        </div>
      ) : (
        blocks.map((block) => (
          <SortableBlock
            key={block.id}
            block={block}
            templateId={templateId}
            isSelected={selectedBlock?.id === block.id}
            onClick={onBlockClick}
            onDelete={onDeleteBlock}
          />
        ))
      )}
    </div>
  );
}
