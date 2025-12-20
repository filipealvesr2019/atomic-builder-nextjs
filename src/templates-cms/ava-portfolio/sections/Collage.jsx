'use client';
import styles from './Collage.module.css';

export default function Collage({ 
    images = [],
    title = "Every Part of Your Love Story",
    description = "Capturing life's most precious moments with elegance and grace. We believe in the power of storytelling through imagery.",
    buttonText = "Sound interesting?"
}) {
    // Ensure we have at least 3 images or fallbacks
    const img1 = images[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"; // Table
    const img2 = images[1] || "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop"; // Wedding Couple
    const img3 = images[2] || "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2070&auto=format&fit=crop"; // Wedding Details (Flowers)

  return (
    <section className={styles.collageSection}>
      <div className={styles.container}>
        <div className={styles.collageGrid}>
            <div className={styles.imageWrapper1}>
                <img src={img1} alt="Collage 1" className={styles.image} />
            </div>
            <div className={styles.imageWrapper2}>
                <img src={img2} alt="Collage 2" className={styles.image} />
            </div>
            <div className={styles.imageWrapper3}>
                <img src={img3} alt="Collage 3" className={styles.image} />
            </div>
        </div>
        <div className={styles.textContent}>
            <div className={styles.textInner}>
                <h4 className={styles.subheading}>THE LOVE STORY</h4>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
                <a href="#contact" className={styles.button}>{buttonText}</a>
            </div>
        </div>
      </div>
    </section>
  );
}

Collage.cmsConfig = {
    name: "Ava Collage + Text",
    props: {
        images: { 
            type: "array", 
            label: "Images (Top Left, Top Right, Bottom Center)", 
            itemSchema: { type: "image" } 
        },
        title: { type: "string", label: "Title" },
        description: { type: "string", label: "Description" },
        buttonText: { type: "string", label: "Button Text" }
    }
};
