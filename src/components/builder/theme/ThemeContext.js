'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultTheme } from './defaultTheme';

const ThemeContext = createContext({
  theme: defaultTheme,
  updateTheme: () => {},
});

export function ThemeProvider({ children, initialTheme, theme: controlledTheme, onThemeChange }) {
  const [internalTheme, setInternalTheme] = useState(initialTheme || defaultTheme);

  const theme = controlledTheme || internalTheme;

  // If initialTheme changes (loaded from DB), update state
  useEffect(() => {
     if (initialTheme && !controlledTheme) {
      setInternalTheme(initialTheme);
    }
  }, [initialTheme, controlledTheme]);

  const updateTheme = (newValues) => {
    const updatedTheme = {
      ...theme,
      ...newValues,
      colors: { ...theme.colors, ...(newValues.colors || {}) },
      typography: { ...theme.typography, ...(newValues.typography || {}) },
    };

    if (onThemeChange) {
        onThemeChange(updatedTheme);
    } else {
        setInternalTheme(updatedTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
