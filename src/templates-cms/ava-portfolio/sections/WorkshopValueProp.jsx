import { Check } from 'lucide-react';
import styles from './WorkshopValueProp.module.css';

export default function WorkshopValueProp({
    title = "You're Ready to Transform your Business from a Part-Time Hobby to the Real Deal",
    bridgeStatement = "I'VE WORKED WITH HUNDREDS OF PHOTOGRAPHERS WHO ARE LOOKING FOR THAT EXTRA PUSH WHEN IT COMES TO GROWING A BUSINESS",
    items = [
        { text: "You want to learn how to find and book more high-quality clients" },
        { text: "You want to confidently charge higher rates for services" },
        { text: "You want help with invoicing, accounting, and marketing." }
    ]
}) {
    return (
        <section className={styles.valueSection}>
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.bridge}>{bridgeStatement}</p>
                
                <div className={styles.grid}>
                    {items.map((item, index) => (
                        <div key={index} className={styles.item}>
                            <Check className={styles.icon} size={18} strokeWidth={1.5} />
                            <p className={styles.text}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

WorkshopValueProp.cmsConfig = {
    name: "Workshop Value Proposition",
    props: {
        title: { type: "string", label: "Title" },
        bridgeStatement: { type: "string", label: "Bridge Statement" },
        items: {
            type: "array",
            label: "Value Items",
            itemSchema: {
                text: { type: "string", label: "Text" }
            }
        }
    }
};
