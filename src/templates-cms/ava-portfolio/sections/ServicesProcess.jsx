'use client';
import React from 'react';
import styles from './ServicesProcess.module.css';

export default function ServicesProcess({ 
    title = "What to Expect When we Work Together",
    text1 = "Your wedding day is one of the most significant moments in your life. Our goal is to provide an experience that is as seamless as it is memorable, ensuring every detail is captured with care.",
    text2 = "From our initial consultation to the final gallery delivery, we are here to support you and make sure your vision comes to life exactly as you imagined."
}) {
  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.textGrid}>
            <p className={styles.text}>{text1}</p>
            <p className={styles.text}>{text2}</p>
        </div>
      </div>
    </section>
  );
}

ServicesProcess.cmsConfig = {
    name: "Services Process",
    props: {
        title: { type: "string", label: "Title" },
        text1: { type: "string", label: "Text Column 1" },
        text2: { type: "string", label: "Text Column 2" }
    }
};
