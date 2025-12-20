'use client';
import styles from './Header.module.css';

export default function Header({ 
  logoText = "EMMA",
  links = [],
  socialLinks = []
}) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>{logoText}</div>
      <nav className={styles.nav}>
        {links.map((link, index) => (
          <a key={index} href={link.href} className={styles.navLink}>{link.text}</a>
        ))}
      </nav>
      <div className={styles.social}>
         {/* Placeholder for social icons */}
         {socialLinks.map((social, index) => (
           <div key={index} className={styles.socialIcon} title={social.platform}></div>
         ))}
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
