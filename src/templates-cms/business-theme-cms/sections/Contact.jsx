import styles from './Contact.module.css';

export default function Contact({
  title = "Entre em Contato"
}) {
  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>Estamos prontos para ajudar você</p>
        <div className={styles.info}>
          <div className={styles.item}>
            <span className={styles.icon}>📧</span>
            <p>contato@empresa.com</p>
          </div>
          <div className={styles.item}>
            <span className={styles.icon}>📞</span>
            <p>(11) 9999-9999</p>
          </div>
          <div className={styles.item}>
            <span className={styles.icon}>📍</span>
            <p>São Paulo, SP</p>
          </div>
        </div>
      </div>
    </section>
  );
}

Contact.cmsConfig = {
  name: "Contact Section",
  props: {
    title: { type: 'string', label: 'Título' }
  }
};
