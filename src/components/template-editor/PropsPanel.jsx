'use client';

import React, { useEffect, useState } from 'react';
import templates from '@/templates-cms/registry';

export default function PropsPanel({ block, templateId, onPropsChange }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (block && templateId) {
      const template = templates[templateId];
      // Precisamos acessar a config do componente (cmsConfig)
      // Como vamos atualizar o registry para ter as seções, vamos assumir que podemos acessar:
      // template.sections[block.type].cmsConfig
      
      if (template && template.sections && template.sections[block.type]) {
        const Component = template.sections[block.type];
        setConfig(Component.cmsConfig || null);
      } else {
        setConfig(null);
      }
    } else {
      setConfig(null);
    }
  }, [block, templateId]);

  if (!block) {
    return (
      <div className="p-6 text-center text-gray-500 mt-10">
        <p>Selecione um bloco para editar suas propriedades</p>
      </div>
    );
  }

  const handleInputChange = (key, value) => {
    onPropsChange({ [key]: value });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Editar: {config?.name || block.type}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {!config ? (
          <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded">
            Este componente não possui configurações definidas (cmsConfig).
          </div>
        ) : (
          <div className="space-y-4">
            {config.props && Object.entries(config.props).map(([key, propConfig]) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {propConfig.label || key}
                </label>
                
                {propConfig.type === 'string' && (
                  <input
                    type="text"
                    value={block.props[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={propConfig.default || ''}
                  />
                )}
                
                {propConfig.type === 'image' && (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={block.props[key] || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="p-2 border border-gray-300 rounded text-sm"
                      placeholder="URL da imagem"
                    />
                    {block.props[key] && (
                      <div className="relative h-32 w-full rounded overflow-hidden border border-gray-200 bg-gray-100">
                        <img 
                          src={block.props[key]} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Adicionar outros tipos conforme necessário (number, boolean, color, etc) */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
