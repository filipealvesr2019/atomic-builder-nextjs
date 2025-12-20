'use client';
import styles from './ContactInfoBar.module.css';

export default function ContactInfoBar({
    addressTitle = "Meet me",
    address = "Rue de la Paix\n75000 PARIS",
    phoneTitle = "Let's chat",
    phone = "+33 6 00 00 00 00",
    hoursTitle = "Office hours",
    hours = "9:00 - 12:00 AM\n2:00 - 6:00 PM"
}) {
    return (
        <section className={styles.section}>
            <div className={styles.grid}>
                <div className={styles.item}>
                    <h3 className={styles.title}>{addressTitle}</h3>
                    <p className={styles.text} style={{whiteSpace: 'pre-line'}}>{address}</p>
                </div>
                <div className={styles.item}>
                    <h3 className={styles.title}>{phoneTitle}</h3>
                    <p className={styles.text}>{phone}</p>
                </div>
                <div className={styles.item}>
                    <h3 className={styles.title}>{hoursTitle}</h3>
                    <p className={styles.text} style={{whiteSpace: 'pre-line'}}>{hours}</p>
                </div>
            </div>
        </section>
    );
}

ContactInfoBar.cmsConfig = {
    name: "Emma Contact Info Bar",
    props: {
        addressTitle: { type: "string", label: "Address Title" },
        address: { type: "text", label: "Address" },
        phoneTitle: { type: "string", label: "Phone Title" },
        phone: { type: "string", label: "Phone" },
        hoursTitle: { type: "string", label: "Hours Title" },
        hours: { type: "text", label: "Hours" }
    }
};
