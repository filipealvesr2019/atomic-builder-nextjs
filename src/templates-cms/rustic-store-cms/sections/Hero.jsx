import styles from './Hero.module.css';

export default function Hero({ title, subtitle, buttonText, buttonUrl, backgroundImage }) {
  return (
    <section 
      className={styles.hero}
      style={backgroundImage ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${backgroundImage}')` } : {}}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title || "Decoração Rústica Artesanal"}</h1>
          <p className={styles.subtitle}>
            {subtitle || "Móveis únicos feitos à mão para transformar sua casa"}
          </p>
          <a href={buttonUrl || "#products"} className={styles.button}>
            {buttonText || "Ver Produtos"}
          </a>
        </div>
      </div>
    </section>
  );
}

Hero.cmsConfig = {
  name: "Hero Section",
  props: {
    title: {
      type: "string",
      label: "Título",
      default: "Decoração Rústica Artesanal"
    },
    subtitle: {
      type: "string",
      label: "Subtítulo",
      default: "Móveis únicos feitos à mão para transformar sua casa"
    },
    buttonText: {
      type: "string",
      label: "Texto do Botão",
      default: "Ver Produtos"
    },
    buttonUrl: {
      type: "string",
      label: "Link do Botão",
      default: "#products"
    },
    backgroundImage: {
      type: "image",
      label: "Imagem de Fundo",
      default: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600"
    }
  }
};
