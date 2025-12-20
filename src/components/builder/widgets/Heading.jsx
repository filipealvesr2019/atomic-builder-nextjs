import { useAtomValue } from 'jotai';
import { themeAtom } from '@/store/themeStore';

/**
 * Basic Heading Widget
 * Renders an H1-H6 tag based on settings.
 */
export default function HeadingWidget({ settings }) {
  const theme = useAtomValue(themeAtom);

  const { 
    text = "Heading Text", 
    tag = "h2", 
    align,
    color,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing
  } = settings;

  const Tag = tag;

  const style = {
    textAlign: align || 'left',
    color: color || theme.colors.text,
    fontFamily: fontFamily || theme.typography.headings.fontFamily,
    fontWeight: fontWeight || theme.typography.headings.fontWeight,
    fontSize: fontSize || theme.typography.headings[tag]?.fontSize || '1.5rem',
    lineHeight: lineHeight || theme.typography.headings[tag]?.lineHeight || '1.2',
    letterSpacing: letterSpacing || 'normal',
    margin: 0,
    width: 'fit-content'
  };

  return <Tag style={style}>{text}</Tag>;
}
