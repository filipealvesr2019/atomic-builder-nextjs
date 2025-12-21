'use client';
import React from 'react';
import styles from './BlogNewsletter.module.css';

export default function BlogNewsletter({ 
    title = "Get Early Access to Photo Sessions",
    subtitle = "JOIN THE LIST",
    description = "Maecenas pharetra convallis posuere morbi. Pulvinar mattis nunc sed blandit libero volutpat sed cras ornare. Venenatis a condimentum vitae sapien pellentesque.",
    buttonText = "SIGN UP"
}) {
  return (
    <section className={styles.newsletterSection}>
      <div className={styles.container}>
        <span className={styles.subtitle}>{subtitle}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="EMAIL ADDRESS" className={styles.input} />
            <button type="submit" className={styles.button}>{buttonText}</button>
        </form>
      </div>
    </section>
  );
}

BlogNewsletter.cmsConfig = {
    name: "Blog Newsletter",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        description: { type: "string", label: "Description" },
        buttonText: { type: "string", label: "Button Text" }
    }
};
