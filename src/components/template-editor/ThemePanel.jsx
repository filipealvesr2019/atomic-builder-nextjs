'use client';

import React from 'react';
import { useTheme } from '@/components/builder/theme/ThemeContext';

export default function ThemePanel() {
  const { theme, updateTheme } = useTheme();

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
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
          Global Style
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Colors Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">Colors</h3>
          
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Primary</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={theme.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="h-8 w-8 rounded cursor-pointer border border-gray-300"
                />
                <input 
                  type="text"
                  value={theme.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1 text-sm border border-gray-300 rounded px-2"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700 block mb-1">Secondary</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={theme.colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="h-8 w-8 rounded cursor-pointer border border-gray-300"
                />
                <input 
                  type="text"
                  value={theme.colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1 text-sm border border-gray-300 rounded px-2"
                />
              </div>
            </div>

            <div>
                <label className="text-sm text-gray-700 block mb-1">Background</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={theme.colors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border border-gray-300"
                  />
                  <input 
                    type="text"
                    value={theme.colors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="flex-1 text-sm border border-gray-300 rounded px-2"
                  />
                </div>
            </div>

             <div>
                <label className="text-sm text-gray-700 block mb-1">Text</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={theme.colors.text}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border border-gray-300"
                  />
                  <input 
                    type="text"
                    value={theme.colors.text}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    className="flex-1 text-sm border border-gray-300 rounded px-2"
                  />
                </div>
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase">Typography</h3>
             <div>
                <label className="text-sm text-gray-700 block mb-1">Base Font</label>
                <select 
                    value={theme.typography.fontFamily}
                    onChange={(e) => handleTypographyChange('fontFamily', e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded px-2 py-1"
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
