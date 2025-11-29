'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash } from 'lucide-react';
import styles from './pages.module.css';

export default function PagesList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages');
      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch (error) {
      console.error('Failed to fetch pages', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta página?')) return;

    try {
      const res = await fetch(`/api/pages/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPages(pages.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete page', error);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className={styles.header}>
        <h1>Páginas</h1>
        <Link href="/admin/pages/create" className={styles.createButton}>
          <Plus size={20} />
          Nova Página
        </Link>
      </div>

      <div className={styles.grid}>
        {pages.map((page) => (
          <div key={page._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{page.title}</h3>
              <span className={`${styles.status} ${styles[page.status]}`}>
                {page.status}
              </span>
            </div>
            <p className={styles.slug}>{page.slug}</p>
            <div className={styles.actions}>
              <Link href={`/admin/editor/${page._id}`} className={styles.actionButton}>
                <Edit size={18} />
                Editar
              </Link>
              <button
                onClick={() => handleDelete(page._id)}
                className={`${styles.actionButton} ${styles.delete}`}
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
