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
    align = "left",
    color
  } = settings;

  const Tag = tag;

  const style = {
    textAlign: align,
    color: color || theme.colors.text,
    fontFamily: theme.typography.headings.fontFamily,
    fontWeight: theme.typography.headings.fontWeight,
    margin: 0 // Reset margin to let container handle spacing if needed
  };

  return <Tag style={style}>{text}</Tag>;
}
