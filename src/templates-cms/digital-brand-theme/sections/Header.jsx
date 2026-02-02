'use client';

import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ logo, menu, buttons, baseUrl = "" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href={baseUrl || "/"} className={styles.logo}>
          {logo?.text || "DIGITAL BRAND"}
        </a>

        <nav className={styles.nav}>
          {menu?.map((item, index) => {
            const href = item.href.startsWith('/') ? `${baseUrl}${item.href}` : item.href;
            return (
              <a key={index} href={href} className={styles.navLink}>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <a href={`${baseUrl}/checkout`} className={styles.cartBtn}>
            <ShoppingBag size={22} />
          </a>
          <a href={`${baseUrl}/login`} className={styles.loginBtn}>
            {buttons?.login || "Login"}
          </a>
          {buttons?.buy && (
            <a href={`${baseUrl}/checkout`} className={styles.buyBtn}>
              {buttons.buy}
            </a>
          )}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
          {menu?.map((item, index) => {
            const href = item.href.startsWith('/') ? `${baseUrl}${item.href}` : item.href;
            return (
              <a key={index} href={href} className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
