import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ logo, menu, cta }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          {logo || "CREATIX"}
        </a>

        <nav className={styles.nav}>
          {(menu || [
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Categories", href: "#categories" },
            { label: "About", href: "/about" }
          ]).map((item, index) => (
            <a key={index} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.cartBtn}>
            <ShoppingCart size={20} />
          </button>
          <a href="/shop" className={styles.ctaBtn}>
            {cta || "Shop now"}
          </a>
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {menu?.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="/shop" className={styles.mobileCtaBtn}>
            {cta || "Shop now"}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
