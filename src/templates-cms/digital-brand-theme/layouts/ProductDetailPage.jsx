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

          <div className={styles.grid}>
            <div className={styles.preview}>
              <img src={p.image} alt={p.name} className={styles.image} />
              <div style={{ padding: '2.5rem' }}>
                <div className={styles.header}>
                  <span className={styles.category}>{p.category}</span>
                  <h1 className={styles.title}>{p.name}</h1>
                </div>
                <p className={styles.description}>{p.description}</p>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#0F172A' }}>
                  Features & Details
                </h2>
                <div className={styles.features}>
                  {p.features?.map((feature, index) => (
                    <div key={index} className={styles.featureItem}>
                      <CheckCircle2 size={18} color="#6C63FF" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside>
              <div className={styles.infoCard}>
                <span className={styles.category} style={{ fontSize: '0.75rem' }}>License Price</span>
                <span className={styles.price}>
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.price)}
                </span>
                <button className={styles.buyBtn}>
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
                <button className={styles.buyBtn} style={{ backgroundColor: '#F1F5F9', color: '#0F172A', border: '1px solid #E2E8F0' }}>
                  Live Preview
                </button>
                <p className={styles.guarantee}>30-Day Money Back Guarantee</p>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: '#64748B', fontSize: '14px' }}>Last updated</span>
                    <span style={{ color: '#0F172A', fontSize: '14px', fontWeight: 500 }}>May 2024</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B', fontSize: '14px' }}>File Type</span>
                    <span style={{ color: '#0F172A', fontSize: '14px', fontWeight: 500 }}>ZIP, SVG, OTF</span>
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
