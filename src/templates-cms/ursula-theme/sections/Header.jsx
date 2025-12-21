'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, Facebook, Instagram, Twitter } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ 
  logoText = "Ursula", 
  logoSub = "",
  logoImage = "",
  links = [],
  forceMobile = false
}) {
  console.log('Ursula Header Links:', links);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    if (openDropdown === label) {
        setOpenDropdown(null);
    } else {
        setOpenDropdown(label);
    }
  };

  // Split links for desktop layout (first 3 left, rest right)
  const midPoint = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, midPoint);
  const rightLinks = links.slice(midPoint);

  return (
    <header className={`${styles.header} ${forceMobile ? styles.forcedMobile : ''}`}>
      {/* Mobile Header */}
      <div className={styles.mobileHeader}>
          <button className={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
             {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
          <div className={styles.mobileLogo}>{logoText}</div>
          <div className={styles.mobileSearch}><Search size={20} /></div>
      </div>

      {/* Desktop Header Container */}
      <div className={`${styles.container} ${isMenuOpen ? styles.showMenu : ''}`}>
        
        {/* Left: Socials */}
        <div className={styles.socials}>
             <a href="#" className={styles.socialLink}><Facebook size={16} /></a>
             <a href="#" className={styles.socialLink}><Twitter size={16} /></a>
             <a href="#" className={styles.socialLink}><Instagram size={16} /></a>
        </div>

        {/* Center: Nav - Logo - Nav */}
        <div className={styles.centerNav}>
            <nav className={styles.navGroup}>
                {leftLinks.map((link, idx) => (
                    <div key={idx} className={`${styles.navItemWrapper} ${openDropdown === link.text ? styles.activeDropdown : ''}`}>
                        <div 
                            className={styles.navLink} 
                            onClick={(e) => {
                                if(link.subItems) {
                                    e.preventDefault();
                                    toggleDropdown(link.text);
                                }
                            }}
                        >
                            {link.href && !link.subItems ? (
                                <Link href={link.href}>{link.text}</Link>
                            ) : (
                                <span style={{cursor: 'pointer'}}>{link.text}</span>
                            )}
                            
                            {link.subItems && <span style={{fontSize: 10, marginLeft: 4}}>▼</span>}
                        </div>

                        {link.subItems && (
                            <div className={styles.dropdown}>
                                {link.subItems.map((sub, sIdx) => (
                                    <Link key={sIdx} href={sub.href} className={styles.dropdownLink}>
                                        {sub.text}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            <div className={styles.logoWrapper}>
                {logoImage ? (
                    <img src={logoImage} alt={logoText} className={styles.logoImage} />
                ) : (
                    <h1 className={styles.logoTitle}>{logoText}</h1>
                )}
            </div>

            <nav className={styles.navGroup}>
                {rightLinks.map((link, idx) => (
                    <div key={idx} className={`${styles.navItemWrapper} ${openDropdown === link.text ? styles.activeDropdown : ''}`}>
                        <div 
                            className={styles.navLink} 
                            onClick={(e) => {
                                if(link.subItems) {
                                    e.preventDefault();
                                    toggleDropdown(link.text);
                                }
                            }}
                        >
                             {link.href && !link.subItems ? (
                                <Link href={link.href}>{link.text}</Link>
                            ) : (
                                <span style={{cursor: 'pointer'}}>{link.text}</span>
                            )}
                             {link.subItems && <span style={{fontSize: 10, marginLeft: 4}}>▼</span>}
                        </div>
                         {link.subItems && (
                            <div className={styles.dropdown}>
                                {link.subItems.map((sub, sIdx) => (
                                    <Link key={sIdx} href={sub.href} className={styles.dropdownLink}>
                                        {sub.text}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>

        {/* Right: Search */}
        <div className={styles.search}>
             <Search size={18} />
        </div>

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
