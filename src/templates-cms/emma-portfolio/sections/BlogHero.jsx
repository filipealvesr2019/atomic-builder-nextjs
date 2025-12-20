'use client';
import styles from './BlogHero.module.css';

export default function BlogHero({
    title = "Blog"
}) {
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>{title}</h1>
        </section>
    );
}

BlogHero.cmsConfig = {
    name: "Emma Blog Hero",
    props: {
        title: { type: "string", label: "Title" }
    }
};
