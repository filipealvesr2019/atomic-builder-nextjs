import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import styles from './Products.module.css';

const defaultProducts = [
  {
    id: 1,
    name: "Mesa de Madeira Rústica",
    price: 899.99,
    originalPrice: 1199.99,
    category: "Móveis",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    inStock: true,
    rating: 4.8,
    reviews: 24
  },
  {
    id: 2,
    name: "Cadeira Artesanal",
    price: 299.99,
    originalPrice: 399.99,
    category: "Móveis",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop",
    inStock: true,
    rating: 4.6,
    reviews: 18
  },
  {
    id: 3,
    name: "Luminária Pendente Industrial",
    price: 189.99,
    originalPrice: 249.99,
    category: "Iluminação",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&h=500&fit=crop",
    inStock: true,
    rating: 4.7,
    reviews: 31
  },
  {
    id: 4,
    name: "Vaso Decorativo Cerâmica",
    price: 79.99,
    originalPrice: 99.99,
    category: "Decoração",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
    inStock: false,
    rating: 4.5,
    reviews: 12
  },
  {
    id: 5,
    name: "Espelho Vintage",
    price: 349.99,
    originalPrice: 449.99,
    category: "Decoração",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    inStock: true,
    rating: 4.9,
    reviews: 8
  },
  {
    id: 6,
    name: "Tapete Artesanal",
    price: 259.99,
    originalPrice: 329.99,
    category: "Decoração",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop",
    inStock: true,
    rating: 4.4,
    reviews: 15
  },
  {
    id: 7,
    name: "Prateleira Flutuante",
    price: 149.99,
    originalPrice: 199.99,
    category: "Móveis",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    inStock: true,
    rating: 4.7,
    reviews: 22
  },
  {
    id: 8,
    name: "Abajur de Mesa Vintage",
    price: 129.99,
    originalPrice: 169.99,
    category: "Iluminação",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    inStock: true,
    rating: 4.6,
    reviews: 19
  }
];

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'moveis', name: 'Móveis' },
  { id: 'iluminacao', name: 'Iluminação' },
  { id: 'decoracao', name: 'Decoração' }
];

export default function Products({ title = "Produtos em Destaque", subtitle = "Confira nossas novidades" }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return defaultProducts;
    
    // Simple mock filtering based on string match since we hardcoded mock data
    // In a real app we'd map IDs to categories strictly
    if (selectedCategory === 'moveis') return defaultProducts.filter(p => p.category === 'Móveis');
    if (selectedCategory === 'iluminacao') return defaultProducts.filter(p => p.category === 'Iluminação');
    if (selectedCategory === 'decoracao') return defaultProducts.filter(p => p.category === 'Decoração');
    
    return defaultProducts;
  }, [selectedCategory]);

  return (
    <section className={styles.productGridSection} id="products">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.filtersBar}>
          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.categoryButtonActive : ''}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.gridContainer}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

Products.cmsConfig = {
  name: "Lista de Produtos",
  description: "Grid de produtos com filtros",
  props: {
    title: { type: 'string', label: 'Título', default: "Produtos em Destaque" },
    subtitle: { type: 'string', label: 'Subtítulo', default: "Confira nossas novidades" }
  }
};
