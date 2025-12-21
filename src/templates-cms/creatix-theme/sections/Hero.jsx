import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = ({ headline, subheadline, primaryCTA, secondaryCTA, image }) => {
  const heroImage = image || "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2000";

  return (
    <section className={styles.hero}>
      <div className={styles.bgImageWrapper}>
        <img src={heroImage} alt="Creatix Hero background" className={styles.bgImage} />
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.gradientBg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeText}>New Assets available</span>
            <ChevronRight size={14} />
          </div>
          
          <h1 className={styles.headline}>
            {headline || "Digital design assets that convert"}
          </h1>
          
          <p className={styles.subheadline}>
            {subheadline || "High-quality templates, UI kits and digital resources crafted to elevate your e-commerce and brand presence."}
          </p>
          
          <div className={styles.actions}>
            <a href="/products" className={styles.primaryBtn}>
              {primaryCTA || "Explore products"}
              <ArrowRight size={20} className={styles.icon} />
            </a>
            <a href="#categories" className={styles.secondaryBtn}>
              {secondaryCTA || "Browse categories"}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
