'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/components/builder/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function ProductListRenderer({ settings }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
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
    return <div className="p-10 text-center text-gray-500">Loading products...</div>;
  }

  if (products.length === 0) {
     return <div className="p-10 text-center text-gray-500 bg-gray-50 border border-dashed rounded">No products found.</div>;
  }

  // Grid Style
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gap
  };

  return (
    <div style={gridStyle}>
      {products.slice(0, Number(limit)).map(product => (
        <div key={product._id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative aspect-square bg-gray-100 overflow-hidden">
             {product.images && product.images[0] ? (
                 <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
             ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-300">
                     <ShoppingBag size={32} />
                 </div>
             )}
          </div>
          
          <div className="p-4">
             <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
             
             {showPrice !== 'false' && (
                 <p className="text-blue-600 font-bold mb-3">
                     R$ {product.price?.toFixed(2)}
                 </p>
             )}

             {showButton !== 'false' && (
                 <button 
                    onClick={() => addToCart({ id: product._id, ...product })}
                    className="w-full py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-black transition-colors flex items-center justify-center gap-2"
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
