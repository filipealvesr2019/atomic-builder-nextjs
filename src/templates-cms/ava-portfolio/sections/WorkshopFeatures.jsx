import styles from './WorkshopFeatures.module.css';
import { Check } from 'lucide-react';

export default function WorkshopFeatures({
    features = [
        "Master Manual Mode",
        "Creative Composition",
        "Natural Light Magic"
    ]
}) {
    return (
        <section className={styles.features}>
            <div className={styles.container}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.item}>
                        <Check size={20} className={styles.icon} />
                        <span className={styles.label}>{feature}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

WorkshopFeatures.cmsConfig = {
    name: "Workshop Features",
    props: {
        features: { 
            type: "array", 
            label: "Features List",
            itemSchema: { type: "string", label: "Feature" }
        }
    }
};
