'use client';
import styles from './AboutThings.module.css';
import { Sparkles, Coffee, PenTool } from 'lucide-react';

export default function AboutThings({
    title = "3 things about me",
    subtitle = "A few fun facts about who I am.",
    things = [
        { title: "My superpower", text: "I can organize chaos into structured plans.", icon: "sparkles" },
        { title: "Coffee Addict", text: "I cannot start my day without a fresh brew.", icon: "coffee" },
        { title: "Stationery Lover", text: "I have an obsession with notebooks and pens.", icon: "pen" }
    ]
}) {
    const getIcon = (name) => {
        switch(name) {
            case 'sparkles': return <Sparkles size={40} strokeWidth={1.5} />;
            case 'coffee': return <Coffee size={40} strokeWidth={1.5} />;
            case 'pen': return <PenTool size={40} strokeWidth={1.5} />;
            default: return <Sparkles size={40} />;
        }
    };

    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <h2 className={styles.mainTitle}>{title}</h2>
                <p className={styles.subText}>{subtitle}</p>
                <div className={styles.grid}>
                    {things.map((thing, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>{getIcon(thing.icon)}</div>
                            <h3 className={styles.cardTitle}>{thing.title}</h3>
                            <p className={styles.cardText}>{thing.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

AboutThings.cmsConfig = {
    name: "Emma About Things",
    props: {
        title: { type: "string", label: "Main Title" },
        subtitle: { type: "string", label: "Subtitle" },
        things: { 
            type: "array", 
            label: "Things",
            itemSchema: {
                title: { type: "string", label: "Title" },
                text: { type: "text", label: "Description" },
                icon: { type: "select", label: "Icon", options: ["sparkles", "coffee", "pen"] }
            }
        }
    }
};
