import React from 'react';
import * as Icons from 'lucide-react';
import styles from './CategoryGrid.module.css';

const CategoryGrid = ({ title, items }) => {
  const scrollRef = React.useRef(null);
  const { ChevronLeft, ChevronRight, HelpCircle } = Icons;

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 320, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title || "Browse by Category"}</h2>
          <div className={styles.navButtons}>
            <button
              className={styles.navBtn}
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={styles.navBtn}
              onClick={() => scroll(1)}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className={styles.grid} ref={scrollRef}>
          {items?.map((item, index) => {
            const IconComponent = Icons[item.icon] || HelpCircle;
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
