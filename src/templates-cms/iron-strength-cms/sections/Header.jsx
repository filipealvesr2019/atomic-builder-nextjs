import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header({ content }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { logo, navItems, cta } = content || {
        logo: { text: 'IRONSTRENGTH' },
        navItems: [],
        cta: { label: 'Join Now', link: '#' }
    };

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.logo}>
                {logo.text}
            </div>

            <nav className={styles.nav}>
                {navItems?.map((item, index) => (
                    <a key={index} href={item.href}>{item.label}</a>
                ))}
            </nav>

            <div className={styles.actions}>
                <a href={cta?.link} className={styles.ctaButton}>
                    {cta?.label || 'Join Now'}
                </a>
            </div>
        </header>
    );
}
