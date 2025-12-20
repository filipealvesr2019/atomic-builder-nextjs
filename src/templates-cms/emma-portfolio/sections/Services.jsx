'use client';
import styles from './Services.module.css';

export default function Services({
    title = "My Services",
    subtitle = "Check out what I offer",
    services = []
}) {
    return (
        <section className={styles.services}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <div className={styles.grid}>
                {services.map((service, index) => (
                    <div key={index} className={styles.card}>
                        {service.image ? (
                           <img src={service.image} alt={service.title} className={styles.cardImage} />
                        ) : (
                           <div style={{height:'250px', background:'#f0f0f0', marginBottom:'20px'}}></div>
                        )}
                        <h3 className={styles.cardTitle}>{service.title}</h3>
                        <p className={styles.cardDesc}>{service.description}</p>
                        {service.buttonText && <button className={styles.cardButton}>{service.buttonText}</button>}
                    </div>
                ))}
            </div>
        </section>
    );
}

Services.cmsConfig = {
    name: "Emma Services",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        services: {
            type: "array",
            label: "Services List",
            itemSchema: {
                title: { type: "string", label: "Service Title" },
                description: { type: "text", label: "Description" },
                buttonText: { type: "string", label: "Button Text" },
                image: { type: "image", label: "Service Image" }
            }
        }
    }
};
