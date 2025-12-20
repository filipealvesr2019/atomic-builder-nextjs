'use client';
import styles from './Hero.module.css';

export default function Hero({
    title = "Title",
    subtitle = "Subtitle",
    text = "Description text here",
    buttonText = "Click Me",
    backgroundImage = "",
    overlayImage = ""
}) {
    return (
        <section className={styles.hero}>
            <div className={styles.imageSide}>
                {backgroundImage ? (
                    <img src={backgroundImage} alt="Background" className={styles.bgImage} />
                ) : (
                    <div className={styles.bgImage} style={{background:'#eee'}}></div>
                )}
                
                {overlayImage && (
                    <img src={overlayImage} alt="Overlay" className={styles.overlayImage} />
                )}
            </div>
            <div className={styles.contentSide}>
                <h1 className={styles.title}>{title}</h1>
                <span className={styles.subtitle}>{subtitle}</span>
                <p className={styles.text}>{text}</p>
                {buttonText && <button className={styles.button}>{buttonText}</button>}
            </div>
        </section>
    );
}

Hero.cmsConfig = {
    name: "Emma Hero",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        text: { type: "text", label: "Description" },
        buttonText: { type: "string", label: "Button Text" },
        backgroundImage: { type: "image", label: "Background Image" },
        overlayImage: { type: "image", label: "Overlay Image" }
    }
};
