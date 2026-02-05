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

    useEffect(() => {
        if (!isDragging) return;

        const onMove = (e) => {
            const pageX = e.touches ? e.touches[0].pageX : e.pageX;
            setDragOffset(pageX - startX);
        };

        const onEnd = () => {
            setIsDragging(false);
            const threshold = 80;
            if (dragOffset < -threshold && current < slides.length - 1) {
                setCurrent(current + 1);
            } else if (dragOffset > threshold && current > 0) {
                setCurrent(current - 1);
            }
            setDragOffset(0);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onEnd);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);
        };
    }, [isDragging, dragOffset, startX, current, slides.length]);

    const handleStart = (e) => {
        const pageX = e.touches ? e.touches[0].pageX : e.pageX;
        setIsDragging(true);
        setStartX(pageX);
        // Prevent default only for mouse to not break touch scroll if not dragging significantly
        if (!e.touches) e.preventDefault();
    };

    return (
        <section className={styles.heroSection}>
            <div
                className={`${styles.carouselContainer} ${isDragging ? styles.grabbing : ''}`}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
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
                                onDragStart={(e) => e.preventDefault()}
                            >
                                <div
                                    className={styles.textSide}
                                    style={{ backgroundColor: slide.bgColor }}
                                >
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
                                <div className={styles.imageSide}>
                                    <img src={slide.image} alt={slide.title} className={styles.slideImage} />
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
