'use client';

import { useRouter } from 'next/navigation';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import styles from './CartSidebar.module.css';

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  subtotal,
  shipping,
  total,
  onCheckout
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    setTimeout(() => {
      router.push('/checkout');
    }, 300);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`${styles.cartSidebar} ${isOpen ? styles.cartSidebarOpen : ''}`}>
        <div className={styles.flexColFullHeight}>
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>
              <ShoppingBag style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
              Carrinho ({cartItems.length})
            </h2>
            <button className={styles.closeButton} onClick={onClose}>
              <X style={{ width: '1.5rem', height: '1.5rem' }} />
            </button>
          </div>

          {/* Cart Items */}
          <div className={styles.cartItemsList}>
            {cartItems.length === 0 ? (
              <div className={styles.emptyCart}>
                <ShoppingBag style={{ width: '4rem', height: '4rem' }} className={styles.emptyCartIcon} />
                <p className={styles.emptyCartText}>Seu carrinho está vazio</p>
                <button onClick={onClose} className={styles.continueShoppingButton}>
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <div className={styles.spaceY4}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    {/* Imagem do Produto */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImage}
                    />

                    {/* Informações do Produto */}
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>
                        {item.name}
                      </h3>
                      <p className={styles.itemPrice}>{item.category}</p>
                      <p className={styles.itemPrice}>
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>

                    {/* Controles de Quantidade */}
                    <div className={styles.quantityControls}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus style={{ width: '1rem', height: '1rem' }} />
                      </button>
                      <span className={styles.quantityInput}>
                        {item.quantity}
                      </span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus style={{ width: '1rem', height: '1rem' }} />
                      </button>
                      {/* Botão Remover */}
                      <button
                        className={styles.removeButton}
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 style={{ width: '1rem', height: '1rem' }} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Botão Limpar Carrinho */}
                {cartItems.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className={styles.clearCartButton}
                  >
                    <Trash2 style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                    Limpar Carrinho
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer com Totais e Checkout */}
          {cartItems.length > 0 && (
            <div className={styles.cartSummary}>
              {/* Resumo dos Valores */}
              <div className={styles.spaceY2}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Subtotal:</span>
                  <span className={styles.summaryValue}>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Frete:</span>
                  <span className={`${styles.summaryValue} ${shipping === 0 ? styles.freeShipping : ''}`}>
                    {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className={styles.freeShippingMessage}>
                    🎉 Você ganhou frete grátis!
                  </p>
                )}
                <div className={styles.totalRowContainer}>
                  <div className={styles.totalRow}>
                    <span>Total:</span>
                    <span className={styles.totalValue}>
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className={styles.spaceY2}>
                <button
                  onClick={handleCheckout}
                  className={styles.checkoutButton}
                >
                  Finalizar Compra
                </button>
                <button
                  onClick={onClose}
                  className={styles.continueShoppingButtonSecondary}
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;