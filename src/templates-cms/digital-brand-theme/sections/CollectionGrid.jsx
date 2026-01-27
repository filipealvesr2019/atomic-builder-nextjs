import React from 'react';
import { Plus } from 'lucide-react';
import styles from './CollectionGrid.module.css';

const CollectionGrid = ({ products }) => {
    return (
        <div className={styles.grid}>
            {products?.map((product, index) => (
                <div key={index} className={styles.card}>
                    <a href={`/product/${product.slug}`} className={styles.imageWrapper}>
                        {product.badge && <span className={styles.badge}>{product.badge}</span>}
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.image}
                        />
                    </a>
                    <div className={styles.content}>
                        <span className={styles.category}>{product.category}</span>
                        <a href={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
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
    );
};

export default CollectionGrid;
