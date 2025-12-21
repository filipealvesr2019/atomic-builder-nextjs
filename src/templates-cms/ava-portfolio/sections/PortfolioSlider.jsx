import React, { useState } from 'react';
import styles from './PortfolioSlider.module.css';

const PortfolioSlider = ({ images = [], onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <section className={styles.portfolioSlider}>
      <div className={styles.sliderContainer}>
        <div className={styles.track} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div 
              key={index} 
              className={styles.slide}
              onClick={() => onImageClick && onImageClick(image, images, index)}
            >
              <img src={image.url} alt={image.alt || 'Slider image'} className={styles.image} />
            </div>
          ))}
        </div>

        <button className={`${styles.navBtn} ${styles.prev}`} onClick={handlePrev}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button className={`${styles.navBtn} ${styles.next}`} onClick={handleNext}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7"/></svg>
        </button>

        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSlider;
