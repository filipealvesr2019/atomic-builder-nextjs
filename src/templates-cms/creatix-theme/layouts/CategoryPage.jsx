import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import styles from './CategoryPage.module.css';

const CategoryPage = ({ categoryId, categoryName, products, header, footer }) => {
  return (
    <div className={styles.page}>
      <Header {...header} />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <a href="/" className={styles.backLink}>
              <ArrowLeft size={16} />
              <span>Back to home</span>
            </a>
          </div>

          <header className={styles.categoryHeader}>
            <h1 className={styles.title}>{categoryName || "Category"}</h1>
            <p className={styles.description}>
              Explore our premium selection of {categoryName?.toLowerCase() || "digital assets"} designed for high performance.
            </p>
          </header>

          <div className={styles.grid}>
            {products?.filter(p => !categoryId || p.category.toLowerCase() === categoryId.replace('-', ' '))
              .map((product, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img src={product.image} alt={product.name} className={styles.image} />
                  <div className={styles.overlay}>
                    <button className={styles.buyBtn}>
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{product.name}</h3>
                  <span className={styles.price}>${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer {...footer} />
    </div>
  );
};

export default CategoryPage;
