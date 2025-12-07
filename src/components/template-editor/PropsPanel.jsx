import React, { useState, useEffect } from 'react';
import { Monitor, Tablet, Smartphone, Globe, Laptop, Layout, Grid, AlignCenter, AlignLeft, AlignRight, AlignJustify, ArrowRight, ArrowDown } from 'lucide-react';
import { LAYOUT_TYPES, NODE_TYPES, WIDGET_TYPES } from '@/components/builder/constants';
import templates from '@/templates-cms/registry';

function ResponsiveControl({ label, value, onChange, placeholder, type = 'string', options = [] }) {
  const isResponsive = typeof value === 'object' && value !== null;

  const toggleResponsive = () => {
    if (isResponsive) {
      // Switch back to simple mode (keep desktop value)
      onChange(value.desktop || '');
    } else {
      // Switch to responsive mode
      const currentVal = value || '';
      onChange({ desktop: currentVal, tablet: currentVal, mobile: currentVal });
    }
  };

  const handleChange = (breakpoint, newValue) => {
    onChange({
      ...value,
      [breakpoint]: newValue
    });
  };

  const renderInput = (val, handleChangeCb) => {
    if (type === 'select') {
      return (
        <select
          value={val || ''}
          onChange={(e) => handleChangeCb(e.target.value)}
          className="w-full p-1.5 text-sm border border-gray-300 rounded focus:border-blue-500 outline-none bg-white"
        >
           {!val && <option value="" disabled>{placeholder || 'Select...'}</option>}
           {options.map(opt => (
             <option key={opt.value} value={opt.value}>{opt.label}</option>
           ))}
        </select>
      );
    }
    return (
      <input
        type="text"
        value={val || ''}
        onChange={(e) => handleChangeCb(e.target.value)}
        className="w-full p-1.5 text-sm border border-gray-300 rounded focus:border-blue-500 outline-none"
        placeholder={placeholder}
      />
    );
  };

  if (isResponsive) {
    return (
      <div className="flex flex-col gap-2 p-2 border border-blue-100 rounded bg-blue-50/30">
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <button 
                onClick={toggleResponsive}
                className="text-blue-600 p-1 hover:bg-blue-100 rounded"
                title="Switch to Simple Mode"
            >
                <Laptop size={14} />
            </button>
        </div>
        
        {/* Desktop */}
        <div className="flex items-center gap-2">
            <Monitor size={14} className="text-gray-400 min-w-[14px]" />
            <div className="flex-1">
              {renderInput(value.desktop, (val) => handleChange('desktop', val))}
            </div>
        </div>
        {/* Tablet */}
        <div className="flex items-center gap-2">
            <Tablet size={14} className="text-gray-400 min-w-[14px]" />
            <div className="flex-1">
              {renderInput(value.tablet, (val) => handleChange('tablet', val))}
            </div>
        </div>
        {/* Mobile */}
        <div className="flex items-center gap-2">
            <Smartphone size={14} className="text-gray-400 min-w-[14px]" />
            <div className="flex-1">
              {renderInput(value.mobile, (val) => handleChange('mobile', val))}
            </div>
        </div>
      </div>
    );
  }

  // Simple Mode
  return (
    <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <button 
                onClick={toggleResponsive}
                className="text-gray-400 p-1 hover:bg-gray-100 rounded hover:text-blue-600 transition-colors"
                title="Switch to Responsive Mode"
            >
                <Smartphone size={14} />
            </button>
        </div>
        {renderInput(value, onChange)}
    </div>
  );
}

export default function PropsPanel({ block, templateId, onPropsChange }) {
  const [config, setConfig] = useState(null);
  const [activeTab, setActiveTab] = useState('content'); // content (layout for containers), style, advanced

  useEffect(() => {
    if (block && templateId) {
      console.log('[PropsPanel] Bloco selecionado:', block.type);
      const template = templates[templateId];
      
      // Common Layout Props for all items (Flex/Grid Children)
      const commonLayoutProps = {
        _divider_layout: { type: 'divider', label: 'Layout Items' }, 
        width: { type: 'string', label: 'Width', default: '100%', tab: 'advanced' },
        flexGrow: { type: 'string', label: 'Flex Grow', default: '0', tab: 'advanced' },
        alignSelf: { 
            type: 'select', 
            label: 'Align Self', 
            default: 'auto',
            tab: 'advanced',
            options: [
                { label: 'Auto', value: 'auto' },
                { label: 'Start', value: 'flex-start' },
                { label: 'Center', value: 'center' },
                { label: 'End', value: 'flex-end' },
                { label: 'Stretch', value: 'stretch' }
            ]
        },
        gridColumn: { type: 'string', label: 'Grid Col (span)', default: 'auto', tab: 'advanced' },
        gridRow: { type: 'string', label: 'Grid Row (span)', default: 'auto', tab: 'advanced' }
      };

      // Mapeamento de Configuração para Widgets Atômicos
      const atomicConfigs = {
        [WIDGET_TYPES.TEXT]: { 
            name: 'Text', 
            props: { 
                content: { type: 'string', label: 'Content', tab: 'content' }, 
                align: { type: 'select', label: 'Alignment', default: 'left', tab: 'style', options: [{label:'Left', value:'left'}, {label:'Center', value:'center'}, {label:'Right', value:'right'}] }, 
                color: { type: 'string', label: 'Color', tab: 'style' },
                fontSize: { type: 'string', label: 'Font Size', tab: 'style' },
                ...commonLayoutProps
            } 
        },
        [WIDGET_TYPES.HEADING]: { 
            name: 'Heading', 
            props: { 
                text: { type: 'string', label: 'Text', tab: 'content' }, 
                tag: { type: 'select', label: 'HTML Tag', default: 'h2', tab: 'content', options: ['h1','h2','h3','h4','h5','h6'].map(h=>({label:h, value:h})) }, 
                align: { type: 'select', label: 'Alignment', tab: 'style', options: [{label:'Left', value:'left'}, {label:'Center', value:'center'}, {label:'Right', value:'right'}] }, 
                color: { type: 'string', label: 'Color', tab: 'style' },
                ...commonLayoutProps
            } 
        },
        [WIDGET_TYPES.BUTTON]: { 
            name: 'Button', 
            props: { 
                text: { type: 'string', label: 'Text', tab: 'content' }, 
                url: { type: 'string', label: 'URL', tab: 'content' }, 
                variant: { type: 'select', label: 'Variant', default: 'primary', tab: 'style', options: [{label:'Primary', value:'primary'}, {label:'Outline', value:'outline'}] },
                align: { type: 'select', label: 'Alignment', tab: 'style', options: [{label:'Left', value:'left'}, {label:'Center', value:'center'}, {label:'Right', value:'right'}] },
                ...commonLayoutProps
            } 
        },
        [WIDGET_TYPES.IMAGE]: {
            name: 'Image',
            props: {
                src: { type: 'string', label: 'Image URL', tab: 'content' },
                alt: { type: 'string', label: 'Alt Text', tab: 'content' },
                caption: { type: 'string', label: 'Caption', tab: 'content' },
                borderRadius: { type: 'string', label: 'Border Radius', default: '0px', tab: 'style' },
                align: { type: 'select', label: 'Alignment', default: 'center', tab: 'style', options: [{label:'Left', value:'left'}, {label:'Center', value:'center'}, {label:'Right', value:'right'}] },
                ...commonLayoutProps
            }
        },
        [WIDGET_TYPES.PRODUCT_LIST]: {
            name: 'Product List', 
            props: {
                limit: { type: 'string', label: 'Limit', default: '8', tab: 'content' },
                columns: { type: 'string', label: 'Columns', default: '4', tab: 'content' },
                showPrice: { type: 'select', label: 'Show Price', default: 'true', tab: 'content', options:[{label:'Yes', value:'true'},{label:'No', value:'false'}] },
                showButton: { type: 'select', label: 'Show Button', default: 'true', tab: 'content', options:[{label:'Yes', value:'true'},{label:'No', value:'false'}] },
                gap: { type: 'string', label: 'Gap', default: '20px', tab: 'style' },
                ...commonLayoutProps
            }
        },
        [NODE_TYPES.CONTAINER]: { 
            name: 'Container', 
            props: { 
                layoutType: { 
                    type: 'select', 
                    label: 'Layout Type', 
                    default: 'flex',
                    tab: 'content',
                    options: [
                        { label: 'Flexbox', value: 'flex' },
                        { label: 'Grid', value: 'grid' }
                    ]
                },
                width: { type: 'string', label: 'Content Width', default: '100%', tab: 'content' }, 
                minHeight: { type: 'string', label: 'Min Height', default: '50px', tab: 'content' },
                
                // Flex Props
                direction: { 
                    type: 'select', 
                    label: 'Direction', 
                    default: 'column', 
                    tab: 'content',
                    condition: (props) => props.layoutType !== 'grid',
                    options: [
                        { label: 'Row', value: 'row' },
                        { label: 'Column', value: 'column' },
                        { label: 'Row Reverse', value: 'row-reverse' },
                        { label: 'Column Reverse', value: 'column-reverse' }
                    ]
                },
                justifyContent: { 
                    type: 'select', 
                    label: 'Justify Content', 
                    default: 'flex-start',
                    tab: 'content',
                    condition: (props) => props.layoutType !== 'grid',
                    options: [
                        { label: 'Start', value: 'flex-start' },
                        { label: 'Center', value: 'center' },
                        { label: 'End', value: 'flex-end' },
                        { label: 'Space Between', value: 'space-between' },
                        { label: 'Space Around', value: 'space-around' },
                        { label: 'Space Evenly', value: 'space-evenly' }
                    ]
                },
                alignItems: { 
                    type: 'select', 
                    label: 'Align Items', 
                    default: 'flex-start',
                    tab: 'content',
                    condition: (props) => props.layoutType !== 'grid',
                    options: [
                        { label: 'Start', value: 'flex-start' },
                        { label: 'Center', value: 'center' },
                        { label: 'End', value: 'flex-end' },
                        { label: 'Stretch', value: 'stretch' }
                    ]
                },
                gap: { type: 'string', label: 'Gap', default: '10px', tab: 'content' },
                wrap: { 
                     type: 'select', 
                     label: 'Wrap', 
                     default: 'nowrap',
                     tab: 'content',
                     condition: (props) => props.layoutType !== 'grid',
                     options: [
                         { label: 'No Wrap', value: 'nowrap' },
                         { label: 'Wrap', value: 'wrap' }
                     ]
                },

                // Grid Props
                gridTemplateColumns: { 
                    type: 'string', 
                    label: 'Columns', 
                    default: '1fr',
                    tab: 'content',
                    condition: (props) => props.layoutType === 'grid'
                },
                gridTemplateRows: { 
                    type: 'string', 
                    label: 'Rows', 
                    default: 'auto',
                    tab: 'content',
                    condition: (props) => props.layoutType === 'grid'
                },

                // Style
                backgroundColor: { type: 'string', label: 'Background Color', default: 'transparent', tab: 'style' },
                padding: { type: 'string', label: 'Padding', default: '0px', tab: 'advanced' }, 
            } 
        },
        [NODE_TYPES.SECTION]: {
            name: 'Section',
            props: {
                padding: { type: 'string', label: 'Padding', default: '40px 0', tab: 'advanced' },
                backgroundColor: { type: 'string', label: 'Background Color', default: '#ffffff', tab: 'style' },
                backgroundImage: { type: 'string', label: 'Background Image', default: 'none', tab: 'style' }
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
        <p>Select a block to edit its properties</p>
      </div>
    );
  }

  const handleInputChange = (key, value) => {
    onPropsChange({ [key]: value });
  };

  const renderTabButton = (id, label, icon) => (
      <button
        onClick={() => setActiveTab(id)}
        className={`flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium border-b-2 transition-colors ${
            activeTab === id 
            ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
        }`}
      >
        {icon}
        <span className="mt-1">{label}</span>
      </button>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider truncate">
          {config?.name || block.type}
        </h2>
        <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
            {block.category || 'WIDGET'}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {renderTabButton('content', 'Layout', <Layout size={16} />)}
        {renderTabButton('style', 'Style', <Globe size={16} />)}
        {renderTabButton('advanced', 'Advanced', <Grid size={16} />)}
      </div>
      
      {/* Config Content */}
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        {!config ? (
          <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded">
             No settings definition found.
          </div>
        ) : (
          <div className="space-y-5">
            {config.props && Object.entries(config.props).map(([key, propConfig]) => {
              // 1. Filter by Tab
              // If prop has no tab defined, default to 'content'
              const propTab = propConfig.tab || 'content';
              if (propTab !== activeTab) return null;

              // 2. Check Conditions
              if (propConfig.condition && !propConfig.condition(block.props)) {
                return null;
              }

              // 3. Render Special Types (Divider)
              if (propConfig.type === 'divider') {
                  return (
                      <div key={key} className="pt-4 pb-2 border-b border-gray-100 mb-2">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{propConfig.label}</span>
                      </div>
                  );
              }

              // 4. Render Inputs
              return (
              <div key={key}>
                {(propConfig.type === 'string' || propConfig.type === 'select') && (
                  <ResponsiveControl
                    label={propConfig.label || key}
                    value={block.props[key]}
                    onChange={(val) => handleInputChange(key, val)}
                    placeholder={propConfig.default || ''}
                    options={propConfig.options} 
                    type={propConfig.type} 
                  />
                )}
                
                {propConfig.type === 'image' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">{propConfig.label || key}</label>
                    <div className="flex gap-2">
                        <input
                        type="text"
                        value={block.props[key] || ''}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded text-sm outline-none focus:border-blue-500"
                        placeholder="https://..."
                        />
                    </div>
                    {block.props[key] && (
                      <div className="relative h-24 w-full rounded overflow-hidden border border-gray-200 bg-gray-100 mt-1">
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
              </div>
            )})}
            
            {/* Empty State for Tab */}
            {config.props && !Object.entries(config.props).some(([k, p]) => (p.tab || 'content') === activeTab) && (
                <div className="text-center text-gray-400 py-8 text-sm italic">
                    No settings in this section.
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
