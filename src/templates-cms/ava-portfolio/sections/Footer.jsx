'use client';
import styles from './Footer.module.css';

export default function Footer({ 
    instagramImages = [],
    newsletterText = "Subscribe to our newsletter",
    copyright = "© 2024 Ava Portfolio. All rights reserved."
}) {
   const defaultInsta = [
       "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1000&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1976&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
   ];
   
   const displayInsta = instagramImages.length > 0 ? instagramImages : defaultInsta;

  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <h4 className={styles.newsletterTitle}>Follow Us</h4>
      </div>
      
      <div className={styles.instaGrid}>
         {displayInsta.slice(0, 5).map((img, i) => (
             <div key={i} className={styles.instaItem} style={{backgroundImage: `url(${img})`}}></div>
         ))}
      </div>

      <div className={styles.bottom}>
        <div className={styles.logo}>AVA ROSE</div>
        <div className={styles.links}>
            <a href="#">HOME</a>
            <a href="#">ABOUT</a>
            <a href="#">SERVICES</a>
            <a href="#">CONTACT</a>
        </div>
        <div className={styles.copyright}>{copyright}</div>
      </div>
    </footer>
  );
}

Footer.cmsConfig = {
    name: "Ava Footer",
    props: {
        instagramImages: { type: "array", label: "Instagram Images", itemSchema: { type: "image", label: "Image" } },
        copyright: { type: "string", label: "Copyright Text" }
    }
};
