'use client';
import styles from './Introduction.module.css';

export default function Introduction({ 
    subheading = "INTRODUCING THE BRANDING",
    heading = "Forever Cherish The Most Important Moments in Your Life",
    buttonText = "Sound interesting? Let's work together."
}) {
  return (
    <section className={styles.introduction}>
      <div className={styles.content}>
        <h4 className={styles.subheading}>{subheading}</h4>
        <h2 className={styles.heading}>{heading}</h2>
        <a href="#contact" className={styles.link}>{buttonText}</a>
      </div>
    </section>
  );
}

Introduction.cmsConfig = {
    name: "Ava Introduction",
    props: {
        subheading: { type: "string", label: "Subheading" },
        heading: { type: "string", label: "Heading" },
        buttonText: { type: "string", label: "Link Text" }
    }
};
