import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer(props) {
  const {
    logoText = "Rustic",
    logoAccent = "Store",
    description = "Transforming houses into homes with unique handmade pieces. Quality, design, and tradition in every detail.",
    companyTitle = "Company",
    supportTitle = "Support",
    contactTitle = "Contact"
  } = props;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandColumn}>
            <div className={styles.logo}>
              <h2 className={styles.logoText}>
                {logoText}<span className={styles.logoAccent}>{logoAccent}</span>
              </h2>
            </div>
            <p className={styles.description}>
              {description}
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}><Facebook size={20} /></a>
              <a href="#" className={styles.socialLink}><Instagram size={20} /></a>
              <a href="#" className={styles.socialLink}><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links Column */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>{companyTitle}</h3>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>About Us</a></li>
              <li><a href="#" className={styles.link}>Our Story</a></li>
              <li><a href="#" className={styles.link}>Blog</a></li>
              <li><a href="#" className={styles.link}>Careers</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>{supportTitle}</h3>
            <ul className={styles.linkList}>
              <li><a href="#" className={styles.link}>FAQ</a></li>
              <li><a href="#" className={styles.link}>Shipping & Returns</a></li>
              <li><a href="#" className={styles.link}>Privacy Policy</a></li>
              <li><a href="#" className={styles.link}>Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className={styles.contactColumn}>
            <h3 className={styles.columnTitle}>{contactTitle}</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                <span>123 Flowers St, New York</span>
              </li>
              <li className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <span>(555) 123-4567</span>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <span>contact@rusticstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} {logoText}{logoAccent}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

Footer.cmsConfig = {
  name: "Footer",
  props: {
    logoText: { type: 'string', label: 'Logo Text' },
    logoAccent: { type: 'string', label: 'Logo Accent' },
    description: { type: 'string', label: 'Description', multiline: true }
  }
};
