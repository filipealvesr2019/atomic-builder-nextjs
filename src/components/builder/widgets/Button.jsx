import { useAtomValue } from 'jotai';
import { themeAtom } from '@/store/themeStore';

/**
 * Basic Button Widget
 */
export default function ButtonWidget({ settings }) {
  const theme = useAtomValue(themeAtom);
  
  const { 
    text = "Click Me", 
    variant = "primary", // primary, secondary, outline, text
    align = "left",
    url = "#"
  } = settings;

  // Derive colors from theme based on variant
  let bg = theme.colors.primary;
  let color = '#ffffff';
  let border = 'none';

  if (variant === 'secondary') {
    bg = theme.colors.secondary;
  } else if (variant === 'accent') {
      bg = theme.colors.accent;
  } else if (variant === 'outline') {
    bg = 'transparent';
    color = theme.colors.primary;
    border = `2px solid ${theme.colors.primary}`;
  } else if (variant === 'text') {
      bg = 'transparent';
      color = theme.colors.primary;
  }

  // Base styles for the wrapper ensuring alignment
  const wrapperStyle = {
    display: 'flex',
    justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    width: '100%'
  };

  // Styles for the button itself
  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: theme.borderRadius.button,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: bg,
    color: color,
    border: border,
  };

  return (
    <div style={wrapperStyle}>
      <a href={url} style={buttonStyle}>
        {text}
      </a>
    </div>
  );
}
