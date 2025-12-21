'use client';
import styles from './InstagramTitle.module.css';

export default function InstagramTitle({
    title = "Instagram"
}) {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h2 className={styles.title}>{title}</h2>
            </section>
        </div>
    );
}

InstagramTitle.cmsConfig = {
    name: "Emma Instagram Title",
    props: {
        title: { type: "string", label: "Title" }
    }
};
