'use client';
import styles from './InstagramRow.module.css';

export default function InstagramRow({ images = [], forceMobile }) {
  return (
    <section className={`${styles.section} ${forceMobile ? 'ursula-mobile-insta' : ''}`}>
        {images.map((img, idx) => (
            <div key={idx} className={styles.imgWrapper}>
                <img src={img} alt={`Insta ${idx}`} className={styles.image} />
                <div className={styles.overlay}>
                    <span>📷</span>
                </div>
            </div>
        ))}
    </section>
  );
}
