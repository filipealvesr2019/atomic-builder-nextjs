import styles from './Features.module.css';

export default function Features({ 
  title = "Nossos Serviços",
  features = [
    { title: "Rápido", description: "Performance otimizada", icon: "⚡" },
    { title: "Seguro", description: "Proteção de dados", icon: "🔒" },
    { title: "Escalável", description: "Cresce com você", icon: "📈" }
  ]
}) {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Features.cmsConfig = {
  name: "Features Section",
  description: "Grade de cards com features/serviços",
  props: {
    title: {
      type: 'string',
      label: 'Título da Seção'
    },
    features: {
      type: 'array',
      label: 'Lista de Features',
      itemSchema: {
        title: { type: 'string', label: 'Título' },
        description: { type: 'string', label: 'Descrição' },
        icon: { type: 'string', label: 'Emoji/Ícone' }
      }
    }
  }
};
