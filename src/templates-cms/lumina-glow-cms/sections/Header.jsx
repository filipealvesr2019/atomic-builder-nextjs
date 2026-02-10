import React from 'react';
import styles from './Header.module.css';
import { ShoppingBag, Search, Menu } from 'lucide-react';

export default function Header({ content }) {
    const {
        logo = { text: 'LUMINA.' },
        navItems = [],
        cta = { label: 'Cart (0)', link: '#' }
    } = content || {};

    return (
        <header className={styles.header}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button className={styles.iconButton} style={{ display: 'none' }}> {/* Mobile Menu Placeholder */}
                    <Menu size={24} />
                </button>
                <a href="/iframe-preview/lumina-glow-cms" className={styles.logo}>
                    {logo.text}
                </a>
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
