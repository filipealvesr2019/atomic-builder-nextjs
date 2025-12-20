'use client';
import styles from './ServicesHero.module.css';

export default function ServicesHero({
    title = "Let's work together",
    subtitle = "Ready to grow your biz?",
    text = "We help creative entrepreneurs build their dream business with our custom strategies.",
    buttonText = "BOOK NOW",
    image = ""
}) {
    return (
        <section className={styles.hero}>
            <div className={styles.imageSide}>
                <div className={styles.imageWrapper}>
                    {image ? (
                        <img src={image} alt={title} className={styles.image} />
                    ) : (
                        <div style={{background:'#eee', width:'100%', height:'100%'}}></div>
                    )}
                </div>
            </div>
            <div className={styles.contentSide}>
                <h1 className={styles.title}>{title}</h1>
                <h2 className={styles.subtitle}>{subtitle}</h2>
                <p className={styles.text}>{text}</p>
                {buttonText && <button className={styles.button}>{buttonText}</button>}
            </div>
            <svg className={styles.decorativeLine} viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#1a1a1a" strokeWidth="1" d="M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,165.3C672,160,768,192,864,197.3C960,203,1056,181,1152,160C1248,139,1344,117,1392,106.7L1440,96" />
            </svg>
        </section>
    );
}

ServicesHero.cmsConfig = {
    name: "Emma Services Hero",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        text: { type: "text", label: "Description" },
        buttonText: { type: "string", label: "Button Text" },
        image: { type: "image", label: "Hero Image" }
    }
};
