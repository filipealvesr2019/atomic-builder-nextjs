import React from 'react';
import styles from './Footer.module.css';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ content }) {
    const { text, address } = content || {
        text: '© 2024 IronStrength Gym.',
        address: '123 Fitness Blvd'
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <span className={styles.logo}>IRONSTRENGTH</span>
                    <p className={styles.text}>
                        Join the elite community of athletes committed to pushing limits.
                        Train harder, perform better.
                    </p>
                </div>

                <div className={styles.column}>
                    <h3>Quick Links</h3>
                    <ul className={styles.links}>
                        <li><a href="#classes">Programs</a></li>
                        <li><a href="#membership">Membership</a></li>
                        <li><a href="#trainers">Coaches</a></li>
                        <li><a href="#">Schedule</a></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>Contact Us</h3>
                    <div className={styles.contactInfo}>
                        <p><MapPin size={18} /> {address}</p>
                        <p><Phone size={18} /> (555) 123-4567</p>
                        <p><Mail size={18} /> info@ironstrength.io</p>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                {text}
            </div>
        </footer>
    );
}
