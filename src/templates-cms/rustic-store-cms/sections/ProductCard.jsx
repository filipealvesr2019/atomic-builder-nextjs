import { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Fallback for product properties if not provided
  const {
    name = "Produto Sem Nome",
    price = 0,
    originalPrice,
    image = "https://via.placeholder.com/300",
    category = "Geral",
    rating = 0,
    reviews = 0,
    inStock = true
  } = product || {};

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className={styles.productCard}>
      {/* Imagem do Produto */}
      <div className={styles.imageContainer}>
        <img
          src={image}
          alt={name}
          className={styles.productImage}
        />
        
        {/* Badge de Desconto */}
        {discountPercentage > 0 && (
          <div className={styles.discountBadge}>
            -{discountPercentage}%
          </div>
        )}

        {/* Badge de Estoque */}
        {!inStock && (
          <div className={styles.outOfStockBadge}>
            Esgotado
          </div>
        )}

        {/* Botões de Ação (aparecem no hover) */}
        <div className={styles.actionButtons}>
          <button
            onClick={handleToggleFavorite}
            className={styles.actionButton}
            aria-label="Favoritar"
          >
            <Heart className={`${styles.icon} ${isFavorite ? styles.favoriteButtonActive : ''}`} size={20} />
          </button>
          <button
            className={styles.actionButton}
            aria-label="Ver Detalhes"
          >
            <Eye className={styles.icon} size={20} />
          </button>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className={styles.infoContainer}>
        {/* Categoria */}
        <p className={styles.category}>{category}</p>
        
        {/* Nome do Produto */}
        <h3 className={styles.productName}>
          {name}
        </h3>

        {/* Avaliação */}
        {rating > 0 && (
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`${styles.starIcon} ${
                    i < Math.floor(rating)
                      ? styles.starFilled
                      : styles.starEmpty
                  }`}
                  size={16}
                />
              ))}
            </div>
            <span className={styles.reviewsCount}>
              ({reviews})
            </span>
          </div>
        )}

        {/* Preços */}
        <div className={styles.priceContainer}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
            {originalPrice && (
              <span className={styles.originalPrice}>
                R$ {originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </div>

        {/* Botão Adicionar ao Carrinho */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={styles.addToCartButton}
        >
          <ShoppingCart className={styles.cartIcon} size={16} />
          {inStock ? 'Adicionar' : 'Esgotado'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
