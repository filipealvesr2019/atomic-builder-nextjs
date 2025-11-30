import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css'; // Importar CSS Module

const Footer = () => {
  return (
    <footer className={styles.footer} data-block-type="footer">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo e Descrição */}
          
          <div className={styles.section}>
            <h3 className={styles.logoText}>
              Rustic<span className={styles.logoAccent}>Store</span>
            </h3>
            <p className={styles.description}>
              Sua loja online de móveis e decoração rústica. Produtos artesanais 
              de alta qualidade para transformar sua casa em um lar aconchegante.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <Facebook style={{ height: '1.25rem', width: '1.25rem' }} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Instagram style={{ height: '1.25rem', width: '1.25rem' }} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Twitter style={{ height: '1.25rem', width: '1.25rem' }} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className={styles.section}>
            <h4 className={styles.heading}>Links Rápidos</h4>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <a href="/">Início</a>
              </li>
              <li className={styles.listItem}>
                <a href="/products">Produtos</a>
              </li>
              <li className={styles.listItem}>
                <a href="/blog">Blog</a>
              </li>
              <li className={styles.listItem}>
                <a href="/about">Sobre Nós</a>
              </li>
              <li className={styles.listItem}>
                <a href="/contact">Contato</a>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div className={styles.section}>
            <h4 className={styles.heading}>Categorias</h4>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <a href="/categories/móveis">Móveis</a>
              </li>
              <li className={styles.listItem}>
                <a href="/categories/iluminação">Iluminação</a>
              </li>
              <li className={styles.listItem}>
                <a href="/categories/decoração">Decoração</a>
              </li>
              <li className={styles.listItem}>
                <a href="/categories/artesanato">Artesanato</a>
              </li>
              <li className={styles.listItem}>
                <a href="/categories/ofertas">Ofertas</a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className={styles.section}>
            <h4 className={styles.heading}>Contato</h4>
            <div className={styles.list}>
              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} style={{ height: '1.25rem', width: '1.25rem' }} />
                <p className={styles.contactText} style={{ margin: 0 }}>
                  Rua das Flores, 123<br />
                  São Paulo - SP, 01234-567
                </p>
              </div>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} style={{ height: '1.25rem', width: '1.25rem' }} />
                <span className={styles.contactText}>(11) 9999-9999</span>
              </div>
              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} style={{ height: '1.25rem', width: '1.25rem' }} />
                <span className={styles.contactText}>contato@rusticstore.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Separação */}
        <div className={styles.separator}>
          <div className={styles.bottomBar}>
            <p className={styles.copyright}>
              © 2024 RusticStore. Todos os direitos reservados.
            </p>
            <div className={styles.bottomLinks}>
              <a href="#" className={styles.bottomLink}>
                Política de Privacidade
              </a>
              <a href="#" className={styles.bottomLink}>
                Termos de Uso
              </a>
              <a href="#" className={styles.bottomLink}>
                Trocas e Devoluções
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
