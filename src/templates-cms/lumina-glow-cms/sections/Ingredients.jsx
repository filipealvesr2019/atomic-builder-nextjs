import React from 'react';
import styles from './Ingredients.module.css';

export default function Ingredients({ content }) {
    const { title, subtitle, items } = content || {};

    return (
        <section className={styles.section} id="ingredients">
            <div className={styles.container}>
                {title && <h2 className={styles.title}>{title}</h2>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

                <div className={styles.grid}>
                    {items?.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.imageWrapper}>
                                <img src={item.image} alt={item.name} className={styles.image} />
                            </div>
                            <h3 className={styles.itemName}>{item.name}</h3>
                            <p className={styles.itemDescription}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
