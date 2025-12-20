'use client';
import styles from './Quote.module.css';

export default function Quote({
    text = "Quote text here..."
}) {
    return (
        <section className={styles.quote}>
            <p className={styles.text}>{text}</p>
        </section>
    );
}

Quote.cmsConfig = {
    name: "Emma Quote",
    props: {
        text: { type: "text", label: "Quote Text" }
    }
};
