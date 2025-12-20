'use client';
import styles from './Hero.module.css';

export default function Hero({ 
    backgroundImage = "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
}) {
  return (
    <section className={styles.hero}>
      <div 
        className={styles.heroImage} 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
    </section>
  );
}

Hero.cmsConfig = {
    name: "Ava Hero",
    props: {
        backgroundImage: { type: "image", label: "Start Image" }
    }
};
