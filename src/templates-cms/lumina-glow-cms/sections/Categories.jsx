import React, { useState, useRef, useEffect } from 'react';
import styles from './Categories.module.css';

export default function Categories({ content }) {
    const { subtitle, title, description, items } = content || {
        subtitle: 'Care For Your Skin',
        title: 'Natural self care products',
        description: 'We create safe products that really work and are designed to make you feel good',
        items: []
    };

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const carouselRef = useRef(null);

    const handleStart = (e) => {
        setIsDragging(true);
        setStartX((e.pageX || e.touches[0].pageX) - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    useEffect(() => {
        if (!isDragging) return;

        const onMove = (e) => {
            if (!isDragging) return;
            const x = (e.pageX || e.touches[0].pageX) - carouselRef.current.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            carouselRef.current.scrollLeft = scrollLeft - walk;
        };

        const onEnd = () => {
            setIsDragging(false);
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
    }, [isDragging, startX, scrollLeft]);

    const scroll = (direction) => {
        const { current } = carouselRef;
        const scrollAmount = 400;
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.label}>{subtitle}</div>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>

                    <div className={styles.nav}>
                        <button className={styles.navBtn} onClick={() => scroll('left')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button className={styles.navBtn} onClick={() => scroll('right')}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    className={`${styles.carousel} ${isDragging ? styles.grabbing : ''}`}
                    ref={carouselRef}
                    onMouseDown={handleStart}
                    onTouchStart={handleStart}
                >
                    {items.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={item.image} alt={item.name} className={styles.image} onDragStart={(e) => e.preventDefault()} />
                            </div>
                            <div className={styles.cardOverlay}>
                                <div className={styles.info}>
                                    <h3 className={styles.categoryName}>{item.name}</h3>
                                    <span className={styles.itemCount}>{item.count}</span>
                                </div>
                                <div className={styles.arrowIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M7 17l10-10M7 7h10v10" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
