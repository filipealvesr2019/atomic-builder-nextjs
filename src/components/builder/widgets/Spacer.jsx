import React from 'react';
import { useAtomValue } from 'jotai';
import { resolveResponsiveProp, viewModeAtom } from '@/store/viewModeStore';

export default function SpacerWidget({ settings }) {
  const viewMode = useAtomValue(viewModeAtom);

  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    return val !== undefined && val !== null && val !== '' ? val : defaultValue;
  };

  const padding = getProp('padding', '50px');
  
  // Optional background for visibility debug, or transparent by default
  // Ideally spacer is invisible, but sometimes users might want a colored block.
  // For now, let's keep it simple as just space.
  const backgroundColor = getProp('backgroundColor', 'transparent');

  const width = getProp('width', '100%');
  const hasBackground = backgroundColor && backgroundColor !== 'transparent';

  return (
    <div 
      style={{
        padding: padding, 
        backgroundColor: hasBackground ? backgroundColor : 'rgba(0, 0, 0, 0.02)',
        width: width,
        minWidth: '1px', 
        border: '1px dashed rgba(0, 0, 0, 0.1)',
        borderRadius: '4px'
      }}
    />
  );
}
