import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { Download, Package, History, Settings } from 'lucide-react';
import styles from './CustomerAreaPage.module.css';

const CustomerAreaPage = ({ user, purchases, header, footer }) => {
  return (
    <div className={styles.page}>
      <Header {...header} />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Hello, Designer</h1>
            <p className={styles.subtitle}>Manage your digital assets and account settings.</p>
          </div>

          <div className={styles.grid}>
            <aside className={styles.sidebar}>
              <nav className={styles.nav}>
                <a href="#my-products" className={`${styles.navItem} ${styles.active}`}>
                  <Package size={20} />
                  <span>My Products</span>
                </a>
                <a href="#history" className={styles.navItem}>
                  <History size={20} />
                  <span>Purchase History</span>
                </a>
                <a href="#settings" className={styles.navItem}>
                  <Settings size={20} />
                  <span>Settings</span>
                </a>
              </nav>
            </aside>

            <div className={styles.content}>
              <section id="my-products" className={styles.section}>
                <h2 className={styles.sectionTitle}>My Products</h2>
                <div className={styles.productGrid}>
                  <div className={styles.productCard}>
                    <div className={styles.productIcon}>
                      <Package size={32} />
                    </div>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>Creatix Pro UI Kit</h3>
                      <p className={styles.productMeta}>v1.2.0 • Updated 2 days ago</p>
                    </div>
                    <button className={styles.downloadBtn}>
                      <Download size={18} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer {...footer} />
    </div>
  );
};

export default CustomerAreaPage;
