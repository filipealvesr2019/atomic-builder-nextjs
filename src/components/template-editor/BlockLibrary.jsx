'use client';

import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical, Plus, Type, Image as ImageIcon, Box, Layout, Square } from 'lucide-react';

// Componente para um item arrastável da biblioteca
function DraggableLibraryItem({ id, label, icon: Icon, type }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `lib-${type}-${id}`, // Ex: lib-element-text ou lib-section-hero
    data: { type: id, category: type }
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
      className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded cursor-move hover:border-blue-500 hover:shadow-md transition-all text-center gap-2 h-24"
    >
      {Icon && <Icon size={24} className="text-gray-600" />}
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
}

export default function BlockLibrary({ templateId }) {
  const [activeTab, setActiveTab] = useState('elements'); // 'elements' | 'layouts'
  const [sections, setSections] = useState([]);

  // Elementos básicos estáticos
  const basicElements = [
    { id: 'text', name: 'Texto', icon: Type },
    { id: 'image', name: 'Imagem', icon: ImageIcon },
    { id: 'button', name: 'Botão', icon: Square },
    { id: 'container', name: 'Container', icon: Box },
    { id: 'spacer', name: 'Espaçador', icon: Layout },
  ];

  useEffect(() => {
    // Carregar seções do template (Layouts)
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
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Abas */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
            activeTab === 'elements' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('elements')}
        >
          Elementos
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
            activeTab === 'layouts' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('layouts')}
        >
          Layouts
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="grid grid-cols-2 gap-3">
          {activeTab === 'elements' ? (
            basicElements.map(el => (
              <DraggableLibraryItem 
                key={el.id} 
                id={el.id} 
                label={el.name} 
                icon={el.icon} 
                type="element"
              />
            ))
          ) : (
            sections.length === 0 ? (
              <p className="col-span-2 text-sm text-gray-500 text-center py-4">
                Nenhum layout disponível para este tema.
              </p>
            ) : (
              sections.map(section => (
                <DraggableLibraryItem 
                  key={section.id} 
                  id={section.id} 
                  label={section.name} 
                  icon={Layout}
                  type="section"
                />
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}
