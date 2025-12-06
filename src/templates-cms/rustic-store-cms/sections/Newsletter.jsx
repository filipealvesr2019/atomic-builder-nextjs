import styles from './Newsletter.module.css';

export default function Newsletter(props) {
  const {
    title = "Stay Updated",
    description = "Receive exclusive offers and be the first to know about our new products.",
    buttonText = "Subscribe",
    placeholder = "Your best email"
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
    title: { type: 'string', label: 'Title' },
    description: { type: 'string', label: 'Description' },
    buttonText: { type: 'string', label: 'Button Text' },
    placeholder: { type: 'string', label: 'Input Placeholder' }
  }
};
