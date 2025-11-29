import { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import { categories } from '../../data/products';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, onAddToCart, onViewDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  // Filtrar e ordenar produtos
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filtrar por faixa de preço
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Ordenar produtos
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return sorted;
  }, [products, selectedCategory, sortBy, priceRange]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
  };

  return (
    <div className={styles.productGridSection}>
      <div className={styles.container}>
        {/* Cabeçalho da Seção */}
        <div className={styles.header}>
          <h2 className={styles.title}>products</h2>
          <p className={styles.subtitle}>Todos os Produtos</p>
          <div className={styles.divider}></div>
        </div>

        {/* Barra de Filtros e Controles */}
        <div className={styles.filtersBar}>
          <div className={styles.filtersContainer}>
            {/* Filtros de Categoria */}
            <div className={styles.categoryFilters}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.categoryButtonActive : ''}`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Controles de Visualização e Ordenação */}
            <div className={styles.controls}>
              {/* Botão de Filtros Avançados */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`${styles.filterToggleButton} ${styles.mobileOnly}`}
              >
                <SlidersHorizontal className={styles.icon} />
                Filtros
              </button>

              {/* Ordenação */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className={styles.sortSelect}
              >
                <option value="name">Ordenar por Nome</option>
                <option value="price-low">Menor Preço</option>
                <option value="price-high">Maior Preço</option>
                <option value="rating">Melhor Avaliação</option>
              </select>

              {/* Modo de Visualização */}
              <div className={styles.viewModeToggle}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`${styles.viewModeButton} ${viewMode === 'grid' ? styles.viewModeButtonActive : ''}`}
                >
                  <Grid className={styles.icon} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`${styles.viewModeButton} ${viewMode === 'list' ? styles.viewModeButtonActive : ''}`}
                >
                  <List className={styles.icon} />
                </button>
              </div>
            </div>
          </div>

          {/* Filtros Avançados (Mobile) */}
          {showFilters && (
            <div className={`${styles.advancedFilters} ${styles.mobileOnly}`}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  Faixa de Preço
                </label>
                <div className={styles.priceRangeInputs}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange.max)}
                    className={styles.priceInput}
                  />
                  <span>até</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => handlePriceRangeChange(priceRange.min, Number(e.target.value))}
                    className={styles.priceInput}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar de Filtros (Desktop) */}
        <div className={styles.mainContentArea}>
          <div className={`${styles.sidebar} ${styles.desktopOnly}`}>
            <div className={styles.sidebarContent}>
              <h3 className={styles.sidebarTitle}>
                <Filter className={styles.icon} />
                Filtros
              </h3>
              
              {/* Filtro de Preço */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  Faixa de Preço
                </label>
                <div className={styles.priceRangeInputs}>
                  <input
                    type="number"
                    placeholder="0"
                    value={priceRange.min}
                    onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange.max)}
                    className={styles.priceInput}
                  />
                  <span>até</span>
                  <input
                    type="number"
                    placeholder="2000"
                    value={priceRange.max}
                    onChange={(e) => handlePriceRangeChange(priceRange.min, Number(e.target.value))}
                    className={styles.priceInput}
                  />
                </div>
                <div className={styles.priceRangeDisplay}>
                  <div>R$ {priceRange.min}</div>
                  <div>R$ {priceRange.max}</div>
                </div>
              </div>

              {/* Filtros Adicionais */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  Disponibilidade
                </label>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkboxInput} defaultChecked />
                    <span className={styles.checkboxText}>Em estoque</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkboxInput} />
                    <span className={styles.checkboxText}>Esgotado</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de Produtos */}
          <div className={styles.productsArea}>
            {/* Contador de Resultados */}
            <div className={styles.resultsCount}>
              <p>
                Mostrando {filteredAndSortedProducts.length} de {products.length} produtos
              </p>
            </div>

            {/* Grid/Lista de Produtos */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className={styles.noProducts}>
                <p>Nenhum produto encontrado com os filtros selecionados.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange({ min: 0, max: 2000 });
                  }}
                  className={styles.clearFiltersButton}
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;

