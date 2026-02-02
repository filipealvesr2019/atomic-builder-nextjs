'use client';

import React, { useState } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { Download, CheckCircle, ArrowRight, ChevronRight } from 'lucide-react';
import styles from './ProductDetailPage.module.css';

const ProductDetailPage = ({ product, sections = {}, baseUrl = "" }) => {
  const { header, footer } = sections;

  if (!product) return <div>Product not found</div>;

  const productImages = product.images || [product.image];
  const [activeImage, setActiveImage] = useState(productImages[0]);

  const features = product.features || [
    "Commercial license included",
    "Lifetime updates",
    "Instant digital delivery",
    "High-resolution source files"
  ];

  return (
    <div className={styles.page}>
      <Header {...(header || {})} baseUrl={baseUrl} />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs}>
            <a href={baseUrl || "/"}>Home</a>
            <ChevronRight size={14} />
            <a href={`${baseUrl}/products`}>Products</a>
            <ChevronRight size={14} />
            <span>{product.name}</span>
          </nav>

          <div className={styles.layout}>
            <div className={styles.visuals}>
              <div className={styles.mainImageContainer}>
                <img src={activeImage} alt={product.name} className={styles.mainImage} />
              </div>

              {productImages.length > 1 && (
                <div className={styles.gallery}>
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      className={`${styles.galleryItem} ${activeImage === img ? styles.activeThumb : ''}`}
                      onClick={() => setActiveImage(img)}
                    >
                      <img src={img} alt={`${product.name} view ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
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
                  {product.description || "This premium digital resource is meticulously crafted to meet the highest standards of modern design. Perfect for e-commerce brands, portfolios, and creative studios."}
                </p>

                <div className={styles.features}>
                  {features.map((feature, index) => (
                    <div key={index} className={styles.feature}>
                      <CheckCircle size={18} className={styles.check} />
                      <span>{feature}</span>
                    </div>
                  ))}
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
                <li>High-resolution source files (4K+)</li>
                <li>Commercial use license</li>
                <li>Comprehensive PDF documentation</li>
                <li>Design system components (Figma/Adobe)</li>
                <li>Priority support from our team</li>
              </ul>
            </div>
            <div className={styles.infoCol}>
              <h2 className={styles.sectionTitle}>Performance & Quality</h2>
              <p className={styles.infoText}>
                Our assets are optimized for maximum performance. Whether you're building a high-conversion landing page or a complex application, these resources are built to scale. We focus on attention to detail, accessibility, and modern aesthetics.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer {...(footer || {})} baseUrl={baseUrl} />
    </div>
  );
};

export default ProductDetailPage;
