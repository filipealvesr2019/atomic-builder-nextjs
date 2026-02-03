import React from 'react';
import styles from './Trainers.module.css';

export default function Trainers({ content }) {
    const { title, subtitle, list } = content || {
        title: 'Team',
        subtitle: 'Meet our experts',
        list: []
    };

    return (
        <section className={styles.section} id="trainers">
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>

                <div className={styles.grid}>
                    {list.map((trainer, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={trainer.image} alt={trainer.name} className={styles.image} />
                                <div className={styles.info}>
                                    <h3 className={styles.name}>{trainer.name}</h3>
                                    <p className={styles.role}>{trainer.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
