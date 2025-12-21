import React from 'react';
import * as Icons from 'lucide-react';
import styles from './Benefits.module.css';

const Benefits = ({ content }) => {
  const { title, items } = content || {};

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title || "Por que escolher nossa marca?"}</h2>
        </div>

        <div className={styles.grid}>
          {items?.map((item, index) => {
            const IconComponent = Icons[item.icon] || Icons.Check;
            return (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <IconComponent size={24} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
