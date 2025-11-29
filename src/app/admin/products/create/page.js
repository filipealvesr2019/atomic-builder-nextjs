'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CldUploadWidget } from 'next-cloudinary';
import styles from './create.module.css';

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    sku: '',
    stock: '',
    description: '',
    images: [],
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      router.push('/admin/products');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug === '' || prev.slug === slug ? slug : prev.slug,
    }));
  };

  const handleUpload = (result) => {
    if (result.event === 'success') {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, result.info.secure_url],
      }));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Novo Produto</h1>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Nome do Produto</label>
            <input
              type="text"
              className={styles.input}
              value={formData.name}
              onChange={handleNameChange}
              required
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Slug</label>
            <input
              type="text"
              className={styles.input}
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              className={styles.input}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Estoque</label>
            <input
              type="number"
              className={styles.input}
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>SKU</label>
            <input
              type="text"
              className={styles.input}
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Descrição</label>
            <textarea
              className={styles.textarea}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Imagens</label>
            <CldUploadWidget uploadPreset="nextpress_uploads" onSuccess={handleUpload}>
              {({ open }) => {
                return (
                  <button
                    type="button"
                    onClick={() => open()}
                    className={styles.button}
                    style={{ background: '#4b5563', color: 'white' }}
                  >
                    Upload Imagem
                  </button>
                );
              }}
            </CldUploadWidget>
            
            <div className={styles.imagePreview}>
              {formData.images.map((url, index) => (
                <img key={index} src={url} alt="Preview" className={styles.previewItem} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/admin/products" className={`${styles.button} ${styles.cancel}`}>
            Cancelar
          </Link>
          <button
            type="submit"
            className={`${styles.button} ${styles.submit}`}
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Produto'}
          </button>
        </div>
      </form>
    </div>
  );
}
