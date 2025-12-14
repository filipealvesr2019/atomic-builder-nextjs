import React from 'react';
import { useAtomValue } from 'jotai';
import * as LucideIcons from 'lucide-react';
import { themeAtom } from '@/store/themeStore';
import { resolveResponsiveProp, viewModeAtom } from '@/store/viewModeStore';
import styles from './Divider.module.css';

export default function DividerWidget({ settings }) {
  const theme = useAtomValue(themeAtom);
  const viewMode = useAtomValue(viewModeAtom);

  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    return val !== undefined && val !== null && val !== '' ? val : defaultValue;
  };

  // Props
  const style = getProp('style', 'solid'); // solid, double, dotted, dashed, groove
  const element = getProp('element', 'line'); // line, line_icon, line_text
  const text = getProp('text', 'Divider');
  const icon = getProp('icon', 'Star');
  const align = getProp('align', 'center'); // left, center, right
  
  // Style Props
  const color = getProp('color', theme.colors?.border || '#e5e7eb');
  const width = getProp('width', '100%');
  const height = getProp('height', '1px');
  const gap = getProp('gap', '15px');
  const borderRadius = getProp('borderRadius', '0px');
  
  // Font/Icon styles
  const textColor = getProp('textColor', theme.colors?.text || '#374151');
  const textSize = getProp('textSize', '14px');
  const iconColor = getProp('iconColor', theme.colors?.primary || '#3b82f6');
  const iconSize = getProp('iconSize', '20px');

  // Spacing
  const margin = getProp('margin', '20px 0');
  const padding = getProp('padding', '0');

  // Helper to render the Line
  const Line = () => (
    <div 
      className={styles.line} 
      style={{
        borderTopStyle: style,
        borderTopWidth: height,
        borderTopColor: color,
        borderTopWidth: height,
        borderTopColor: color,
        borderRadius: borderRadius
      }}
    />
  );

  // Helper to render Content
  const Content = () => {
    if (element === 'line') return null;

    const contentStyle = {
      marginLeft: align === 'right' || align === 'center' ? gap : 0,
      marginRight: align === 'left' || align === 'center' ? gap : 0,
      color: element === 'line_text' ? textColor : iconColor,
      fontSize: element === 'line_text' ? textSize : undefined,
    };

    if (element === 'line_icon') {
      const IconComponent = LucideIcons[icon] || LucideIcons.Star;
      // Parse icon size if it's px string
      const sizeNum = parseInt(iconSize) || 20; 
      return (
        <div className={styles.content} style={contentStyle}>
           <IconComponent size={sizeNum} />
        </div>
      );
    }

    if (element === 'line_text') {
      return (
        <div className={styles.content} style={{...contentStyle, whiteSpace: 'nowrap'}}>
          {text}
        </div>
      );
    }

    return null;
  };

  return (
    <div 
      className={styles.container}
      style={{
        width: width,
        margin: margin,
        padding: padding,
        justifyContent: 'center', // Flex control
      }}
    >
      {/* 
         Logic:
         Left: Content - Line
         Right: Line - Content
         Center: Line - Content - Line
         
         If element == 'line', just one Line.
      */}
      
      {element === 'line' && <Line />}

      {element !== 'line' && align === 'center' && (
        <>
          <Line />
          <Content />
          <Line />
        </>
      )}

      {element !== 'line' && align === 'left' && (
        <>
          <Content />
          <Line />
        </>
      )}

      {element !== 'line' && align === 'right' && (
        <>
          <Line />
          <Content />
        </>
      )}
    </div>
  );
}
