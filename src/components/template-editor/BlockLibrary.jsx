'use client';

import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical, Plus } from 'lucide-react';

// Componente para um item arrastável da biblioteca
function DraggableLibraryItem({ id, label }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `lib-${id}`,
    data: { type: id }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className="p-3 mb-2 bg-white border border-gray-200 rounded cursor-move hover:border-blue-500 hover:shadow-sm flex items-center gap-2 transition-colors"
    >
      <GripVertical size={16} className="text-gray-400" />
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <Plus size={16} className="ml-auto text-gray-400" />
    </div>
  );
}

export default function BlockLibrary({ templateId }) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Carregar seções disponíveis do template
    // Como não temos acesso direto ao registry aqui (client-side), 
    // idealmente teríamos uma API para isso ou passaríamos via props do server component.
    // Por enquanto, vamos tentar inferir ou usar uma lista hardcoded para os demos conhecidos
    // ou fazer um fetch para uma API que retorna os metadados do template.
    
    // Simulação baseada no templateId
    const loadSections = () => {
      let availableSections = [];
      
      if (templateId === 'rustic-store-cms') {
        availableSections = [
          { id: 'hero', name: 'Hero Section' },
          { id: 'products', name: 'Products Grid' },
          { id: 'about', name: 'About Section' },
          { id: 'newsletter', name: 'Newsletter' },
          { id: 'contact', name: 'Contact' }
        ];
      } else if (templateId === 'minimal-business') {
        availableSections = [
          { id: 'hero', name: 'Hero Section' },
          { id: 'features', name: 'Features' },
          { id: 'footer', name: 'Footer' }
        ];
      } else if (templateId === 'business-theme-cms') {
        availableSections = [
          { id: 'hero', name: 'Hero Section' },
          { id: 'features', name: 'Features' },
          { id: 'contact', name: 'Contact' }
        ];
      }

      setSections(availableSections);
    };

    loadSections();
  }, [templateId]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Blocos</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {sections.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">Nenhum bloco disponível</p>
        ) : (
          sections.map(section => (
            <DraggableLibraryItem key={section.id} id={section.id} label={section.name} />
          ))
        )}
      </div>
    </div>
  );
}
