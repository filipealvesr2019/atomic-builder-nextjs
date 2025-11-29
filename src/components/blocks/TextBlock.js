'use client';

import { useState, useEffect } from 'react';

export default function TextBlock({ content, onChange, readOnly }) {
  const [text, setText] = useState(content || 'Clique para editar...');

  useEffect(() => {
    setText(content);
  }, [content]);

  const handleBlur = (e) => {
    if (!readOnly && onChange) {
      onChange(e.target.innerText);
    }
  };

  if (readOnly) {
    return <p>{text}</p>;
  }

  return (
    <p
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      style={{ padding: '0.5rem', border: '1px dashed transparent', minHeight: '1.5em' }}
      className="editable-text"
    >
      {text}
    </p>
  );
}
