'use client';
import styles from './Hero.module.css';

export default function Hero({
    title = "Title",
    subtitle = "Subtitle",
    text = "Description text here",
    buttonText = "Click Me",
    image = ""
}) {
    // If no image provided, we can use a placeholder div or default
    return (
        <section className={styles.hero}>
            <div className={styles.imageSide}>
                {image ? (
                    <img src={image} alt={title} className={styles.image} />
                ) : (
                    <div style={{width:'100%', height:'100%', background:'#ddd', display:'flex', alignItems:'center', justifyContent:'center'}}>Image</div>
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
        image: { type: "image", label: "Hero Image" }
    }
};
