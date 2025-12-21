import styles from './WorkshopImageOverlap.module.css';

export default function WorkshopImageOverlap({
    backgroundImage = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    title = "Inspiration Everywhere",
    description = "We find beauty in the smallest details and the largest landscapes. This workshop will change the way you see the world."
}) {
    return (
        <section className={styles.overlapSection}>
            <div className={styles.imageOverlay} style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className={styles.contentBox}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
        </section>
    );
}

WorkshopImageOverlap.cmsConfig = {
    name: "Workshop Image Overlap",
    props: {
        backgroundImage: { type: "image", label: "Background Image" },
        title: { type: "string", label: "Title" },
        description: { type: "string", label: "Description" }
    }
};
