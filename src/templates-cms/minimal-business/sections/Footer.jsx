import styles from './Footer.module.css';

export default function Footer({ 
  companyName = "Minha Empresa",
  links = [
    { text: "Sobre", url: "/about" },
    { text: "Serviços", url: "/services" },
    { text: "Contato", url: "/contact" }
  ]
}) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.brand}>
            <h3 className={styles.companyName}>{companyName}</h3>
            <p className={styles.copyright}>© {currentYear} Todos os direitos reservados</p>
          </div>
          
          <nav className={styles.links}>
            {links.map((link, index) => (
              <a key={index} href={link.url} className={styles.link}>
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

Footer.cmsConfig = {
  name: "Footer",
  description: "Rodapé do site com links e informações",
  props: {
    companyName: {
      type: 'string',
      label: 'Nome da Empresa'
    },
    links: {
      type: 'array',
      label: 'Links do Footer',
      itemSchema: {
        text: { type: 'string', label: 'Texto' },
        url: { type: 'string', label: 'URL' }
      }
    }
  }
};
