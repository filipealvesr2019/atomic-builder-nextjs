'use client';
import styles from './ContactHero.module.css';

export default function ContactHero({
    title = "Contact me",
    subtitle = "Need more info about my services ?",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
}) {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h1 className={styles.title}>{title}</h1>
                <span className={styles.subtitle}>{subtitle}</span>
                <p className={styles.description}>{description}</p>
            </section>
        </div>
    );
}

ContactHero.cmsConfig = {
    name: "Emma Contact Hero",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        description: { type: "text", label: "Description" }
    }
};
