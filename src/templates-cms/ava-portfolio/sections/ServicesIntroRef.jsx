'use client';
import React from 'react';
import styles from './ServicesIntroRef.module.css';

export default function ServicesIntroRef({ 
    title = "Artfully Capturing the Most Important Moments of your Story",
    description = "We believe that your love story deserves to be told with elegance and authenticity. Our approach is focused on capturing the genuine emotions and beautiful details that make your day unique.",
    buttonText = "BOOK NOW"
}) {
  return (
    <section className={styles.introSection}>
      <div className={styles.container}>
        <div className={styles.left}>
            <h2 className={styles.title}>{title}</h2>
            <button className={styles.button}>{buttonText}</button>
        </div>
        <div className={styles.right}>
            <p className={styles.description}>{description}</p>
        </div>
      </div>
    </section>
  );
}

ServicesIntroRef.cmsConfig = {
    name: "Services Intro Ref",
    props: {
        title: { type: "string", label: "Title" },
        description: { type: "string", label: "Description" },
        buttonText: { type: "string", label: "Button Text" }
    }
};
