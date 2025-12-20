'use client';
import styles from './ExclusiveContent.module.css';

export default function ExclusiveContent({
    title = "Exclusive content!",
    subtitle = "Join our newsletter",
    placeholder = "Your email address",
    buttonText = "Send"
}) {
    return (
        <section className={styles.exclusive}>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.subtitle}>{subtitle}</span>
            <div className={styles.form}>
                <input type="email" placeholder={placeholder} className={styles.input} />
                <button className={styles.button}>{buttonText}</button>
            </div>
        </section>
    );
}

ExclusiveContent.cmsConfig = {
    name: "Emma Exclusive Content",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        placeholder: { type: "string", label: "Placeholder" },
        buttonText: { type: "string", label: "Button Text" }
    }
};
