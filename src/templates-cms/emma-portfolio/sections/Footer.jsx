'use client';
import styles from './Footer.module.css';
import { Instagram, Facebook, Youtube, Twitter, Linkedin, Pin } from 'lucide-react';

const SocialIcon = ({ platform }) => {
    switch (platform?.toLowerCase()) {
        case 'instagram': return <Instagram size={18} />;
        case 'facebook': return <Facebook size={18} />;
        case 'youtube': return <Youtube size={18} />;
        case 'twitter': return <Twitter size={18} />;
        case 'linkedin': return <Linkedin size={18} />;
        case 'pinterest': return <Pin size={18} />;
        case 'tiktok': return <span style={{fontWeight:'bold', fontSize:'10px'}}>TK</span>; // Custom for tiktok if needed or generic
        default: return <div style={{width: 14, height: 14, borderRadius: '50%', background: '#fff'}}></div>;
    }
};

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
                    <a key={i} href={s.url || '#'} className={styles.socialIcon}>
                         <SocialIcon platform={s.platform} />
                    </a>
                ))}
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
