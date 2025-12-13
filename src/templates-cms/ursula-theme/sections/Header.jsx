'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Facebook, Instagram, Twitter } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ 
  logoText = "Ursula", 
  logoSub = "Theme",
  logoImage = "",
  links = []
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
         <div className={styles.socials}>
             <a href="#" className={styles.socialLink}><Facebook size={14} className={styles.socialIcon} /></a>
             <a href="#" className={styles.socialLink}><Instagram size={14} className={styles.socialIcon} /></a>
             <a href="#" className={styles.socialLink}><Twitter size={14} className={styles.socialIcon} /></a>
         </div>
         <div className={styles.search}>
             <Search size={14} />
         </div>
      </div>
      
      <div className={styles.mainHeader}>
        <div className={styles.logoContainer}>
            {logoImage ? (
                <img src={logoImage} alt={logoText} className={styles.logoImage} />
            ) : (
                <div className={styles.textLogo}>
                    <h1 className={styles.logoTitle}>{logoText}</h1>
                    <span className={styles.logoSub}>{logoSub}</span>
                </div>
            )}
        </div>
        
        <button className={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.mobileOpen : ''}`}>
           <ul className={styles.navList}>
               {links.map((link, idx) => (
                   <li key={idx}>
                       <Link href={link.href} className={styles.navLink}>
                           {link.text}
                       </Link>
                   </li>
               ))}
           </ul>
        </nav>
      </div>
    </header>
  );
}

Header.cmsConfig = {
    name: "Ursula Header",
    props: {
        logoText: { type: "string", label: "Logo Text" },
        logoSub: { type: "string", label: "Logo Subtitle" },
        links: {
            type: "list",
            label: "Navigation Links",
            itemType: {
                text: { type: "string", label: "Link Text" },
                href: { type: "string", label: "URL" }
            }
        }
    }
};
