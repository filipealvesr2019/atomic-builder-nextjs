import React from 'react';
import styles from './Marquee.module.css';

export default function Marquee({ content }) {
    const { text } = content || { text: 'FREE SHIPPING ON ORDERS OVER $50 • ' };

    // Repeat text to fill the screen mostly
    const repeatedText = (text + ' ').repeat(8);

    return (
        <section className={styles.marqueeSection}>
            <div className={styles.track}>
                <span className={styles.text}>{repeatedText}</span>
                <span className={styles.text}>{repeatedText}</span>
            </div>
        </section>
    );
}
