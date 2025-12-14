import React from 'react';
import IconWidget from './Icon'; // Import IconWidget
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
  const align = getProp('align', 'left'); // left, center, right
  const divider = getProp('divider', 'no'); // yes, no
  const iconGap = getProp('iconGap', '8px');
  
  // Styles
  const iconColor = getProp('iconColor', '#3b82f6');
  const iconSize = getProp('iconSize', '16px');
  const textColor = getProp('textColor', '#374151');
  const textSize = getProp('textSize', '14px');

  // Container Styles
  let alignItems = 'flex-start';
  let justifyContent = 'flex-start';

  if (layout === 'vertical') {
     // In vertical, align controls cross-axis (align-items)
     if (align === 'center') alignItems = 'center';
     if (align === 'right') alignItems = 'flex-end';
  } else {
     // In horizontal, align controls main-axis (justify-content)
     if (align === 'center') justifyContent = 'center';
     if (align === 'right') justifyContent = 'flex-end';
     alignItems = 'center'; // Default vertical alignment
  }

  // Calculate inner item alignment for vertical layout
  let itemJustifyContent = 'flex-start';
  if (layout === 'vertical') {
      if (align === 'center') itemJustifyContent = 'center';
      if (align === 'right') itemJustifyContent = 'flex-end';
  }

  const listStyle = {
    display: 'flex',
    flexDirection: layout === 'horizontal' ? 'row' : 'column',
    flexWrap: layout === 'horizontal' ? 'wrap' : 'nowrap',
    gap: gap,
    padding: 0,
    margin: 0,
    listStyle: 'none',
    alignItems: alignItems,
    justifyContent: justifyContent,
    width: '100%', // Ensure alignment works within the container
    height: '100%'
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: itemJustifyContent,
    gap: iconGap, // Use configured icon gap
    fontSize: textSize,
    color: textColor,
    textDecoration: 'none',
    width: layout === 'vertical' ? '100%' : 'auto', // Vertical items take full width for divider
    paddingBottom: divider === 'yes' ? '8px' : '0',
    borderBottom: divider === 'yes' ? '1px solid #e5e7eb' : 'none'
  };

  return (
    <ul style={listStyle} className="icon-list-widget">
      {items.map((item, index) => {
        // Construct settings for the IconWidget based on item properties + global style settings
        const itemIconSettings = {
            icon: item.icon,
            iconLib: item.iconLib || 'lucide', // Default to lucide if not set
            customIconSrc: item.customIconSrc,
            // Inherit global style settings from the main widget settings
            size: iconSize, // Pass as 'size' (standard)
            primaryColor: iconColor,
            align: 'center', // Icon itself is centered in its span
            padding: '0',
            view: 'default',
            // Derive iconType from iconLib (Adapter Logic similar to IconBox)
            iconType: item.iconLib === 'custom' ? 'custom' : 'library'
        };

        // Handle numeric icon size logic if needed by IconWidget (it handles strings mostly, but we pass what we have)
        
        // Remove divider for the last item if active
        const isLast = index === items.length - 1;
        const currentItemStyle = {
            ...itemStyle,
            borderBottom: (divider === 'yes' && !isLast) ? '1px solid #e5e7eb' : 'none',
            marginBottom: (divider === 'yes' && !isLast) ? '0px' : '0' // Gap handles spacing, but divider might need padding
        };

        return (
          <li key={item.id || index} style={{ width: layout === 'vertical' ? '100%' : 'auto' }}>
             {item.link ? (
                <a href={item.link} style={currentItemStyle}>
                   <span style={{ color: iconColor, display: 'flex', alignItems: 'center' }}>
                      <IconWidget settings={itemIconSettings} />
                   </span>
                   <span>{item.text}</span>
                </a>
             ) : (
                <div style={currentItemStyle}>
                   <span style={{ color: iconColor, display: 'flex', alignItems: 'center' }}>
                      <IconWidget settings={itemIconSettings} />
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
