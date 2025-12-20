'use client';
import styles from './Footer.module.css';

export default function Footer({
    logoText = "EMMA",
    copyright = "© 2024",
    socialLinks = []
}) {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>{logoText}</div>
             <div className={styles.links}>
                 <a href="#" className={styles.link}>Contact</a>
                 <a href="#" className={styles.link}>Terms</a>
                 <a href="#" className={styles.link}>Privacy</a>
            </div>
            <div className={styles.social}>
                {socialLinks.map((s, i) => (
                    <div key={i} className={styles.socialIcon}></div>
                ))}
                 {socialLinks.length === 0 && (
                     <>
                     <div className={styles.socialIcon}></div>
                     <div className={styles.socialIcon}></div>
                     <div className={styles.socialIcon}></div>
                     </>
                 )}
            </div>
            <p className={styles.copyright}>{copyright}</p>
        </footer>
    );
}

Footer.cmsConfig = {
    name: "Emma Footer",
    props: {
        logoText: { type: "string", label: "Logo Text" },
        copyright: { type: "string", label: "Copyright Text" },
        socialLinks: { type: "array", label: "Social Links", itemSchema: { type: "string" } }
    }
};
