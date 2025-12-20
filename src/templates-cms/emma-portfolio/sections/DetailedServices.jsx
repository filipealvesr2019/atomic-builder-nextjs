'use client';
import styles from './DetailedServices.module.css';

export default function DetailedServices({ services = [] }) {
    return (
        <section className={styles.section}>
            {services.map((service, index) => (
                <div key={index} className={`${styles.row} ${index % 2 !== 0 ? styles.rowReverse : ''}`}>
                    <div className={styles.contentSide}>
                        <h2 className={styles.title}>{service.title}</h2>
                        <span className={styles.subtitle}>{service.subtitle}</span>
                        <div className={styles.description} dangerouslySetInnerHTML={{ __html: service.description }}></div>
                        {service.buttonText && (
                            <button className={styles.button}>{service.buttonText}</button>
                        )}
                    </div>
                    <div className={styles.imageSide}>
                        <div className={styles.imageContainer}>
                            <div className={styles.blob} style={{ backgroundColor: index % 2 === 0 ? '#fcd5c5' : '#e0e0e0' }}></div>
                            <img 
                                src={service.image} 
                                alt={service.title} 
                                className={styles.image} 
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80'; }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

DetailedServices.cmsConfig = {
    name: "Emma Detailed Services",
    props: {
        services: {
            type: "array",
            label: "Services List",
            itemProps: {
                title: { type: "string", label: "Title" },
                subtitle: { type: "string", label: "Subtitle" },
                description: { type: "text", label: "Description" },
                buttonText: { type: "string", label: "Button Text" },
                image: { type: "image", label: "Image" }
            }
        }
    }
};
