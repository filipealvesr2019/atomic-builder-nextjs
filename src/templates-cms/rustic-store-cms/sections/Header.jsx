'use client';

import { useState } from 'react';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ 
  topBarText = "Frete grátis para compras acima de R$ 299",
  phoneNumber = "(11) 9999-9999",
  logoText = "Rustic",
  logoAccent = "Store",
  links = [
    { text: "Início", href: "/" },
    { text: "Produtos", href: "#products" },
    { text: "Sobre", href: "#about" },
    { text: "Blog", href: "#blog" },
    { text: "Contato", href: "#contact" }
  ]
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscar por:', searchQuery);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.topBarText}>
            <p style={{ margin: 0 }}>{topBarText}</p>
          </div>
          <div className={styles.topBarActions}>
            <span>Atendimento: {phoneNumber}</span>
            <button className={styles.iconButton}>
              <User className="h-4 w-4" size={16} />
            </button>
          </div>
        </div>

        {/* Main Header */}
        <div className={styles.mainHeader}>
          {/* Logo */}
          <div className={styles.logo}>
            <h1 className={styles.logoText}>
              {logoText}<span className={styles.logoAccent}>{logoAccent}</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {links.map((link, index) => (
              <a key={index} href={link.href} className={styles.navLink}>
                {link.text}
              </a>
            ))}
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
              <button type="submit" className={styles.searchButton}>
                <Search className="h-4 w-4" size={16} />
              </button>
            </form>
          </div>

          {/* Cart and Mobile Menu */}
          <div className={styles.cartAndMobileMenu}>
            {/* Cart Button */}
            <button className={styles.cartButton}>
              <ShoppingCart className="h-5 w-5" size={20} />
              {cartItemsCount > 0 && (
                <span className={styles.cartItemsCount}>
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className={styles.mobileMenuButton}>
              {isMenuOpen ? <X className="h-6 w-6" size={24} /> : <Menu className="h-6 w-6" size={24} />}
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
            <button type="submit" className={styles.searchButton}>
              <Search className="h-4 w-4" size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {links.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

Header.cmsConfig = {
  name: "Cabeçalho Rústico",
  description: "Cabeçalho completo com busca e carrinho",
  props: {
    topBarText: { type: 'string', label: 'Texto do Topo' },
    phoneNumber: { type: 'string', label: 'Telefone' },
    logoText: { type: 'string', label: 'Texto Logo' },
    logoAccent: { type: 'string', label: 'Texto Destaque Logo' },
    links: { 
      type: 'list', 
      label: 'Links',
      itemType: {
        text: { type: 'string', label: 'Texto' },
        href: { type: 'string', label: 'URL' }
      }
    }
  }
};
