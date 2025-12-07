import React from 'react';
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';

export default function ImageBox({ settings }) {
  const viewMode = useAtomValue(viewModeAtom);

  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    return val !== undefined && val !== null && val !== '' ? val : defaultValue;
  };

  const imageSrc = getProp('imageSrc', 'https://placehold.co/600x400?text=Image');
  const title = getProp('title', 'Título do Serviço');
  const description = getProp('description', 'Descrição curta sobre o benefício ou serviço oferecido.');
  
  // Layout
  const imagePosition = getProp('imagePosition', 'top'); // top, left, right
  const textAlign = getProp('textAlign', 'center');
  
  // Styles
  const imageWidth = getProp('imageWidth', '100%');
  const borderRadius = getProp('borderRadius', '8px');
  const titleColor = getProp('titleColor', '#1f2937');
  const descColor = getProp('descColor', '#6b7280');
  
  // Layout Logic
  let flexDirection = 'column';
  if (imagePosition === 'left') flexDirection = 'row';
  if (imagePosition === 'right') flexDirection = 'row-reverse';

  const containerStyle = {
    display: 'flex',
    flexDirection: flexDirection,
    alignItems: flexDirection === 'column' ? (textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center') : 'flex-start',
    textAlign: textAlign,
    gap: getProp('gap', '15px'),
    padding: getProp('padding', '0px'),
    height: '100%',
    width: '100%'
  };

  const imageContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: flexDirection === 'column' ? '100%' : 'auto', 
    flexShrink: 0,
  };
  
  const imgStyle = {
    width: imageWidth,
    maxWidth: '100%',
    height: 'auto',
    borderRadius: borderRadius,
    objectFit: 'cover'
  };

  return (
    <div style={containerStyle} className="image-box-widget">
      <div style={imageContainerStyle}>
         <img src={imageSrc} alt={title} style={imgStyle} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <h3 style={{ margin: 0, color: titleColor, fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ margin: 0, color: descColor, fontSize: '0.875rem', lineHeight: '1.5' }}>{description}</p>
      </div>
    </div>
  );
}
