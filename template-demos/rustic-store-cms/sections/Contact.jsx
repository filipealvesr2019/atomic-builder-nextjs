import styles from './Contact.module.css';

export default function Contact({ title, address, phone, email }) {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title || "Entre em Contato"}</h2>
        
        <div className={styles.grid}>
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>Fale Conosco</h3>
            
            <div className={styles.infoItem}>
              <span className={styles.icon}>📍</span>
              <div>
                <p className={styles.label}>Endereço</p>
                <p className={styles.text}>{address || "Rua das Flores, 123 - São Paulo, SP"}</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.icon}>📞</span>
              <div>
                <p className={styles.label}>Telefone</p>
                <p className={styles.text}>{phone || "(11) 9999-9999"}</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.icon}>📧</span>
              <div>
                <p className={styles.label}>E-mail</p>
                <p className={styles.text}>{email || "contato@rusticstore.com"}</p>
              </div>
            </div>
          </div>
          
          <form className={styles.form}>
            <input
              type="text"
              placeholder="Seu nome"
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              className={styles.input}
            />
            <textarea
              rows="5"
              placeholder="Sua mensagem"
              className={`${styles.input} ${styles.textarea}`}
            ></textarea>
            <button type="submit" className={styles.button}>
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

Contact.cmsConfig = {
  name: "Contact Section",
  props: {
    title: {
      type: "string",
      label: "Título",
      default: "Entre em Contato"
    },
    address: {
      type: "string",
      label: "Endereço",
      default: "Rua das Flores, 123 - São Paulo, SP"
    },
    phone: {
      type: "string",
      label: "Telefone",
      default: "(11) 9999-9999"
    },
    email: {
      type: "string",
      label: "E-mail",
      default: "contato@rusticstore.com"
    }
  }
};
