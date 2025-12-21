'use client';

import styles from './ClientLove.module.css';

export default function ClientLove({
  quote = "Ursula is a fantastic theme. It helped me create the blog of my dreams in minutes. The design is elegant and the features are just what I needed.",
  author = "Sarah J.",
  image = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80",
  forceMobile
}) {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${forceMobile ? 'ursula-mobile-stack' : ''}`}>
        <div className={styles.imageColumn}>
             <img src={image} alt="Client" className={styles.image} />
        
        </div>
        
        <div className={styles.textColumn}>
             <span className={styles.quoteIcon}>“</span>
             <p className={styles.quote}>{quote}</p>
             <span className={styles.author}>- {author}</span>
        </div>
      </div>
    </section>
  );
}

ClientLove.cmsConfig = {
    name: "Ursula Client Love",
    props: {
        title: { type: "string", label: "Title Overlay" },
        quote: { type: "string", label: "Quote", multiline: true },
        author: { type: "string", label: "Author Name" },
        image: { type: "image", label: "Client Image" }
    }
};
