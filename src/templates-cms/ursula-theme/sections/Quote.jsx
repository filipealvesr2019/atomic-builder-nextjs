'use client';
import styles from './Quote.module.css';

export default function Quote({ text, author, forceMobile }) {
  return (
    <section className={`${styles.section} ${forceMobile ? 'ursula-mobile-quote' : ''}`}>
        <div className={styles.icon}>“</div>
        <blockquote className={styles.quote}>
            {text}
        </blockquote>
        <cite className={styles.author}>{author}</cite>
    </section>
  );
}
