import styles from './Hero.module.css';

export default function Hero({ 
  title = "Bem-vindo ao Nosso Site",
  subtitle = "Esta é uma landing page moderna e responsiva criada com Next.js",
  image = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <img src={image} alt="Hero" className={styles.image} />
      </div>
    </section>
  );
}

Hero.cmsConfig = {
  name: "Hero Section",
  description: "Seção de destaque principal",
  props: {
    title: { type: 'string', label: 'Título' },
    subtitle: { type: 'string', label: 'Subtítulo' },
    image: { type: 'image', label: 'Imagem' }
  }
};
