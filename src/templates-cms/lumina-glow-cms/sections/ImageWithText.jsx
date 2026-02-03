import React from 'react';
import styles from './ImageWithText.module.css';

export default function ImageWithText({ content }) {
    const { title, subtitle, image, imagePosition, cta } = content || {
        title: 'Story',
        subtitle: 'Details',
        image: '',
        imagePosition: 'left',
        cta: { label: 'Learn More', link: '#' }
    };

    return (
        <section className={`${styles.section} ${imagePosition === 'right' ? styles.reverse : ''}`}>
            <div className={styles.imageSide}>
                <img src={image} alt="Brand Story" />
            </div>
            <div className={styles.textSide}>
                <span className={styles.overline}>Since 2024</span>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
                <a href={cta.link} className={styles.ctaButton}>{cta.label}</a>
            </div>
        </section>
    );
}
