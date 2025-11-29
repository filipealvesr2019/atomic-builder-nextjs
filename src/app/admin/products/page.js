'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash } from 'lucide-react';
import styles from './products.module.css';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className={styles.header}>
        <h1>Produtos</h1>
        <Link href="/admin/products/create" className={styles.createButton}>
          <Plus size={20} />
          Novo Produto
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>SKU</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.sku || '-'}</td>
                <td>R$ {product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <span className={`${styles.status} ${styles[product.status]}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <Link href={`/admin/products/edit/${product._id}`} className={styles.actionButton}>
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className={`${styles.actionButton} ${styles.delete}`}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
