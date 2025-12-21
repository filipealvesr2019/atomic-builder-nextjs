'use client';
import styles from './AboutStory.module.css';

export default function AboutStory({
    image = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    title = "Owner & Brand strategist",
    subtitle = "My story",
    text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    buttonText = "READ MORE"
}) {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <div className={styles.imageSide}>
                    <img src={image} alt="Story" className={styles.image} />
                </div>
                <div className={styles.contentSide}>
                    <h2 className={styles.title}>{title}</h2>
                    <span className={styles.subtitle}>{subtitle}</span>
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
                    <button className={styles.button}>{buttonText}</button>
                </div>
            </section>
        </div>
    );
}

AboutStory.cmsConfig = {
    name: "Emma About Story",
    props: {
        image: { type: "image", label: "Image" },
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        text: { type: "rich-text", label: "Text" },
        buttonText: { type: "string", label: "Button Text" }
    }
};
