'use client';
import { MapPin, Mail, Phone } from 'lucide-react';
import styles from './ContactSection.module.css';

export default function ContactSection({ 
    subtitle, title, description, details 
}) {
  return (
    <section className={styles.section}>
        <div className={styles.container}>
            {/* Info Column */}
            <div className={styles.infoCol}>
                <span className={styles.subtitle}>{subtitle}</span>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
                
                <div className={styles.detailRow}>
                    <div className={styles.labelGroup}>
                        <MapPin size={14} className={styles.icon} />
                        <span className={styles.label}>Address</span>
                    </div>
                    <span className={styles.dots}></span>
                    <span className={styles.value}>{details.address}</span>
                </div>

                <div className={styles.detailRow}>
                    <div className={styles.labelGroup}>
                        <Mail size={14} className={styles.icon} />
                        <span className={styles.label}>Email</span>
                    </div>
                    <span className={styles.dots}></span>
                    <span className={styles.value}>{details.email}</span>
                </div>

                <div className={styles.detailRow}>
                    <div className={styles.labelGroup}>
                        <Phone size={14} className={styles.icon} />
                        <span className={styles.label}>Phone Number</span>
                    </div>
                    <span className={styles.dots}></span>
                    <span className={styles.value}>{details.phone}</span>
                </div>
            </div>

            {/* Form Column */}
            <div className={styles.formCol}>
                <input type="text" placeholder="Your Name" className={styles.input} />
                <input type="email" placeholder="Your Email" className={styles.input} />
                <textarea placeholder="Your Message" className={styles.textarea} rows={6}></textarea>
                <button className={styles.button}>SEND MESSAGE</button>
            </div>
        </div>
    </section>
  );
}
