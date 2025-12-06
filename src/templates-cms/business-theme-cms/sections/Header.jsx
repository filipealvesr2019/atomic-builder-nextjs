import styles from './Header.module.css';

export default function Header({ 
  logoText = "Business Theme",
  links = [
    { text: "Home", href: "#" },
    { text: "Serviços", href: "#services" },
    { text: "Sobre", href: "#about" },
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
  description: "Barra de navegação superior",
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
