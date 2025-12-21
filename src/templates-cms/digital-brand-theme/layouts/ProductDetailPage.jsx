import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import styles from './ProductDetailPage.module.css';

const ProductDetailPage = ({ content, product }) => {
  const { header, footer } = content || {};
  const { 
    name = "Product Name", 
    price = 0, 
    category = "Category", 
    description = "Detailed description goes here.",
    image = ""
  } = product || {};

  return (
    <div className="digital-brand-theme">
      <Header content={header} />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            Início &rarr; Produtos &rarr; {category} &rarr; {name}
          </div>

          <div className={styles.grid}>
            <div className={styles.preview}>
              <img src={image} alt={name} className={styles.image} />
            </div>

            <div className={styles.content}>
              <div className={styles.infoCard}>
                <span className={styles.category}>{category}</span>
                <h1 className={styles.title}>{name}</h1>
                <p className={styles.description}>{description}</p>
                
                <span className={styles.price}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
                </span>

                <button className={styles.buyBtn}>
                  <Zap size={20} />
                  Comprar agora
                </button>

                <p className={styles.guarantee}>Download imediato após pagamento</p>

                <div className={styles.features}>
                  <div className={styles.featureItem}>
                    <Check size={20} color="#22C55E" />
                    <span>Atualizações vitalícias</span>
                  </div>
                  <div className={styles.featureItem}>
                    <ShieldCheck size={20} color="#6C63FF" />
                    <span>Garantia de satisfação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer content={footer} />
    </div>
  );
};

export default ProductDetailPage;
