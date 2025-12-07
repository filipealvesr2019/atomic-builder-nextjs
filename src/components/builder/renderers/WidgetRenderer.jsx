import React from 'react';
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';
import { getWidgetComponent } from '../WidgetRegistry';

/**
 * WIDGET RENDERER - ZERO BASED REWRITE
 * Wrapper simples que aplica largura/altura e deixa o conteúdo fluir.
 */
export default function WidgetRenderer({ widget }) {
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
  // IMPORTANTE: width padrão é 'auto' para permitir que o Flexbox do pai controle (align-items).
  // Se o usuário definir width explícito, usamos ele.
  const wrapperStyle = {
    width: resolvedSettings.width || 'auto', 
    height: resolvedSettings.height || 'auto',
    alignSelf: resolvedSettings.alignSelf || 'auto',
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
