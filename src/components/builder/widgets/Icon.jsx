import React from 'react';
import * as LucideIcons from 'lucide-react';
import * as FaIcons from 'react-icons/fa6'; // Font Awesome 6
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';

export default function IconWidget({ settings }) {
  const viewMode = useAtomValue(viewModeAtom);

  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    return val !== undefined && val !== null && val !== '' ? val : defaultValue;
  };

  // Content
  const iconName = getProp('icon', 'FaStar'); // Default to FontAwesome Star
  const link = getProp('link', '');
  const view = getProp('view', 'default'); // default, stacked, framed

  // Layout & Alignment
  const align = getProp('align', 'center'); // left, center, right
  
  // Style
  const primaryColor = getProp('primaryColor', '#3b82f6');
  const secondaryColor = getProp('secondaryColor', '#ffffff'); // Background for stacked/framed
  const iconSize = getProp('size', '50');
  const rotate = getProp('rotate', '0');
  const padding = getProp('padding', '15px');
  const borderRadius = getProp('borderRadius', view === 'framed' ? '50%' : '0'); // Default circle for framed
  
  // Hover & Animation
  // Note: Hover state handling in React for inline styles is tricky without CSS modules or styled-components.
  // We'll use a simple CSS class approach for the animation, assuming globals.css has them or we inject styles.
  const hoverAnimation = getProp('hoverAnimation', ''); // grow, shrink, rotate, buzz

  // Resolve Icon
  // Support Lucide (default imports) and FontAwesome (prefixed with Fa)
  let IconComponent = LucideIcons.Star;
  if (iconName.startsWith('Fa')) {
      IconComponent = FaIcons[iconName] || FaIcons.FaStar;
  } else {
      IconComponent = LucideIcons[iconName] || LucideIcons.Star;
  }

  // Styles
  const wrapperStyle = {
    display: 'flex',
    justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    width: '100%',
    padding: '10px' // Container padding
  };

  const linkStyle = {
    display: 'inline-flex',
    textDecoration: 'none',
    transition: 'transform 0.3s ease'
  };

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${iconSize}px`, // Icon size controls font-size for react-icons/lucide size
    color: primaryColor,
    backgroundColor: view !== 'default' ? secondaryColor : 'transparent',
    padding: view !== 'default' ? padding : '0',
    borderRadius: view === 'framed' || view === 'stacked' ? borderRadius : '0',
    border: view === 'framed' ? `2px solid ${primaryColor}` : 'none',
    width: view !== 'default' ? `calc(${iconSize}px + ${parseInt(padding)*2}px)` : 'auto',
    height: view !== 'default' ? `calc(${iconSize}px + ${parseInt(padding)*2}px)` : 'auto',
    transform: `rotate(${rotate}deg)`,
    transition: 'all 0.3s ease',
    cursor: link ? 'pointer' : 'default'
  };

  // Animation Classes (Standard Elementor-like names)
  const animationClass = hoverAnimation ? `hover-${hoverAnimation}` : '';

  const Content = (
    <div className={`icon-widget-content ${animationClass}`} style={iconContainerStyle}>
        {/* React Icons / Lucide typically take size or style.fontSize */}
        <IconComponent size={iconSize} /> 
    </div>
  );

  return (
    <div style={wrapperStyle} className="icon-widget-wrapper">
      {link ? (
        <a href={link} style={linkStyle}>
          {Content}
        </a>
      ) : (
         Content
      )}
      
      {/* Injecting simple hover styles for this widget instance if needed, 
          or relying on global CSS for .hover-grow etc. 
          For this demo, we can assume standard hover classes exist or add them to global css later.
       */}
       <style jsx global>{`
          .hover-grow:hover { transform: scale(1.1) !important; }
          .hover-shrink:hover { transform: scale(0.9) !important; }
          .hover-rotate:hover { transform: rotate(15deg) !important; }
          .hover-buzz:hover { animation: valo-buzz 0.5s infinite; }
          
          @keyframes valo-buzz {
            50% { transform: translateX(3px) rotate(2deg); }
            100% { transform: translateX(-3px) rotate(-2deg); }
          }
       `}</style>
    </div>
  );
}
