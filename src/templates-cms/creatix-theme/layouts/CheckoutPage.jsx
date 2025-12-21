import React from 'react';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';
import styles from './CheckoutPage.module.css';

const CheckoutPage = ({ items, total }) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <a href="/" className={styles.logo}>CREATIX</a>
          <div className={styles.secure}>
            <ShieldCheck size={18} />
            <span>Secure Checkout</span>
          </div>
        </header>

        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Account Information</h2>
              <div className={styles.field}>
                <label className={styles.label}>Email Address</label>
                <input type="email" placeholder="you@example.com" className={styles.input} />
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Payment Method</h2>
              <div className={styles.paymentMethods}>
                <div className={`${styles.method} ${styles.active}`}>
                  <CreditCard size={20} />
                  <span>Credit Card</span>
                </div>
              </div>
              
              <div className={styles.cardFields}>
                <div className={styles.field}>
                  <label className={styles.label}>Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" className={styles.input} />
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Expiry</label>
                    <input type="text" placeholder="MM/YY" className={styles.input} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>CVC</label>
                    <input type="text" placeholder="123" className={styles.input} />
                  </div>
                </div>
              </div>
            </div>

            <button className={styles.payBtn}>
              <Lock size={18} />
              <span>Pay ${total || "0.00"}</span>
            </button>
            <p className={styles.terms}>By purchasing, you agree to our Terms of Service.</p>
          </div>

          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.itemList}>
              <div className={styles.item}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>Digital Asset Pack</span>
                  <span className={styles.itemType}>Digital Download</span>
                </div>
                <span className={styles.itemPrice}>$0.00</span>
              </div>
            </div>
            
            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>

            <div className={styles.guarantee}>
              <CheckCircle size={16} />
              <span>Instant access after payment</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const CheckCircle = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default CheckoutPage;
