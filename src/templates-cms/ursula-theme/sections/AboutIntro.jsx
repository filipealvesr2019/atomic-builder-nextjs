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
            {/* Column 1: Title + Vertical Image */}
            <div className={styles.col1}>
                <span className={styles.subtitle}>{subtitle}</span>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.imgWrapper1}>
                     <img src={images[0]} alt="About 1" className={styles.image} />
                </div>
            </div>

            {/* Column 2: Large Image + Description */}
            <div className={styles.col2}>
                <div className={styles.imgWrapper2}>
                    <img src={images[1]} alt="About 2" className={styles.image} />
                </div>
                <p className={styles.description}>{description}</p>
            </div>

            {/* Column 3: Offset Image */}
             <div className={styles.col3}>
                <div className={styles.imgWrapper3}>
                     <img src={images[2]} alt="About 3" className={styles.image} />
                </div>
            </div>
        </div>
    </section>
  );
}
