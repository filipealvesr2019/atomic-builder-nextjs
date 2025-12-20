import { useAtomValue } from 'jotai';
import { themeAtom } from '@/store/themeStore';
import { resolveResponsiveProp, viewModeAtom } from '@/store/viewModeStore';
import parse from 'html-react-parser';
import styles from './Text.module.css';
export default function TextWidget({ settings }) {
  const theme = useAtomValue(themeAtom);
  const viewMode = useAtomValue(viewModeAtom);

  const getProp = (key, defaultValue) => {
    const raw = settings?.[key];
    const val = resolveResponsiveProp(raw, viewMode);
    return val !== undefined && val !== null && val !== '' ? val : defaultValue;
  };

  const content = getProp('content', "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  const align = getProp('align', "left");
  
  const style = {
    textAlign: align,
    color: getProp('color', theme.colors.secondary),
    fontSize: getProp('fontSize', theme.typography.baseSize),
    fontFamily: theme.typography.fontFamily,
    fontWeight: getProp('fontWeight', 'normal'),
    lineHeight: getProp('lineHeight', 1.6),
    letterSpacing: getProp('letterSpacing', 'normal'),
    margin: getProp('margin'),
    padding: getProp('padding'),
    zIndex: getProp('zIndex'),
    width: 'fit-content'
  };

  console.log('TextWidget Content:', content);

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        width: 'auto',
        boxSizing: 'border-box'
      }}
      className={styles.textWidgetContainer}
    >
      <div style={style} className={styles.textWidgetContent}>
        {typeof content === 'string' ? parse(content) : content}
      </div>
    </div>
  );
}
