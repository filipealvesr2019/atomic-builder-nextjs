import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableBlock from '@/components/editor/SortableBlock';

// ... (imports remain the same)

export default function EditorPage({ params }) {
  const [blocks, setBlocks] = useAtom(blocksAtom);
  // ... (other state)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // ... (other functions)

  return (
    <div className={styles.container}>
      <BlockSidebar onAddBlock={addBlock} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} onClick={() => setSelectedBlockId(null)}>
        <header className={styles.header}>
          <span>Editando: <strong>{pageMeta.title}</strong></span>
          <button onClick={(e) => { e.stopPropagation(); handleSave(); }} className={styles.saveButton} disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </header>
        
        <main className={styles.canvas}>
          <div className={styles.canvasContent} style={{ padding: '2rem' }}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks}
                strategy={verticalListSortingStrategy}
              >
                {blocks.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#9ca3af' }}>Adicione blocos usando o menu lateral</p>
                ) : (
                  blocks.map((block) => (
                    <SortableBlock key={block.id} id={block.id}>
                      <BlockRenderer
                        block={block}
                        onUpdate={updateBlock}
                        onSelect={handleSelectBlock}
                        isSelected={selectedBlockId === block.id}
                      />
                    </SortableBlock>
                  ))
                )}
              </SortableContext>
            </DndContext>
          </div>
        </main>
      </div>

      <PropertiesPanel />
    </div>
  );
}
