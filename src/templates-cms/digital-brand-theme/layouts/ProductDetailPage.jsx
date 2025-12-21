import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import styles from './ProductDetailPage.module.css';
import { ChevronRight, CheckCircle2, ShoppingBag } from 'lucide-react';

const ProductDetailPage = ({ sections = {}, product }) => {
  // Mock product data for fallback
  const p = product || {
    name: 'Next.js SaaS Starter',
    price: 199,
    category: 'Templates',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
    description: 'The ultimate starter for your next SaaS. Built with Next.js 14, Tailwind CSS, Primsma, and Stripe.',
    features: [
      'Full authentication (Next-Auth)',
      'Subcriptions with Stripe',
      'Dashboard & Admin Panel',
      'SEO Optimized',
      'Mobile Responsive'
    ]
  };

  return (
    <div className="digital-brand-theme">
      <Header {...(sections.header || {})} />
      <main style={{ paddingTop: '100px', backgroundColor: '#FFFFFF', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '14px', marginBottom: '32px' }}>
            <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a>
            <ChevronRight size={14} />
            <a href="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Products</a>
            <ChevronRight size={14} />
            <span style={{ color: '#0F172A', fontWeight: 500 }}>{p.name}</span>
          </nav>

          <div className={styles.productGrid}>
            <div className={styles.preview}>
              <div className={styles.imageContainer}>
                <img src={p.image} alt={p.name} className={styles.mainImage} />
              </div>
              <div className={styles.details}>
                <h2 className={styles.sectionTitle}>Description</h2>
                <p className={styles.descriptionText}>{p.description}</p>
                
                <h2 className={styles.sectionTitle}>Main Features</h2>
                <ul className={styles.featureList}>
                  {p.features?.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      <CheckCircle2 size={20} color="#22C55E" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.buyCard}>
                <span className={styles.categoryBadge}>{p.category}</span>
                <h1 className={styles.productTitle}>{p.name}</h1>
                <div className={styles.priceContainer}>
                  <span className={styles.priceSymbol}>$</span>
                  <span className={styles.priceValue}>{p.price}</span>
                </div>
                <button className={styles.mainBuyBtn}>
                   <ShoppingBag size={20} />
                   Buy Now
                </button>
                <p className={styles.guarantee}>30-Day Money Back Guarantee</p>
                
                <div className={styles.metaInfo}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Last updated:</span>
                    <span className={styles.metaValue}>May 2024</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Version:</span>
                    <span className={styles.metaValue}>2.4.0</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer {...(sections.footer || {})} />
    </div>
  );
};

export default ProductDetailPage;
