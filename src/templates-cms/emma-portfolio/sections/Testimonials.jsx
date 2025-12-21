'use client';
import styles from './Testimonials.module.css';

export default function Testimonials({
    title = "",
    testimonials = []
}) {

    return (
        <div className={styles.container}>
            <section className={styles.testimonials}>
                {title && <h2 className={styles.title}>{title}</h2>}
                <div className={styles.grid}>
                    {testimonials.map((t, index) => (
                        <div key={index} className={styles.card}>
                            {t.image && <img src={t.image} alt={t.author} className={styles.avatar} />}
                            <div className={styles.content}>
                                <p className={styles.text}>« {t.text.replace(/«|»/g, '').trim()} »</p>
                                <div>
                                    <span className={styles.author}>{t.author}</span>
                                    <span className={styles.role}>- {t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

Testimonials.cmsConfig = {
    name: "Emma Testimonials",
    props: {
        title: { type: "string", label: "Title" },
        testimonials: {
            type: "array",
            label: "Testimonials",
            itemProps: {
                text: { type: "text", label: "Quote" },
                author: { type: "string", label: "Author Name" },
                role: { type: "string", label: "Role/Title" },
                image: { type: "image", label: "Avatar" }
            }
        }
    }
};
