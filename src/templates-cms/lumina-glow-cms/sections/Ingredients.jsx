import React from 'react';
import styles from './Ingredients.module.css';

export default function Ingredients({ content }) {
    const { title, subtitle, items } = content || {
        title: 'Key Ingredients',
        subtitle: 'Powered by nature',
        items: []
    };

    return (
        <section className={styles.section} id="ingredients">
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>

            <div className={styles.grid}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <div className={styles.imageWrapper}>
                            <img src={item.image} alt={item.name} className={styles.image} />
                        </div>
                        <span className={styles.name}>{item.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
