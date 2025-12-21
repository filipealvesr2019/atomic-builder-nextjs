import styles from './WorkshopPricing.module.css';
import { Check } from 'lucide-react';

export default function WorkshopPricing({
    title = "Choose Your Plan",
    plans = [
        {
            name: "Basic Plan",
            price: "$299",
            features: [
                "1 Full Day Workshop",
                "Workbook & Resources",
                "Light Refreshments",
                "Group Shooting Session"
            ],
            buttonText: "choose basic"
        },
        {
            name: "Premium Plan",
            price: "$499",
            features: [
                "2 Full Day Workshop",
                "Workbook & Resources",
                "Gourmet Lunch Included",
                "Personal Shooting Session",
                "Editing Masterclass"
            ],
            buttonText: "choose premium",
            highlighted: true
        }
    ]
}) {
    return (
        <section className={styles.pricing}>
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.grid}>
                    {plans.map((plan, index) => (
                        <div key={index} className={`${styles.card} ${plan.highlighted ? styles.highlighted : ''}`}>
                            <h3 className={styles.planName}>{plan.name}</h3>
                            <div className={styles.priceContainer}>
                                <span className={styles.price}>{plan.price}</span>
                                <span className={styles.tax}>+ Tax</span>
                            </div>
                            <ul className={styles.featuresList}>
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className={styles.featureItem}>
                                        <Check size={14} className={styles.icon} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={styles.button}>{plan.buttonText}</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

WorkshopPricing.cmsConfig = {
    name: "Workshop Pricing",
    props: {
        title: { type: "string", label: "Title" },
        plans: {
            type: "array",
            label: "Plans",
            itemSchema: {
                name: { type: "string", label: "Plan Name" },
                price: { type: "string", label: "Price" },
                features: { 
                    type: "array", 
                    label: "Features",
                    itemSchema: { type: "string", label: "Feature" }
                },
                buttonText: { type: "string", label: "Button Text" },
                highlighted: { type: "boolean", label: "Highlighted?" }
            }
        }
    }
};
