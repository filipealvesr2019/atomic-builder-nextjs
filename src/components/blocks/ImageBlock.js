'use client';

/* eslint-disable @next/next/no-img-element */
export default function ImageBlock({ props, readOnly }) {
  const { src, alt } = props || {};
  const placeholder = 'https://placehold.co/600x400?text=Image+Block';

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <img
        src={src || placeholder}
        alt={alt || 'Block Image'}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
