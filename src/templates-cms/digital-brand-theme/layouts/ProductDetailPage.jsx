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

          <header className={styles.detailHeader}>
            <span className={styles.category}>{p.category}</span>
            <h1 className={styles.title}>{p.name}</h1>
          </header>

          <div className={styles.mainGrid}>
            <div className={styles.gallery}>
              <div className={styles.mainImageContainer}>
                <img src={p.image} alt={p.name} className={styles.image} />
              </div>
            </div>

            <aside className={styles.buySection}>
              <div className={styles.infoCard}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ color: '#64748B', fontSize: '14px', fontWeight: 500 }}>Price</span>
                  <div className={styles.price}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.price)}
                  </div>
                </div>

                <div className={styles.licenseOptions}>
                  <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #6C63FF', backgroundColor: 'rgba(108, 99, 255, 0.05)', marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#0F172A' }}>Personal License</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>For personal use and one commercial project</div>
                  </div>
                </div>

                <button className={styles.buyBtn}>
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>

                <p className={styles.guarantee}>Instant download after purchase</p>
              </div>
            </aside>
          </div>

          <div className={styles.bottomSection}>
            <div className={styles.contentCol}>
              <section className={styles.aboutSection}>
                <h2 className={styles.sectionTitle}>About this asset</h2>
                <p className={styles.description}>{p.description}</p>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '2rem 0 1rem', color: '#0F172A' }}>
                  Key Features
                </h3>
                <div className={styles.features}>
                  {p.features?.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <CheckCircle2 size={18} color="#6C63FF" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className={styles.specsCol}>
              <div className={styles.specsCard}>
                <h3 className={styles.specsTitle}>Specifications</h3>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>File Type</span>
                  <span className={styles.specValue}>ZIP, SVG, OTF</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>File Size</span>
                  <span className={styles.specValue}>124 MB</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Vector</span>
                  <span className={styles.specValue}>Yes</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Last Update</span>
                  <span className={styles.specValue}>May 2024</span>
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
