import styles from './Newsletter.module.css';

export default function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <h2 className={styles.title}>Fique por Dentro das Novidades</h2>
        <p className={styles.description}>
          Receba ofertas exclusivas e seja o primeiro a conhecer nossos novos produtos.
        </p>
        <div className={styles.form}>
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className={styles.input}
          />
          <button className={styles.button}>
            Inscrever-se
          </button>
        </div>
      </div>
    </section>
  );
}
