'use client';
import styles from './StepsNewsletter.module.css';

export default function StepsNewsletter({
    title = "5 easy steps to create your brand",
    subtitle = "Get our free guide...",
    placeholder = "Your email address",
    buttonText = "Subscribe",
    image = ""
}) {
    return (
        <section className={styles.steps}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                     {image ? (
                        <img src={image} alt="Guide" className={styles.image} />
                    ) : (
                        <div style={{width:'300px', height:'400px', background:'#fff', transform: 'rotate(-3deg)'}}></div>
                    )}
                </div>
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.subtitle}>{subtitle}</p>
                    <div className={styles.form}>
                        <input type="email" placeholder={placeholder} className={styles.input} />
                        <button className={styles.button}>{buttonText}</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

StepsNewsletter.cmsConfig = {
    name: "Emma Steps Newsletter",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        placeholder: { type: "string", label: "Input Placeholder" },
        buttonText: { type: "string", label: "Button Text" },
        image: { type: "image", label: "Image" }
    }
};
