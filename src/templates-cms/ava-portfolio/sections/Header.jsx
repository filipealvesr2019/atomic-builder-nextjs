'use client';
import styles from './Header.module.css';
import { Instagram, Facebook, Youtube, Twitter, Linkedin, Pin } from 'lucide-react';

const SocialIcon = ({ platform }) => {
    switch (platform?.toLowerCase()) {
        case 'instagram': return <Instagram size={14} />;
        case 'facebook': return <Facebook size={14} />;
        case 'youtube': return <Youtube size={14} />;
        case 'twitter': return <Twitter size={14} />;
        case 'linkedin': return <Linkedin size={14} />;
        case 'pinterest': return <Pin size={14} />;
        default: return <div style={{width: 14, height: 14, borderRadius: '50%', background: '#fff'}}></div>;
    }
};

export default function Header({ 
  logoText = "AVA",
  links = [],
  socialLinks = []
}) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>{logoText}</div>
      <div className={styles.rightSection}>
        <nav className={styles.nav}>
            {links.map((link, index) => (
            <a key={index} href={link.href} className={styles.navLink}>{link.label}</a>
            ))}
        </nav>
        <div className={styles.social}>
            {socialLinks.map((social, index) => (
            <a key={index} href={social.href} className={styles.socialIcon} title={social.icon}>
                <SocialIcon platform={social.icon} />
            </a>
            ))}
        </div>
      </div>
    </header>
  );
}

Header.cmsConfig = {
    name: "Ava Header",
    props: {
        logoText: { type: "string", label: "Logo Text" },
        links: { 
            type: "array", 
            label: "Navigation Links",
            itemSchema: {
                label: { type: "string", label: "Link Text" },
                href: { type: "string", label: "Link URL" }
            }
        },
        socialLinks: { 
            type: "array", 
            label: "Social Links",
            itemSchema: {
                icon: { type: "string", label: "Platform" },
                href: { type: "string", label: "URL" }
            }
        }
    }
};
