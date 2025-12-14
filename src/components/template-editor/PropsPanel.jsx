import React, { useState, useEffect } from 'react';
import { 
  Monitor, Tablet, Smartphone, 
  Layout, Circle, Settings, Palette,
  ArrowRight, ArrowDown, ArrowLeft, ArrowUp,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal,
  Columns, Rows, ChevronDown, ChevronRight
} from 'lucide-react';
import { NODE_TYPES, WIDGET_TYPES } from '@/components/builder/constants';
import templates from '@/templates-cms/registry';
import styles from './PropsPanel.module.css';
import { useAtomValue } from 'jotai';
import { viewModeAtom } from '@/store/viewModeStore';
import Repeater from './Repeater';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Icon Button Group Component (for Direction, Justify, Align)
function IconButtonGroup({ label, value, onChange, options, activeViewMode }) {
  const isResponsive = activeViewMode !== 'desktop';
  return (
    <div className={styles.iconButtonGroup}>
      <div className={styles.formLabel}>
        <span className={styles.labelText}>{label}</span>
        <button className={`${styles.responsiveButton} ${isResponsive ? styles.responsiveActive : ''}`}>
           {activeViewMode === 'mobile' ? <Smartphone size={14} /> : activeViewMode === 'tablet' ? <Tablet size={14} /> : <Monitor size={14} />}
        </button>
      </div>
      <div className={styles.iconButtonContainer}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`${styles.iconButton} ${value === opt.value ? styles.iconButtonActive : ''}`}
            title={opt.label}
          >
            {opt.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

// Styled Select Component
function StyledSelect({ label, value, onChange, options, responsive = true, activeViewMode = 'desktop' }) {
  const isResponsive = responsive && activeViewMode !== 'desktop';
  return (
    <div className={styles.formGroup}>
      <div className={styles.formLabel}>
        <span className={styles.labelText}>{label}</span>
        {responsive && (
          <button className={`${styles.responsiveButton} ${isResponsive ? styles.responsiveActive : ''}`}>
             {activeViewMode === 'mobile' ? <Smartphone size={14} /> : activeViewMode === 'tablet' ? <Tablet size={14} /> : <Monitor size={14} />}
          </button>
        )}
      </div>
      <div className={styles.selectWrapper}>
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={styles.select}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={16} className={styles.selectIcon} />
      </div>
    </div>
  );
}

// Styled Input Component
function StyledInput({ label, value, onChange, placeholder, unit = '', responsive = true, activeViewMode = 'desktop' }) {
  const isResponsive = responsive && activeViewMode !== 'desktop';
  return (
    <div className={styles.formGroup}>
      <div className={styles.formLabel}>
        <span className={styles.labelText}>{label}</span>
        {responsive && (
          <button className={`${styles.responsiveButton} ${isResponsive ? styles.responsiveActive : ''}`}>
             {activeViewMode === 'mobile' ? <Smartphone size={14} /> : activeViewMode === 'tablet' ? <Tablet size={14} /> : <Monitor size={14} />}
          </button>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
        />
        {unit && (
          <span className={styles.inputUnit}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

// Collapsible Section Component
function Section({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className={styles.section}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={styles.sectionHeader}
      >
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span className={styles.sectionTitle}>{title}</span>
      </button>
      {isOpen && (
        <div className={styles.sectionContent}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function PropsPanel({ block, templateId, onPropsChange, pages = [] }) {
  const [config, setConfig] = useState(null);
  const [activeTab, setActiveTab] = useState('layout');
  const viewMode = useAtomValue(viewModeAtom);

  useEffect(() => {
    if (block && templateId) {
      const template = templates[templateId];
      
      // 1. Check for Custom Template Component Config FIRST
      if (template && template.sections && template.sections[block.type]) {
        const Component = template.sections[block.type];
        if (Component.cmsConfig) {
            setConfig(Component.cmsConfig);
            return; // Found specific config, stop here
        }
      }

      // 2. Fallback to Atomic/Generic Configs
      const atomicConfigs = {
        [WIDGET_TYPES.TEXT]: { name: 'Text', props: {} },
        [WIDGET_TYPES.HEADING]: { name: 'Heading', props: {} },
        [WIDGET_TYPES.BUTTON]: { name: 'Button', props: {} },
        [WIDGET_TYPES.IMAGE]: { name: 'Image', props: {} },
        [WIDGET_TYPES.PRODUCT_LIST]: { name: 'Product List', props: {} },
        [WIDGET_TYPES.ICON_BOX]: { name: 'Icon Box', props: {} },
        [WIDGET_TYPES.ICON_LIST]: { name: 'Icon List', props: {} },
        [WIDGET_TYPES.IMAGE_BOX]: { name: 'Image Box', props: {} },
        [NODE_TYPES.CONTAINER]: { name: 'Container', props: {} },
        [NODE_TYPES.SECTION]: { name: 'Section', props: {} }
      };

      if (atomicConfigs[block.type] || block.category === NODE_TYPES.CONTAINER || block.category === NODE_TYPES.SECTION) {
        if (block.category === NODE_TYPES.CONTAINER) setConfig(atomicConfigs[NODE_TYPES.CONTAINER]);
        else if (block.category === NODE_TYPES.SECTION) setConfig(atomicConfigs[NODE_TYPES.SECTION]);
        else setConfig(atomicConfigs[block.type]);
        return;
      }

      setConfig(null);
    } else {
      setConfig(null);
    }
  }, [block, templateId]);

  if (!block) {
    return (
      <div className={styles.emptyState}>
        Selecione um elemento
      </div>
    );
  }

  const handleChange = (key, value) => {
    const currentProp = block.props?.[key];
    let newValue = value;

    if (viewMode !== 'desktop') {
        // Modo responsivo (tablet/mobile)
        if (typeof currentProp === 'object' && currentProp !== null && !Array.isArray(currentProp) && !Array.isArray(value)) {
            newValue = { ...currentProp, [viewMode]: value };
        } else {
            // Tenta preservar valor anterior como desktop se existia, senão usa o value
            const desktopValue = currentProp !== undefined ? currentProp : value; 
            newValue = { desktop: desktopValue, [viewMode]: value };
            
            // Special case: If value is active array, we might want to override behavior? 
            // For now, let's just ensure if it's an array we treat it as non-responsive or handle it carefully.
            // Actually, for this specific bug fix:
            if (Array.isArray(value)) {
                 newValue = value; // Force array to be pure array, disabling responsive arrays for now to fix corruption
            }
        }
    } else {
         // Modo Desktop
         // If it's an array, we overwrite. If it's an object (and not array), we merge.
         if (typeof currentProp === 'object' && currentProp !== null && !Array.isArray(currentProp) && !Array.isArray(value)) {
            newValue = { ...currentProp, desktop: value };
         } else {
            newValue = value;
         }
    }
    onPropsChange({ [key]: newValue });
  };

  // Helper para ler valor responsivo (visualização)
  const getValue = (key, defaultVal) => {
    const val = block.props?.[key];
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        // Fallback hierarchy: current mode -> desktop -> default
        return val[viewMode] || val.desktop || defaultVal;
    }
    return val !== undefined ? val : defaultVal;
  };

  const isContainer = block.category === NODE_TYPES.CONTAINER;

  // Helpers for Dynamic Logic
  const currentDirection = getValue('direction', 'column') || 'column';
  const isRow = currentDirection.includes('row');

  // Tab Button
  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`${styles.tabButton} ${activeTab === id ? styles.tabButtonActive : ''}`}
    >
      <Icon size={20} className={styles.tabIcon} />
      <span className={styles.tabLabel}>{label}</span>
    </button>
  );

  // Dynamic Renderer
  const renderDynamicControl = (key, propConfig) => {
      const value = getValue(key, propConfig.default || '');
      
      if (propConfig.type === 'string') {
          return (
            <StyledInput
                key={key}
                label={propConfig.label || key}
                value={value}
                onChange={(val) => handleChange(key, val)}
                responsive={propConfig.responsive}
                activeViewMode={viewMode}
                multiline={propConfig.multiline} // Support textarea
            />
          );
      }
      
      if (propConfig.type === 'array') {
          return (
            <Repeater
                key={key}
                label={propConfig.label || key}
                items={value || []}
                onChange={(newItems) => handleChange(key, newItems)}
                defaultItem={propConfig.defaultItem || { text: 'New Item', url: '#' }}
                renderItem={(item, index, onChangeItem) => (
                    <div className={styles.formGroup}>
                        {propConfig.itemSchema?.text && (
                            <input 
                                className={styles.input} 
                                value={item.text || ''} 
                                onChange={(e) => onChangeItem({ text: e.target.value })}
                                placeholder={propConfig.itemSchema.text.label || "Text"}
                                style={{ marginBottom: '8px' }}
                            />
                        )}
                        {propConfig.itemSchema?.url && (
                             <div className={styles.formGroup}>
                                <label className={styles.labelText} style={{ fontSize: '11px', color: '#6b7280' }}>
                                    {propConfig.itemSchema.url.label || "Link Destination"}
                                </label>
                                <div className={styles.selectWrapper} style={{ display: 'flex', gap: '8px' }}>
                                    <select 
                                        className={styles.select}
                                        value={item.url && item.url.startsWith('?page=') ? item.url.replace('?page=', '') : 'custom'}
                                        onChange={(e) => {
                                            if (e.target.value === 'custom') onChangeItem({ url: '' });
                                            else onChangeItem({ url: `?page=${e.target.value}` });
                                        }}
                                        style={{ width: '35%', minWidth: '110px' }}
                                    >
                                        <option value="custom">Custom URL</option>
                                        <optgroup label="Pages">
                                            {pages.map(p => (
                                                <option key={p.slug} value={p.slug}>{p.name}</option>
                                            ))}
                                        </optgroup>
                                    </select>
                                    {(!item.url || !item.url.startsWith('?page=')) && (
                                        <input 
                                            className={styles.input}
                                            value={item.url || ''}
                                            onChange={(e) => onChangeItem({ url: e.target.value })}
                                            placeholder="https://example.com"
                                            style={{ flex: 1 }}
                                        />
                                    )}
                                    {item.url && item.url.startsWith('?page=') && (
                                         <div className={styles.inputUnit} style={{ flex: 1, justifyContent: 'flex-start', background: '#eff6ff', color: '#3b82f6', border: '1px solid #bfdbfe' }}>
                                            Internal Page
                                         </div>
                                    )}
                                </div>
                             </div>
                        )}
                    </div>
                )}
            />
          );
      }
      return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <TabButton id="layout" icon={Layout} label="Layout" />
        <TabButton id="style" icon={Palette} label="Style" />
        <TabButton id="advanced" icon={Settings} label="Advanced" />
      </div>

      <div className={styles.content}>
  
        {activeTab === 'layout' && isContainer && (
          <>
            {/* Container Section */}
            <Section title="Container">
              {/* Moved Min Height to top for better visibility */}
              <StyledInput
                label="Min Height"
                value={getValue('minHeight', '300px')}
                onChange={(val) => handleChange('minHeight', val)}
                placeholder="300px"
                activeViewMode={viewMode}
              />

              <StyledSelect
                label="Container Layout"
                value={getValue('layoutType', 'flex')}
                onChange={(val) => handleChange('layoutType', val)}
                activeViewMode={viewMode}
                options={[
                  { label: 'Flexbox', value: 'flex' },
                  { label: 'Grid', value: 'grid' }
                ]}
              />

              <StyledInput
                label="Content Width"
                value={getValue('width', '100%')}
                onChange={(val) => handleChange('width', val)}
                placeholder="100%"
                activeViewMode={viewMode}
              />
            </Section>

            {/* Items Section (Flex properties) */}
            {getValue('layoutType', 'flex') !== 'grid' && (
              <Section title="Items">
                <IconButtonGroup
                  label="Direction"
                  value={getValue('direction', 'column')}
                  onChange={(val) => handleChange('direction', val)}
                  activeViewMode={viewMode}
                  options={[
                    { value: 'row', label: 'Row', icon: <ArrowRight size={16} /> },
                    { value: 'column', label: 'Column', icon: <ArrowDown size={16} /> },
                    { value: 'row-reverse', label: 'Row Reverse', icon: <ArrowLeft size={16} /> },
                    { value: 'column-reverse', label: 'Column Reverse', icon: <ArrowUp size={16} /> }
                  ]}
                />

                <IconButtonGroup
                  // Dynamic Label: If Column (default), Justify handles Vertical. If Row, it handles Horizontal.
                  label={isRow ? 'Horizontal Alignment' : 'Vertical Alignment'}
                  value={getValue('justifyContent', 'flex-start')}
                  onChange={(val) => handleChange('justifyContent', val)}
                  activeViewMode={viewMode}
                  options={[
                    // Dynamic Icons too
                    { value: 'flex-start', label: 'Start', icon: isRow ? <AlignStartHorizontal size={16} /> : <AlignStartVertical size={16} /> },
                    { value: 'center', label: 'Center', icon: isRow ? <AlignCenterHorizontal size={16} /> : <AlignCenterVertical size={16} /> },
                    { value: 'flex-end', label: 'End', icon: isRow ? <AlignEndHorizontal size={16} /> : <AlignEndVertical size={16} /> },
                    { value: 'space-between', label: 'Space Between', icon: <Rows size={16} /> },
                    { value: 'space-around', label: 'Space Around', icon: <Rows size={16} /> }
                  ]}
                />

                <IconButtonGroup
                  // Dynamic Label: If Column (default), AlignItems handles Horizontal. If Row, it handles Vertical.
                  label={isRow ? 'Vertical Alignment' : 'Horizontal Alignment'}
                  value={getValue('alignItems', 'stretch')}
                  onChange={(val) => handleChange('alignItems', val)}
                  activeViewMode={viewMode}
                  options={[
                     // Dynamic Icons too
                    { value: 'flex-start', label: 'Start', icon: isRow ? <AlignStartVertical size={16} /> : <AlignStartHorizontal size={16} /> },
                    { value: 'center', label: 'Center', icon: isRow ? <AlignCenterVertical size={16} /> : <AlignCenterHorizontal size={16} /> },
                    { value: 'flex-end', label: 'End', icon: isRow ? <AlignEndVertical size={16} /> : <AlignEndHorizontal size={16} /> },
                    { value: 'stretch', label: 'Stretch', icon: <Columns size={16} /> }
                  ]}
                />

                <StyledInput
                  label="Gap"
                  value={getValue('gap', '10px')}
                  onChange={(val) => handleChange('gap', val)}
                  placeholder="10px"
                  activeViewMode={viewMode}
                />

                <IconButtonGroup
                  label="Wrap"
                  value={getValue('wrap', 'nowrap')}
                  onChange={(val) => handleChange('wrap', val)}
                  activeViewMode={viewMode}
                  options={[
                    { value: 'nowrap', label: 'No Wrap', icon: <ArrowRight size={16} /> },
                    { value: 'wrap', label: 'Wrap', icon: <ArrowDown size={16} /> }
                  ]}
                />
              </Section>
            )}

            {/* Grid Section */}
            {getValue('layoutType', 'flex') === 'grid' && (
              <Section title="Grid Layout">
                <StyledInput
                  label="Columns (Count or Template)"
                  value={getValue('gridTemplateColumns', '1fr')}
                  onChange={(val) => handleChange('gridTemplateColumns', val)}
                  placeholder="e.g. 3 or 1fr 1fr 1fr"
                  responsive={false}
                />
                
                <StyledInput
                  label="Rows"
                  value={getValue('gridTemplateRows', 'auto')}
                  onChange={(val) => handleChange('gridTemplateRows', val)}
                  placeholder="auto"
                  responsive={false}
                />
                
                <StyledInput
                  label="Gap"
                  value={getValue('gap', '10px')}
                  onChange={(val) => handleChange('gap', val)}
                  placeholder="10px"
                  activeViewMode={viewMode}
                />

                <IconButtonGroup
                  label="Horizontal Align (Justify Items)"
                  value={getValue('justifyItems', 'stretch')}
                  onChange={(val) => handleChange('justifyItems', val)}
                  activeViewMode={viewMode}
                  options={[
                    { value: 'start', label: 'Start', icon: <AlignStartHorizontal size={16} /> },
                    { value: 'center', label: 'Center', icon: <AlignCenterHorizontal size={16} /> },
                    { value: 'end', label: 'End', icon: <AlignEndHorizontal size={16} /> },
                    { value: 'stretch', label: 'Stretch', icon: <Columns size={16} /> }
                  ]}
                />

                <IconButtonGroup
                  label="Vertical Align (Align Items)"
                  value={getValue('alignItems', 'stretch')}
                  onChange={(val) => handleChange('alignItems', val)}
                  activeViewMode={viewMode}
                  options={[
                    { value: 'start', label: 'Start', icon: <AlignStartVertical size={16} /> },
                    { value: 'center', label: 'Center', icon: <AlignCenterVertical size={16} /> },
                    { value: 'end', label: 'End', icon: <AlignEndVertical size={16} /> },
                    { value: 'stretch', label: 'Stretch', icon: <Columns size={16} /> }
                  ]}
                />
              </Section>
            )}
          </>
        )}

        {activeTab === 'layout' && !isContainer && (
          <Section title={config?.name || 'Content'}>
            
            {/* If cmsConfig exists, use it to generate controls */}
            {config && config.props ? (
                 Object.entries(config.props).map(([key, propConfig]) => (
                     renderDynamicControl(key, propConfig)
                 ))
            ) : (
                /* Fallback for standard widgets or legacy configs */
                block.type === WIDGET_TYPES.ICON_BOX ? (
                    // ... (keep existing hardcoded widgets)

                <>
                    <StyledInput
                        label="Title"
                        value={getValue('title', 'Título do Serviço')}
                        onChange={(val) => handleChange('title', val)}
                        responsive={true}
                        activeViewMode={viewMode}
                    />
                     <StyledInput
                        label="Description"
                        value={getValue('description', 'Descrição...')}
                        onChange={(val) => handleChange('description', val)}
                        responsive={true}
                        activeViewMode={viewMode}
                    />
                    <StyledSelect
                        label="Icon"
                        value={getValue('icon', 'Star')}
                        onChange={(val) => handleChange('icon', val)}
                        responsive={false}
                        options={[
                           { label: 'Star', value: 'Star' },
                           { label: 'User', value: 'User' },
                           { label: 'Check', value: 'Check' },
                           { label: 'Truck', value: 'Truck' },
                           { label: 'Shield', value: 'Shield' },
                           { label: 'Settings', value: 'Settings' },
                           { label: 'Heart', value: 'Heart' },
                           { label: 'Home', value: 'Home' },
                           { label: 'ShoppingBag', value: 'ShoppingBag' },
                           { label: 'Phone', value: 'Phone' },
                           { label: 'Mail', value: 'Mail' }
                        ]}
                    />
                     <IconButtonGroup
                        label="Icon Position"
                        value={getValue('iconPosition', 'top')}
                        onChange={(val) => handleChange('iconPosition', val)}
                        activeViewMode={viewMode}
                        options={[
                            { value: 'top', label: 'Top', icon: <ArrowUp size={16} /> },
                            { value: 'left', label: 'Left', icon: <ArrowLeft size={16} /> },
                            { value: 'right', label: 'Right', icon: <ArrowRight size={16} /> }
                        ]}
                    />
                     <IconButtonGroup
                        label="Text Alignment"
                        value={getValue('textAlign', 'center')}
                        onChange={(val) => handleChange('textAlign', val)}
                        activeViewMode={viewMode}
                        options={[
                            { value: 'left', label: 'Left', icon: <AlignStartHorizontal size={16} /> },
                            { value: 'center', label: 'Center', icon: <AlignCenterHorizontal size={16} /> },
                            { value: 'right', label: 'Right', icon: <AlignEndHorizontal size={16} /> }
                        ]}
                    />
                </>
            ) : block.type === WIDGET_TYPES.ICON_LIST ? (
                /* ICON LIST SPECIFIC CONTENT */
                <>
                  <Repeater
                    label="List Items"
                    items={block.props?.items || [
                        { id: 1, text: 'List Item #1', icon: 'Check', link: '#' },
                        { id: 2, text: 'List Item #2', icon: 'Check', link: '#' },
                        { id: 3, text: 'List Item #3', icon: 'Check', link: '#' }
                    ]}
                    onChange={(newItems) => handleChange('items', newItems)}
                    defaultItem={{ text: 'New Item', icon: 'Check', link: '' }}
                    renderItem={(item, index, onChangeItem) => (
                      <div className={styles.formGroup}>
                         <input 
                            className={styles.input} 
                            value={item.text} 
                            onChange={(e) => onChangeItem({ text: e.target.value })}
                            placeholder="Text"
                         />
                         <div style={{ display: 'flex', gap: '8px' }}>
                            <select 
                                className={styles.select}
                                value={item.icon || 'Check'}
                                onChange={(e) => onChangeItem({ icon: e.target.value })}
                            >
                                <option value="Check">Check</option>
                                <option value="Star">Star</option>
                                <option value="ArrowRight">Arrow Right</option>
                                <option value="Dot">Dot</option>
                                <option value="Phone">Phone</option>
                                <option value="Mail">Mail</option>
                                <option value="MapPin">MapPin</option>
                            </select>
                            <input 
                                className={styles.input} 
                                value={item.link || ''} 
                                onChange={(e) => onChangeItem({ link: e.target.value })}
                                placeholder="Link (optional)"
                             />
                         </div>
                      </div>
                    )}
                  />

                  <IconButtonGroup
                      label="Layout"
                      value={getValue('layout', 'vertical')}
                      onChange={(val) => handleChange('layout', val)}
                      activeViewMode={viewMode}
                      options={[
                          { value: 'vertical', label: 'Vertical', icon: <ArrowDown size={16} /> },
                          { value: 'horizontal', label: 'Horizontal', icon: <ArrowRight size={16} /> }
                      ]}
                  />

                  <IconButtonGroup
                        label="Alignment"
                        value={getValue('align', 'left')}
                        onChange={(val) => handleChange('align', val)}
                        activeViewMode={viewMode}
                        options={[
                            { value: 'left', label: 'Left', icon: <AlignStartHorizontal size={16} /> },
                            { value: 'center', label: 'Center', icon: <AlignCenterHorizontal size={16} /> },
                            { value: 'right', label: 'Right', icon: <AlignEndHorizontal size={16} /> }
                        ]}
                    />

                   <StyledSelect
                        label="Divider"
                        value={getValue('divider', 'no')}
                        onChange={(val) => handleChange('divider', val)}
                        responsive={false}
                        options={[
                           { label: 'No', value: 'no' },
                           { label: 'Yes', value: 'yes' }
                        ]}
                    />

                  <StyledInput
                      label="Gap"
                      value={getValue('gap', '10px')}
                      onChange={(val) => handleChange('gap', val)}
                      placeholder="10px"
                      activeViewMode={viewMode}
                  />
                  <StyledInput
                      label="Gap"
                      value={getValue('gap', '10px')}
                      onChange={(val) => handleChange('gap', val)}
                      placeholder="10px"
                      activeViewMode={viewMode}
                  />
                </>
            ) : block.type === WIDGET_TYPES.IMAGE_BOX ? (
                /* IMAGE BOX SPECIFIC CONTENT */
                <>
                    <StyledInput
                        label="Image URL"
                        value={getValue('imageSrc', 'https://placehold.co/600x400?text=Image')}
                        onChange={(val) => handleChange('imageSrc', val)}
                        placeholder="https://..."
                        responsive={false}
                    />
                    <StyledInput
                        label="Title"
                        value={getValue('title', 'Título do Serviço')}
                        onChange={(val) => handleChange('title', val)}
                        responsive={true}
                        activeViewMode={viewMode}
                    />
                     <StyledInput
                        label="Description"
                        value={getValue('description', 'Descrição...')}
                        onChange={(val) => handleChange('description', val)}
                        responsive={true}
                        activeViewMode={viewMode}
                    />
                     <IconButtonGroup
                        label="Image Position"
                        value={getValue('imagePosition', 'top')}
                        onChange={(val) => handleChange('imagePosition', val)}
                        activeViewMode={viewMode}
                        options={[
                            { value: 'top', label: 'Top', icon: <ArrowUp size={16} /> },
                            { value: 'left', label: 'Left', icon: <ArrowLeft size={16} /> },
                            { value: 'right', label: 'Right', icon: <ArrowRight size={16} /> }
                        ]}
                    />
                     <IconButtonGroup
                        label="Text Alignment"
                        value={getValue('textAlign', 'center')}
                        onChange={(val) => handleChange('textAlign', val)}
                        activeViewMode={viewMode}
                        options={[
                            { value: 'left', label: 'Left', icon: <AlignStartHorizontal size={16} /> },
                            { value: 'center', label: 'Center', icon: <AlignCenterHorizontal size={16} /> },
                            { value: 'right', label: 'Right', icon: <AlignEndHorizontal size={16} /> }
                        ]}
                    />
                     <IconButtonGroup
                        label="Vertical Alignment"
                        value={getValue('verticalAlign', 'flex-start')}
                        onChange={(val) => handleChange('verticalAlign', val)}
                        activeViewMode={viewMode}
                        options={[
                            { value: 'flex-start', label: 'Top', icon: <AlignStartVertical size={16} /> },
                            { value: 'center', label: 'Middle', icon: <AlignCenterVertical size={16} /> },
                            { value: 'flex-end', label: 'Bottom', icon: <AlignEndVertical size={16} /> }
                        ]}
                    />
                </>
            ) : block.type === WIDGET_TYPES.HEADING ? (
                <>
                    <StyledInput
                        label="Text"
                        value={getValue('text', 'Heading Text')}
                        onChange={(val) => handleChange('text', val)}
                        responsive={true}
                        activeViewMode={viewMode}
                    />
                    <StyledSelect
                        label="Tag"
                        value={getValue('tag', 'h2')}
                        onChange={(val) => handleChange('tag', val)}
                        options={[
                            { label: 'H1', value: 'h1' },
                            { label: 'H2', value: 'h2' },
                            { label: 'H3', value: 'h3' },
                            { label: 'H4', value: 'h4' },
                            { label: 'H5', value: 'h5' },
                            { label: 'H6', value: 'h6' }
                        ]}
                    />
                     <IconButtonGroup
                        label="Alignment"
                        value={getValue('align', 'left')}
                        onChange={(val) => handleChange('align', val)}
                        activeViewMode={viewMode}
                        options={[
                            { value: 'left', label: 'Left', icon: <AlignStartHorizontal size={16} /> },
                            { value: 'center', label: 'Center', icon: <AlignCenterHorizontal size={16} /> },
                            { value: 'right', label: 'Right', icon: <AlignEndHorizontal size={16} /> },
                            { value: 'justify', label: 'Justify', icon: <Columns size={16} /> }
                        ]}
                    />
                    <StyledInput
                        label="Color"
                        value={getValue('color', '')}
                        onChange={(val) => handleChange('color', val)}
                        placeholder="Inherit"
                    />
                </>
            ) : block.type === WIDGET_TYPES.TEXT ? (
                <>
                    <Section title="Content">
                        <div className={styles.richEditorWrapper}>
                            <ReactQuill 
                                theme="snow"
                                value={getValue('content', '')}
                                onChange={(val) => handleChange('content', val)}
                                modules={{
                                    toolbar: [
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                        [{ 'align': [] }],
                                        ['link', 'clean']
                                    ]
                                }}
                            />
                        </div>
                    </Section>
                    <Section title="Style">
                         <IconButtonGroup
                            label="Alignment"
                            value={getValue('align', 'left')}
                            onChange={(val) => handleChange('align', val)}
                            activeViewMode={viewMode}
                            options={[
                                { value: 'left', label: 'Left', icon: <AlignStartHorizontal size={16} /> },
                                { value: 'center', label: 'Center', icon: <AlignCenterHorizontal size={16} /> },
                                { value: 'right', label: 'Right', icon: <AlignEndHorizontal size={16} /> },
                                { value: 'justify', label: 'Justify', icon: <AlignEndVertical size={16} /> } 
                            ]}
                        />
                         <StyledInput
                            label="Color"
                            value={getValue('color', '')}
                            onChange={(val) => handleChange('color', val)}
                            responsive={false}
                            placeholder="Inherit"
                        />
                         <StyledInput
                            label="Font Size"
                            value={getValue('fontSize', '')}
                            onChange={(val) => handleChange('fontSize', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                            placeholder="16px"
                        />
                    </Section>
                </>
            ) : block.type === WIDGET_TYPES.DIVIDER ? (
                <>
                         <StyledSelect
                            label="Style"
                            value={getValue('style', 'solid')}
                            onChange={(val) => handleChange('style', val)}
                            responsive={false}
                            options={[
                                { label: 'Solid', value: 'solid' },
                                { label: 'Double', value: 'double' },
                                { label: 'Dotted', value: 'dotted' },
                                { label: 'Dashed', value: 'dashed' },
                                { label: 'Groove', value: 'groove' }
                            ]}
                        />
                         <StyledSelect
                            label="Element"
                            value={getValue('element', 'line')}
                            onChange={(val) => handleChange('element', val)}
                            responsive={false}
                            options={[
                                { label: 'Line', value: 'line' },
                                { label: 'Line + Icon', value: 'line_icon' },
                                { label: 'Line + Text', value: 'line_text' }
                            ]}
                        />
                         
                        {getValue('element') === 'line_text' && (
                             <StyledInput
                                label="Text"
                                value={getValue('text', 'Divider')}
                                onChange={(val) => handleChange('text', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                            />
                        )}

                        {getValue('element') === 'line_icon' && (
                            <StyledSelect
                                label="Icon"
                                value={getValue('icon', 'Star')}
                                onChange={(val) => handleChange('icon', val)}
                                responsive={false}
                                options={[
                                   { label: 'Star', value: 'Star' },
                                   { label: 'Heart', value: 'Heart' },
                                   { label: 'Check', value: 'Check' },
                                   { label: 'User', value: 'User' },
                                   { label: 'Home', value: 'Home' },
                                   { label: 'Settings', value: 'Settings' }
                                ]}
                            />
                        )}
                        
                        <IconButtonGroup
                            label="Alignment"
                            value={getValue('align', 'center')}
                            onChange={(val) => handleChange('align', val)}
                            activeViewMode={viewMode}
                            options={[
                                { value: 'left', label: 'Left', icon: <AlignStartHorizontal size={16} /> },
                                { value: 'center', label: 'Center', icon: <AlignCenterHorizontal size={16} /> },
                                { value: 'right', label: 'Right', icon: <AlignEndHorizontal size={16} /> }
                            ]}
                        />

                    <Section title="Style">
                        <StyledInput
                            label="Color"
                            value={getValue('color', '#e5e7eb')}
                            onChange={(val) => handleChange('color', val)}
                            responsive={false}
                        />
                        <StyledInput
                            label="Width"
                            value={getValue('width', '100%')}
                            onChange={(val) => handleChange('width', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                        />
                        <StyledInput
                            label="Height / Weight"
                            value={getValue('height', '1px')}
                            onChange={(val) => handleChange('height', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                        />
                         <StyledInput
                            label="Gap"
                            value={getValue('gap', '15px')}
                            onChange={(val) => handleChange('gap', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                        />
                         <StyledInput
                            label="Border Radius"
                            value={getValue('borderRadius', '0px')}
                            onChange={(val) => handleChange('borderRadius', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                        />
                    </Section>

                     {getValue('element') !== 'line' && (
                        <Section title="Text / Icon Style">
                             {getValue('element') === 'line_text' && (
                                <>
                                     <StyledInput
                                        label="Text Color"
                                        value={getValue('textColor', '')}
                                        onChange={(val) => handleChange('textColor', val)}
                                        responsive={false}
                                    />
                                    <StyledInput
                                        label="Font Size"
                                        value={getValue('textSize', '14px')}
                                        onChange={(val) => handleChange('textSize', val)}
                                        responsive={true}
                                        activeViewMode={viewMode}
                                    />
                                </>
                             )}
                             {getValue('element') === 'line_icon' && (
                                <>
                                     <StyledInput
                                        label="Icon Color"
                                        value={getValue('iconColor', '')}
                                        onChange={(val) => handleChange('iconColor', val)}
                                        responsive={false}
                                    />
                                    <StyledInput
                                        label="Icon Size"
                                        value={getValue('iconSize', '14px')}
                                        onChange={(val) => handleChange('iconSize', val)}
                                        responsive={true}
                                        activeViewMode={viewMode}
                                    />
                                </>
                             )}
                        </Section>
                    )}

                    <Section title="Spacing">
                        <StyledInput
                            label="Margin"
                            value={getValue('margin', '20px 0')}
                            onChange={(val) => handleChange('margin', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                        />
                        <StyledInput
                            label="Padding"
                            value={getValue('padding', '0')}
                            onChange={(val) => handleChange('padding', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                        />
                    </Section>
                </>
            ) : block.type === WIDGET_TYPES.SPACER ? (
                <>
                    <Section title="Settings">
                        <StyledInput
                            label="Width"
                            value={getValue('width', '100%')}
                            onChange={(val) => handleChange('width', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                        />
                         <StyledInput
                            label="Padding"
                            value={getValue('padding', '50px')}
                            onChange={(val) => handleChange('padding', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                            placeholder="50px"
                        />
                        <StyledInput
                            label="Background Color (Debug)"
                            value={getValue('backgroundColor', 'transparent')}
                            onChange={(val) => handleChange('backgroundColor', val)}
                            responsive={false}
                        />
                    </Section>
                </>
            ) : block.type === WIDGET_TYPES.BUTTON ? (
                <>
                    <StyledInput
                        label="Text"
                        value={getValue('text', 'Click Me')}
                        onChange={(val) => handleChange('text', val)}
                        responsive={true}
                        activeViewMode={viewMode}
                    />
                    <StyledInput
                        label="Link URL"
                        value={getValue('url', '#')}
                        onChange={(val) => handleChange('url', val)}
                        placeholder="https://..."
                    />
                    <StyledSelect
                        label="Variant"
                        value={getValue('variant', 'primary')}
                        onChange={(val) => handleChange('variant', val)}
                        options={[
                            { label: 'Primary', value: 'primary' },
                            { label: 'Secondary', value: 'secondary' },
                            { label: 'Accent', value: 'accent' },
                            { label: 'Outline', value: 'outline' },
                            { label: 'Text Only', value: 'text' }
                        ]}
                    />
                     <IconButtonGroup
                        label="Alignment"
                        value={getValue('align', 'left')}
                        onChange={(val) => handleChange('align', val)}
                        activeViewMode={viewMode}
                        options={[
                            { value: 'left', label: 'Left', icon: <AlignStartHorizontal size={16} /> },
                            { value: 'center', label: 'Center', icon: <AlignCenterHorizontal size={16} /> },
                            { value: 'right', label: 'Right', icon: <AlignEndHorizontal size={16} /> }
                        ]}
                    />
                </>
            ) : block.type === WIDGET_TYPES.IMAGE ? (
                <>
                     <StyledInput
                        label="Image URL"
                        value={getValue('src', 'https://placehold.co/600x400')}
                        onChange={(val) => handleChange('src', val)}
                        placeholder="https://..."
                    />
                    <StyledInput
                        label="Alt Text"
                        value={getValue('alt', 'Image')}
                        onChange={(val) => handleChange('alt', val)}
                    />
                     <StyledInput
                        label="Width"
                        value={getValue('width', '100%')}
                        onChange={(val) => handleChange('width', val)}
                        placeholder="100% or 300px"
                         activeViewMode={viewMode}
                    />
                     <StyledInput
                        label="Border Radius"
                        value={getValue('borderRadius', '0px')}
                        onChange={(val) => handleChange('borderRadius', val)}
                        placeholder="0px"
                         activeViewMode={viewMode}
                    />
                     <IconButtonGroup
                        label="Alignment"
                        value={getValue('align', 'left')}
                        onChange={(val) => handleChange('align', val)}
                        activeViewMode={viewMode}
                        options={[
                            { value: 'left', label: 'Left', icon: <AlignStartHorizontal size={16} /> },
                            { value: 'center', label: 'Center', icon: <AlignCenterHorizontal size={16} /> },
                            { value: 'right', label: 'Right', icon: <AlignEndHorizontal size={16} /> }
                        ]}
                    />
                    <StyledInput
                        label="Caption"
                        value={getValue('caption', '')}
                        onChange={(val) => handleChange('caption', val)}
                        placeholder="Optional caption"
                    />
                </>
            ) : (
                /* GENERIC WIDGET CONTENT */
                <StyledInput
                label="Content"
                value={block.props?.text || block.props?.content || ''}
                onChange={(val) => handleChange(block.props?.text !== undefined ? 'text' : 'content', val)}
                placeholder="Digite o texto..."
                responsive={false}
                />
            ))}
          </Section>
        )}

        {activeTab === 'style' && (
          <>
            <Section title="Background">
                <StyledInput
                label="Background Color"
                value={getValue('backgroundColor', 'transparent')}
                onChange={(val) => handleChange('backgroundColor', val)}
                placeholder="#ffffff"
                responsive={false}
                />
            </Section>

            {block.type === WIDGET_TYPES.ICON_BOX && (
                <Section title="Icon Box Styles">
                    <StyledInput
                        label="Icon Color"
                        value={getValue('iconColor', '#3b82f6')}
                        onChange={(val) => handleChange('iconColor', val)}
                        placeholder="#3b82f6"
                        responsive={false}
                    />
                    <StyledInput
                        label="Icon Size"
                        value={getValue('iconSize', '40px')}
                        onChange={(val) => handleChange('iconSize', val)}
                        placeholder="40px"
                        responsive={true}
                        activeViewMode={viewMode}
                    />
                     <StyledInput
                        label="Title Color"
                        value={getValue('titleColor', '#1f2937')}
                        onChange={(val) => handleChange('titleColor', val)}
                        placeholder="#1f2937"
                        responsive={false}
                    />
                     <StyledInput
                        label="Description Color"
                        value={getValue('descColor', '#6b7280')}
                        onChange={(val) => handleChange('descColor', val)}
                        placeholder="#6b7280"
                        responsive={false}
                    />
                </Section>
            )}

            {block.type === WIDGET_TYPES.ICON_LIST && (
                <Section title="Icon List Styles">
                    <StyledInput
                        label="Icon Color"
                        value={getValue('iconColor', '#3b82f6')}
                        onChange={(val) => handleChange('iconColor', val)}
                        placeholder="#3b82f6"
                        responsive={false}
                    />
                     <StyledInput
                        label="Icon Size"
                        value={getValue('iconSize', '16px')}
                        onChange={(val) => handleChange('iconSize', val)}
                        placeholder="16px"
                        responsive={true}
                        activeViewMode={viewMode}
                    />
                     <StyledInput
                        label="Icon/Text Gap"
                        value={getValue('iconGap', '8px')}
                        onChange={(val) => handleChange('iconGap', val)}
                        placeholder="8px"
                        responsive={true}
                         activeViewMode={viewMode}
                    />
                     <StyledInput
                        label="Text Color"
                        value={getValue('textColor', '#374151')}
                        onChange={(val) => handleChange('textColor', val)}
                        placeholder="#374151"
                        responsive={false}
                    />
                     <StyledInput
                        label="Text Size"
                        value={getValue('textSize', '14px')}
                        onChange={(val) => handleChange('textSize', val)}
                        placeholder="14px"
                        responsive={true}
                        activeViewMode={viewMode}
                    />
                </Section>
            )}

            {block.type === WIDGET_TYPES.IMAGE_BOX && (
                <Section title="Image Box Styles">
                    <StyledInput
                        label="Image Width"
                        value={getValue('imageWidth', '100%')}
                        onChange={(val) => handleChange('imageWidth', val)}
                        placeholder="e.g. 100% or 300px"
                        responsive={true}
                         activeViewMode={viewMode}
                    />
                     <StyledInput
                        label="Border Radius"
                        value={getValue('borderRadius', '8px')}
                        onChange={(val) => handleChange('borderRadius', val)}
                        placeholder="8px"
                        responsive={true}
                         activeViewMode={viewMode}
                    />
                     <StyledInput
                        label="Title Color"
                        value={getValue('titleColor', '#1f2937')}
                        onChange={(val) => handleChange('titleColor', val)}
                        placeholder="#1f2937"
                        responsive={false}
                    />
                     <StyledInput
                        label="Description Color"
                        value={getValue('descColor', '#6b7280')}
                        onChange={(val) => handleChange('descColor', val)}
                        placeholder="#6b7280"
                        responsive={false}
                    />
                    <StyledInput
                        label="Gap"
                        value={getValue('gap', '15px')}
                        onChange={(val) => handleChange('gap', val)}
                        placeholder="15px"
                        responsive={true}
                        activeViewMode={viewMode}
                    />
                </Section>
            )}
          </>
        )}

        {activeTab === 'advanced' && (
          <>
            <Section title="Layout">
              {/* IMPORTANT: Default width is now empty (auto), not 100% */}
              <StyledInput
                label="Width"
                value={getValue('width', '')} 
                onChange={(val) => handleChange('width', val)}
                placeholder="auto"
                activeViewMode={viewMode}
              />
              <StyledInput
                label="Padding"
                value={getValue('padding', '0px')}
                onChange={(val) => handleChange('padding', val)}
                placeholder="0px"
                activeViewMode={viewMode}
              />
            </Section>
            
            <Section title="Flex Child">
              <StyledInput
                label="Flex Grow"
                value={getValue('flexGrow', '0')}
                onChange={(val) => handleChange('flexGrow', val)}
                placeholder="0"
                responsive={false}
              />
              <StyledSelect
                label="Align Self"
                value={getValue('alignSelf', 'auto')}
                onChange={(val) => handleChange('alignSelf', val)}
                options={[
                  { label: 'Auto', value: 'auto' },
                  { label: 'Start', value: 'flex-start' },
                  { label: 'Center', value: 'center' },
                  { label: 'End', value: 'flex-end' },
                  { label: 'Stretch', value: 'stretch' }
                ]}
                responsive={false}
              />
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
