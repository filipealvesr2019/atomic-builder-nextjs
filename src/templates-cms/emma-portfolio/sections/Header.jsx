'use client';
import styles from './Header.module.css';
import { useState } from 'react';
import { Instagram, Facebook, Youtube, Twitter, Linkedin, Pin, Menu, X } from 'lucide-react';

const SocialIcon = ({ platform }) => {
    switch (platform?.toLowerCase()) {
        case 'instagram': return <Instagram size={18} />;
        case 'facebook': return <Facebook size={18} />;
        case 'youtube': return <Youtube size={18} />;
        case 'twitter': return <Twitter size={18} />;
        case 'linkedin': return <Linkedin size={18} />;
        case 'pinterest': return <Pin size={18} />;
        default: return <div style={{width: 14, height: 14, borderRadius: '50%', background: '#fff'}}></div>;
    }
};

export default function Header({ 
  logoText = "EMMA",
  links = [],
  socialLinks = []
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>{logoText}</div>
      
      {/* Desktop Nav */}
      <nav className={styles.nav}>
        {links.map((link, index) => (
          <a key={index} href={link.href} className={styles.navLink}>{link.text}</a>
        ))}
      </nav>

      {/* Desktop Social */}
      <div className={styles.social}>
         {socialLinks.map((social, index) => (
           <a key={index} href={social.url} className={styles.socialIcon} title={social.platform}>
               <SocialIcon platform={social.platform} />
           </a>
         ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button className={styles.mobileMenuToggle} onClick={toggleMenu} aria-label="Toggle menu">
        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
            {links.map((link, index) => (
            <a 
                key={index} 
                href={link.href} 
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                {link.text}
            </a>
            ))}
        </nav>
        
        <div className={styles.mobileSocial}>
            {socialLinks.map((social, index) => (
            <a key={index} href={social.url} className={styles.socialIcon} title={social.platform}>
                <SocialIcon platform={social.platform} />
            </a>
            ))}
        </div>
      </div>
    </header>
  );
}

Header.cmsConfig = {
    name: "Emma Header",
    props: {
        logoText: { type: "string", label: "Logo Text" },
        links: { 
            type: "array", 
            label: "Navigation Links",
            itemSchema: {
                text: { type: "string", label: "Link Text" },
                href: { type: "string", label: "Link URL" }
            }
        },
        socialLinks: { 
            type: "array", 
            label: "Social Links",
            itemSchema: {
                platform: { type: "string", label: "Platform" },
                url: { type: "string", label: "URL" }
            }
        }
    }
};
