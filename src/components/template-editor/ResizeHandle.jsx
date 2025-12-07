'use client';

import React, { useState, useEffect } from 'react';
import styles from './ResizeHandle.module.css';

export default function ResizeHandle({ leftBlockId, rightBlockId, onResize, currentLeftWidth }) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX;
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
    e.stopPropagation();
    setStartX(e.clientX);
    setIsDragging(true);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`${styles.resizeHandle} ${isDragging ? styles.resizeHandleDragging : ''}`}
      title="Drag to resize"
    >
      <div className={styles.handleIndicator} />
    </div>
  );
}
