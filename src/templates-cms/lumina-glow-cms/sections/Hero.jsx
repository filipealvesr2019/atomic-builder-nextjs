import React, { useState, useRef, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero({ content }) {
    const slides = content?.slides || [];
    const [current, setCurrent] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const sliderRef = useRef(null);

    if (!slides.length) return null;

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - dragOffset);
        // Prevent text selection during drag
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentX = e.pageX;
        setDragOffset(currentX - startX);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 80; // Slightly lower threshold for better feel
        if (dragOffset < -threshold && current < slides.length - 1) {
            setCurrent(current + 1);
        } else if (dragOffset > threshold && current > 0) {
            setCurrent(current - 1);
        }

        setDragOffset(0);
    };

    const handleMouseLeave = () => {
        if (isDragging) handleMouseUp();
    };

    // Touch support
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX - dragOffset);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        // Prevent page scroll while dragging carousel
        if (e.cancelable) e.preventDefault();
        const currentX = e.touches[0].pageX;
        setDragOffset(currentX - startX);
    };

    return (
        <section className={styles.heroSection}>
            <div
                className={`${styles.carouselContainer} ${isDragging ? styles.grabbing : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
            >
                <div
                    className={styles.slider}
                    style={{
                        transform: `translateX(calc(-${current * 100}% + ${dragOffset}px))`,
                        transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)'
                    }}
                    ref={sliderRef}
                >
                    {slides.map((slide, index) => (
                        <div key={index} className={styles.slideWrapper}>
                            <div
                                className={styles.card}
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    backgroundColor: slide.bgColor
                                }}
                                onDragStart={(e) => e.preventDefault()}
                            >
                                <div className={`${styles.overlay} ${styles[slide.align] || styles.center}`}>
                                    <div className={styles.content}>
                                        <span className={styles.tagline}>{slide.tagline}</span>
                                        <h1 className={styles.title}>{slide.title}</h1>
                                        <a
                                            href={slide.cta?.link}
                                            className={styles.ctaButton}
                                            onClick={(e) => isDragging && e.preventDefault()}
                                        >
                                            {slide.cta?.label}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
