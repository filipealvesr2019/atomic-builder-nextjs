'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import styles from './Footer.module.css';

// Default data
const defaultSections = {
    contact: { 
        title: "Contact Info", 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        email: "hello@ursulatheme.com", 
        phone: "+1 234 567 890" 
    },
    about: {
        title: "Hello, I'm Ursula",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
        text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt."
    },
    newsletter: {
        title: "Newsletter",
        text: "Subscribe to our newsletter for latest updates."
    }
};

export default function Footer({ sections }) {
  // Merge defaults
  const data = {
      contact: { ...defaultSections.contact, ...(sections?.contact || {}) },
      about: { ...defaultSections.about, ...(sections?.about || {}) },
      newsletter: { ...defaultSections.newsletter, ...(sections?.newsletter || {}) }
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Contact Column */}
        <div className={styles.column}>
            <h3 className={styles.colTitle}>{data.contact.title}</h3>
            <p className={styles.colText}>{data.contact.text}</p>
            <div className={styles.contactDetails}>
                <p><Mail size={12} style={{marginRight: 5}}/> {data.contact.email}</p>
                <p>{data.contact.phone}</p>
            </div>
            <div className={styles.socials}>
                <Facebook size={16} /> <Instagram size={16} /> <Twitter size={16} />
            </div>
        </div>

        {/* About Column (Center) */}
        <div className={`${styles.column} ${styles.centerColumn}`}>
             <div className={styles.avatarContainer}>
                 <img src={data.about.image} alt="Author" className={styles.avatar} />
             </div>
             <h3 className={styles.authorTitle}>{data.about.title}</h3>
             <p className={styles.colText}>{data.about.text}</p>
             <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.2rem', opacity: 0.8, marginTop: 10, display: 'block' }}>Ursula</span>
        </div>

        {/* Newsletter Column */}
        <div className={styles.column}>
            <h3 className={styles.colTitle}>{data.newsletter.title}</h3>
            <p className={styles.colText}>{data.newsletter.text}</p>
            <form className={styles.newsletterForm}>
                <input type="email" placeholder="Your Email" className={styles.input} />
                <button type="submit" className={styles.button}>Subscribe</button>
            </form>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} UrsulaTheme. All rights reserved.</p>
          <ul className={styles.bottomLinks}>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms & Conditions</Link></li>
              <li><Link href="#">About Me</Link></li>
          </ul>
      </div>
    </footer>
  );
}

Footer.cmsConfig = {
    name: "Ursula Footer",
    props: {
        // Simplified config just for structure
        sections: {
            type: "object",
            label: "Sections Data",
            // In a real scenario we'd define schema for each sub-object
        }
    }
};
