import styles from './About.module.css';

export default function About({ title, description }) {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title || "Sobre a RusticStore"}</h2>
        <p className={styles.description}>
          {description || "Somos uma loja especializada em móveis e decoração rústica artesanal. Cada peça é cuidadosamente selecionada e produzida por artesãos experientes, garantindo qualidade e exclusividade para transformar sua casa em um lar aconchegante."}
        </p>
        
        <div className={styles.grid}>
          <div className={styles.item}>
            <div className={styles.icon}>🏡</div>
            <h3 className={styles.itemTitle}>Qualidade Artesanal</h3>
            <p className={styles.itemDescription}>
              Produtos únicos feitos à mão com materiais de primeira qualidade.
            </p>
          </div>
          
          <div className={styles.item}>
            <div className={styles.icon}>🚚</div>
            <h3 className={styles.itemTitle}>Entrega Rápida</h3>
            <p className={styles.itemDescription}>
              Frete grátis para todo o Brasil em compras acima de R$ 299.
            </p>
          </div>
          
          <div className={styles.item}>
            <div className={styles.icon}>🛡️</div>
            <h3 className={styles.itemTitle}>Garantia Total</h3>
            <p className={styles.itemDescription}>
              1 ano de garantia e 30 dias para trocas sem complicações.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

About.cmsConfig = {
  name: "About Section",
  props: {
    title: {
      type: "string",
      label: "Título",
      default: "Sobre a RusticStore"
    },
    description: {
      type: "string",
      label: "Descrição",
      default: "Somos uma loja especializada em móveis e decoração rústica artesanal..."
    }
  }
};
