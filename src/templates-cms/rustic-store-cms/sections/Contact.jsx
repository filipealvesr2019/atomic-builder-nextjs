import { MapPin, Phone, Mail } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact({
  title = "Entre em Contato",
  address = "Rua das Flores, 123 - São Paulo, SP",
  phoneNumber = "(11) 9999-9999",
  email = "contato@rusticstore.com"
}) {
  return (
    <section className={styles.sectionGray} id="contact">
      <div className={styles.container}>
        <div className={styles.contactContent}>
          <div className={styles.contactHeader}>
            <h2 className={styles.contactTitle}>{title}</h2>
            <div className={styles.contactDivider}></div>
          </div>
          
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h3 className={styles.contactInfoTitle}>Fale Conosco</h3>
              <div className={styles.contactInfoList}>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIconContainer}>
                    <MapPin className={styles.contactInfoIcon} size={20} />
                  </div>
                  <div>
                    <p className={styles.contactInfoLabel}>Endereço</p>
                    <p className={styles.contactInfoText}>{address}</p>
                  </div>
                </div>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIconContainer}>
                    <Phone className={styles.contactInfoIcon} size={20} />
                  </div>
                  <div>
                    <p className={styles.contactInfoLabel}>Telefone</p>
                    <p className={styles.contactInfoText}>{phoneNumber}</p>
                  </div>
                </div>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIconContainer}>
                    <Mail className={styles.contactInfoIcon} size={20} />
                  </div>
                  <div>
                    <p className={styles.contactInfoLabel}>E-mail</p>
                    <p className={styles.contactInfoText}>{email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className={styles.contactForm}>
                <div>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className={styles.contactInput}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className={styles.contactInput}
                  />
                </div>
                <div>
                  <textarea
                    rows="5"
                    placeholder="Sua mensagem"
                    className={`${styles.contactInput} ${styles.contactTextarea}`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={styles.contactSubmitButton}
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Contact.cmsConfig = {
  name: "Contato",
  description: "Informações de contato e formulário",
  props: {
    title: { type: 'string', label: 'Título', default: "Entre em Contato" },
    address: { type: 'string', label: 'Endereço', default: "Rua das Flores, 123 - São Paulo, SP" },
    phoneNumber: { type: 'string', label: 'Telefone', default: "(11) 9999-9999" },
    email: { type: 'string', label: 'Email', default: "contato@rusticstore.com" }
  }
};
