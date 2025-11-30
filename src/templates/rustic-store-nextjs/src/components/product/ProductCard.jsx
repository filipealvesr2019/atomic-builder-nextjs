import { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import styles from './ProductCard.module.css'; // Importar CSS Module

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleViewDetails = () => {
    // Redirecionar para a página de detalhes do produto
    window.location.href = `/products/${product.id}`;
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleViewDetailsClick = (e) => {
    e.stopPropagation();
    window.location.href = `/products/${product.id}`;
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Imagem do Produto */}
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.productImage}
        />
        
        {/* Badge de Desconto */}
        {discountPercentage > 0 && (
          <div className={styles.discountBadge}>
            -{discountPercentage}%
          </div>
        )}

        {/* Badge de Estoque */}
        {!product.inStock && (
          <div className={styles.outOfStockBadge}>
            Esgotado
          </div>
        )}

        {/* Botões de Ação (aparecem no hover) */}
        <div className={styles.actionButtons}>
          <button
            onClick={handleToggleFavorite}
            className={`${styles.actionButton} ${isFavorite ? styles.favoriteButton : ''}`}
          >
            <Heart className={`${styles.icon} ${isFavorite ? styles.favoriteButtonActive : ''}`} />
          </button>
          <button
            onClick={handleViewDetailsClick}
            className={styles.actionButton}
          >
            <Eye className={styles.icon} />
          </button>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className={styles.infoContainer}>
        {/* Categoria */}
        <p className={styles.category}>{product.category}</p>
        
        {/* Nome do Produto */}
        <h3 className={styles.productName}>
          {product.name}
        </h3>

        {/* Avaliação */}
        {product.rating && (
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`${styles.starIcon} ${
                    i < Math.floor(product.rating)
                      ? styles.starFilled
                      : styles.starEmpty
                  }`}
                />
              ))}
            </div>
            <span className={styles.reviewsCount}>
              ({product.reviews} avaliações)
            </span>
          </div>
        )}

        {/* Preços */}
        <div className={styles.priceContainer}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </div>

        {/* Botão Adicionar ao Carrinho */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={styles.addToCartButton}
        >
          <ShoppingCart className={styles.cartIcon} />
          {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

