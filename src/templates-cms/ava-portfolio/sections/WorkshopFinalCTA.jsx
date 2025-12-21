import styles from './WorkshopFinalCTA.module.css';

export default function WorkshopFinalCTA({
    title = "Ready to Take the Next Step?",
    description = "Don't miss this opportunity to transform your photography business and find your unique voice in the industry.",
    buttonText = "BOOK NOW",
    imageUrl = "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1000&auto=format&fit=crop"
}) {
    return (
        <section className={styles.cta}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                    <button className={styles.button}>{buttonText}</button>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={imageUrl} alt="Final CTA" className={styles.image} />
                </div>
            </div>
        </section>
    );
}

WorkshopFinalCTA.cmsConfig = {
    name: "Workshop Final CTA",
    props: {
        title: { type: "string", label: "Title" },
        description: { type: "string", label: "Description" },
        buttonText: { type: "string", label: "Button Text" },
        imageUrl: { type: "image", label: "Image" }
    }
};
