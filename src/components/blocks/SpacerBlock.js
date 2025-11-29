'use client';

export default function SpacerBlock({ block }) {
  const { height = 40 } = block.props || {};

  return (
    <div 
      style={{ 
        height: `${height}px`,
        background: 'repeating-linear-gradient(45deg, #f3f4f6 0px, #f3f4f6 10px, transparent 10px, transparent 20px)',
        border: '1px dashed #d1d5db',
        borderRadius: '0.25rem',
      }}
    />
  );
}
