import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';

export default function IconBox({ settings }) {
  const viewMode = useAtomValue(viewModeAtom);

  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    // Treat empty string as invalid for text content to ensure defaults show up
    return val !== undefined && val !== null && val !== '' ? val : defaultValue;
  };

  const iconName = getProp('icon', 'Star');
  const title = getProp('title', 'Título do Serviço');
  const description = getProp('description', 'Descrição curta sobre o benefício ou serviço oferecido.');
  
  // Layout
  const iconPosition = getProp('iconPosition', 'top'); // top, left, right
  const textAlign = getProp('textAlign', 'center');
  
  // Styles
  const iconColor = getProp('iconColor', '#3b82f6');
  const iconSize = getProp('iconSize', '40px'); // logic size (font-size equivalent)
  const titleColor = getProp('titleColor', '#1f2937');
  const descColor = getProp('descColor', '#6b7280');
  
  // Icon Component
  // Fallback to Star if not found
  const IconComponent = LucideIcons[iconName] || LucideIcons.Star;

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
  };
  
  // Numeric size conversion if needed, assuming px string for now
  const sizeNum = parseInt(iconSize) || 24;

  return (
    <div style={containerStyle} className="icon-box-widget">
      <div style={iconContainerStyle}>
         <IconComponent size={sizeNum} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ margin: 0, color: titleColor, fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ margin: 0, color: descColor, fontSize: '0.875rem', lineHeight: '1.5' }}>{description}</p>
      </div>
    </div>
  );
}
