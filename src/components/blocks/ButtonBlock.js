'use client';

export default function ButtonBlock({ block, readOnly, onChange }) {
  const { text = 'Botão', link = '#', style = 'primary' } = block.props || {};

  const buttonStyles = {
    primary: {
      background: '#3b82f6',
      color: 'white',
      border: 'none',
    },
    secondary: {
      background: '#6b7280',
      color: 'white',
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: '#3b82f6',
      border: '2px solid #3b82f6',
    },
  };

  const currentStyle = buttonStyles[style] || buttonStyles.primary;

  if (readOnly) {
    return (
      <a 
        href={link}
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontWeight: '600',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.2s',
          ...currentStyle,
        }}
      >
        {text}
      </a>
    );
  }

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => onChange && onChange({
        ...block,
        props: { ...block.props, text: e.target.value }
      })}
      style={{
        display: 'inline-block',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        fontWeight: '600',
        cursor: 'pointer',
        ...currentStyle,
      }}
    />
  );
}
