import { useAtomValue } from 'jotai';
import { themeAtom } from '@/store/themeStore';

/**
 * Basic Text Widget
 * Renders a paragraph.
 */
export default function TextWidget({ settings }) {
  const theme = useAtomValue(themeAtom);

  const { 
    content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 
    align = "left",
    color,
    fontSize
  } = settings;

  const style = {
    textAlign: align,
    color: color || theme.colors.secondary, // Default to secondary text color
    fontSize: fontSize || theme.typography.baseSize,
    fontFamily: theme.typography.fontFamily,
    lineHeight: 1.6
  };

  return <p style={style}>{content}</p>;
}
