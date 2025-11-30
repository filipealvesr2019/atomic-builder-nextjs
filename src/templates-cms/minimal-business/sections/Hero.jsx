import styles from './Hero.module.css';

export default function Hero({ 
  title = "Bem-vindo ao Futuro",
  subtitle = "Soluções inovadoras para o seu negócio",
  buttonText = "Começar Agora",
  buttonLink = "#contact"
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <a href={buttonLink} className={styles.button}>
          {buttonText}
        </a>
      </div>
    </section>
  );
}

// Metadados para o CMS saber como editar
Hero.cmsConfig = {
  name: "Hero Section",
  description: "Seção principal de destaque da página",
  props: {
    title: { 
      type: 'string', 
      label: 'Título Principal',
      placeholder: 'Digite o título...'
    },
    subtitle: { 
      type: 'string', 
      label: 'Subtítulo',
      placeholder: 'Digite o subtítulo...'
    },
    buttonText: {
      type: 'string',
      label: 'Texto do Botão'
    },
    buttonLink: {
      type: 'string',
      label: 'Link do Botão',
      placeholder: '#section ou /page'
    }
  }
};
