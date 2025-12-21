'use client';
import styles from './Podcast.module.css';

export default function Podcast({
    title = "The Podcast",
    subtitle = "About Emma",
    text = "Listen...",
    buttonText = "Listen Now",
    image = ""
}) {

    return (
        <div className={styles.container}>
            <section className={styles.podcast}>
                 <div className={styles.imageContainer}>
                    {image ? (
                        <img src={image} alt={title} className={styles.image} />
                    ) : (
                        <div style={{width:'300px', height:'300px', background:'#eee', borderRadius:'50%'}}></div>
                    )}
                </div>
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <span className={styles.subtitle}>{subtitle}</span>
                    <p className={styles.text}>{text}</p>
                    {buttonText && <button className={styles.button}>{buttonText}</button>}
                </div>
            </section>
        </div>
    );
}

Podcast.cmsConfig = {
    name: "Emma Podcast",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        text: { type: "text", label: "Description" },
        buttonText: { type: "string", label: "Button Text" },
        image: { type: "image", label: "Image" }
    }
};
