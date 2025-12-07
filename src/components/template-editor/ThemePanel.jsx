'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { themeAtom, updateThemeAtom } from '@/store/themeStore';
import styles from './ThemePanel.module.css';

export default function ThemePanel() {
  const theme = useAtomValue(themeAtom);
  const updateTheme = useSetAtom(updateThemeAtom);

  const handleColorChange = (key, value) => {
    updateTheme({
      colors: {
        ...theme.colors,
        [key]: value
      }
    });
  };

  const handleTypographyChange = (key, value) => {
    updateTheme({
        typography: {
            ...theme.typography,
            [key]: value
        }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>
          Global Style
        </h2>
      </div>

      <div className={styles.content}>
        {/* Colors Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Colors</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Primary</label>
            <div className={styles.colorInputGroup}>
              <input 
                type="color" 
                value={theme.colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className={styles.colorPicker}
              />
              <input 
                type="text"
                value={theme.colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className={styles.textInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Secondary</label>
            <div className={styles.colorInputGroup}>
              <input 
                type="color" 
                value={theme.colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className={styles.colorPicker}
              />
              <input 
                type="text"
                value={theme.colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className={styles.textInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Background</label>
            <div className={styles.colorInputGroup}>
              <input 
                type="color" 
                value={theme.colors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className={styles.colorPicker}
              />
              <input 
                type="text"
                value={theme.colors.background}
                onChange={(e) => handleColorChange('background', e.target.value)}
                className={styles.textInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Text</label>
            <div className={styles.colorInputGroup}>
              <input 
                type="color" 
                value={theme.colors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                className={styles.colorPicker}
              />
              <input 
                type="text"
                value={theme.colors.text}
                onChange={(e) => handleColorChange('text', e.target.value)}
                className={styles.textInput}
              />
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className={`${styles.section} ${styles.sectionBorder}`}>
          <h3 className={styles.sectionTitle}>Typography</h3>
          <div className={styles.formGroup}>
            <label className={styles.label}>Base Font</label>
            <select 
              value={theme.typography.fontFamily}
              onChange={(e) => handleTypographyChange('fontFamily', e.target.value)}
              className={styles.select}
            >
              <option value="system-ui, -apple-system, sans-serif">System UI</option>
              <option value="'Inter', sans-serif">Inter</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Playfair Display', serif">Playfair Display</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
