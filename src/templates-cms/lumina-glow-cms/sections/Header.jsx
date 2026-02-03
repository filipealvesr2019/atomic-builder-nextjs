import React from 'react';
import styles from './Header.module.css';
import { ShoppingBag, Search, Menu } from 'lucide-react';

export default function Header({ content }) {
    const { logo, navItems, cta } = content || {
        logo: { text: 'LUMINA.' },
        navItems: [],
        cta: { label: 'Cart (0)', link: '#' }
    };

    return (
        <header className={styles.header}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button className={styles.iconButton} style={{ display: 'none' }}> {/* Mobile Menu Placeholder */}
                    <Menu size={24} />
                </button>
                <div className={styles.logo}>
                    {logo.text}
                </div>
            </div>

            <nav className={styles.nav}>
                {navItems?.map((item, index) => (
                    <a key={index} href={item.href}>{item.label}</a>
                ))}
            </nav>

            <div className={styles.actions}>
                <button className={styles.iconButton}>
                    <Search size={20} />
                </button>
                <a href={cta?.link} className={styles.iconButton}>
                    <ShoppingBag size={20} />
                    <span>{cta?.label}</span>
                </a>
            </div>
        </header>
    );
}
