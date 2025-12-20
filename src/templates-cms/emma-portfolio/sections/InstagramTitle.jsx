'use client';
import styles from './InstagramTitle.module.css';

export default function InstagramTitle({
    title = "Instagram"
}) {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>{title}</h2>
        </section>
    );
}

InstagramTitle.cmsConfig = {
    name: "Emma Instagram Title",
    props: {
        title: { type: "string", label: "Title" }
    }
};
