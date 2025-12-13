'use client';
import styles from './AboutIntro.module.css';

export default function AboutIntro({ 
    title = "We Are Azura", 
    subtitle = "About Us",
    description = "Lorem ipsum dolor sit amet.",
    images = []
}) {
  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.textColumn}>
                <span className={styles.subtitle}>{subtitle}</span>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.imageWrapper}>
                     <img src={images[0]} alt="About 1" className={styles.image1} />
                </div>
            </div>
            <div className={styles.descColumn}>
                <div className={styles.imageWrapper2}>
                    <img src={images[1]} alt="About 2" className={styles.image2} />
                </div>
                <p className={styles.description}>{description}</p>
            </div>
             <div className={styles.rightColumn}>
                <div className={styles.imageWrapper3}>
                     <img src={images[2]} alt="About 3" className={styles.image3} />
                </div>
            </div>
        </div>
    </section>
  );
}
