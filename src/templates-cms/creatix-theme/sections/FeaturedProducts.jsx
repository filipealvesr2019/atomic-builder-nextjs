import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = ({ title, products }) => {
  return (
    <section className={styles.featured}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <Star className={styles.star} size={24} />
            <h2 className={styles.title}>{title || "Featured Products"}</h2>
          </div>
          <a href="/products" className={styles.viewAll}>View all products</a>
        </div>

        <div className={styles.grid}>
          {products?.map((product, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.name} className={styles.image} />
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
                <div className={styles.overlay}>
                  <button className={styles.buyBtn}>
                    <ShoppingBag size={20} />
                    <span>Quick Buy</span>
                  </button>
                </div>
              </div>
              
              <div className={styles.info}>
                <div className={styles.meta}>
                  <span className={styles.category}>{product.category}</span>
                  <span className={styles.price}>${product.price}</span>
                </div>
                <h3 className={styles.name}>{product.name}</h3>
                <a href={`/product/${product.id}`} className={styles.detailLink}>
                  Details and preview
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
