'use client';

import React, { createContext, useContext } from 'react';

const ViewModeContext = createContext('desktop');

export function ViewModeProvider({ value, children }) {
  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}

/**
 * Resolves a responsive prop value based on the current view mode.
 * @param {string|object} propValue - The prop value (either a string or { desktop, tablet, mobile })
 * @param {string} viewMode - The current view mode ('desktop', 'tablet', 'mobile')
 * @returns {string} The resolved value for the current breakpoint
 */
export function resolveResponsiveProp(propValue, viewMode) {
  if (typeof propValue === 'object' && propValue !== null && !Array.isArray(propValue)) {
    // It's a responsive object
    return propValue[viewMode] || propValue.desktop || propValue.tablet || propValue.mobile || '';
  }
  // It's a simple value
  return propValue || '';
}
