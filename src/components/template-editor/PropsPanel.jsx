import React, { useState, useEffect } from 'react';
import { 
  Monitor, Tablet, Smartphone, Laptop, 
  Layout, Circle, Settings,
  ArrowRight, ArrowDown, ArrowLeft, ArrowUp,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal,
  Columns, Rows, ChevronDown, ChevronRight
} from 'lucide-react';
import { NODE_TYPES, WIDGET_TYPES } from '@/components/builder/constants';
import templates from '@/templates-cms/registry';
import styles from './PropsPanel.module.css';

// Icon Button Group Component (for Direction, Justify, Align)
function IconButtonGroup({ label, value, onChange, options }) {
  return (
    <div className={styles.iconButtonGroup}>
      <div className={styles.formLabel}>
        <span className={styles.labelText}>{label}</span>
        <button className={styles.responsiveButton}>
          <Monitor size={14} />
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
function StyledSelect({ label, value, onChange, options, responsive = true }) {
  return (
    <div className={styles.formGroup}>
      <div className={styles.formLabel}>
        <span className={styles.labelText}>{label}</span>
        {responsive && (
          <button className={styles.responsiveButton}>
            <Monitor size={14} />
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
function StyledInput({ label, value, onChange, placeholder, unit = '', responsive = true }) {
  return (
    <div className={styles.formGroup}>
      <div className={styles.formLabel}>
        <span className={styles.labelText}>{label}</span>
        {responsive && (
          <button className={styles.responsiveButton}>
            <Monitor size={14} />
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

export default function PropsPanel({ block, templateId, onPropsChange }) {
  const [config, setConfig] = useState(null);
  const [activeTab, setActiveTab] = useState('layout');

  useEffect(() => {
    if (block && templateId) {
      const template = templates[templateId];
      
      const atomicConfigs = {
        [WIDGET_TYPES.TEXT]: { name: 'Text', props: {} },
        [WIDGET_TYPES.HEADING]: { name: 'Heading', props: {} },
        [WIDGET_TYPES.BUTTON]: { name: 'Button', props: {} },
        [WIDGET_TYPES.IMAGE]: { name: 'Image', props: {} },
        [WIDGET_TYPES.PRODUCT_LIST]: { name: 'Product List', props: {} },
        [NODE_TYPES.CONTAINER]: { name: 'Container', props: {} },
        [NODE_TYPES.SECTION]: { name: 'Section', props: {} }
      };

      if (atomicConfigs[block.type] || block.category === NODE_TYPES.CONTAINER || block.category === NODE_TYPES.SECTION) {
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
      <div className={styles.emptyState}>
        Selecione um elemento
      </div>
    );
  }

  const handleChange = (key, value) => {
    onPropsChange({ [key]: value });
  };

  const isContainer = block.category === NODE_TYPES.CONTAINER;

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

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerTitle}>
          Editar {config?.name || block.type}
        </span>
        <button className={styles.headerButton}>
          <Settings size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabContainer}>
        <TabButton id="layout" icon={Layout} label="Layout" />
        <TabButton id="style" icon={Circle} label="Style" />
        <TabButton id="advanced" icon={Settings} label="Advanced" />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {activeTab === 'layout' && isContainer && (
          <>
            {/* Container Section */}
            <Section title="Container">
              <StyledSelect
                label="Container Layout"
                value={block.props?.layoutType || 'flex'}
                onChange={(val) => handleChange('layoutType', val)}
                options={[
                  { label: 'Flexbox', value: 'flex' },
                  { label: 'Grid', value: 'grid' }
                ]}
              />

              <StyledInput
                label="Content Width"
                value={block.props?.width || '100%'}
                onChange={(val) => handleChange('width', val)}
                placeholder="100%"
              />

              <StyledInput
                label="Min Height"
                value={block.props?.minHeight || '50px'}
                onChange={(val) => handleChange('minHeight', val)}
                placeholder="50px"
              />
            </Section>

            {/* Items Section (Flex properties) */}
            {block.props?.layoutType !== 'grid' && (
              <Section title="Items">
                <IconButtonGroup
                  label="Direction"
                  value={block.props?.direction || 'row'}
                  onChange={(val) => handleChange('direction', val)}
                  options={[
                    { value: 'row', label: 'Row', icon: <ArrowRight size={16} /> },
                    { value: 'column', label: 'Column', icon: <ArrowDown size={16} /> },
                    { value: 'row-reverse', label: 'Row Reverse', icon: <ArrowLeft size={16} /> },
                    { value: 'column-reverse', label: 'Column Reverse', icon: <ArrowUp size={16} /> }
                  ]}
                />

                <IconButtonGroup
                  label="Justify Content"
                  value={block.props?.justifyContent || 'flex-start'}
                  onChange={(val) => handleChange('justifyContent', val)}
                  options={[
                    { value: 'flex-start', label: 'Start', icon: <AlignStartVertical size={16} /> },
                    { value: 'center', label: 'Center', icon: <AlignCenterVertical size={16} /> },
                    { value: 'flex-end', label: 'End', icon: <AlignEndVertical size={16} /> },
                    { value: 'space-between', label: 'Space Between', icon: <Rows size={16} /> },
                    { value: 'space-around', label: 'Space Around', icon: <Rows size={16} /> }
                  ]}
                />

                <IconButtonGroup
                  label="Align Items"
                  value={block.props?.alignItems || 'flex-start'}
                  onChange={(val) => handleChange('alignItems', val)}
                  options={[
                    { value: 'flex-start', label: 'Start', icon: <AlignStartHorizontal size={16} /> },
                    { value: 'center', label: 'Center', icon: <AlignCenterHorizontal size={16} /> },
                    { value: 'flex-end', label: 'End', icon: <AlignEndHorizontal size={16} /> },
                    { value: 'stretch', label: 'Stretch', icon: <Columns size={16} /> }
                  ]}
                />

                <StyledInput
                  label="Gap"
                  value={block.props?.gap || '10px'}
                  onChange={(val) => handleChange('gap', val)}
                  placeholder="10px"
                />

                <IconButtonGroup
                  label="Wrap"
                  value={block.props?.wrap || 'nowrap'}
                  onChange={(val) => handleChange('wrap', val)}
                  options={[
                    { value: 'nowrap', label: 'No Wrap', icon: <ArrowRight size={16} /> },
                    { value: 'wrap', label: 'Wrap', icon: <ArrowDown size={16} /> }
                  ]}
                />
              </Section>
            )}

            {/* Grid Section */}
            {block.props?.layoutType === 'grid' && (
              <Section title="Grid">
                <StyledInput
                  label="Columns"
                  value={block.props?.gridTemplateColumns || '1fr'}
                  onChange={(val) => handleChange('gridTemplateColumns', val)}
                  placeholder="1fr 1fr"
                  responsive={false}
                />
                <StyledInput
                  label="Rows"
                  value={block.props?.gridTemplateRows || 'auto'}
                  onChange={(val) => handleChange('gridTemplateRows', val)}
                  placeholder="auto"
                  responsive={false}
                />
                <StyledInput
                  label="Gap"
                  value={block.props?.gap || '10px'}
                  onChange={(val) => handleChange('gap', val)}
                  placeholder="10px"
                />
              </Section>
            )}
          </>
        )}

        {activeTab === 'layout' && !isContainer && (
          <Section title={config?.name || 'Content'}>
            <StyledInput
              label="Content"
              value={block.props?.text || block.props?.content || ''}
              onChange={(val) => handleChange(block.props?.text !== undefined ? 'text' : 'content', val)}
              placeholder="Digite o texto..."
              responsive={false}
            />
          </Section>
        )}

        {activeTab === 'style' && (
          <Section title="Background">
            <StyledInput
              label="Background Color"
              value={block.props?.backgroundColor || 'transparent'}
              onChange={(val) => handleChange('backgroundColor', val)}
              placeholder="#ffffff"
              responsive={false}
            />
          </Section>
        )}

        {activeTab === 'advanced' && (
          <>
            <Section title="Layout">
              <StyledInput
                label="Width"
                value={block.props?.width || '100%'}
                onChange={(val) => handleChange('width', val)}
                placeholder="100%"
              />
              <StyledInput
                label="Padding"
                value={block.props?.padding || '0px'}
                onChange={(val) => handleChange('padding', val)}
                placeholder="10px"
              />
            </Section>
            
            <Section title="Flex Child">
              <StyledInput
                label="Flex Grow"
                value={block.props?.flexGrow || '0'}
                onChange={(val) => handleChange('flexGrow', val)}
                placeholder="0"
                responsive={false}
              />
              <StyledSelect
                label="Align Self"
                value={block.props?.alignSelf || 'auto'}
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
