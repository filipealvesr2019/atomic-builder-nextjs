import { atom } from 'jotai';
import { defaultTheme } from '@/components/builder/theme/defaultTheme';

// Atom for the current theme
export const themeAtom = atom(defaultTheme);

// Action to update theme parts (deep merge simulation)
export const updateThemeAtom = atom(
  null,
  (get, set, newValues) => {
    const currentTheme = get(themeAtom);
    const updatedTheme = {
      ...currentTheme,
      ...newValues,
      colors: { ...currentTheme.colors, ...(newValues.colors || {}) },
      typography: { ...currentTheme.typography, ...(newValues.typography || {}) },
    };
    set(themeAtom, updatedTheme);
  }
);
