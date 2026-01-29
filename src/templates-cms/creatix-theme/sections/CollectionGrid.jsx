import React from 'react';
import { ShoppingBag } from 'lucide-react';
import styles from './CollectionGrid.module.css';

const CollectionGrid = ({ products, baseUrl = "" }) => {
    return (
        <div className={styles.grid}>
            {products?.map((product, index) => (
                <div key={index} className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
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
                        <a href={`${baseUrl}/product/${product.id}`} className={styles.detailLink}>
                            Details and preview
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CollectionGrid;
