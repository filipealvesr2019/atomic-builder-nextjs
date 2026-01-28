import React from 'react';
import { Twitter, Instagram, Github, Linkedin, Mail } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = ({ brandName, about, links, baseUrl = "" }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brandInfo}>
            <a href={baseUrl || "/"} style={{ textDecoration: 'none' }}>
              <h2 className={styles.logo}>{brandName || "CREATIX"}</h2>
            </a>
            <p className={styles.about}>
              {about || "A premium digital product studio focused on modern design and high-performance assets for the next generation of brands."}
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
              <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
              <a href="#" className={styles.socialLink}><Github size={20} /></a>
              <a href="#" className={styles.socialLink}><Linkedin size={20} /></a>
            </div>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Product</h3>
              <ul className={styles.linkList}>
                <li><a href={`${baseUrl}/products`}>All Products</a></li>
                <li><a href={`${baseUrl}/categories`}>Categories</a></li>
                <li><a href={`${baseUrl}/new`}>New Releases</a></li>
                <li><a href={`${baseUrl}/freebies`}>Free Assets</a></li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Company</h3>
              <ul className={styles.linkList}>
                <li><a href={`${baseUrl}/about`}>About Us</a></li>
                <li><a href={`${baseUrl}/contact`}>Support</a></li>
                <li><a href={`${baseUrl}/terms`}>Terms of Service</a></li>
                <li><a href={`${baseUrl}/privacy`}>Privacy Policy</a></li>
              </ul>
            </div>

            <div className={styles.newsletter}>
              <h3 className={styles.linkTitle}>Stay Updated</h3>
              <p className={styles.newsletterText}>Get the latest assets and design tips in your inbox.</p>
              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email address" className={styles.input} />
                <button type="submit" className={styles.submitBtn}>
                  <Mail size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {brandName || "CREATIX"}. All rights reserved.
          </p>
          <div className={styles.legal}>
            <span>Designed for conversion.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
