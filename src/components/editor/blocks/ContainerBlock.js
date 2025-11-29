'use client';

export default function ContainerBlock({ block, children, readOnly, onUpdate, isSelected, onSelect }) {
  const handleClick = (e) => {
    if (!readOnly && onSelect) {
      e.stopPropagation();
      onSelect(block.id);
    }
  };

  const containerStyle = {
    border: isSelected ? '2px solid #3b82f6' : '2px dashed #e5e7eb',
    padding: '1.5rem',
    marginBottom: '1rem',
    borderRadius: '0.5rem',
    background: isSelected ? '#eff6ff' : 'transparent',
    cursor: readOnly ? 'default' : 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <div style={containerStyle} onClick={handleClick} data-block-type={block.props?.blockType}>
      {block.children && block.children.map((childBlock) => {
        // Import the BlockRenderer inside to avoid circular dependency
        const BlockRenderer = require('../BlockRenderer').default;
        return (
          <BlockRenderer
            key={childBlock.id}
            block={childBlock}
            readOnly={readOnly}
            onUpdate={onUpdate}
            isSelected={false}
            onSelect={onSelect}
          />
        );
      })}
    </div>
  );
}
