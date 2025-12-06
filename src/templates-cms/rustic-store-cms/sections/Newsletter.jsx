import styles from './Newsletter.module.css';

export default function Newsletter(props) {
  const {
    title = "Fique por Dentro das Novidades",
    description = "Receba ofertas exclusivas e seja o primeiro a conhecer nossos novos produtos.",
    buttonText = "Inscrever-se",
    placeholder = "Seu melhor e-mail"
  } = props;

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.container}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>{title}</h2>
          <p className={styles.newsletterDescription}>
            {description}
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder={placeholder}
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterButton}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Newsletter.cmsConfig = {
  name: "Newsletter",
  props: {
    title: { type: 'string', label: 'Título' },
    description: { type: 'string', label: 'Descrição' },
    buttonText: { type: 'string', label: 'Texto do Botão' },
    placeholder: { type: 'string', label: 'Placeholder do Input' }
  }
};
