'use client';
import styles from './AboutBehindScenes.module.css';

export default function AboutBehindScenes({
    title = "Behind the scene",
    subtitle = "Get to know me",
    text = "Lorem ipsum dolor sit amet.",
    image = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80"
}) {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                 <div className={styles.contentSide}>
                    <h2 className={styles.title}>{title}</h2>
                    <span className={styles.subtitle}>{subtitle}</span>
                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
                </div>
                <div className={styles.imageSide}>
                    <div className={styles.blob}></div>
                    <img src={image} alt="Behind the scenes" className={styles.image} />
                </div>
            </section>
        </div>
    );
}

AboutBehindScenes.cmsConfig = {
    name: "Emma About Behind Scenes",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        text: { type: "rich-text", label: "Text" },
        image: { type: "image", label: "Image" }
    }
};
