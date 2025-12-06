import { Home, Truck, Shield } from 'lucide-react';
import styles from './About.module.css';

export default function About({ 
  title = "Sobre a RusticStore",
  description = "Somos uma loja especializada em móveis e decoração rústica artesanal. Cada peça é cuidadosamente selecionada e produzida por artesãos experientes, garantindo qualidade e exclusividade para transformar sua casa em um lar aconchegante."
}) {
  return (
    <section className={styles.sectionGray} id="about">
      <div className={styles.container}>
        <div className={styles.aboutContent}>
          <h2 className={styles.aboutTitle}>{title}</h2>
          <div className={styles.aboutDivider}></div>
          <p className={styles.aboutDescription}>{description}</p>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutItem}>
              <div className={styles.aboutIconContainer}>
                <Home className={styles.aboutIcon} size={24} />
              </div>
              <h3 className={styles.aboutItemTitle}>Qualidade Artesanal</h3>
              <p className={styles.aboutItemDescription}>Produtos únicos feitos à mão com materiais de primeira qualidade.</p>
            </div>
            <div className={styles.aboutItem}>
              <div className={styles.aboutIconContainer}>
                <Truck className={styles.aboutIcon} size={24} />
              </div>
              <h3 className={styles.aboutItemTitle}>Entrega Rápida</h3>
              <p className={styles.aboutItemDescription}>Frete grátis para todo o Brasil em compras acima de R$ 299.</p>
            </div>
            <div className={styles.aboutItem}>
              <div className={styles.aboutIconContainer}>
                <Shield className={styles.aboutIcon} size={24} />
              </div>
              <h3 className={styles.aboutItemTitle}>Garantia Total</h3>
              <p className={styles.aboutItemDescription}>1 ano de garantia e 30 dias para trocas sem complicações.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

About.cmsConfig = {
  name: "Sobre Nós",
  description: "Seção sobre a empresa com ícones",
  props: {
    title: { type: 'string', label: 'Título', default: "Sobre a RusticStore" },
    description: { type: 'string', label: 'Descrição' }
  }
};
