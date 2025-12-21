import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import styles from './FeaturedProducts.module.css';

const defaultProducts = [
  {
    id: "1",
    name: "Creatix Pro UI Kit",
    price: 129,
    category: "UI Kits",
    image: "https://images.unsplash.com/photo-1581291518062-c13f277ca1bf?auto=format&fit=crop&q=80&w=1000",
    badge: "Hot Bundle"
  },
  {
    id: "2",
    name: "E-commerce React Starter",
    price: 89,
    category: "Front-end Code",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "3",
    name: "Elite Landing Page",
    price: 49,
    category: "Landing Pages",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "4",
    name: "Brand Master System",
    price: 199,
    category: "Design Systems",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1000",
    badge: "Popular"
  }
];

const FeaturedProducts = ({ title, products }) => {
  const displayProducts = products && products.length > 0 ? products : defaultProducts;

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
          {displayProducts.map((product, index) => (
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
