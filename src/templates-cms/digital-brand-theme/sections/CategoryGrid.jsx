import React from 'react';
import * as Icons from 'lucide-react';
import styles from './CategoryGrid.module.css';

const CategoryGrid = ({ title, items }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title || "Browse by Category"}</h2>
        </div>
        
        <div className={styles.grid}>
          {items?.map((item, index) => {
            const IconComponent = Icons[item.icon] || Icons.HelpCircle;
            return (
              <a key={index} href={`/category/${item.id}`} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <IconComponent size={32} />
                </div>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
