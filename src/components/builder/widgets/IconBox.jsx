import React from 'react';
import IconWidget from './Icon'; // Import the robust IconWidget
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';

export default function IconBox({ settings }) {
  const viewMode = useAtomValue(viewModeAtom);

  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    return val !== undefined && val !== null && val !== '' ? val : defaultValue;
  };

  const title = getProp('title', 'Título do Serviço');
  const description = getProp('description', 'Descrição curta sobre o benefício ou serviço oferecido.');
  
  // Layout
  const iconPosition = getProp('iconPosition', 'top'); // top, left, right
  const textAlign = getProp('textAlign', 'center');
  
  // Styles
  const titleColor = getProp('titleColor', '#1f2937');
  const descColor = getProp('descColor', '#6b7280');
  
  // Resolve icon properties for the wrapper
  // We prioritize 'size' (new standard) over 'iconSize' (legacy)
  const iconSize = getProp('size') || getProp('iconSize', '40px'); 
  const iconColor = getProp('primaryColor') || getProp('iconColor', '#3b82f6');

  // Prepare settings for the IconWidget
  // We merge legacy props to ensure IconWidget receives what it expects ('size', 'primaryColor')
  const iconSettings = {
      ...settings,
      size: iconSize,
      primaryColor: iconColor,
      // Ensure specific positioning doesn't conflict, though IconWidget handles its own alignment internally if needed.
      // Here we just want the IconWidget to render the icon itself.
      align: 'center', // Force center within the container we provide
      padding: '0', // Reset padding for the icon box context
      view: 'default', // Force default view unless we want to expose 'framed'/'stacked' in Icon Box later
  };

  // Layout Logic
  let flexDirection = 'column';
  if (iconPosition === 'left') flexDirection = 'row';
  if (iconPosition === 'right') flexDirection = 'row-reverse';

  const containerStyle = {
    display: 'flex',
    flexDirection: flexDirection,
    alignItems: flexDirection === 'column' ? (textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center') : 'flex-start',
    textAlign: textAlign,
    gap: getProp('gap', '15px'),
    padding: getProp('padding', '20px'),
    height: '100%',
    width: '100%'
  };

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: iconColor,
    minWidth: iconSize, // Ensure generic spacing
    // We don't set height here to allow autofit
  };

  return (
    <div style={containerStyle} className="icon-box-widget">
      <div style={iconContainerStyle}>
         <IconWidget settings={iconSettings} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ margin: 0, color: titleColor, fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ margin: 0, color: descColor, fontSize: '0.875rem', lineHeight: '1.5' }}>{description}</p>
      </div>
    </div>
  );
}
