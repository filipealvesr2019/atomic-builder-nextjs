import CollectionGrid from '../sections/CollectionGrid';
import { ArrowLeft } from 'lucide-react';
import styles from './CategoryPage.module.css';

const CategoryPage = ({ categoryId, categoryName, products, header, footer, baseUrl = "" }) => {
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
