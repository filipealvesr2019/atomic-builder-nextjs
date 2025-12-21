import React from 'react';
import styles from './CategoryGrid.module.css';

const defaultItems = [
  { id: "ecommerce-templates", name: "E-commerce Templates", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800" },
  { id: "ui-kits", name: "UI Kits", image: "https://images.unsplash.com/photo-1581291518062-c13f277ca1bf?auto=format&fit=crop&q=80&w=800" },
  { id: "landing-pages", name: "Landing Pages", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  { id: "design-systems", name: "Design Systems", image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800" },
  { id: "presets", name: "Presets", image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=800" },
  { id: "graphic-assets", name: "Graphic Assets", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" }
];

const CategoryGrid = ({ title, items }) => {
  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <section id="categories" className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title || "Premium Categories"}</h2>
          <p className={styles.subtitle}>Explore curated digital resources for your next project</p>
        </div>
        
        <div className={styles.grid}>
          {displayItems.map((category, index) => (
            <a 
              key={index} 
              href={`/category/${category.id}`} 
              className={styles.card}
            >
              <div className={styles.imageContainer}>
                <img src={category.image} alt={category.name} className={styles.categoryImage} />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.name}>{category.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
