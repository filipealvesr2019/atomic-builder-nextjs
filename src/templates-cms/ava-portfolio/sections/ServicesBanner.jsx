'use client';
import React from 'react';
import styles from './ServicesBanner.module.css';

export default function ServicesBanner({ 
    backgroundImage = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    quote = "“Where Memories Captured every Detail of our Special Day.”",
    author = "ALEX & JAMES | WEDDING"
}) {
  return (
    <section className={styles.bannerSection} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h2 className={styles.quote}>{quote}</h2>
        <p className={styles.author}>{author}</p>
      </div>
    </section>
  );
}

ServicesBanner.cmsConfig = {
    name: "Services Banner",
    props: {
        backgroundImage: { type: "string", label: "Background Image" },
        quote: { type: "string", label: "Quote" },
        author: { type: "string", label: "Author/Context" }
    }
};
