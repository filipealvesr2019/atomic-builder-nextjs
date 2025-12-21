import React from 'react';
import styles from './Footer.module.css';

const Footer = ({ content }) => {
  const { brandName, description, links, social } = content || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo}>{brandName || "DIGITAL BRAND"}</a>
            <p className={styles.description}>
              {description || "Sua fonte premium de ativos digitais para o desenvolvimento moderno."}
            </p>
          </div>

          {links?.map((column, idx) => (
            <div key={idx}>
              <h4 className={styles.columnTitle}>{column.title}</h4>
              <ul className={styles.linkList}>
                {column.items.map((item, idy) => (
                  <li key={idy} className={styles.linkItem}>
                    <a href={item.href} className={styles.link}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} {brandName}. Todos os direitos reservados.
          </p>
          <div className={styles.social}>
            {social?.map((item, idx) => (
              <a key={idx} href="#" className={styles.socialLink}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
