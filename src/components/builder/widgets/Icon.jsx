import React from 'react';
import * as LucideIcons from 'lucide-react';
import * as FaIcons from 'react-icons/fa6'; // Font Awesome 6
import * as MdIcons from 'react-icons/md'; // Material Design
import * as CiIcons from 'react-icons/ci'; // Circum Icons
import * as BsIcons from 'react-icons/bs'; // Bootstrap Icons
import * as IoIcons from 'react-icons/io5'; // Ionicons 5
import * as BiIcons from 'react-icons/bi'; // BoxIcons
import * as AiIcons from 'react-icons/ai'; // Ant Design Icons
import * as RiIcons from 'react-icons/ri'; // Remix Icons
import * as TiIcons from 'react-icons/ti'; // Typicons
import * as GiIcons from 'react-icons/gi'; // Game Icons
import * as FiIcons from 'react-icons/fi'; // Feather Icons
import { useAtomValue } from 'jotai';
import { viewModeAtom, resolveResponsiveProp } from '@/store/viewModeStore';
import styles from './Icon.module.css';

export default function IconWidget({ settings }) {
  const viewMode = useAtomValue(viewModeAtom);

  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    return val !== undefined && val !== null && val !== '' ? val : defaultValue;
  };

  // Content
  const iconType = getProp('iconType', 'library'); // 'library' or 'custom'
  const iconName = getProp('icon', 'FaStar');
  const customIconSrc = getProp('customIconSrc', '');
  const link = getProp('link', '');
  const view = getProp('view', 'default'); // default, stacked, framed

  // Layout & Alignment
  const align = getProp('align', 'center'); // left, center, right
  
  // Style
  const primaryColor = getProp('primaryColor', '#3b82f6');
  const secondaryColor = getProp('secondaryColor', '#ffffff');
  const iconSize = getProp('size', '50');
  const rotate = getProp('rotate', '0');
  const padding = getProp('padding', '15px');
  const borderRadius = getProp('borderRadius', view === 'framed' ? '50%' : '0');
  const width = getProp('width', ''); // Optional width override
  
  // Animation
  const hoverAnimation = getProp('hoverAnimation', ''); // grow, shrink, rotate, buzz

  // Resolve Content
  let renderedContent = null;

  if (iconType === 'custom' && customIconSrc) {
      renderedContent = (
          <img 
            src={customIconSrc} 
            alt="Icon" 
            className={styles.iconImage} 
            style={{ 
                width: width || `${iconSize}px`, 
                height: width ? 'auto' : `${iconSize}px`,
                objectFit: 'contain'
            }}
          />
      );
  } else {
      // Library Mode
      const iconLib = getProp('iconLib', 'fa'); // 'fa', 'md', 'lucide'
      let IconComponent = LucideIcons.Star;

      if (iconLib === 'fa') {
          // FontAwesome (react-icons/fa6)
          IconComponent = FaIcons[iconName] || FaIcons.FaStar;
      } else if (iconLib === 'md') {
          // Material Design
          IconComponent = MdIcons[iconName] || MdIcons.MdStar;
      } else if (iconLib === 'ci') {
          IconComponent = CiIcons[iconName] || CiIcons.CiStar;
      } else if (iconLib === 'bs') {
          IconComponent = BsIcons[iconName] || BsIcons.BsStar;
      } else if (iconLib === 'io') {
          IconComponent = IoIcons[iconName] || IoIcons.IoStar;
      } else if (iconLib === 'bi') {
          IconComponent = BiIcons[iconName] || BiIcons.BiStar;
      } else if (iconLib === 'ai') {
          IconComponent = AiIcons[iconName] || AiIcons.AiOutlineStar;
      } else if (iconLib === 'ri') {
          IconComponent = RiIcons[iconName] || RiIcons.RiStarFill;
      } else if (iconLib === 'ti') {
          IconComponent = TiIcons[iconName] || TiIcons.TiStarFullOutline;
      } else if (iconLib === 'gi') {
          IconComponent = GiIcons[iconName] || GiIcons.GiStarMedal;
      } else if (iconLib === 'fi') {
          IconComponent = FiIcons[iconName] || FiIcons.FiStar;
      } else {
          // Lucide
          IconComponent = LucideIcons[iconName] || LucideIcons.Star;
      }
      renderedContent = <IconComponent size={iconSize} />;
  }

  // Styles
  const wrapperStyle = {
    display: 'flex',
    justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    width: '100%',
    padding: '10px'
  };

  const linkStyle = {
    display: 'inline-flex',
    textDecoration: 'none',
    transition: 'transform 0.3s ease'
  };

  // Use values from props for dynamic inline styles (colors, specific sizes)
  // But use CSS module for structural base and animations
  const containerStyle = {
    fontSize: `${iconSize}px`, // Controls icon size for SVGs
    color: primaryColor,
    backgroundColor: view !== 'default' ? secondaryColor : 'transparent',
    padding: view !== 'default' ? padding : '0',
    borderRadius: view === 'framed' || view === 'stacked' ? borderRadius : '0',
    border: view === 'framed' ? `2px solid ${primaryColor}` : 'none',
    width: view !== 'default' ? `calc(${iconSize}px + ${parseInt(padding)*2}px)` : 'auto',
    height: view !== 'default' ? `calc(${iconSize}px + ${parseInt(padding)*2}px)` : 'auto',
    transform: `rotate(${rotate}deg)`,
  };

  // Resolve Classes
  const viewClass = styles[`view${view.charAt(0).toUpperCase() + view.slice(1)}`];
  const animationClass = hoverAnimation ? styles[`hover${hoverAnimation.charAt(0).toUpperCase() + hoverAnimation.slice(1)}`] : '';

  const Content = (
    <div 
        className={`${styles.iconWrapper} ${viewClass} ${animationClass}`} 
        style={containerStyle}
    >
        {renderedContent}
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
    </div>
  );
}
