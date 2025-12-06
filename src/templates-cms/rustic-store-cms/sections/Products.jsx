import { useState, useMemo } from 'react';
import { Grid, List, Filter, ShoppingCart } from 'lucide-react';
import styles from './Products.module.css';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Handcrafted Chair',
    category: 'furniture',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop'
  },
  {
    id: 2,
    name: 'Industrial Pendant Lamp',
    category: 'lighting',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=500&fit=crop'
  },
  {
    id: 3,
    name: 'Rustic Coffee Table',
    category: 'furniture',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=500&h=500&fit=crop'
  },
  {
    id: 4,
    name: 'Ceramic Vase',
    category: 'decor',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=500&h=500&fit=crop'
  },
  {
    id: 5,
    name: 'Vintage Mirror',
    category: 'decor',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&h=500&fit=crop'
  },
  {
    id: 6,
    name: 'Leather Armchair',
    category: 'furniture',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'decor', name: 'Decor' }
];

export default function Products(props) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }, [selectedCategory, sortBy]);

  return (
    <section className={styles.productGridSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>Check out our exclusive selection</p>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.filtersBar}>
          <div className={styles.filtersContainer}>
            <div className={styles.categoryFilters}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${styles.categoryButton} ${selectedCategory === cat.id ? styles.categoryButtonActive : ''}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className={styles.controls}>
              <select 
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Lowest Price</option>
                <option value="price-high">Highest Price</option>
              </select>

              <div className={styles.viewModeToggle}>
                <button 
                  className={`${styles.viewModeButton} ${viewMode === 'grid' ? styles.viewModeButtonActive : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={`${styles.viewModeButton} ${viewMode === 'list' ? styles.viewModeButtonActive : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
              </div>
              <div className={styles.infoContainer}>
                <p className={styles.category}>{CATEGORIES.find(c => c.id === product.category)?.name}</p>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>${product.price.toFixed(2)}</span>
                </div>
                <button className={styles.addToCartButton}>
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Products.cmsConfig = {
  name: "Product List",
  props: {
    title: { type: 'string', label: 'Title' }
  }
};
