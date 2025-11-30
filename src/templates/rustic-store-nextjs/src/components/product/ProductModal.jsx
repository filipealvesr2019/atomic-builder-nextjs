import { useState, useEffect } from 'react';
import { X, ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import styles from './ProductModal.module.css'; // Importar CSS Module

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayVisible : ''}`} onClick={onClose}>
      <div className={`${styles.modalContent} ${isOpen ? styles.modalContentVisible : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.modalBody}>
          {/* Imagem do Produto */}
          <div className={styles.imageContainer}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
          </div>

          {/* Detalhes do Produto */}
          <div className={styles.detailsContainer}>
            <p className={styles.category}>{product.category}</p>
            <h2 className={styles.productName}>{product.name}</h2>

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

            <p className={styles.price}>R$ {product.price.toFixed(2).replace('.', ',')}</p>
            <p className={styles.description}>{product.description}</p>

            {/* Controle de Quantidade */}
            <div className={styles.quantityControl}>
              <label htmlFor="quantity" className={styles.quantityLabel}>Quantidade:</label>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className={styles.quantityInput}
                min="1"
              />
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity(prev => prev + 1)}
              >
                <Plus size={16} />
              </button>
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
      </div>
    </div>
  );
};

export default ProductModal;
