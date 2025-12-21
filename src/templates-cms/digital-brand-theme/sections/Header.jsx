import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ content }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logo, menu, buttons } = content || {};

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          {logo?.text || "DIGITAL BRAND"}
        </a>

        <nav className={styles.nav}>
          {menu?.map((item, index) => (
            <a key={index} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="/login" className={styles.loginBtn}>
            {buttons?.login || "Entrar"}
          </a>
          <a href="/checkout" className={styles.buyBtn}>
            {buttons?.buy || "Comprar agora"}
          </a>
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Simple implementation */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '80px',
          left: 0,
          width: '100%',
          background: 'white',
          padding: '2rem',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          zIndex: 999
        }}>
          {menu?.map((item, index) => (
            <a key={index} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
