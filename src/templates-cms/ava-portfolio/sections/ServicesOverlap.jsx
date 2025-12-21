'use client';
import React from 'react';
import styles from './ServicesOverlap.module.css';

export default function ServicesOverlap({ 
    title = "The Wedding Package",
    description = "A comprehensive package designed to capture every moment of your big day. From the first look to the final dance, we'll be there to document it all.",
    buttonText = "VIEW PORTFOLIO",
    imageLarge = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    imageSmall = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    mirrored = false,
    subtitle = "TAKING BOOKINGS FOR 2025"
}) {
  return (
    <section className={`${styles.overlapSection} ${mirrored ? styles.mirrored : ''}`}>
      <div className={styles.container}>
        <div className={styles.imagesContainer}>
            <div className={styles.largeImageWrapper}>
                <img src={imageLarge} alt="Large" className={styles.largeImage} />
            </div>
            <div className={styles.smallImageWrapper}>
                <img src={imageSmall} alt="Small" className={styles.smallImage} />
            </div>
        </div>
        <div className={styles.content}>
            <span className={styles.subtitle}>{subtitle}</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <button className={styles.button}>{buttonText}</button>
        </div>
      </div>
    </section>
  );
}

ServicesOverlap.cmsConfig = {
    name: "Services Overlap",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        description: { type: "string", label: "Description" },
        buttonText: { type: "string", label: "Button Text" },
        imageLarge: { type: "string", label: "Large Image" },
        imageSmall: { type: "string", label: "Small Image" },
        mirrored: { type: "boolean", label: "Mirrored Layout" }
    }
};
