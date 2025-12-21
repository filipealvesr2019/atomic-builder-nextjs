'use client';
import React from 'react';
import styles from './ServicesTripleHero.module.css';

export default function ServicesTripleHero({ 
    images = [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
    ]
}) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        {images.slice(0, 3).map((img, idx) => (
          <div key={idx} className={styles.imageWrapper}>
            <img src={img} alt={`Hero ${idx + 1}`} className={styles.image} />
          </div>
        ))}
      </div>
    </section>
  );
}

ServicesTripleHero.cmsConfig = {
    name: "Services Triple Hero",
    props: {
        images: {
            type: "array",
            label: "Hero Images (3)",
            itemSchema: { type: "string", label: "Image URL" }
        }
    }
};
