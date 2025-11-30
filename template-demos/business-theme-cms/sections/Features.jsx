import styles from './Features.module.css';

export default function Features({
  title = "Nossos Recursos"
}) {
  const features = [
    { icon: "⚡", title: "Rápido", description: "Performance otimizada" },
    { icon: "🎨", title: "Moderno", description: "Design atual" },
    { icon: "📱", title: "Responsivo", description: "Funciona em todos os dispositivos" }
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Features.cmsConfig = {
  name: "Features Section",
  props: {
    title: { type: 'string', label: 'Título' }
  }
};
