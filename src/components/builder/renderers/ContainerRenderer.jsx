import React from 'react';
import WidgetRenderer from './WidgetRenderer';
import { useViewMode, resolveResponsiveProp } from '@/components/builder/context/ViewModeContext';

/**
 * ContainerRenderer
 * Renders a container (usually a column or a flex box) and iterates over its children widgets.
 */
export default function ContainerRenderer({ container }) {
  const viewMode = useViewMode();

  if (!container) return null;

  const { settings, widgets = [], children, id } = container;

  const getProp = (key, fallback) => {
    return resolveResponsiveProp(settings?.[key], viewMode) || fallback;
  };

  const style = {
    width: getProp('width', '100%'),
    padding: getProp('padding', '0'),
    backgroundColor: getProp('backgroundColor', 'transparent'),
    display: 'flex',
    flexDirection: getProp('direction', 'column'),
    gap: getProp('gap', '10px'),
    minHeight: '50px', // Visual cue for empty containers
    boxSizing: 'border-box',
    backgroundImage: getProp('backgroundImage'),
    backgroundSize: getProp('backgroundSize', 'cover'),
    backgroundPosition: getProp('backgroundPosition', 'center'),
    alignItems: getProp('alignItems', 'flex-start'),
    justifyContent: getProp('justifyContent', 'flex-start'),
    textAlign: getProp('textAlign', 'left'),
  };

  return (
    <div data-container-id={id} className="builder-container" style={style}>
      {children ? children : widgets.map(widget => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
