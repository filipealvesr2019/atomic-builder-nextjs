'use client';

import { useAtom } from 'jotai';
import { selectedBlockAtom, blocksAtom } from '@/store/editorStore';
import { CldUploadWidget } from 'next-cloudinary';

export default function PropertiesPanel() {
  const [selectedBlock] = useAtom(selectedBlockAtom);
  const [blocks, setBlocks] = useAtom(blocksAtom);

  if (!selectedBlock) {
    return (
      <div style={{ padding: '1rem', color: '#6b7280' }}>
        Selecione um bloco para editar suas propriedades.
      </div>
    );
  }

  const updateBlockProps = (newProps) => {
    const updateRecursive = (currentBlocks) => {
      return currentBlocks.map((b) => {
        if (b.id === selectedBlock.id) {
          return { ...b, props: { ...b.props, ...newProps } };
        }
        if (b.children) {
          return { ...b, children: updateRecursive(b.children) };
        }
        return b;
      });
    };

    setBlocks(updateRecursive(blocks));
  };

  const handleImageUpload = (result) => {
    if (result.event === 'success') {
      updateBlockProps({ src: result.info.secure_url });
    }
  };

  return (
    <div style={{ width: '300px', background: 'white', borderLeft: '1px solid #e5e7eb', padding: '1rem', height: '100%', overflowY: 'auto' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>Propriedades</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Tipo</label>
        <div style={{ padding: '0.5rem', background: '#f3f4f6', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
          {selectedBlock.type}
        </div>
      </div>

      {selectedBlock.type === 'image' && (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Imagem URL</label>
            <input
              type="text"
              value={selectedBlock.props.src || ''}
              onChange={(e) => updateBlockProps({ src: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Alt Text</label>
            <input
              type="text"
              value={selectedBlock.props.alt || ''}
              onChange={(e) => updateBlockProps({ alt: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
             <CldUploadWidget uploadPreset="nextpress_uploads" onSuccess={handleImageUpload}>
              {({ open }) => {
                return (
                  <button
                    type="button"
                    onClick={() => open()}
                    style={{ width: '100%', padding: '0.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}
                  >
                    Trocar Imagem
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </>
      )}

      {selectedBlock.type === 'text' && (
        <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Edite o texto clicando diretamente nele no canvas.
        </div>
      )}
    </div>
  );
}
