'use client';
import styles from './Footer.module.css';
import { Instagram, Facebook, Youtube, Heart, ChevronRight, ArrowUp } from 'lucide-react';

const SocialIcon = ({ platform }) => {
    switch (platform?.toLowerCase()) {
        case 'instagram': return <Instagram size={20} />;
        case 'facebook': return <Facebook size={20} />;
        case 'youtube': return <Youtube size={20} />;
        case 'tiktok': return <span style={{fontWeight:'bold', fontSize:'12px'}}>TK</span>;
        default: return <Heart size={20} />;
    }
};

export default function Footer({
    logoText = "EMMA",
    aboutTitle = "Emma Theme",
    aboutText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
    servicesTitle = "Services",
    services = [
        { text: "Program", href: "#" },
        { text: "Coaching", href: "#" },
        { text: "Free gift", href: "#" }
    ],
    followTitle = "Follow me",
    socialLinks = [],
    copyright = "© 2024",
    credits = "TEMPLATE BY LUPI STUDIO"
}) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Col 1: Logo */}
                <div className={styles.column}>
                    <div className={styles.logo}>{logoText}</div>
                </div>

                 {/* Col 2: About */}
                 <div className={styles.column}>
                    <h3 className={styles.colTitle}>{aboutTitle}</h3>
                    <p className={styles.text}>{aboutText}</p>
                </div>

                {/* Col 3: Services */}
                <div className={styles.column}>
                    <h3 className={styles.colTitle}>{servicesTitle}</h3>
                    <ul className={styles.list}>
                        {services.map((link, i) => (
                            <li key={i} className={styles.listItem}>
                                <a href={link.href} className={styles.link}>
                                     <span className={styles.arrow}>▶</span> {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Col 4: Follow */}
                <div className={styles.column}>
                    <h3 className={styles.colTitle}>{followTitle}</h3>
                    <div className={styles.social}>
                        {socialLinks.map((s, i) => (
                            <a key={i} href={s.url || '#'} className={styles.socialIcon}>
                                <SocialIcon platform={s.platform} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <span>{copyright}</span>
                 {/* Top Button */}
                 <button onClick={scrollToTop} className={styles.topButton}>
                    <ArrowUp size={20} style={{background:'#333', color:'white', borderRadius:'50%', padding: 4}} />
                    TOP
                </button>
                <span>{credits}</span>
            </div>
        </footer>
    );
}

Footer.cmsConfig = {
    name: "Emma Footer Combined",
    props: {
        logoText: { type: "string", label: "Logo Text" },
        aboutTitle: { type: "string", label: "About Title" },
        aboutText: { type: "text", label: "About Text" },
        servicesTitle: { type: "string", label: "Services Title" },
        services: { 
            type: "array", 
            label: "Service Links",
            itemSchema: {
                text: { type: "string", label: "Text" },
                href: { type: "string", label: "Link" }
            }
        },
        followTitle: { type: "string", label: "Follow Title" },
        socialLinks: { type: "array", label: "Social Links", itemSchema: { type: "string" } },
        copyright: { type: "string", label: "Copyright" },
        credits: { type: "string", label: "Credits" }
    }
};
