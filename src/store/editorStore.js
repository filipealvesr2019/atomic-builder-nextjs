import { atom } from 'jotai';

// The list of blocks on the current page
export const blocksAtom = atom([]);

// The ID of the currently selected block
export const selectedBlockIdAtom = atom(null);

// The metadata of the current page (title, slug, etc.)
export const pageMetaAtom = atom({});

// Helper atom to get the selected block object
export const selectedBlockAtom = atom((get) => {
  const blocks = get(blocksAtom);
  const selectedId = get(selectedBlockIdAtom);
  
  const findBlock = (blocks) => {
    for (const block of blocks) {
      if (block.id === selectedId) return block;
      if (block.children) {
        const found = findBlock(block.children);
        if (found) return found;
      }
    }
    return null;
  };

  return findBlock(blocks);
});
