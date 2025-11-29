'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './create.module.css';

export default function CreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      const page = await res.json();
      router.push(`/admin/editor/${page._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    // Auto-generate slug from title if slug hasn't been manually edited
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === '' || prev.slug === slug ? slug : prev.slug,
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nova Página</h1>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Título</label>
          <input
            type="text"
            className={styles.input}
            value={formData.title}
            onChange={handleTitleChange}
            required
            placeholder="Minha Página Incrível"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Slug (URL)</label>
          <input
            type="text"
            className={styles.input}
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            placeholder="minha-pagina-incrivel"
          />
        </div>

        <div className={styles.actions}>
          <Link href="/admin/pages" className={`${styles.button} ${styles.cancel}`}>
            Cancelar
          </Link>
          <button
            type="submit"
            className={`${styles.button} ${styles.submit}`}
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar e Editar'}
          </button>
        </div>
      </form>
    </div>
  );
}
