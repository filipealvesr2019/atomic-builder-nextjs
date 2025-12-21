'use client';

import styles from './FeaturedContent.module.css';

export default function FeaturedContent({
  title = "Block Title",
  text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  buttonText = "Read More",
  image1 = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
  image2 = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80"
}) {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} ursula-mobile-stack`}>
        {/* Text Content */}
        <div className={styles.textColumn}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
            <a href="#" className={styles.button}>{buttonText}</a>
        </div>

        {/* Image Collage */}
        <div className={styles.imageColumn}>
            <div className={styles.imageWrapper1}>
                <img src={image1} alt="Fashion 1" className={styles.image} />
            </div>
            <div className={styles.imageWrapper2}>
                <img src={image2} alt="Fashion 2" className={styles.image} />
            </div>
        </div>
      </div>
    </section>
  );
}

FeaturedContent.cmsConfig = {
    name: "Ursula Featured Content",
    props: {
        title: { type: "string", label: "Title" },
        text: { type: "string", label: "Description", multiline: true },
        buttonText: { type: "string", label: "Button Text" },
        image1: { type: "image", label: "Main Image" },
        image2: { type: "image", label: "Secondary Image" }
    }
};
