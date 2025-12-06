import styles from './Header.module.css';

export default function Header({ 
  logoText = "RusticStore",
  links = [
    { text: "Início", href: "#" },
    { text: "Catálogo", href: "#products" },
    { text: "Sobre Nós", href: "#about" },
    { text: "Contato", href: "#contact" }
  ]
}) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>{logoText}</a>
        <nav className={styles.nav}>
          {links.map((link, index) => (
            <a key={index} href={link.href} className={styles.link}>
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

Header.cmsConfig = {
  name: "Cabeçalho",
  description: "Navegação estilo rústico",
  props: {
    logoText: { type: 'string', label: 'Texto do Logo' },
    links: { 
      type: 'list', 
      label: 'Links',
      itemType: {
        text: { type: 'string', label: 'Texto' },
        href: { type: 'string', label: 'URL' }
      }
    }
  }
};
