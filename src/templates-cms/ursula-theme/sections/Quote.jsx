'use client';
import styles from './Quote.module.css';

export default function Quote({ text, author }) {
  return (
    <section className={styles.section}>
        <div className={styles.icon}>“</div>
        <blockquote className={styles.quote}>
            {text}
        </blockquote>
        <cite className={styles.author}>{author}</cite>
    </section>
  );
}
