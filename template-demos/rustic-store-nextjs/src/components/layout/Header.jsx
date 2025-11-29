'use client'

import { useState } from 'react';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import styles from './Header.module.css'; // Importar CSS Module

const Header = ({ cartItemsCount = 0, onCartClick, onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (onMenuClick) onMenuClick(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar lógica de busca aqui
    console.log('Buscar por:', searchQuery);
  };

  return (
    <header className={styles.header} data-block-type="header">
      <div className={styles.container}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.topBarText}>
            <p style={{ margin: 0 }}>Frete grátis para compras acima de R$ 299</p>
          </div>
          <div className={styles.topBarActions}>
            <span>Atendimento: (11) 9999-9999</span>
            <button className={styles.iconButton}>
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Header */}
        <div className={styles.mainHeader}>
          {/* Logo */}
          <div className={styles.logo}>
            <h1 className={styles.logoText}>
              Rustic<span className={styles.logoAccent}>Store</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <a href="/" className={styles.navLink}>
              Início
            </a>
            <a href="/products" className={styles.navLink}>
              Produtos
            </a>
            <a href="/about" className={styles.navLink}>
              Sobre
            </a>
            <a href="/blog" className={styles.navLink}>
              Blog
            </a>
            <a href="/contact" className={styles.navLink}>
              Contato
            </a>
          </nav>

          {/* Search Bar */}
          <div className={styles.searchBarDesktop}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button
                type="submit"
                className={styles.searchButton}
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Cart and Mobile Menu */}
          <div className={styles.cartAndMobileMenu}>
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className={styles.cartButton}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className={styles.cartItemsCount}>
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={styles.mobileMenuButton}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className={styles.mobileSearch}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button
              type="submit"
              className={styles.searchButton}
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <a
              href="/"
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </a>
            <a
              href="/products"
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Produtos
            </a>
            <a
              href="/about"
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </a>
            <a
              href="/blog"
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="/contact"
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
