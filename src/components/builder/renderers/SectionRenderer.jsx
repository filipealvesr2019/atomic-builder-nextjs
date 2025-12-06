import React from 'react';
import ContainerRenderer from './ContainerRenderer';

/**
 * SectionRenderer
 * Renders a full-width section and iterates over its containers.
 */
export default function SectionRenderer({ section }) {
  if (!section) return null;

  const { settings, containers = [], id } = section;
  const { 
    padding = '40px 0', 
    backgroundColor = '#ffffff',
    backgroundImage = 'none'
  } = settings || {};

  const style = {
    padding: padding,
    backgroundColor: backgroundColor,
    backgroundImage: backgroundImage !== 'none' ? `url(${backgroundImage})` : 'none',
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
        {section.children ? section.children : containers.map(container => (
          <ContainerRenderer key={container.id} container={container} />
        ))}
      </div>
    </section>
  );
}
