import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = ({ badge, headline, subheadline, primaryCTA, secondaryCTA, image }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.decoration} />
      <div className={styles.container}>
        <div className={styles.content}>
          {badge && <span className={styles.badge}>{badge}</span>}
          <h1 className={styles.headline}>
            {headline || "Elevate your project with our premium digital assets"}
          </h1>
          <p className={styles.subheadline}>
            {subheadline || "Templates, courses, and exclusive tools created to speed up your workflow."}
          </p>
          <div className={styles.actions}>
            <a href="/products" className={styles.primaryBtn}>
              {primaryCTA || "View products"}
              <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </a>
            <a href="/categories" className={styles.secondaryBtn}>
              {secondaryCTA || "Explore categories"}
            </a>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            <img 
              src={image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"} 
              alt="Digital Products Hero" 
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
