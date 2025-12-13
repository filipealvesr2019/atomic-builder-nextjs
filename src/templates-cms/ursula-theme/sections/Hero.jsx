'use client';

import styles from './Hero.module.css';

export default function Hero({
  backgroundImage = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  subtitle = "New Collection",
  title = "We are UrsulaTheme",
  buttonText = "Shop Now",
  buttonLink = "#"
}) {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <span className={styles.subtitle}>{subtitle}</span>
        <h2 className={styles.title}>{title}</h2>
        <a href={buttonLink} className={styles.button}>{buttonText}</a>
      </div>
    </section>
  );
}

Hero.cmsConfig = {
  name: "Ursula Hero",
  props: {
    backgroundImage: { type: "image", label: "Background Image" },
    subtitle: { type: "string", label: "Subtitle" },
    title: { type: "string", label: "Title" },
    buttonText: { type: "string", label: "Button Text" },
    buttonLink: { type: "string", label: "Button Link" }
  }
};
