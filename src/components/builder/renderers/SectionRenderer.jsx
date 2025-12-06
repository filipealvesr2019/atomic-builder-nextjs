import React from 'react';
import ContainerRenderer from './ContainerRenderer';
import { useViewMode, resolveResponsiveProp } from '@/components/builder/context/ViewModeContext';

/**
 * SectionRenderer
 * Renders a full-width section and iterates over its containers.
 */
export default function SectionRenderer({ section }) {
  const viewMode = useViewMode();
  
  if (!section) return null;

  const { settings, containers = [], children, id } = section;

  const getProp = (key, fallback) => {
    return resolveResponsiveProp(settings?.[key], viewMode) || fallback;
  };

  const style = {
    padding: getProp('padding', '40px 0'),
    backgroundColor: getProp('backgroundColor', '#ffffff'),
    backgroundImage: getProp('backgroundImage', 'none') !== 'none' ? `url(${getProp('backgroundImage')})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    display: 'flex',
    justifyContent: 'center' // Center the main container wrapper
  };

  // Wrapper acts as the "max-width" content area usually found in sections
  const contentWrapperStyle = {
    width: '100%',
    maxWidth: '1200px', // Default max-width, could be configurable
    display: 'flex',
    flexWrap: 'wrap', // Allow containers to wrap if needed
    margin: '0 auto',
    padding: '0 20px'
  };

  return (
    <section data-section-id={id} className="builder-section" style={style}>
      <div style={contentWrapperStyle}>
        {children ? children : containers.map(container => (
          <ContainerRenderer key={container.id} container={container} />
        ))}
      </div>
    </section>
  );
}
