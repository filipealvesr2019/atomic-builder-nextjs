import { useAtomValue } from 'jotai';
import { themeAtom } from '@/store/themeStore';
import parse from 'html-react-parser';

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
    color: color || theme.colors.secondary,
    fontSize: fontSize || theme.typography.baseSize,
    fontFamily: theme.typography.fontFamily,
    fontWeight: settings.fontWeight || 'normal',
    lineHeight: settings.lineHeight || 1.6,
    letterSpacing: settings.letterSpacing || 'normal',
    margin: settings.margin,
    padding: settings.padding,
    zIndex: settings.zIndex
  };

  return <div style={style}>{typeof content === 'string' ? parse(content) : content}</div>;
}
