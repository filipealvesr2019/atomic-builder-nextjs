import styles from './Newsletter.module.css';

export default function Newsletter({
  title = "Fique por Dentro das Novidades",
  description = "Receba ofertas exclusivas e seja o primeiro a conhecer nossos novos produtos."
}) {
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
              placeholder="Seu melhor e-mail"
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterButton}>
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Newsletter.cmsConfig = {
  name: "Newsletter",
  description: "Formulário de inscrição de newsletter",
  props: {
    title: { type: 'string', label: 'Título', default: "Fique por Dentro das Novidades" },
    description: { type: 'string', label: 'Descrição' }
  }
};
