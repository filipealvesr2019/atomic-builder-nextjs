'use client';

import TextBlock from '../blocks/TextBlock';
import ImageBlock from '../blocks/ImageBlock';
import ButtonBlock from '../blocks/ButtonBlock';
import SpacerBlock from '../blocks/SpacerBlock';
import ContainerBlock from './blocks/ContainerBlock';

const BLOCK_COMPONENTS = {
  text: TextBlock,
  image: ImageBlock,
  button: ButtonBlock,
  spacer: SpacerBlock,
  container: ContainerBlock,
};

export default function BlockRenderer({ block, readOnly, onUpdate, onSelect, isSelected }) {
  const Component = BLOCK_COMPONENTS[block.type];

  if (!Component) {
    return <div>Unknown block type: {block.type}</div>;
  }

  const handleChange = (newContent) => {
    if (onUpdate) {
      onUpdate(block.id, { ...block, content: newContent });
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect(block.id);
      }}
      style={{
        marginBottom: '1rem',
        position: 'relative',
        outline: isSelected ? '2px solid #2563eb' : 'none',
        outlineOffset: '2px',
        cursor: readOnly ? 'default' : 'pointer'
      }}
    >
      <Component
        {...block}
        block={block}
        readOnly={readOnly}
        onChange={handleChange}
        onUpdate={onUpdate}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    </div>
  );
}
