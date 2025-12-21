'use client';
import React from 'react';
import styles from './ServicesFeatured.module.css';

export default function ServicesFeatured({ 
    title = "Featured Galleries",
    subtitle = "VIEW PORTFOLIO",
    items = [
        { title: "WEDDINGS", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" },
        { title: "ENGAGEMENTS", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop" },
        { title: "ELOPEMENTS", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" }
    ]
}) {
  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        <span className={styles.topSubtitle}>{subtitle}</span>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.grid}>
            {items.slice(0, 3).map((item, idx) => (
                <div key={idx} className={styles.card}>
                    <div className={styles.imageWrapper}>
                        <img src={item.image} alt={item.title} className={styles.image} />
                    </div>
                    <div className={styles.label}>{item.title}</div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}

ServicesFeatured.cmsConfig = {
    name: "Services Featured",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Top Subtitle" },
        items: {
            type: "array",
            label: "Featured Items",
            itemSchema: {
                title: { type: "string", label: "Title" },
                image: { type: "string", label: "Image URL" }
            }
        }
    }
};
