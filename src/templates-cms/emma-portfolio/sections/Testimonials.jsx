'use client';
import styles from './Testimonials.module.css';

export default function Testimonials({
    title = "They loved it!",
    testimonials = []
}) {
    return (
        <section className={styles.testimonials}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.grid}>
                {testimonials.map((t, index) => (
                    <div key={index} className={styles.card}>
                        <p className={styles.text}>"{t.text}"</p>
                        <span className={styles.author}>{t.author}</span>
                        <span className={styles.role}>{t.role}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

Testimonials.cmsConfig = {
    name: "Emma Testimonials",
    props: {
        title: { type: "string", label: "Title" },
        testimonials: {
            type: "array",
            label: "Testimonials",
            itemSchema: {
                text: { type: "text", label: "Quote" },
                author: { type: "string", label: "Author Name" },
                role: { type: "string", label: "Role/Title" }
            }
        }
    }
};
