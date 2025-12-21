import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = ({ content }) => {
  const { badge, headline, subheadline, primaryCTA, secondaryCTA, image } = content || {};

  return (
    <section className={styles.hero}>
      <div className={styles.decoration} />
      <div className={styles.container}>
        <div className={styles.content}>
          {badge && <span className={styles.badge}>{badge}</span>}
          <h1 className={styles.headline}>
            {headline || "Impulsione seu projeto com nossos ativos digitais"}
          </h1>
          <p className={styles.subheadline}>
            {subheadline || "Templates, cursos e ferramentas exclusivas criadas para acelerar seu fluxo de trabalho."}
          </p>
          <div className={styles.actions}>
            <a href="/products" className={styles.primaryBtn}>
              {primaryCTA || "Ver produtos"}
              <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
            </a>
            <a href="/categories" className={styles.secondaryBtn}>
              {secondaryCTA || "Explorar categorias"}
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
