import styles from './Newsletter.module.css';

export default function Newsletter({ title, description, buttonText }) {
  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title || "Fique por Dentro das Novidades"}</h2>
        <p className={styles.description}>
          {description || "Receba ofertas exclusivas e seja o primeiro a conhecer nossos novos produtos."}
        </p>
        <div className={styles.form}>
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className={styles.input}
          />
          <button className={styles.button}>
            {buttonText || "Inscrever-se"}
          </button>
        </div>
      </div>
    </section>
  );
}

Newsletter.cmsConfig = {
  name: "Newsletter",
  props: {
    title: {
      type: "string",
      label: "Título",
      default: "Fique por Dentro das Novidades"
    },
    description: {
      type: "string",
      label: "Descrição",
      default: "Receba ofertas exclusivas e seja o primeiro a conhecer nossos novos produtos."
    },
    buttonText: {
      type: "string",
      label: "Texto do Botão",
      default: "Inscrever-se"
    }
  }
};
