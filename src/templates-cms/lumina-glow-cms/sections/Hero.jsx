import React from 'react';
import styles from './Hero.module.css';

export default function Hero({ content }) {
    const { title, subtitle, image, cta } = content || {
        title: 'Beauty Reimagined',
        subtitle: 'Experience the flow.',
        image: '',
        cta: { label: 'Shop Now', link: '#' }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <img src={image} alt="Hero Background" className={styles.image} />

            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>{subtitle}</p>
                <a href={cta.link} className={styles.ctaButton}>
                    {cta.label}
                </a>
            </div>
        </section>
    );
}
