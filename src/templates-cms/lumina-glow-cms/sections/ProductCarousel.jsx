import React from 'react';
import styles from './ProductCarousel.module.css';

export default function ProductCarousel({ content }) {
    const { title, items } = content || {
        title: 'Best Sellers',
        items: []
    };

    return (
        <section className={styles.section} id="shop">
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <a className={styles.viewAll}>View All</a>
            </div>

            <div className={styles.carousel}>
                {items.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <img src={item.image} alt={item.name} className={styles.image} />
                        </div>
                        <div className={styles.info}>
                            <span className={styles.productName}>{item.name}</span>
                            <span className={styles.price}>{item.price}</span>
                        </div>
                        <button className={styles.addToCart}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </section>
    );
}
