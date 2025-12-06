import React from 'react';
import WidgetRenderer from './WidgetRenderer';

/**
 * ContainerRenderer
 * Renders a container (usually a column or a flex box) and iterates over its children widgets.
 */
export default function ContainerRenderer({ container }) {
  if (!container) return null;

  const { settings, widgets = [], id } = container;
  const { 
    width = '100%', 
    padding = '0', 
    backgroundColor = 'transparent',
    direction = 'column', // row or column
    gap = '10px'
  } = settings || {};

  const style = {
    width: width,
    padding: padding,
    backgroundColor: backgroundColor,
    display: 'flex',
    flexDirection: direction,
    gap: gap,
    minHeight: '50px', // Visual cue for empty containers
    boxSizing: 'border-box',
    backgroundImage: settings?.backgroundImage,
    backgroundSize: settings?.backgroundSize || 'cover',
    backgroundPosition: settings?.backgroundPosition || 'center',
    alignItems: settings?.alignItems || 'flex-start',
    justifyContent: settings?.justifyContent || 'flex-start',
    textAlign: settings?.textAlign || 'left',
  };

  return (
    <div data-container-id={id} className="builder-container" style={style}>
      {children ? children : widgets.map(widget => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
