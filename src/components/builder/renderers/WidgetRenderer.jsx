import React from 'react';
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';
import { getWidgetComponent } from '../WidgetRegistry';

/**
 * WIDGET RENDERER - ZERO BASED REWRITE
 * Wrapper simples que aplica largura/altura e deixa o conteúdo fluir.
 */
export default function WidgetRenderer({ widget, parentDirection = 'column' }) {
  const viewMode = useAtomValue(viewModeAtom);

  if (!widget) return null;

  const { type, settings, id } = widget;
  const WidgetComponent = getWidgetComponent(type);

  if (!WidgetComponent) {
    return <div>Widget desconhecido: {type}</div>;
  }

  // 1. Resolver responsividade das settings
  const resolvedSettings = settings ? Object.entries(settings).reduce((acc, [key, value]) => {
    const val = resolveResponsiveProp(value, viewMode);
    // Treat empty string as undefined to allow defaults/fallbacks
    acc[key] = val !== '' ? val : undefined;
    return acc;
  }, {}) : {};

  // 2. Estilo do Wrapper
  // Mapear alinhamento horizontal (align) para alignSelf APENAS se o pai for Column.
  // Se o pai for Row, align-self controlaria o alinhamento Vertical, o que conflita com o 
  // alinhamento vertical global (align-items) do contêiner.
  const alignMap = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end',
    'stretch': 'stretch'
  };

  // Se direction for row, deixamos alignSelf como auto para que o alignItems do pai controle a vertical.
  const isColumn = parentDirection.includes('column');
  const alignSelf = isColumn 
    ? (alignMap[resolvedSettings.align] || resolvedSettings.alignSelf || 'auto')
    : 'auto';

  const wrapperStyle = {
    width: resolvedSettings.width || 'auto', 
    height: resolvedSettings.height || 'auto',
    alignSelf: alignSelf,
    flexGrow: resolvedSettings.flexGrow || 0,
    boxSizing: 'border-box'
  };

  return (
    <div 
      data-widget-id={id} 
      className="widget-wrapper"
      style={wrapperStyle}
    >
      <WidgetComponent settings={resolvedSettings} />
    </div>
  );
}
