import styles from './WorkshopAbout.module.css';

export default function WorkshopAbout({
    title = "Capturing the Moments That Matter Most",
    description = "With over a decade of experience in wedding and lifestyle photography, I've learned that the best shots are the ones you didn't plan. My workshop is about teaching you how to anticipate these moments and capture them with precision and emotion.",
    buttonText = "SIGN UP",
    imageUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
}) {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                    <button className={styles.button}>{buttonText}</button>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={imageUrl} alt="About Workshop" className={styles.image} />
                </div>
            </div>
        </section>
    );
}

WorkshopAbout.cmsConfig = {
    name: "Workshop About",
    props: {
        title: { type: "string", label: "Title" },
        description: { type: "string", label: "Description" },
        buttonText: { type: "string", label: "Button Text" },
        imageUrl: { type: "image", label: "Image" }
    }
};
