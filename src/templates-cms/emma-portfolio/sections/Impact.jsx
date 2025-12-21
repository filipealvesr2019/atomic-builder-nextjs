'use client';
import styles from './Impact.module.css';

export default function Impact({
    title = "Ready to impact?",
    text = "Join us...",
    buttonText = "Join Now",
    images = []
}) {
    return (
        <div className={styles.container}>
            <section className={styles.impact}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.text}>{text}</p>
                    {buttonText && <button className={styles.button}>{buttonText}</button>}
                </div>
                <div className={styles.images}>
                    {images.map((img, index) => (
                        <img key={index} src={img} alt="Impact" className={styles.img} />
                    ))}
                    {images.length === 0 && (
                        <>
                        <div className={styles.img} style={{background:'#eee'}}></div>
                        <div className={styles.img} style={{background:'#ddd'}}></div>
                        <div className={styles.img} style={{background:'#ccc'}}></div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

Impact.cmsConfig = {
    name: "Emma Impact",
    props: {
        title: { type: "string", label: "Title" },
        text: { type: "text", label: "Description" },
        buttonText: { type: "string", label: "Button Text" },
        images: { type: "array", label: "Images", itemSchema: { type: "image" } }
    }
};
