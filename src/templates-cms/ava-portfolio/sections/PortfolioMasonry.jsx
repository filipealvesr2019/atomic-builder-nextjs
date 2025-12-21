import React from 'react';
import styles from './PortfolioMasonry.module.css';

const PortfolioMasonry = ({ images = [], onImageClick }) => {
  if (!images || images.length === 0) return null;

  return (
    <section className={styles.portfolioMasonry}>
      <div className={styles.container}>
        <div className={styles.masonryGrid}>
          {images.map((image, index) => {
            // Alternate classes for different sizes
            let typeClass = styles.itemNormal;
            if (index % 5 === 1) typeClass = styles.itemTall;
            if (index % 5 === 3) typeClass = styles.itemWide;

            return (
              <div 
                key={index} 
                className={`${styles.masonryItem} ${typeClass}`}
                onClick={() => onImageClick && onImageClick(image, images, index)}
              >
                <img src={image.url} alt={image.alt || 'Portfolio masonry'} className={styles.image} />
                <div className={styles.overlay}>
                   <span className={styles.viewLabel}>VIEW STORY</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioMasonry;
