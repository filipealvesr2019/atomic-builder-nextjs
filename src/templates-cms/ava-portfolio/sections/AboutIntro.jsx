'use client';
import styles from './AboutIntro.module.css';

export default function AboutIntro({ 
    title = "It's Nice to Meet You, I'm",
    name = "Ave Rose!", // Changed to match "Ava" but "Rose" adds elegance
    description = "Capturing life's perfect moments with grace and style. I turn your memories into timeless art that you will cherish forever.",
    buttonText = "Read My Story",
    imageUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
}) {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.textContent}>
            <h4 className={styles.subtitle}>ABOUT THE PHOTOGRAPHER</h4>
            <h2 className={styles.title}>{title}<br/><span className={styles.nameHighlight}>{name}</span></h2>
            <p className={styles.description}>{description}</p>
            <a href="#about" className={styles.button}>{buttonText}</a>
        </div>
        <div className={styles.imageContent}>
            <img src={imageUrl} alt="About Ava" className={styles.image} />
        </div>
      </div>
    </section>
  );
}

AboutIntro.cmsConfig = {
    name: "Ava About Intro",
    props: {
        title: { type: "string", label: "Title" },
        name: { type: "string", label: "Name" },
        description: { type: "string", label: "Description" },
        buttonText: { type: "string", label: "Button Text" },
        imageUrl: { type: "image", label: "Portrait Image" }
    }
};
