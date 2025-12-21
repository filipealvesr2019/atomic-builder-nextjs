'use client';
import styles from './Introduction.module.css';

export default function Introduction({
    title = "Hello!",
    subtitle = "Subtitle",
    text = "Description...",
    buttonText = "Read More",
    image = ""
}) {
    return (
        <div className={styles.container}>
            <section className={styles.intro}>
                <div className={styles.imageContainer}>
                     {image ? (
                        <img src={image} alt={title} className={styles.image} />
                    ) : (
                        <div style={{width:'100%', height:'400px', background:'#eee'}}>Image</div>
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

Introduction.cmsConfig = {
    name: "Emma Introduction",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        text: { type: "text", label: "Description" },
        buttonText: { type: "string", label: "Button Text" },
        image: { type: "image", label: "Image" }
    }
};
