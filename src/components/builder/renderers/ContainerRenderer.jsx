import React from 'react';
import WidgetRenderer from './WidgetRenderer';
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';
import { Plus } from 'lucide-react';

/**
 * CONTAINER RENDERER - ZERO BASED REWRITE
 * Implementação puramente baseada em CSS Flexbox.
 * Sem lógicas ocultas. O que está nas props é aplicado no style.
 */
export default function ContainerRenderer({ container, children }) {
  const viewMode = useAtomValue(viewModeAtom);

  if (!container) return null;

  // 1. Extrair settings
  const { settings, widgets = [], id } = container;
  
  // 2. Helper para responsividade
  const getProp = (key, defaultValue) => {
    const val = resolveResponsiveProp(settings?.[key], viewMode);
    return val !== undefined && val !== null && val !== '' ? val : defaultValue;
  };

  // 3. Determinar se está vazio
  const isEmpty = !children && (!widgets || widgets.length === 0);

  // 4. Construir estilo do Container (CSS Puro)
  const flexStyles = {
    display: 'flex',
    // Flex Direction (row/column) - Padrão Column
    flexDirection: getProp('direction', 'column'),
    // Justify Content (Main Axis) - Padrão Flex Start
    justifyContent: getProp('justifyContent', 'flex-start'),
    // Align Items (Cross Axis) - Padrão Stretch (Elementor Behavior)
    alignItems: getProp('alignItems', 'stretch'),
    // Wrap
    flexWrap: getProp('wrap', 'nowrap'),
    // Gap
    gap: getProp('gap', '10px'),
  };

  const boxStyles = {
    width: getProp('width', '100%'),
    minHeight: getProp('minHeight', 'auto'), // Sem altura mínima forçada se não estiver vazio
    padding: getProp('padding', '20px'),
    backgroundColor: getProp('backgroundColor', 'transparent'),
    boxSizing: 'border-box',
    position: 'relative',
  };

  // 5. Placeholder se estiver vazio
  if (isEmpty) {
    return (
      <div 
        data-container-id={id}
        className="builder-container empty"
        style={{
          ...boxStyles,
          ...flexStyles,
          minHeight: '100px', // Altura visual para drop zone
          border: '1px dashed #ccc',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Plus size={24} color="#ccc" />
        <span style={{ color: '#ccc', fontSize: '12px' }}>Container Vazio</span>
      </div>
    );
  }

  // 6. Debug Log (para o usuário ver o que está acontecendo)
  console.log(`[Container ${id}] Styles Applied:`, flexStyles);

  // 7. Renderização Normal
  return (
    <div 
      data-container-id={id}
      className="builder-container"
      style={{
        ...boxStyles,
        ...flexStyles,
        // Bordas de debug opcionais (remova em produção)
        // outline: '1px solid rgba(0,0,0,0.1)'
      }}
    >
      {/* Se children existir (durante drag), renderiza children. Senão mapeia widgets */}
      {children ? children : widgets.map(widget => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
