'use client';

import React, { useState, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { addToCartAtom } from '@/store/cartStore';
import { ShoppingBag } from 'lucide-react';
import styles from './ProductListRenderer.module.css';

export default function ProductListRenderer({ settings }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useSetAtom(addToCartAtom);
  
  const { 
    limit = 8, 
    columns = 4, 
    gap = '20px',
    showPrice = true, // 'true' | 'false'
    showButton = true
  } = settings || {};

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          // Filter only active products if needed, or sort
          setProducts(data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <div className={styles.loadingState}>Loading products...</div>;
  }

  if (products.length === 0) {
     return <div className={styles.emptyState}>No products found.</div>;
  }

  // Grid Style
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap
  };

  return (
    <div style={gridStyle} className={styles.productGrid}>
      {products.slice(0, Number(limit)).map(product => (
        <div key={product._id} className={styles.productCard}>
          <div className={styles.imageContainer}>
             {product.images && product.images[0] ? (
                 <img src={product.images[0]} alt={product.name} className={styles.productImage} />
             ) : (
                 <div className={styles.imagePlaceholder}>
                     <ShoppingBag size={32} />
                 </div>
             )}
          </div>
          
          <div className={styles.productInfo}>
             <h3 className={styles.productName}>{product.name}</h3>
             
             {showPrice !== 'false' && (
                 <p className={styles.productPrice}>
                     R$ {product.price?.toFixed(2)}
                 </p>
             )}

             {showButton !== 'false' && (
                 <button 
                    onClick={() => addToCart({ id: product._id, ...product })}
                    className={styles.addToCartButton}
                 >
                    <ShoppingBag size={14} />
                    Add to Cart
                 </button>
             )}
          </div>
        </div>
      ))}
    </div>
  );
}
