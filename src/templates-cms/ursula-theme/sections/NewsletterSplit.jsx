'use client';
import styles from './NewsletterSplit.module.css';

export default function NewsletterSplit({ 
    title, subtitle, text, buttonText, image,
    forceMobile
}) {
  return (
    <section className={`${styles.section} ${forceMobile ? 'ursula-mobile-split' : ''}`}>
        <div className={styles.imageContainer}>
            <img src={image} alt="Newsletter" className={styles.image} />
        </div>
        <div className={styles.content}>
            <span className={styles.subtitle}>{subtitle}</span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
            <form className={styles.form}>
                <input type="text" placeholder="Your name" className={styles.input} />
                <input type="email" placeholder="Your email" className={styles.input} />
                <button type="button" className={styles.button}>{buttonText}</button>
            </form>
        </div>
    </section>
  );
}
