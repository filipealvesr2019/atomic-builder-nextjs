'use client';
import styles from './AboutPassion.module.css';
import { Check } from 'lucide-react';

export default function AboutPassion({
    title = "My passion",
    subtitle = "Bringing your vision to life!",
    items = ["Authentic design", "Strategic thinking", "User focused", "Creative solutions"],
    buttonText = "CONTACT ME",
    mainImage = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
    subImage = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80"
}) {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <div className={styles.contentSide}>
                    <h2 className={styles.title}>{title}</h2>
                    <span className={styles.subtitle}>{subtitle}</span>
                    <div className={styles.list}>
                        {items.map((item, idx) => (
                            <div key={idx} className={styles.listItem}>
                                 <Check size={16} className={styles.check}/>
                                 <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <button className={styles.button}>{buttonText}</button>
                </div>
                <div className={styles.imageSide}>
                    <img src={mainImage} alt="Passion Main" className={styles.mainImage} />
                    <img src={subImage} alt="Passion Detail" className={styles.subImage} />
                </div>
            </section>
        </div>
    );
}

AboutPassion.cmsConfig = {
    name: "Emma About Passion",
    props: {
        title: { type: "string", label: "Title" },
        subtitle: { type: "string", label: "Subtitle" },
        items: { type: "array", label: "List Items", itemSchema: { type: "string" } },
        buttonText: { type: "string", label: "Button Text" },
        mainImage: { type: "image", label: "Main Image (B&W)" },
        subImage: { type: "image", label: "Sub Image (Small)" }
    }
};
