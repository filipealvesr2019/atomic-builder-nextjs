import { Home as HomeIcon, Truck, Shield } from 'lucide-react';
import styles from './About.module.css';

export default function About(props) {
  const {
    title = "About RusticStore",
    description = "We are a store specialized in handmade rustic furniture and decoration. Each piece is carefully selected and produced by experienced artisans, ensuring quality and exclusivity to transform your house into a cozy home.",
    items = [
      {
        icon: "home", // Map string to icon component
        title: "Handmade Quality",
        description: "Unique handmade products with premium quality materials."
      },
      {
        icon: "truck",
        title: "Fast Delivery",
        description: "Free shipping nationwide on orders over $299."
      },
      {
        icon: "shield",
        title: "Full Warranty",
        description: "1 year warranty and 30 days for hassle-free exchanges."
      }
    ]
  } = props;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'home': return <HomeIcon className={styles.aboutIcon} size={24} />;
      case 'truck': return <Truck className={styles.aboutIcon} size={24} />;
      case 'shield': return <Shield className={styles.aboutIcon} size={24} />;
      default: return <HomeIcon className={styles.aboutIcon} size={24} />;
    }
  };

  return (
    <section className={styles.sectionGray}>
      <div className={styles.container}>
        <div className={styles.aboutContent}>
          <h2 className={styles.aboutTitle}>{title}</h2>
          <div className={styles.aboutDivider}></div>
          <p className={styles.aboutDescription}>
            {description}
          </p>
          <div className={styles.aboutGrid}>
            {items.map((item, index) => (
              <div key={index} className={styles.aboutItem}>
                <div className={styles.aboutIconContainer}>
                  {getIcon(item.icon)}
                </div>
                <h3 className={styles.aboutItemTitle}>{item.title}</h3>
                <p className={styles.aboutItemDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

About.cmsConfig = {
  name: "About Us",
  props: {
    title: { type: 'string', label: 'Title' },
    description: { type: 'string', label: 'Description', multiline: true },
    // Simplified item configuration for now
  }
};
