import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';
import { getWidgetComponent } from '../WidgetRegistry';

/**
 * WidgetRenderer
 * Responsible for rendering a single atomic widget.
 * It looks up the correct React component based on the widget type.
 */
export default function WidgetRenderer({ widget }) {
  const viewMode = useAtomValue(viewModeAtom);
  
  if (!widget) return null;

  const { type, settings, id } = widget;
  const WidgetComponent = getWidgetComponent(type);

  if (!WidgetComponent) {
    console.warn(`Unknown widget type: ${type}`);
    return <div style={{ color: 'red', padding: '10px', border: '1px dashed red' }}>Unknown Widget: {type}</div>;
  }

  // Resolve responsive settings
  const resolvedSettings = settings ? Object.entries(settings).reduce((acc, [key, value]) => {
    acc[key] = resolveResponsiveProp(value, viewMode);
    return acc;
  }, {}) : {};

  // Extract Layout Props to apply to wrapper
  const wrapperStyle = {
    // Layout
    width: resolvedSettings.width || '100%',
    flexGrow: resolvedSettings.flexGrow || 0,
    alignSelf: resolvedSettings.alignSelf || 'auto',
    gridColumn: resolvedSettings.gridColumn || 'auto',
    gridRow: resolvedSettings.gridRow || 'auto',
    // Visual
    boxSizing: 'border-box'
  };

  // Pass resolved settings and id to the actual component
  return (
    <div data-widget-id={id} className="widget-wrapper" style={wrapperStyle}>
      <WidgetComponent settings={resolvedSettings} />
    </div>
  );
}
