import React, { useEffect, useState } from 'react';
import styles from './PortfolioModal.module.css';

const PortfolioModal = ({ isOpen, onClose, currentImage, allImages = [], currentIndex = 0 }) => {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex, isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleBackdropClick = () => {
    onClose();
  };

  const displayImage = allImages[index] || currentImage;

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <button className={styles.closeBtn} onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>

      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {allImages.length > 1 && (
          <button className={`${styles.navBtn} ${styles.prev}`} onClick={handlePrev}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
        )}

        <img src={displayImage.url} alt={displayImage.alt || 'Portfolio image'} className={styles.modalImage} />

        {allImages.length > 1 && (
          <button className={`${styles.navBtn} ${styles.next}`} onClick={handleNext}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        )}
      </div>

      <div className={styles.info}>
        <span>{index + 1} / {allImages.length}</span>
      </div>
    </div>
  );
};

export default PortfolioModal;
