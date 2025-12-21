import React from 'react';
import { 
  Layout, 
  Component, 
  CreditCard, 
  Layers, 
  Sliders, 
  Image as ImageIcon, 
  Code,
  ArrowRight
} from 'lucide-react';
import styles from './CategoryGrid.module.css';

const iconMap = {
  'Layout': Layout,
  'Component': Component,
  'CreditCard': CreditCard,
  'Layers': Layers,
  'Sliders': Sliders,
  'Image': ImageIcon,
  'Code': Code
};

const CategoryGrid = ({ title, items }) => {
  return (
    <section id="categories" className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title || "Premium Categories"}</h2>
          <p className={styles.subtitle}>Explore curated digital resources for your next project</p>
        </div>
        
        <div className={styles.grid}>
          {items?.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Layout;
            return (
              <a 
                key={index} 
                href={`/category/${category.id}`} 
                className={styles.card}
              >
                <div className={styles.iconWrapper}>
                  <IconComponent size={32} className={styles.icon} />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.name}>{category.name}</h3>
                  <p className={styles.description}>{category.description}</p>
                  <div className={styles.footer}>
                    <span className={styles.explore}>Explore</span>
                    <ArrowRight size={16} className={styles.arrow} />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
