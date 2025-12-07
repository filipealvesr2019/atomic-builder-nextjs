import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';

export default function IconList({ settings }) {
  const viewMode = useAtomValue(viewModeAtom);

  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    return val !== undefined && val !== null ? val : defaultValue;
  };

  // Default Items
  const defaultItems = [
    { id: 1, text: 'List Item #1', icon: 'Check', link: '#' },
    { id: 2, text: 'List Item #2', icon: 'Check', link: '#' },
    { id: 3, text: 'List Item #3', icon: 'Check', link: '#' }
  ];

  const items = Array.isArray(settings?.items) ? settings.items : defaultItems;
  
  // Layout
  const layout = getProp('layout', 'vertical'); // vertical | horizontal
  const gap = getProp('gap', '10px');
  
  // Styles
  const iconColor = getProp('iconColor', '#3b82f6');
  const iconSize = getProp('iconSize', '16px');
  const textColor = getProp('textColor', '#374151');
  const textSize = getProp('textSize', '14px');

  // Container Styles
  const listStyle = {
    display: 'flex',
    flexDirection: layout === 'horizontal' ? 'row' : 'column',
    flexWrap: layout === 'horizontal' ? 'wrap' : 'nowrap',
    gap: gap,
    padding: 0,
    margin: 0,
    listStyle: 'none'
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: textSize,
    color: textColor,
    textDecoration: 'none'
  };

  return (
    <ul style={listStyle} className="icon-list-widget">
      {items.map((item, index) => {
        const IconComponent = LucideIcons[item.icon] || LucideIcons.Check;
        // Handle numeric icon size
        const sizeNum = parseInt(iconSize) || 16;
        
        return (
          <li key={item.id || index}>
             {item.link ? (
                <a href={item.link} style={itemStyle}>
                   <span style={{ color: iconColor, display: 'flex', alignItems: 'center' }}>
                      <IconComponent size={sizeNum} />
                   </span>
                   <span>{item.text}</span>
                </a>
             ) : (
                <div style={itemStyle}>
                   <span style={{ color: iconColor, display: 'flex', alignItems: 'center' }}>
                      <IconComponent size={sizeNum} />
                   </span>
                   <span>{item.text}</span>
                </div>
             )}
          </li>
        );
      })}
    </ul>
  );
}
