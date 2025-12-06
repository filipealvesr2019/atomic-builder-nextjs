import { Home as HomeIcon, Truck, Shield } from 'lucide-react';
import styles from './About.module.css';

export default function About(props) {
  const {
    title = "Sobre a RusticStore",
    description = "Somos uma loja especializada em móveis e decoração rústica artesanal. Cada peça é cuidadosamente selecionada e produzida por artesãos experientes, garantindo qualidade e exclusividade para transformar sua casa em um lar aconchegante.",
    items = [
      {
        icon: "home", // Map string to icon component
        title: "Qualidade Artesanal",
        description: "Produtos únicos feitos à mão com materiais de primeira qualidade."
      },
      {
        icon: "truck",
        title: "Entrega Rápida",
        description: "Frete grátis para todo o Brasil em compras acima de R$ 299."
      },
      {
        icon: "shield",
        title: "Garantia Total",
        description: "1 ano de garantia e 30 dias para trocas sem complicações."
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
  name: "Sobre Nós",
  props: {
    title: { type: 'string', label: 'Título' },
    description: { type: 'string', label: 'Descrição', multiline: true },
    // Simplified item configuration for now
  }
};
