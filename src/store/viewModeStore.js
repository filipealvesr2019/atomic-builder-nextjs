import { atom } from 'jotai';

// Atom for the current view mode (desktop, tablet, mobile)
export const viewModeAtom = atom('desktop');

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
