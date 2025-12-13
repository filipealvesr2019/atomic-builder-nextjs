import React, { useState } from 'react';
import { Plus, Trash, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import styles from './PropsPanel.module.css';

/**
 * Repeater Component
 * Allows managing a list of objects (add, remove, update)
 * @param {string} label - Label for the section
 * @param {array} items - Array of items
 * @param {function} onChange - Callback (newItems) => {}
 * @param {function} renderItem - Function(item, index, onChangeItem) returning JSX for item fields
 * @param {object} defaultItem - Template for new items
 */
export default function Repeater({ label, items = [], onChange, renderItem, defaultItem = {} }) {
  const [collapsed, setCollapsed] = useState({});

  const toggleCollapse = (index) => {
    setCollapsed(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleAddItem = () => {
    const newItem = { ...defaultItem, id: Date.now() };
    const newItems = [...items, newItem];
    // Auto-expand the new item (last index)
    const newIndex = newItems.length - 1;
    setCollapsed(prev => ({ ...prev, [newIndex]: false }));
    onChange(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const activeItems = Array.isArray(items) ? items : [];

  return (
    <div className={styles.formGroup}>
      <div className={styles.formLabel}>
        <span className={styles.labelText}>{label}</span>
      </div>
      
      <div className={styles.repeaterList}>
        {activeItems.map((item, index) => (
          <div key={index} className={styles.repeaterItem}>
            {/* Header */}
            <div className={styles.repeaterHeader}>
              <button 
                className={styles.repeaterCollapseBtn}
                onClick={() => toggleCollapse(index)}
              >
                 {collapsed[index] ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                 <span className={styles.repeaterTitle}>
                    {item.text || `Item ${index + 1}`}
                 </span>
              </button>
              <button 
                className={styles.repeaterDeleteBtn}
                onClick={() => handleRemoveItem(index)}
                title="Remove Item"
              >
                <Trash size={14} />
              </button>
            </div>

            {/* Content */}
            {!collapsed[index] && (
              <div className={styles.repeaterContent}>
                 {renderItem(item, index, (updates) => {
                    const newItems = [...activeItems];
                    newItems[index] = { ...newItems[index], ...updates };
                    onChange(newItems);
                 })}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className={styles.addItemButton} onClick={handleAddItem}>
        <Plus size={14} />
        Add Item
      </button>
    </div>
  );
}
