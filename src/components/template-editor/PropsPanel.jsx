import React, { useState, useEffect } from 'react';
import { 
  Monitor, Tablet, Smartphone, 
  Layout, Circle, Settings, Palette,
  ArrowRight, ArrowDown, ArrowLeft, ArrowUp,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal,
  Columns, Rows, ChevronDown, ChevronRight,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, Check, X, Search,
  Baseline, PaintBucket
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { NODE_TYPES, WIDGET_TYPES } from '@/components/builder/constants';
import templates from '@/templates-cms/registry';
import styles from './PropsPanel.module.css';
import { useAtomValue, useAtom, useSetAtom } from 'jotai';
import { viewModeAtom } from '@/store/viewModeStore';
import Repeater from './Repeater';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

import { renderToStaticMarkup } from 'react-dom/server';


// --- Icon Import Modal Component ---
function IconImportModal({ onImport, currentLibrary }) {
    const [isOpen, setIsOpen] = useState(false);
    const [iconName, setIconName] = useState('');
    const [importCode, setImportCode] = useState('');
    const [error, setError] = useState('');

    const libraryInfo = {
        'fa': { name: 'FontAwesome', url: 'https://react-icons.github.io/react-icons/icons/fa' },
        'md': { name: 'Material Design', url: 'https://react-icons.github.io/react-icons/icons/md' },
        'lucide': { name: 'Lucide', url: 'https://lucide.dev/icons' },
      
    };

    const handleImport = () => {
        let extractedName = '';
        let detectedLib = null;

        // Priority 1: Extract from Import Code (if present)
        if (importCode.trim()) {
            // Try to match import style: import { FaBeer } from "react-icons/fa";
            const importMatch = importCode.match(/import\s+\{\s*(\w+)\s*\}\s+from/);
            if (importMatch && importMatch[1]) {
                extractedName = importMatch[1];
            }

            // Try to match FontAwesome native style: ['apple']
            if (!extractedName) {
                const faMatch = importCode.match(/\['([^']+)'\]/);
                if (faMatch && faMatch[1]) {
                     extractedName = faMatch[1]; // Extracts 'apple'
                     detectedLib = 'fa'; // Explicitly set to FontAwesome
                }
            }

            // Try to match JSX style: <FaBeer />
            if (!extractedName) {
                const jsxMatch = importCode.match(/<(\w+)\s*\/>/);
                if (jsxMatch && jsxMatch[1]) {
                    extractedName = jsxMatch[1];
                }
            }
        }

        // Priority 2: Use manually entered name if no name extracted from code
        if (!extractedName && iconName.trim()) {
            extractedName = iconName.trim();
        }
        
        if (!detectedLib) { // Only run prefix detection if not already detected by import
            if (extractedName.startsWith('Fa')) detectedLib = 'fa';
            else if (extractedName.startsWith('Md')) detectedLib = 'md';
        else if (extractedName.startsWith('Ci')) detectedLib = 'md'; // Map to md (React Icons generic)
        else if (extractedName.startsWith('Bs')) detectedLib = 'md';
        else if (extractedName.startsWith('Io')) detectedLib = 'md';
        else if (extractedName.startsWith('Bi')) detectedLib = 'md';
        else if (extractedName.startsWith('Ai')) detectedLib = 'md';
        else if (extractedName.startsWith('Ri')) detectedLib = 'md';
        else if (extractedName.startsWith('Ti')) detectedLib = 'md';
        else if (extractedName.startsWith('Gi')) detectedLib = 'md';
        else if (extractedName.startsWith('Fi')) detectedLib = 'md';
        else if (extractedName.startsWith('Gi')) detectedLib = 'md';
        else if (extractedName.startsWith('Fi')) detectedLib = 'md';
        
        }
        
        // Semantic Import Check: If the string explicitly says "from 'react-icons/...'", trust that it is React Icons (md)
        if (importCode && /from\s+['"]react-icons\/(\w+)['"]/i.test(importCode)) {
             const match = importCode.match(/from\s+['"]react-icons\/(\w+)['"]/i);
             if (match && ['ci', 'bs', 'io5', 'io', 'bi', 'ai', 'ri', 'ti', 'gi', 'fi', 'md'].includes(match[1])) {
                 detectedLib = 'md';
             }
        }

        if (!detectedLib) detectedLib = null; // Default to null (keep current) if still not detected

        if (extractedName) {
            console.log('[IconImportModal] Detected:', { extractedName, detectedLib });
            onImport(extractedName, detectedLib);
            
            // Reset fields
            setIconName(''); 
            setImportCode('');
            setImportCode('');
            setError('');
            setIsOpen(false); // Close modal internally
        } else {
            // Only show error if BOTH fields failed
            setError('Could not recognize an icon name from input or code.');
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '8px',
                    background: '#f3f4f6',
                    border: '1px dashed #ccc',
                    borderRadius: '4px',
                    color: '#666',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '13px'
                }}
            >
                <Search size={14} />
                {isOpen ? 'Close Import' : `Import Icon from ${libraryInfo[currentLibrary]?.name || 'Library'}`}
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 5px)',
                    left: 0,
                    width: '100%',
                    background: 'white',
                    padding: '15px',
                    borderRadius: '6px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    border: '1px solid #e5e7eb',
                    zIndex: 100
                }}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 'bold' }}>Import {libraryInfo[currentLibrary]?.name}</h4>
                    
                    <div style={{ marginBottom: '10px', fontSize: '11px', color: '#3b82f6' }}>
                         Reference: <a href={libraryInfo[currentLibrary]?.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'underline'}}>Browse Icons</a>
                    </div>

                    <div style={{ fontSize: '11px', background: '#eff6ff', color: '#1e40af', padding: '8px', borderRadius: '4px', marginBottom: '10px', lineHeight: '1.4' }}>
                        <strong>Como usar:</strong> No site, selecione a aba <strong>React</strong> e copie o código do import.
                    </div>

                  
                    <textarea 
                        style={{
                            width: '100%',
                            height: '60px',
                            margin: '5px 0 10px',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontSize: '11px',
                            resize: 'vertical'
                        }}
                        placeholder={`Paste import line...\ne.g. import { ... } from ...`}
                        value={importCode}
                        onChange={(e) => setImportCode(e.target.value)}
                    />
                    
                    {error && <p style={{color: 'red', fontSize: '11px', marginBottom: '8px'}}>{error}</p>}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button 
                            onClick={handleImport}
                            style={{
                                background: '#2563eb',
                                color: 'white',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: 500
                            }}
                            onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
                            onMouseLeave={(e) => e.target.style.background = '#2563eb'}
                        >
                            Load Icon
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

const WIDGET_ICONS = {
    // This object seems to be incomplete in the provided instruction.
    // Assuming it's meant to be an empty object or defined elsewhere.
};

const ReactQuill = dynamic(async () => {
    const { default: RQ, Quill } = await import('react-quill-new');
    
    // Customize Icons using Lucide
    const icons = Quill.import('ui/icons');
    icons['color'] = renderToStaticMarkup(<Baseline size={18} strokeWidth={2} />);
    icons['background'] = renderToStaticMarkup(<PaintBucket size={18} strokeWidth={2} />);
    
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
}, { ssr: false });

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
  const [isUploading, setIsUploading] = useState(false);

  // Reusable upload helper
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/upload', { method: 'POST', body: formData });
    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  };

  // Helper factory or just direct call. 
  const handleImageUpload = async (e, propName = 'src') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
        const data = await uploadFile(file);
        handleChange(propName, data.url);
    } catch (error) {
        console.error('Upload Error:', error);
        alert('Failed to upload image. Please try again.');
    } finally {
        setIsUploading(false);
        e.target.value = '';
    }
  };

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

        {block.type === WIDGET_TYPES.TEXT && (
            <>
                 {activeTab === 'layout' && (
                        <Section title="Content">
                            <div className={styles.richEditorWrapper}>
                                <ReactQuill 
                                    theme="snow"
                                    value={getValue('content', '')}
                                    onChange={(val) => handleChange('content', val)}
                                    modules={{
                                        toolbar: [
                                            [{ 'font': [] }, { 'size': [] }],
                                            ['bold', 'italic', 'underline', 'strike'],
                                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                            [{ 'align': [] }],
                                            [{ 'color': [] }, { 'background': [] }],
                                            ['link', 'clean']
                                        ]
                                    }}
                                />
                            </div>
                        </Section>
                    )}

                    {activeTab === 'style' && (
                        <Section title="Typography">
                             <StyledInput
                                label="Text Color"
                                value={getValue('color', '')}
                                onChange={(val) => handleChange('color', val)}
                                responsive={false}
                                placeholder="Inherit"
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
                                    { value: 'justify', label: 'Justify', icon: <AlignEndVertical size={16} /> } 
                                ]}
                            />
                             <StyledInput
                                label="Font Size"
                                value={getValue('fontSize', '')}
                                onChange={(val) => handleChange('fontSize', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                                placeholder="16px"
                            />
                             <StyledSelect
                                label="Font Weight"
                                value={getValue('fontWeight', '')}
                                onChange={(val) => handleChange('fontWeight', val)}
                                responsive={false}
                                options={[
                                    { label: 'Default', value: '' },
                                    { label: 'Normal (400)', value: '400' },
                                    { label: 'Bold (700)', value: '700' },
                                    { label: 'Light (300)', value: '300' },
                                    { label: 'Extra Bold (800)', value: '800' }
                                ]}
                            />
                             <StyledInput
                                label="Line Height"
                                value={getValue('lineHeight', '')}
                                onChange={(val) => handleChange('lineHeight', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                                placeholder="1.5"
                            />
                             <StyledInput
                                label="Letter Spacing"
                                value={getValue('letterSpacing', '')}
                                onChange={(val) => handleChange('letterSpacing', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                                placeholder="0px"
                            />
                        </Section>
                    )}
                    
                    {activeTab === 'advanced' && (
                         <Section title="Spacing">
                            <StyledInput
                                label="Margin"
                                value={getValue('margin', '')}
                                onChange={(val) => handleChange('margin', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                                placeholder="0px"
                            />
                            <StyledInput
                                label="Padding"
                                value={getValue('padding', '')}
                                onChange={(val) => handleChange('padding', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                                placeholder="0px"
                            />
                             <StyledInput
                                label="Z-Index"
                                value={getValue('zIndex', '')}
                                onChange={(val) => handleChange('zIndex', val)}
                                responsive={false}
                                placeholder="auto"
                            />
                         </Section>
                    )}
            </>
        )}
        {block.type === WIDGET_TYPES.ICON && (
                 /* ICON WIDGET ROOT CONTROLS */
                 <>
                    {activeTab === 'layout' && (
                        <Section title="Content">
                            <StyledSelect
                                label="Icon Source"
                                value={getValue('iconType', 'library')}
                                onChange={(val) => handleChange('iconType', val)}
                                responsive={false}
                                options={[
                                    { label: 'Icon Library', value: 'library' },
                                    { label: 'Custom icon', value: 'custom' }
                                ]}
                            />

                            {getValue('iconType', 'library') === 'library' ? (
                                console.log('[PropsPanel] Rendering Icon Select. Lib:', getValue('iconLib'), 'Icon:', getValue('icon')),
                                <>
                                    <StyledSelect
                                        label="Library"
                                        value={getValue('iconLib', 'fa')} // 'fa', 'md', 'lucide'
                                        onChange={(val) => handleChange('iconLib', val)}
                                        responsive={false}
                                        options={[
                                            { label: 'FontAwesome', value: 'fa' },
                                            { label: 'React Icons', value: 'md' },
                                            { label: 'Lucide Icons', value: 'lucide' },
                                     
                                        ]}
                                    />
                                    
                                    {getValue('iconLib', 'fa') === 'fa' ? (
                                        <StyledSelect
                                            label="Icon"
                                            value={getValue('icon', 'FaStar')}
                                            onChange={(val) => handleChange('icon', val)}
                                            responsive={false}
                                            options={[
                                                { label: 'Star', value: 'FaStar' },
                                                { label: 'Heart', value: 'FaHeart' },
                                                { label: 'User', value: 'FaUser' },
                                                { label: 'Check', value: 'FaCheck' },
                                                { label: 'Facebook', value: 'FaFacebook' },
                                                { label: 'Twitter', value: 'FaTwitter' },
                                                { label: 'Instagram', value: 'FaInstagram' },
                                                { label: 'Linkedin', value: 'FaLinkedin' },
                                                { label: 'Github', value: 'FaGithub' },
                                                { label: 'Youtube', value: 'FaYoutube' },
                                                { label: 'Google', value: 'FaGoogle' },
                                                { label: 'Whatsapp', value: 'FaWhatsapp' },
                                                // Dynamic option for imported icon - FA only
                                                // Exclude other React Icon prefixes to prevent mixing (e.g. CiAirportSign1 showing here)
                                                ...(getValue('icon') && !['Md','Ci','Bs','Io','Bi','Ai','Ri','Ti','Gi','Fi'].some(p => getValue('icon').startsWith(p)) && ![
                                                    'FaStar', 'FaHeart', 'FaUser', 'FaCheck', 
                                                    'FaFacebook', 'FaTwitter', 'FaInstagram', 
                                                    'FaLinkedin', 'FaGithub', 'FaYoutube', 
                                                    'FaGoogle', 'FaWhatsapp'
                                                ].includes(getValue('icon')) ? [{ label: getValue('icon'), value: getValue('icon') }] : [])
                                            ]}
                                        />
                                    ) : getValue('iconLib') === 'md' ? (
                                        <StyledSelect
                                            label="Icon"
                                            value={getValue('icon', 'MdStar')}
                                            onChange={(val) => handleChange('icon', val)}
                                            responsive={false}
                                            options={[
                                                { label: 'Star', value: 'MdStar' },
                                                { label: 'Favorite', value: 'MdFavorite' },
                                                { label: 'Person', value: 'MdPerson' },
                                                { label: 'Check', value: 'MdCheck' },
                                                { label: 'Menu', value: 'MdMenu' },
                                                { label: 'Close', value: 'MdClose' },
                                                { label: 'Home', value: 'MdHome' },
                                                { label: 'Settings', value: 'MdSettings' },
                                                { label: 'Search', value: 'MdSearch' },
                                                { label: 'Add', value: 'MdAdd' },
                                                { label: 'Delete', value: 'MdDelete' },
                                                { label: 'Edit', value: 'MdEdit' },
                                                // Dynamic option for imported icon - MD & other React Icons
                                                ...(getValue('icon') && (
                                                    // STRICT SEPARATION: Only allow icons with valid React Icon prefixes.
                                                    // This prevents Lucide icons (like 'Armchair') from showing up here.
                                                    ['Fa','Md','Ci','Bs','Io','Bi','Ai','Ri','Ti','Gi','Fi'].some(p => getValue('icon').startsWith(p))
                                                ) && ![
                                                    'MdStar', 'MdFavorite', 'MdPerson', 'MdCheck', 
                                                    'MdMenu', 'MdClose', 'MdHome', 'MdSettings', 
                                                    'MdSearch', 'MdAdd', 'MdDelete', 'MdEdit'
                                                ].includes(getValue('icon')) ? [{ label: getValue('icon'), value: getValue('icon') }] : [])
                                            ]}
                                        />
                                    ) : (
                                        <StyledSelect
                                            label="Icon"
                                            value={getValue('icon', 'Star')}
                                            onChange={(val) => handleChange('icon', val)}
                                            responsive={false}
                                            options={[
                                                { label: 'Star', value: 'Star' },
                                                { label: 'Heart', value: 'Heart' },
                                                { label: 'User', value: 'User' },
                                                { label: 'Check', value: 'Check' },
                                                // Dynamic option for imported icon - Others (Generic/Lucide)
                                                // STRICT EXCLUSION: Must NOT be any React Icon prefix
                                                ...(getValue('icon') && !['Fa','Md','Ci','Bs','Io','Bi','Ai','Ri','Ti','Gi','Fi'].some(p => getValue('icon').startsWith(p)) && ![
                                                    'Star', 'Heart', 'User', 'Check'
                                                ].includes(getValue('icon')) ? [{ label: getValue('icon'), value: getValue('icon') }] : [])
                                            ]}
                                        />
                                    )}
                                    {/* Manual Icon Import / Search */}
                                    <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                                        <IconImportModal 
                                            onImport={(importedName, library) => {
                                                const updates = {};
                                                if (library) updates.iconLib = library;
                                                updates.icon = importedName;
                                                console.log('[PropsPanel] onImport triggering update:', updates);
                                                onPropsChange(updates);
                                            }}
                                            currentLibrary={getValue('iconLib', 'fa')}
                                        />
                                    </div>
                                    <style jsx global>{`
                                        .icon-import-modal-overlay {
                                            position: fixed;
                                            top: 0;
                                            left: 0;
                                            width: 100vw;
                                            height: 100vh;
                                            background: rgba(0,0,0,0.5);
                                            z-index: 9999;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                        }
                                        .icon-import-modal {
                                            background: white;
                                            padding: 20px;
                                            border-radius: 8px;
                                            width: 400px;
                                            max-width: 90%;
                                            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                                        }
                                        .icon-import-textarea {
                                            width: 100%;
                                            height: 80px;
                                            margin: 10px 0;
                                            padding: 8px;
                                            border: 1px solid #ccc;
                                            border-radius: 4px;
                                            font-family: monospace;
                                            font-size: 12px;
                                        }
                                        .icon-import-btn {
                                            background: #3b82f6;
                                            color: white;
                                            border: none;
                                            padding: 8px 16px;
                                            border-radius: 4px;
                                            cursor: pointer;
                                            font-weight: 500;
                                        }
                                        .icon-import-btn:hover {
                                            background: #2563eb;
                                        }
                                        .icon-cancel-btn {
                                            background: transparent;
                                            color: #666;
                                            border: 1px solid #ccc;
                                            padding: 8px 16px;
                                            border-radius: 4px;
                                            cursor: pointer;
                                            margin-right: 10px;
                                        }
                                    `}</style>
                                </>
                            ) : (
                                <div style={{ marginTop: '10px' }}>
                                    <div style={{ marginBottom: '8px', fontSize: '13px', color: '#374151', fontWeight: 500 }}>Custom Icon File</div>
                                    
                                    {getValue('customIconSrc') ? (
                                        <div style={{ 
                                            border: '1px solid #e5e7eb', 
                                            borderRadius: '6px', 
                                            padding: '10px',
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '10px',
                                            background: '#f9fafb'
                                        }}>
                                            <img 
                                                src={getValue('customIconSrc')} 
                                                alt="Custom Icon" 
                                                style={{ width: '30px', height: '30px', objectFit: 'contain' }} 
                                            />
                                            <div style={{ flex: 1, fontSize: '12px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                Icon Loaded
                                            </div>
                                            <button 
                                                onClick={() => handleChange('customIconSrc', '')}
                                                style={{
                                                    background: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '4px 8px',
                                                    cursor: 'pointer',
                                                    fontSize: '11px'
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <label style={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            border: '1px dashed #d1d5db', 
                                            borderRadius: '6px', 
                                            padding: '20px', 
                                            cursor: 'pointer',
                                            background: '#fff',
                                            transition: 'border-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                                        >
                                            <div style={{ marginBottom: '5px', color: '#6b7280' }}>Click to Upload</div>
                                            <div style={{ fontSize: '11px', color: '#9ca3af' }}>JPG, PNG, SVG</div>
                                            <input 
                                                type="file" 
                                                accept=".jpg,.jpeg,.png,.svg,.webp" 
                                                style={{ display: 'none' }} 
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            handleChange('customIconSrc', reader.result);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                        </label>
                                    )}
                                </div>
                            )}
                             <StyledInput
                                label="Link"
                                value={getValue('link', '')}
                                onChange={(val) => handleChange('link', val)}
                                placeholder="https://..."
                                responsive={false}
                            />
                             <StyledSelect
                                label="View"
                                value={getValue('view', 'default')}
                                onChange={(val) => handleChange('view', val)}
                                responsive={false}
                                options={[
                                    { label: 'Default', value: 'default' },
                                    { label: 'Stacked', value: 'stacked' },
                                    { label: 'Framed', value: 'framed' }
                                ]}
                             />
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
                        </Section>
                    )}

                    {activeTab === 'style' && (
                        <Section title="Icon Style">
                             <StyledInput
                                label="Size (px)"
                                value={getValue('size', '50')}
                                onChange={(val) => handleChange('size', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                            />
                             <StyledInput
                                label="Primary Color"
                                value={getValue('primaryColor', '#3b82f6')}
                                onChange={(val) => handleChange('primaryColor', val)}
                                responsive={false}
                                placeholder="#3b82f6"
                            />
                            {getValue('view') !== 'default' && (
                                <>
                                 <StyledInput
                                    label="Secondary Color (Background)"
                                    value={getValue('secondaryColor', '#ffffff')}
                                    onChange={(val) => handleChange('secondaryColor', val)}
                                    responsive={false}
                                    placeholder="#ffffff"
                                />
                                 <StyledInput
                                    label="Padding"
                                    value={getValue('padding', '15px')}
                                    onChange={(val) => handleChange('padding', val)}
                                    responsive={true}
                                    activeViewMode={viewMode}
                                />
                                <StyledInput
                                    label="Border Radius"
                                    value={getValue('borderRadius', '50%')}
                                    onChange={(val) => handleChange('borderRadius', val)}
                                    responsive={true}
                                    activeViewMode={viewMode}
                                />
                                </>
                            )}
                             <StyledInput
                                label="Rotate (deg)"
                                value={getValue('rotate', '0')}
                                onChange={(val) => handleChange('rotate', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                            />
                        </Section>
                    )}

                    {activeTab === 'advanced' && (
                        <Section title="Hover Animation">
                            <StyledSelect
                                label="Hover Animation"
                                value={getValue('hoverAnimation', '')}
                                onChange={(val) => handleChange('hoverAnimation', val)}
                                responsive={false}
                                options={[
                                    { label: 'None', value: '' },
                                    { label: 'Grow', value: 'grow' },
                                    { label: 'Shrink', value: 'shrink' },
                                    { label: 'Rotate', value: 'rotate' },
                                    { label: 'Buzz', value: 'buzz' }
                                ]}
                            />
                        </Section>
                    )}
                 </>
        )}


        {activeTab === 'layout' && !isContainer && block.type !== WIDGET_TYPES.TEXT && block.type !== WIDGET_TYPES.ICON && (
          <Section title={config?.name || 'Content'}>
            
            {/* If cmsConfig exists and has props, use it to generate controls */ }
            {config && config.props && Object.keys(config.props).length > 0 ? (
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
                        label="Icon Source"
                        value={getValue('iconLib', 'lucide')}
                        onChange={(val) => {
                            handleChange('iconLib', val);
                             // Reset icon when library changes to prevent mixing
                            if (val === 'custom') handleChange('customIconSrc', '');
                            else if (val === 'fa') handleChange('icon', 'FaStar');
                            else if (val === 'md') handleChange('icon', 'MdStar');
                            else handleChange('icon', 'Star');
                        }}
                        responsive={false}
                        options={[
                            { label: 'Lucide Icons', value: 'lucide' },
                            { label: 'FontAwesome', value: 'fa' },
                            { label: 'React Icons', value: 'md' },
                            { label: 'Custom icon', value: 'custom' }
                        ]}
                    />

                    {getValue('iconLib') === 'custom' ? (
                                <div style={{ marginTop: '10px' }}>
                                    <div style={{ marginBottom: '8px', fontSize: '13px', color: '#374151', fontWeight: 500 }}>Custom Icon File</div>
                                    
                                    {getValue('customIconSrc') ? (
                                        <div style={{ 
                                            border: '1px solid #e5e7eb', 
                                            borderRadius: '6px', 
                                            padding: '10px',
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '10px',
                                            background: '#f9fafb'
                                        }}>
                                            <img 
                                                src={getValue('customIconSrc')} 
                                                alt="Custom Icon" 
                                                style={{ width: '30px', height: '30px', objectFit: 'contain' }} 
                                            />
                                            <div style={{ flex: 1, fontSize: '12px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                Icon Loaded
                                            </div>
                                            <button 
                                                onClick={() => handleChange('customIconSrc', '')}
                                                style={{
                                                    background: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '4px 8px',
                                                    cursor: 'pointer',
                                                    fontSize: '11px'
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <label style={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            border: '1px dashed #d1d5db', 
                                            borderRadius: '6px', 
                                            padding: '20px', 
                                            cursor: 'pointer',
                                            background: '#fff',
                                            transition: 'border-color 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                                        onMouseLeave={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                                        >
                                            <div style={{ marginBottom: '5px', color: '#6b7280' }}>Click to Upload</div>
                                            <div style={{ fontSize: '11px', color: '#9ca3af' }}>JPG, PNG, SVG</div>
                                            <input 
                                                type="file" 
                                                accept=".jpg,.jpeg,.png,.svg,.webp" 
                                                style={{ display: 'none' }} 
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            handleChange('customIconSrc', reader.result);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                        </label>
                                    )}
                                </div>
                    ) : (
                        <>
                             {/* Import Modal Trigger */}
                             <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                                <IconImportModal 
                                    onImport={(importedLib, importedIcon) => {
                                         // Atomic update
                                         onPropsChange({
                                             iconLib: importedLib,
                                             icon: importedIcon
                                         });
                                    }}
                                    currentLibrary={getValue('iconLib', 'lucide')}
                                />
                            </div>

                            {/* Dynamic Icon Dropdown based on Library */}
                            {getValue('iconLib') === 'fa' ? (
                                <StyledSelect
                                    label="Icon"
                                    value={getValue('icon', 'FaStar')}
                                    onChange={(val) => handleChange('icon', val)}
                                    responsive={false}
                                    options={[
                                        { label: 'Star', value: 'FaStar' },
                                        { label: 'Heart', value: 'FaHeart' },
                                        { label: 'User', value: 'FaUser' },
                                        { label: 'Check', value: 'FaCheck' },
                                        { label: 'Facebook', value: 'FaFacebook' },
                                        { label: 'Twitter', value: 'FaTwitter' },
                                        { label: 'Instagram', value: 'FaInstagram' },
                                        { label: 'Linkedin', value: 'FaLinkedin' },
                                        { label: 'Github', value: 'FaGithub' },
                                        // Dynamic option for imported icon - FA only
                                        // Exclude other React Icon prefixes to prevent mixing
                                        ...(getValue('icon') && !['Md','Ci','Bs','Io','Bi','Ai','Ri','Ti','Gi','Fi'].some(p => getValue('icon').startsWith(p)) && ![
                                            'FaStar', 'FaHeart', 'FaUser', 'FaCheck', 
                                            'FaFacebook', 'FaTwitter', 'FaInstagram', 
                                            'FaLinkedin', 'FaGithub'
                                        ].includes(getValue('icon')) ? [{ label: getValue('icon'), value: getValue('icon') }] : [])
                                    ]}
                                />
                            ) : getValue('iconLib') === 'md' ? (
                                <StyledSelect
                                    label="Icon"
                                    value={getValue('icon', 'MdStar')}
                                    onChange={(val) => handleChange('icon', val)}
                                    responsive={false}
                                    options={[
                                        { label: 'Star', value: 'MdStar' },
                                        { label: 'Favorite', value: 'MdFavorite' },
                                        { label: 'Person', value: 'MdPerson' },
                                        { label: 'Check', value: 'MdCheck' },
                                        { label: 'Menu', value: 'MdMenu' },
                                        { label: 'Close', value: 'MdClose' },
                                        // Dynamic option for imported icon - MD & other React Icons
                                        ...(getValue('icon') && (
                                            // STRICT SEPARATION: Only allow icons with valid React Icon prefixes.
                                            ['Fa','Md','Ci','Bs','Io','Bi','Ai','Ri','Ti','Gi','Fi'].some(p => getValue('icon').startsWith(p))
                                        ) && ![
                                            'MdStar', 'MdFavorite', 'MdPerson', 'MdCheck', 
                                            'MdMenu', 'MdClose'
                                        ].includes(getValue('icon')) ? [{ label: getValue('icon'), value: getValue('icon') }] : [])
                                    ]}
                                />
                            ) : (
                                <StyledSelect
                                    label="Icon"
                                    value={getValue('icon', 'Star')}
                                    onChange={(val) => handleChange('icon', val)}
                                    responsive={false}
                                    options={[
                                        { label: 'Star', value: 'Star' },
                                        { label: 'Heart', value: 'Heart' },
                                        { label: 'User', value: 'User' },
                                        { label: 'Check', value: 'Check' },
                                        { label: 'Truck', value: 'Truck' },
                                        { label: 'Shield', value: 'Shield' },
                                        { label: 'Settings', value: 'Settings' },
                                        { label: 'Home', value: 'Home' },
                                        { label: 'ShoppingBag', value: 'ShoppingBag' },
                                        { label: 'Phone', value: 'Phone' },
                                        { label: 'Mail', value: 'Mail' },
                                        // Dynamic option for imported icon - Others (Generic/Lucide)
                                        // STRICT EXCLUSION: Must NOT be any React Icon prefix
                                        ...(getValue('icon') && !['Fa','Md','Ci','Bs','Io','Bi','Ai','Ri','Ti','Gi','Fi'].some(p => getValue('icon').startsWith(p)) && ![
                                            'Star', 'Heart', 'User', 'Check', 'Truck', 'Shield', 'Settings', 'Home', 'ShoppingBag', 'Phone', 'Mail'
                                        ].includes(getValue('icon')) ? [{ label: getValue('icon'), value: getValue('icon') }] : [])
                                    ]}
                                />
                            )}
                        </>
                    )}
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
                    <StyledSelect
                        label="Title HTML Tag"
                        value={getValue('titleTag', 'h3')}
                        onChange={(val) => handleChange('titleTag', val)}
                        responsive={false}
                        options={[
                            { label: 'H1', value: 'h1' },
                            { label: 'H2', value: 'h2' },
                            { label: 'H3', value: 'h3' },
                            { label: 'H4', value: 'h4' },
                            { label: 'H5', value: 'h5' },
                            { label: 'H6', value: 'h6' },
                            { label: 'Div', value: 'div' },
                            { label: 'Span', value: 'span' },
                            { label: 'P', value: 'p' }
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
                      <div className={styles.formGroup} style={{ border: '1px solid #e5e7eb', padding: '10px', borderRadius: '6px', background: '#f9fafb' }}>
                         {/* Text Input */}
                         <div style={{ marginBottom: '10px' }}>
                             <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#374151' }}>Text</label>
                             <input 
                                className={styles.input} 
                                value={item.text} 
                                onChange={(e) => onChangeItem({ text: e.target.value })}
                                placeholder="Text"
                                style={{ width: '100%', marginBottom: '8px' }}
                             />
                         </div>

                         {/* Link Input */}
                         <div style={{ marginBottom: '10px' }}>
                             <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#374151' }}>Link</label>
                             <input 
                                className={styles.input} 
                                value={item.link || ''} 
                                onChange={(e) => onChangeItem({ link: e.target.value })}
                                placeholder="#"
                                style={{ width: '100%', marginBottom: '8px' }}
                             />
                         </div>

                         {/* Divider */}
                         <div style={{ height: '1px', background: '#e5e7eb', margin: '10px 0' }}></div>

                         {/* ICON CONTROLS FOR LIST ITEM */}
                         
                         {/* 1. Source Selector */}
                         <StyledSelect
                             label="Icon Source"
                             value={['fa', 'md', 'lucide'].includes(item.iconLib) ? 'library' : (item.iconLib === 'custom' ? 'custom' : 'library')}
                             onChange={(val) => {
                                 if (val === 'custom') {
                                     onChangeItem({ iconLib: 'custom', iconType: 'custom' });
                                 } else {
                                     onChangeItem({ iconLib: 'fa', iconType: 'library' }); // Default to FA when switching back
                                 }
                             }}
                             responsive={false}
                             options={[
                                 { label: 'Icon Library', value: 'library' },
                                 { label: 'Custom icon', value: 'custom' }
                             ]}
                         />

                         {/* 2. Library Logic */}
                         {(!item.iconLib || ['fa', 'md', 'lucide'].includes(item.iconLib)) && (
                             <StyledSelect
                                 label="Library"
                                 value={item.iconLib || 'lucide'}
                                 onChange={(val) => onChangeItem({ iconLib: val })}
                                 responsive={false}
                                 options={[
                                     { label: 'Lucide (Default)', value: 'lucide' },
                                     { label: 'FontAwesome', value: 'fa' },
                                     { label: 'Material Design', value: 'md' }
                                 ]}
                             />
                         )}

                         {/* 3. Icon Selector / Upload */}
                         {item.iconLib === 'custom' ? (
                            <div style={{ marginTop: '10px' }}>
                                <div style={{ marginBottom: '8px', fontSize: '13px', color: '#374151', fontWeight: 500 }}>Custom Icon File</div>
                                {item.customIconSrc ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '10px', border: '1px solid #eee', borderRadius: '6px' }}>
                                        <img src={item.customIconSrc} alt="Icon" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                                        <div style={{ flex: 1, fontSize: '12px', color: '#4b5563' }}>Icon Loaded</div>
                                        <button 
                                            onClick={() => onChangeItem({ customIconSrc: '' })}
                                            style={{ padding: '4px 8px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d1d5db', borderRadius: '6px', padding: '15px', cursor: 'pointer', background: '#fff' }}>
                                        <div style={{ marginBottom: '5px', color: '#6b7280', fontSize: '12px' }}>Click to Upload</div>
                                        <input 
                                            type="file" 
                                            accept=".jpg,.jpeg,.png,.svg,.webp" 
                                            style={{ display: 'none' }} 
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        onChangeItem({ customIconSrc: reader.result });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                )}
                            </div>
                         ) : (
                             <>
                                {/* Import Modal for Item */}
                                <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                                    <IconImportModal 
                                        onImport={(importedLib, importedIcon) => {
                                             onChangeItem({ iconLib: importedLib, icon: importedIcon });
                                        }}
                                        currentLibrary={item.iconLib || 'lucide'}
                                    />
                                </div>
                                
                                {/* Strict Icon Dropdowns based on item.iconLib */}
                                {item.iconLib === 'fa' ? (
                                    <StyledSelect
                                        label="Icon"
                                        value={item.icon || 'FaStar'}
                                        onChange={(val) => onChangeItem({ icon: val })}
                                        responsive={false}
                                        options={[
                                            { label: 'Star', value: 'FaStar' },
                                            { label: 'Check', value: 'FaCheck' },
                                            { label: 'User', value: 'FaUser' },
                                            // Dynamic option for imported icon - FA only
                                            ...(item.icon && !['Md','Ci','Bs','Io','Bi','Ai','Ri','Ti','Gi','Fi'].some(p => item.icon.startsWith(p)) && 
                                               !['FaStar', 'FaCheck', 'FaUser'].includes(item.icon) 
                                               ? [{ label: item.icon, value: item.icon }] : [])
                                        ]}
                                    />
                                ) : item.iconLib === 'md' ? (
                                    <StyledSelect
                                        label="Icon"
                                        value={item.icon || 'MdStar'}
                                        onChange={(val) => onChangeItem({ icon: val })}
                                        responsive={false}
                                        options={[
                                            { label: 'Star', value: 'MdStar' },
                                            { label: 'Check', value: 'MdCheck' },
                                            { label: 'Person', value: 'MdPerson' },
                                            // Dynamic option for imported icon - MD only
                                            ...(item.icon && ['Fa','Md','Ci','Bs','Io','Bi','Ai','Ri','Ti','Gi','Fi'].some(p => item.icon.startsWith(p)) && 
                                               !['MdStar', 'MdCheck', 'MdPerson'].includes(item.icon) 
                                               ? [{ label: item.icon, value: item.icon }] : [])
                                        ]}
                                    />
                                ) : (
                                    <StyledSelect
                                        label="Icon"
                                        value={item.icon || 'Check'}
                                        onChange={(val) => onChangeItem({ icon: val })}
                                        responsive={false}
                                        options={[
                                            { label: 'Check', value: 'Check' },
                                            { label: 'Star', value: 'Star' },
                                            { label: 'ArrowRight', value: 'ArrowRight' },
                                            // Dynamic option for imported icon - Lucide/Generic
                                            ...(item.icon && !['Fa','Md','Ci','Bs','Io','Bi','Ai','Ri','Ti','Gi','Fi'].some(p => item.icon.startsWith(p)) && 
                                               !['Check', 'Star', 'ArrowRight'].includes(item.icon) 
                                               ? [{ label: item.icon, value: item.icon }] : [])
                                        ]}
                                    />
                                )}
                             </>
                         )}
                      </div>
                    )}
                  />

                  <StyledSelect
                      label="View"
                      value={getValue('view', 'default')}
                      onChange={(val) => handleChange('view', val)}
                      responsive={false}
                      options={[
                          { label: 'Default', value: 'default' },
                          { label: 'Stacked', value: 'stacked' },
                          { label: 'Framed', value: 'framed' }
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
                    <div style={{ marginTop: '10px', marginBottom: '15px' }}>
                        <label className={styles.inputLabel} style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#6b7280' }}>
                            Or Upload Image
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                             <button
                                onClick={() => document.getElementById('image-box-upload-input').click()}
                                disabled={isUploading}
                                style={{
                                    background: isUploading ? '#e5e7eb' : '#eff6ff',
                                    color: isUploading ? '#9ca3af' : '#3b82f6',
                                    border: '1px dashed #bfdbfe',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    cursor: isUploading ? 'not-allowed' : 'pointer',
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    width: '100%',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {isUploading ? (
                                    <>
                                        <div className="spinner" style={{ width: '14px', height: '14px', border: '2px solid #9ca3af', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <LucideIcons.Upload size={14} />
                                        Upload from Computer
                                    </>
                                )}
                            </button>
                            <input
                                id="image-box-upload-input"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleImageUpload(e, 'imageSrc')}
                            />
                        </div>
                    </div>
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
                    <StyledSelect
                        label="Title HTML Tag"
                        value={getValue('titleTag', 'h3')}
                        onChange={(val) => handleChange('titleTag', val)}
                        responsive={false}
                        options={[
                            { label: 'H1', value: 'h1' },
                            { label: 'H2', value: 'h2' },
                            { label: 'H3', value: 'h3' },
                            { label: 'H4', value: 'h4' },
                            { label: 'H5', value: 'h5' },
                            { label: 'H6', value: 'h6' },
                            { label: 'Div', value: 'div' },
                            { label: 'Span', value: 'span' },
                            { label: 'P', value: 'p' }
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
                    {activeTab === 'layout' && (
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
                    )}

                    {activeTab === 'style' && (
                        <Section title="Typography">
                             <StyledInput
                                label="Text Color"
                                value={getValue('color', '')}
                                onChange={(val) => handleChange('color', val)}
                                responsive={false}
                                placeholder="Inherit"
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
                                    { value: 'justify', label: 'Justify', icon: <AlignEndVertical size={16} /> } 
                                ]}
                            />
                             <StyledInput
                                label="Font Size"
                                value={getValue('fontSize', '')}
                                onChange={(val) => handleChange('fontSize', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                                placeholder="16px"
                            />
                             <StyledSelect
                                label="Font Weight"
                                value={getValue('fontWeight', '')}
                                onChange={(val) => handleChange('fontWeight', val)}
                                responsive={false}
                                options={[
                                    { label: 'Default', value: '' },
                                    { label: 'Normal (400)', value: '400' },
                                    { label: 'Bold (700)', value: '700' },
                                    { label: 'Light (300)', value: '300' },
                                    { label: 'Extra Bold (800)', value: '800' }
                                ]}
                            />
                             <StyledInput
                                label="Line Height"
                                value={getValue('lineHeight', '')}
                                onChange={(val) => handleChange('lineHeight', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                                placeholder="1.5"
                            />
                             <StyledInput
                                label="Letter Spacing"
                                value={getValue('letterSpacing', '')}
                                onChange={(val) => handleChange('letterSpacing', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                                placeholder="0px"
                            />
                        </Section>
                    )}
                    
                    {activeTab === 'advanced' && (
                         <Section title="Spacing">
                            <StyledInput
                                label="Margin"
                                value={getValue('margin', '')}
                                onChange={(val) => handleChange('margin', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                                placeholder="0px"
                            />
                            <StyledInput
                                label="Padding"
                                value={getValue('padding', '')}
                                onChange={(val) => handleChange('padding', val)}
                                responsive={true}
                                activeViewMode={viewMode}
                                placeholder="0px"
                            />
                             <StyledInput
                                label="Z-Index"
                                value={getValue('zIndex', '')}
                                onChange={(val) => handleChange('zIndex', val)}
                                responsive={false}
                                placeholder="auto"
                            />
                         </Section>
                    )}
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
                     <div style={{ marginTop: '10px', marginBottom: '15px' }}>
                        <label className={styles.inputLabel} style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#6b7280' }}>
                            Or Upload Image
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                             <button
                                onClick={() => document.getElementById('image-upload-input').click()}
                                disabled={isUploading}
                                style={{
                                    background: isUploading ? '#e5e7eb' : '#eff6ff',
                                    color: isUploading ? '#9ca3af' : '#3b82f6',
                                    border: '1px dashed #bfdbfe',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    cursor: isUploading ? 'not-allowed' : 'pointer',
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    width: '100%',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {isUploading ? (
                                    <>
                                        <div className="spinner" style={{ width: '14px', height: '14px', border: '2px solid #9ca3af', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <LucideIcons.Upload size={14} />
                                        Upload from Computer
                                    </>
                                )}
                            </button>
                            <input
                                id="image-upload-input"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => handleImageUpload(e, 'src')}
                            />
                        </div>
                    </div>
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
            ) : block.type === WIDGET_TYPES.IMAGE_GALLERY ? (
                <>
                    <Repeater
                        label="Images"
                        items={getValue('images', [])}
                        onChange={(newItems) => handleChange('images', newItems)}
                        defaultItem={{ src: 'https://placehold.co/600x400', alt: 'Gallery Image' }}
                        renderItem={(item, index, onChangeItem) => (
                           <div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Image Source</label>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <input 
                                            type="text" 
                                            value={item.src} 
                                            onChange={(e) => onChangeItem({ src: e.target.value })}
                                            className={styles.input}
                                            style={{ flex: 1 }}
                                            placeholder="https://..."
                                        />
                                        <button
                                            onClick={() => document.getElementById(`gallery-upload-${index}`).click()}
                                            disabled={isUploading}
                                            style={{
                                                background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px',
                                                color: '#3b82f6', padding: '0 8px', cursor: 'pointer'
                                            }}
                                            title="Upload"
                                        >
                                            <LucideIcons.Upload size={14} />
                                        </button>
                                        <input
                                            id={`gallery-upload-${index}`}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if(!file) return;
                                                setIsUploading(true);
                                                try {
                                                    const data = await uploadFile(file);
                                                    onChangeItem({ src: data.url });
                                                } catch(err) {
                                                    alert('Upload failed');
                                                } finally {
                                                    setIsUploading(false);
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Alt Text</label>
                                    <input 
                                        type="text" 
                                        value={item.alt || ''} 
                                        onChange={(e) => onChangeItem({ alt: e.target.value })}
                                        className={styles.input}
                                        placeholder="Image description"
                                    />
                                </div>
                           </div> 
                        )}
                    />

                    <Section title="Layout Settings">
                        <StyledSelect
                            label="Layout Mode"
                            value={getValue('layout', 'grid')}
                            onChange={(val) => handleChange('layout', val)}
                            responsive={false}
                            options={[
                                { label: 'Grid', value: 'grid' },
                                { label: 'Masonry', value: 'masonry' },
                                { label: 'Justified', value: 'justified' }
                            ]}
                        />
                        <StyledInput
                            label="Columns"
                            value={getValue('columns', '4')}
                            onChange={(val) => handleChange('columns', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                            placeholder="4"
                        />
                        <StyledInput
                            label="Gap"
                            value={getValue('gap', '15px')}
                            onChange={(val) => handleChange('gap', val)}
                            responsive={true}
                            activeViewMode={viewMode}
                            placeholder="15px"
                        />
                        
                        {getValue('layout', 'grid') === 'grid' && (
                             <StyledSelect
                                label="Aspect Ratio"
                                value={getValue('aspectRatio', '1/1')}
                                onChange={(val) => handleChange('aspectRatio', val)}
                                responsive={false}
                                options={[
                                    { label: 'Square (1:1)', value: '1/1' },
                                    { label: 'Standard (4:3)', value: '4/3' },
                                    { label: 'Portrait (3:4)', value: '3/4' },
                                    { label: 'Wide (16:9)', value: '16/9' },
                                    { label: 'Auto', value: 'auto' }
                                ]}
                            />
                        )}

                        {getValue('layout') === 'justified' && (
                            <StyledInput
                                label="Row Height"
                                value={getValue('rowHeight', '200px')}
                                onChange={(val) => handleChange('rowHeight', val)}
                                placeholder="200px"
                                responsive={true}
                                activeViewMode={viewMode}
                            />
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span className={styles.labelText}>Random Order</span>
                             <input 
                                type="checkbox"
                                checked={getValue('shuffle', false)}
                                onChange={(e) => handleChange('shuffle', e.target.checked)}
                            />
                        </div>
                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span className={styles.labelText}>Lazy Load</span>
                             <input 
                                type="checkbox"
                                checked={getValue('lazyLoad', true)}
                                onChange={(e) => handleChange('lazyLoad', e.target.checked)}
                            />
                        </div>
                         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span className={styles.labelText}>Enable Lightbox</span>
                             <input 
                                type="checkbox"
                                checked={getValue('enableLightbox', true)}
                                onChange={(e) => handleChange('enableLightbox', e.target.checked)}
                            />
                        </div>
                    </Section>
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

            {block.type === WIDGET_TYPES.IMAGE_GALLERY && (
                <Section title="Gallery Styles">
                     <StyledInput
                        label="Border Radius"
                        value={getValue('borderRadius', '0px')}
                        onChange={(val) => handleChange('borderRadius', val)}
                        placeholder="0px"
                        responsive={true}
                         activeViewMode={viewMode}
                    />
                     <StyledSelect
                        label="Shadow"
                        value={getValue('shadow', 'none')}
                        onChange={(val) => handleChange('shadow', val)}
                        responsive={false}
                        options={[
                            { label: 'None', value: 'none' },
                            { label: 'Small', value: 'small' },
                            { label: 'Medium', value: 'medium' },
                            { label: 'Large', value: 'large' }
                        ]}
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
