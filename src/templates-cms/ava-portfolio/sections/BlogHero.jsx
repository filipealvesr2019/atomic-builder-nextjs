'use client';
import React from 'react';
import styles from './BlogHero.module.css';

export default function BlogHero({ 
    title = "The Blog",
    backgroundImage = "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2070&auto=format&fit=crop"
}) {
  return (
    <section className={styles.blogHero}>
      <div 
        className={styles.bgContainer} 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={styles.overlay}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </section>
  );
}

BlogHero.cmsConfig = {
    name: "Blog Hero",
    props: {
        title: { type: "string", label: "Title" },
        backgroundImage: { type: "string", label: "Background Image URL" }
    }
};
