'use client';
import styles from './Footer.module.css';

export default function Footer({ 
    instagramImages = [],
    newsletterText = "Subscribe to our newsletter",
    copyright = "© 2024 Ava Portfolio. All rights reserved."
}) {
   const defaultInsta = [
       "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop", // Wedding Party
       "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1000&auto=format&fit=crop", // Wedding Table/Flowers
       "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop", // Couple Kissing
       "https://images.unsplash.com/photo-1507206130118-b5907f907167?q=80&w=1000&auto=format&fit=crop", // Wedding Toast
       "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop"  // Wedding Cake/Table
   ];
   
   const displayInsta = instagramImages.length > 0 ? instagramImages : defaultInsta;

  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <h4 className={styles.newsletterTitle}>Follow Us</h4>
      </div>
      
      <div className={styles.instaGrid} style={{ display: 'grid', gridTemplateColumns: `repeat(${displayInsta.length}, 1fr)` }}>
         {displayInsta.map((img, i) => (
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
