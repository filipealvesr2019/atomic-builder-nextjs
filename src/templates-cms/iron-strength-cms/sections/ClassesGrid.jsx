import React from 'react';
import styles from './ClassesGrid.module.css';
import { ArrowRight } from 'lucide-react';

export default function ClassesGrid({ content }) {
    const { title, subtitle, items } = content || {
        title: 'Our Programs',
        subtitle: 'Choose your battlefield',
        items: []
    };

    return (
        <section className={styles.section} id="classes">
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>

                <div className={styles.grid}>
                    {items.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <img src={item.image} alt={item.title} className={styles.image} />
                            <div className={styles.overlay}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardDesc}>{item.description}</p>
                                <ArrowRight className={styles.arrow} size={24} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
