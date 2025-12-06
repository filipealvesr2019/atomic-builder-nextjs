import { useAtomValue } from 'jotai';
import { themeAtom } from '@/store/themeStore';

/**
 * Image Widget
 * Renders an image with configurable source, dimensions, and styling.
 */
export default function ImageWidget({ settings }) {
  const theme = useAtomValue(themeAtom);

  const { 
    src = "https://via.placeholder.com/300x200", 
    alt = "Image",
    width = "100%",
    borderRadius = "0px",
    align = "left",
    caption
  } = settings;

  const wrapperStyle = {
    display: 'flex',
    justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    width: '100%'
  };

  const imgStyle = {
    width: width,
    maxWidth: '100%', // Ensure it doesn't overflow container
    height: 'auto',
    borderRadius: borderRadius === 'theme' ? theme.borderRadius.medium : borderRadius,
    display: 'block'
  };

  return (
    <div style={wrapperStyle}>
      <figure style={{ margin: 0, width: width === '100%' ? '100%' : 'auto' }}>
        <img src={src} alt={alt} style={imgStyle} />
        {caption && (
          <figcaption style={{ 
            textAlign: 'center', 
            marginTop: '0.5rem', 
            fontSize: '0.875rem', 
            color: theme.colors.secondary 
          }}>
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
