import React, { useState } from 'react';
import styles from './PortfolioGrid.module.css';

const PortfolioGrid = ({ title, categories = [], images = [], onImageClick }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredImages = activeCategory === 'ALL' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <section className={styles.portfolioGrid}>
      <div className={styles.container}>
        {title && <h2 className={styles.title}>{title}</h2>}
        
        <div className={styles.categories}>
          <button 
            className={`${styles.categoryBtn} ${activeCategory === 'ALL' ? styles.active : ''}`}
            onClick={() => setActiveCategory('ALL')}
          >
            ALL
          </button>
          {categories.map((cat, index) => (
            <button 
              key={index}
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredImages.map((image, index) => (
            <div 
              key={activeCategory + index} 
              className={styles.imageWrapper}
              onClick={() => onImageClick(image, filteredImages, index)}
            >
              <img src={image.url} alt={image.alt || 'Portfolio image'} className={styles.image} />
              <div className={styles.overlay}>
                <span className={styles.viewLabel}>VIEW</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
