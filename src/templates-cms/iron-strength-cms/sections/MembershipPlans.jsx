import React from 'react';
import styles from './MembershipPlans.module.css';
import { Check } from 'lucide-react';

export default function MembershipPlans({ content }) {
    const { title, subtitle, plans } = content || {
        title: 'Membership',
        subtitle: 'Select your plan',
        plans: []
    };

    return (
        <section className={styles.section} id="membership">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.subtitle}>{subtitle}</p>
                </div>

                <div className={styles.grid}>
                    {plans.map((plan, index) => (
                        <div key={index} className={`${styles.card} ${plan.highlight ? styles.highlight : ''}`}>
                            <h3 className={styles.planName}>{plan.name}</h3>
                            <div className={styles.priceWrapper}>
                                <span className={styles.price}>{plan.price}</span>
                                <span className={styles.period}>{plan.period}</span>
                            </div>
                            <ul className={styles.features}>
                                {plan.features.map((feature, i) => (
                                    <li key={i}>
                                        <Check size={16} className={styles.check} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={styles.button}>Choose Plan</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
