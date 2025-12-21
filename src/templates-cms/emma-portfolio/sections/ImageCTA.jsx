'use client';
import styles from './ImageCTA.module.css';

export default function ImageCTA({
    title = "Let's talk about your project",
    subtitle = "I'm here to launch your dream business!",
    buttonText = "BOOK A CALL",
    image = ""
}) {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                {image && <img src={image} alt="Background" className={styles.bgImage} />}
                <div className={styles.overlay}></div>
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.subtitle}>{subtitle}</p>
                    {buttonText && <button className={styles.button}>{buttonText}</button>}
                </div>
            </section>
        </div>
    );
}

ImageCTA.cmsConfig = {
    name: "Emma Image CTA",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        buttonText: { type: "string", label: "Button Text" },
        image: { type: "image", label: "Background Image" }
    }
};
