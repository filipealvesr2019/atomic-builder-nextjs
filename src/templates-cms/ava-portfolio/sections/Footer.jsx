import { useState } from 'react';
import { Instagram, X, Heart, MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer({ 
    instagramImages = [],
    newsletterText = "Subscribe to our newsletter",
    copyright = "© 2024 Ava Portfolio. All rights reserved."
}) {
   const defaultInsta = [
       "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1000&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1507206130118-b5907f907167?q=80&w=1000&auto=format&fit=crop", 
       "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop"
   ];
   
   const displayInsta = instagramImages.length > 0 ? instagramImages : defaultInsta;

   const [selectedImage, setSelectedImage] = useState(null);

   const handleImageClick = (img) => {
       setSelectedImage(img);
   };

   const closeModal = () => {
       setSelectedImage(null);
   };

  return (
    <>
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <h4 className={styles.newsletterTitle}>Follow Us</h4>
      </div>
      
      <div className={styles.instaGrid} style={{ display: 'grid', gridTemplateColumns: `repeat(${displayInsta.length}, 1fr)` }}>
         {displayInsta.map((img, i) => (
             <div 
                key={i} 
                className={styles.instaItem} 
                style={{backgroundImage: `url(${img})`}}
                onClick={() => handleImageClick(img)}
             >
                <div className={styles.overlay}>
                    <Instagram className={styles.icon} />
                </div>
             </div>
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

    {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closeModal}>
                    <X />
                </button>
                <div className={styles.modalImageContainer}>
                    <img src={selectedImage} alt="Instagram Post" className={styles.modalImage} />
                </div>
                <div className={styles.modalInfo}>
                    <div className={styles.header}>
                        <div className={styles.avatar} style={{backgroundImage: `url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop)`}}></div>
                        <div>
                            <span className={styles.username}>ava_rose_photography</span>
                            <span style={{margin: '0 5px'}}>•</span>
                            <span className={styles.followLink}>Follow</span>
                        </div>
                        <MoreHorizontal size={20} style={{marginLeft: 'auto', cursor: 'pointer'}} />
                    </div>
                    <div className={styles.caption}>
                        <p><span className={styles.username}>ava_rose_photography</span> Capturing the most beautiful moments of your special day. #wedding #love #photography #memories</p>
                        <span className={styles.time}>2 HOURS AGO</span>
                    </div>
                    <div className={styles.modalFooter}>
                        <div style={{width: '100%'}}>
                            <div className={styles.actionIcons} style={{display: 'flex', gap: '15px'}}>
                                <Heart size={24} style={{cursor: 'pointer'}} />
                                <MessageCircle size={24} style={{cursor: 'pointer'}} />
                                <div style={{marginLeft: 'auto'}}>
                                    <Bookmark size={24} style={{cursor: 'pointer'}} />
                                </div>
                            </div>
                            <div style={{fontWeight: '600', fontSize: '0.9rem'}}>1,234 likes</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
  );
}

Footer.cmsConfig = {
    name: "Ava Footer",
    props: {
        instagramImages: { type: "array", label: "Instagram Images", itemSchema: { type: "image", label: "Image" } },
        copyright: { type: "string", label: "Copyright Text" }
    }
};
