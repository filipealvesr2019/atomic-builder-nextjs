import React from 'react';
import { Plus } from 'lucide-react';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = ({ title, subtitle, products }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title || "Featured Products"}</h2>
          <p className={styles.subtitle}>{subtitle || "Check out our most popular solutions"}</p>
        </div>

        <div className={styles.grid}>
          {products?.map((product, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.productName}>{product.name}</h3>
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
