import styles from './WorkshopHero.module.css';

export default function WorkshopHero({
    title = "Photography Workshop",
    subtitle = "AVA ROSE PHOTOGRAPHY",
    description = "Master the art of storytelling through light and lens. Join our exclusive workshop designed for all skill levels.",
    buttonText = "BOOK NOW",
    imageUrl = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"
}) {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.imageWrapper}>
                    <img src={imageUrl} alt="Workshop" className={styles.image} />
                </div>
                <div className={styles.content}>
                    <span className={styles.subtitle}>{subtitle}</span>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>{description}</p>
                    <button className={styles.button}>{buttonText}</button>
                </div>
            </div>
        </section>
    );
}

WorkshopHero.cmsConfig = {
    name: "Workshop Hero",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        description: { type: "string", label: "Description" },
        buttonText: { type: "string", label: "Button Text" },
        imageUrl: { type: "image", label: "Image" }
    }
};
