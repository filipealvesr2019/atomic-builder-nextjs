import React, { useState } from 'react';
import styles from './Hero.module.css';

export default function Hero({ content }) {
    const slides = content?.slides || [];
    const [current, setCurrent] = useState(0);

    if (!slides.length) return null;

    return (
        <section className={styles.heroSection}>
            <div className={styles.sliderContainer}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`${styles.slide} ${index === current ? styles.active : ''}`}
                        style={{ backgroundColor: slide.bgColor }}
                    >
                        <div className={styles.contentWrapper}>
                            <div className={styles.imageSide}>
                                <img src={slide.image} alt={slide.title} className={styles.roundedImage} />
                            </div>
                            <div className={styles.textSide}>
                                <span className={styles.tagline}>{slide.tagline}</span>
                                <h1 className={styles.title}>{slide.title}</h1>
                                <a href={slide.cta?.link} className={styles.ctaButton}>
                                    {slide.cta?.label}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.pagination}>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </section>
    );
}
