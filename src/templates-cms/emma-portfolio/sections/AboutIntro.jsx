'use client';
import styles from './AboutIntro.module.css';

export default function AboutIntro({
  profileImage = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80", // Small left image
  heroImage = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",    // Large right image
  name = "Emma Best",
  subtitle = "Have we met?",
  bio = "I'm a passionate brand strategist and business coach. I help creative entrepreneurs build businesses they love."
}) {
  return (
    <section className={styles.section}>
      <div className={styles.contentSide}>
         <img src={profileImage} alt={name} className={styles.floaterImage} />
         <h1 className={styles.title}>{name}</h1>
         <h2 className={styles.subtitle}>{subtitle}</h2>
         <div className={styles.text} dangerouslySetInnerHTML={{ __html: bio }} />
      </div>
      <div className={styles.imageSide}>
         <img src={heroImage} alt="About Emma" className={styles.image} />
      </div>
    </section>
  );
}

AboutIntro.cmsConfig = {
    name: "Emma About Intro",
    props: {
        profileImage: { type: "image", label: "Profile Image (Left)" },
        heroImage: { type: "image", label: "Hero Image (Right)" },
        name: { type: "string", label: "Name" },
        subtitle: { type: "string", label: "Subtitle" },
        bio: { type: "rich-text", label: "Bio Text" }
    }
};
