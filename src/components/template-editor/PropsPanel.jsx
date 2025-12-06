'use client';

import { NODE_TYPES, WIDGET_TYPES } from '@/components/builder/constants';

export default function PropsPanel({ block, templateId, onPropsChange }) {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (block && templateId) {
      console.log('[PropsPanel] Bloco selecionado:', block.type);
      const template = templates[templateId];
      
      // Mapeamento de Configuração para Widgets Atômicos
      const atomicConfigs = {
        [WIDGET_TYPES.TEXT]: { 
            name: 'Texto', 
            props: { 
                content: { type: 'string', label: 'Conteúdo' }, 
                align: { type: 'string', label: 'Alinhamento', default: 'left' }, 
                color: { type: 'string', label: 'Cor' },
                fontSize: { type: 'string', label: 'Tamanho da Fonte' }
            } 
        },
        [WIDGET_TYPES.HEADING]: { 
            name: 'Título', 
            props: { 
                text: { type: 'string', label: 'Texto' }, 
                tag: { type: 'string', label: 'Tag HTML (h1-h6)', default: 'h2' }, 
                align: { type: 'string', label: 'Alinhamento' }, 
                color: { type: 'string', label: 'Cor' } 
            } 
        },
        [WIDGET_TYPES.BUTTON]: { 
            name: 'Botão', 
            props: { 
                text: { type: 'string', label: 'Texto' }, 
                url: { type: 'string', label: 'URL' }, 
                variant: { type: 'string', label: 'Variante (primary, outline)', default: 'primary' },
                align: { type: 'string', label: 'Alinhamento' }
            } 
        },
        [WIDGET_TYPES.IMAGE]: {
            name: 'Imagem',
            props: {
                src: { type: 'string', label: 'URL da Imagem' },
                alt: { type: 'string', label: 'Alt Text' },
                width: { type: 'string', label: 'Largura', default: '100%' },
                borderRadius: { type: 'string', label: 'Arredondamento', default: '0px' },
                align: { type: 'string', label: 'Alinhamento', default: 'center' },
                caption: { type: 'string', label: 'Legenda' }
            }
        },
        [NODE_TYPES.CONTAINER]: { 
            name: 'Container', 
            props: { 
                width: { type: 'string', label: 'Largura', default: '100%' }, 
                padding: { type: 'string', label: 'Padding', default: '0px' }, 
                backgroundColor: { type: 'string', label: 'Cor de Fundo', default: 'transparent' },
                direction: { type: 'string', label: 'Direção (row/column)', default: 'column' },
                gap: { type: 'string', label: 'Espaçamento (Gap)', default: '10px' },
                alignItems: { type: 'string', label: 'Alinhamento Itens', default: 'start' }
            } 
        },
        [NODE_TYPES.SECTION]: {
            name: 'Seção',
            props: {
                padding: { type: 'string', label: 'Padding', default: '40px 0' },
                backgroundColor: { type: 'string', label: 'Cor de Fundo', default: '#ffffff' },
                backgroundImage: { type: 'string', label: 'Imagem de Fundo', default: 'none' }
            }
        }
      };

      if (atomicConfigs[block.type] || block.category === NODE_TYPES.CONTAINER || block.category === NODE_TYPES.SECTION) {
          // Se for um container ou seção atômica, usa a config apropriada
          if (block.category === NODE_TYPES.CONTAINER) setConfig(atomicConfigs[NODE_TYPES.CONTAINER]);
          else if (block.category === NODE_TYPES.SECTION) setConfig(atomicConfigs[NODE_TYPES.SECTION]);
          else setConfig(atomicConfigs[block.type]);
          return;
      }

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
