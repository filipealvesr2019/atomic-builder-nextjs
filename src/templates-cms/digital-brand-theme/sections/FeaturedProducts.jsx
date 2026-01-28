import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import styles from './FeaturedProducts.module.css';
import Link from 'next/link'; // Assuming Next.js Link component

const FeaturedProducts = ({ title, subtitle, products, exploreLink, baseUrl = "" }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          <Link href={exploreLink || `${baseUrl}/products`} className={styles.exploreLink}>
            Explore Products
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.grid}>
          {products?.slice(0, 4).map((product, index) => (
            <div key={index} className={styles.card}>
              <a href={`${baseUrl}/product/${product.slug}`} className={styles.imageWrapper}>
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                />
              </a>
              <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <a href={`${baseUrl}/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                  <h3 className={styles.productName}>{product.name}</h3>
                </a>
                <div className={styles.footer}>
                  <span className={styles.price}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                  </span>
                  <button className={styles.buyBtn} title="Add to cart">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
