import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>Decoração Rústica Artesanal</h1>
          <p className={styles.subtitle}>
            Móveis únicos feitos à mão para transformar sua casa
          </p>
          <a href="#products" className={styles.button}>
            Ver Produtos
          </a>
        </div>
      </div>
    </section>
  );
}
