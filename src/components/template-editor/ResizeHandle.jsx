'use client';

import React, { useState, useEffect } from 'react';

export default function ResizeHandle({ leftBlockId, rightBlockId, onResize, currentLeftWidth }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
        // Convert pixel delta to percentage approximate or whatever unit is used?
        // Assuming parent width is available or we work in pixels?
        // Working with % is best for responsiveness. 
        // We need the parent width to calculate %.
        // Let's assume onResize handles the calculation or we pass parent ref.
        // For simplicity, let's just pass the delta pixels and let parent handle logic?
        // Or better: Let parent handle logic.
        onResize(deltaX); 
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.cursor = 'default';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    }
  }, [isDragging, startX, onResize]);

  const handleMouseDown = (e) => {
    e.stopPropagation(); // Prevent DnD
    setStartX(e.clientX);
    setIsDragging(true);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`w-2 hover:bg-blue-500 cursor-col-resize z-20 flex flex-col justify-center items-center transition-colors ${isDragging ? 'bg-blue-600' : 'bg-transparent'}`}
      style={{ margin: '0 -1px' }}
      title="Drag to resize"
    >
        <div className="h-4 w-1 bg-gray-300 rounded-full" />
    </div>
  );
}
