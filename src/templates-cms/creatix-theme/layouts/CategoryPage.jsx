import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import CollectionGrid from '../sections/CollectionGrid';
import { ArrowLeft } from 'lucide-react';
import styles from './CategoryPage.module.css';

const CategoryPage = ({ sections = {}, category = {}, baseUrl = "" }) => {
  const { header, footer, featured } = sections;
  const products = featured?.products || [];
  const categoryId = category.id;
  const categoryName = category.name;

  const filteredProducts = products?.filter(p => !categoryId || p.category.toLowerCase() === categoryId.replace('-', ' ')) || [];

  return (
    <div className={styles.page}>
      <Header {...header} baseUrl={baseUrl} />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <a href={baseUrl || "/"} className={styles.backLink}>
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

          <CollectionGrid products={filteredProducts} baseUrl={baseUrl} />
        </div>
      </main>

      <Footer {...footer} />
    </div>
  );
};

export default CategoryPage;
