import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer({
  logoText = "Rustic",
  logoAccent = "Store",
  description = "Sua loja online de móveis e decoração rústica. Produtos artesanais de alta qualidade para transformar sua casa em um lar aconchegante.",
  address = "Rua das Flores, 123 \nSão Paulo - SP",
  phone = "(11) 9999-9999",
  email = "contato@rusticstore.com"
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Logo e Descrição */}
          <div className={styles.section}>
            <h3 className={styles.logoText}>
              {logoText}<span className={styles.logoAccent}>{logoAccent}</span>
            </h3>
            <p className={styles.description}>
              {description}
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <Facebook size={20} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Instagram size={20} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Twitter size={20} />
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
                <a href="#products">Produtos</a>
              </li>
              <li className={styles.listItem}>
                <a href="#about">Sobre Nós</a>
              </li>
              <li className={styles.listItem}>
                <a href="#contact">Contato</a>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div className={styles.section}>
            <h4 className={styles.heading}>Categorias</h4>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <a href="#">Móveis</a>
              </li>
              <li className={styles.listItem}>
                <a href="#">Iluminação</a>
              </li>
              <li className={styles.listItem}>
                <a href="#">Decoração</a>
              </li>
              <li className={styles.listItem}>
                <a href="#">Artesanato</a>
              </li>
              <li className={styles.listItem}>
                <a href="#">Ofertas</a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className={styles.section}>
            <h4 className={styles.heading}>Contato</h4>
            <div className={styles.list}>
              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} size={20} />
                <p className={styles.contactText}>
                  {address.split('\n').map((line, i) => (
                    <span key={i}>{line}<br/></span>
                  ))}
                </p>
              </div>
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} size={20} />
                <span className={styles.contactText}>{phone}</span>
              </div>
              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} size={20} />
                <span className={styles.contactText}>{email}</span>
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
}

Footer.cmsConfig = {
  name: "Rodapé",
  description: "Rodapé com links, contato e copyright",
  props: {
    logoText: { type: 'string', label: 'Texto Logo', default: "Rustic" },
    logoAccent: { type: 'string', label: 'Texto Destaque', default: "Store" },
    description: { type: 'string', label: 'Descrição' },
    address: { type: 'string', label: 'Endereço', default: "Rua das Flores, 123 \nSão Paulo - SP" },
    phone: { type: 'string', label: 'Telefone', default: "(11) 9999-9999" },
    email: { type: 'string', label: 'Email', default: "contato@rusticstore.com" }
  }
};
