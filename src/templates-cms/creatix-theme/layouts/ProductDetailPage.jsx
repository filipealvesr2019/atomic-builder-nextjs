import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { Download, CheckCircle, ArrowRight } from 'lucide-react';
import styles from './ProductDetailPage.module.css';

const ProductDetailPage = ({ product, header, footer }) => {
  if (!product) return <div>Product not found</div>;

  return (
    <div className={styles.page}>
      <Header {...header} />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <div className={styles.visuals}>
              <img src={product.image} alt={product.name} className={styles.mainImage} />
              <div className={styles.gallery}>
                {/* Placeholder for more images */}
                <div className={styles.galleryItem}></div>
                <div className={styles.galleryItem}></div>
                <div className={styles.galleryItem}></div>
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.sticky}>
                <span className={styles.category}>{product.category}</span>
                <h1 className={styles.name}>{product.name}</h1>
                <div className={styles.priceSection}>
                  <span className={styles.price}>${product.price}</span>
                  <span className={styles.oneTime}>One-time payment</span>
                </div>
                
                <p className={styles.description}>
                  This premium digital resource is meticulously crafted to meet the highest standards of modern design. Perfect for e-commerce brands, portfolios, and creative studios.
                </p>

                <div className={styles.features}>
                  <div className={styles.feature}>
                    <CheckCircle size={18} className={styles.check} />
                    <span>Commercial license included</span>
                  </div>
                  <div className={styles.feature}>
                    <CheckCircle size={18} className={styles.check} />
                    <span>Lifetime updates</span>
                  </div>
                  <div className={styles.feature}>
                    <CheckCircle size={18} className={styles.check} />
                    <span>Instant digital delivery</span>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className={styles.buyBtn}>
                    <span>Buy Now</span>
                    <ArrowRight size={20} />
                  </button>
                  <p className={styles.disclaimer}>Instant download after purchase</p>
                </div>
              </div>
            </div>
          </div>

          <section className={styles.infoContent}>
            <div className={styles.infoCol}>
              <h2 className={styles.sectionTitle}>What's included</h2>
              <ul className={styles.list}>
                <li>High-resolution source files</li>
                <li>Comprehensive documentation</li>
                <li>Design system components</li>
                <li>Developer instructions</li>
                <li>Support from the creator</li>
              </ul>
            </div>
            <div className={styles.infoCol}>
              <h2 className={styles.sectionTitle}>Benefits</h2>
              <p className={styles.infoText}>
                Elevate your project visibility and conversion rates with assets that follow market psychology and aesthetic trends. Save hundreds of hours in development and design.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer {...footer} />
    </div>
  );
};

export default ProductDetailPage;
