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

  // Pass resolved settings and id to the actual component
  return (
    <div data-widget-id={id} className="widget-wrapper" style={{ marginBottom: '1rem' }}>
      <WidgetComponent settings={resolvedSettings} />
    </div>
  );
}
