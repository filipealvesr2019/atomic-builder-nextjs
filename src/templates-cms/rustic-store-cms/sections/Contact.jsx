import { MapPin, Phone, Mail } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact(props) {
  const {
    title = "Get in Touch",
    infoTitle = "Contact Us",
    address = "123 Flowers Street - New York, NY",
    phone = "(555) 123-4567",
    email = "contact@rusticstore.com",
    buttonText = "Send Message"
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
                    <p className={styles.contactInfoLabel}>Address</p>
                    <p className={styles.contactInfoText}>{address}</p>
                  </div>
                </div>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIconContainer}>
                    <Phone className={styles.contactInfoIcon} size={20} />
                  </div>
                  <div>
                    <p className={styles.contactInfoLabel}>Phone</p>
                    <p className={styles.contactInfoText}>{phone}</p>
                  </div>
                </div>
                <div className={styles.contactInfoItem}>
                  <div className={styles.contactInfoIconContainer}>
                    <Mail className={styles.contactInfoIcon} size={20} />
                  </div>
                  <div>
                    <p className={styles.contactInfoLabel}>Email</p>
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
                    placeholder="Your name"
                    className={styles.contactInput}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    className={styles.contactInput}
                  />
                </div>
                <div>
                  <textarea
                    rows="5"
                    placeholder="Your message"
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
  name: "Contact",
  props: {
    title: { type: 'string', label: 'Title' },
    address: { type: 'string', label: 'Address' },
    phone: { type: 'string', label: 'Phone' },
    email: { type: 'string', label: 'Email' }
  }
};
