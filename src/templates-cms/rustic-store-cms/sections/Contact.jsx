import { MapPin, Phone, Mail } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact(props) {
  const {
    title = "Entre em Contato",
    infoTitle = "Fale Conosco",
    address = "Rua das Flores, 123 - São Paulo, SP",
    phone = "(11) 9999-9999",
    email = "contato@rusticstore.com",
    buttonText = "Enviar Mensagem"
  } = props;

  return (
    <section className={styles.sectionGray}>
      <div className={styles.container}>
        <div className={styles.contactContent}>
          <div className={styles.contactHeader}>
            <h2 className={styles.contactTitle}>{title}</h2>
            <div className={styles.contactDivider}></div>
          </div>
          
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h3 className={styles.contactInfoTitle}>{infoTitle}</h3>
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
                    <p className={styles.contactInfoText}>{phone}</p>
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
                  {buttonText}
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
  props: {
    title: { type: 'string', label: 'Título' },
    address: { type: 'string', label: 'Endereço' },
    phone: { type: 'string', label: 'Telefone' },
    email: { type: 'string', label: 'E-mail' }
  }
};
