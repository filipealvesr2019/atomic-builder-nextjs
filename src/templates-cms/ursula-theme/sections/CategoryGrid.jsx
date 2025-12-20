'use client';

import Link from 'next/link';
import styles from './CategoryGrid.module.css';

export default function CategoryGrid({ 
  subtitle = "Home & Decor Ideas",
  title = "Browse the Categories", 
  categories = [
    { name: "Bolero", image: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?w=500&q=80", link: "#" },
    { name: "Lifestyle", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80", link: "#" },
    { name: "Stories", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80", link: "#" }
  ] 
}) {
  return (
    <section className={styles.categorySection}>
      <header className={styles.header}>
          <span className={styles.subtitle}>{subtitle}</span>
          <h2 className={styles.title}>{title}</h2>
      </header>
      
      <div className={styles.grid}>
          {categories.map((cat, idx) => (
             <Link key={idx} href={cat.link || '#'} className={styles.card}>
                 <div className={styles.imageContainer}>
                     <img src={cat.image} alt={cat.name} className={styles.image} />
                 </div>
                 <div className={styles.labelContainer}>
                     <span className={styles.label}>{cat.name}</span>
                 </div>
             </Link>
          ))}
      </div>
    </section>
  );
}

CategoryGrid.cmsConfig = {
    name: "Ursula Categories",
    props: {
        subtitle: { type: "string", label: "Subtitle" },
        title: { type: "string", label: "Title" },
        categories: {
            type: "list",
            label: "Categories",
            itemType: {
                name: { type: "string", label: "Category Name" },
                image: { type: "image", label: "Image URL" },
                link: { type: "string", label: "Link" }
            }
        }
    }
};
