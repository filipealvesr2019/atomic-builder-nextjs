import React from 'react';
import { Globe, Atom, Leaf, DropletOff } from 'lucide-react';
import styles from './Values.module.css';

const ICON_MAP = {
    Globe: Globe,
    Atom: Atom,
    Leaf: Leaf,
    DropletOff: DropletOff
};

export default function Values({ content }) {
    const { title, subtitle, items } = content || {};

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {title && <h2 className={styles.title}>{title}</h2>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

                <div className={styles.grid}>
                    {items?.map((item) => {
                        const IconComponent = ICON_MAP[item.icon] || Globe;
                        return (
                            <div key={item.id} className={styles.item}>
                                <div className={styles.iconWrapper}>
                                    <IconComponent size={42} strokeWidth={1} className={styles.icon} />
                                </div>
                                <h3 className={styles.itemTitle}>{item.name}</h3>
                                <p className={styles.itemDescription}>{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
