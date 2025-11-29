'use client'

import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import ProductGrid from '../../components/product/ProductGrid'
import ProductModal from '../../components/product/ProductModal'
import CartSidebar from '../../components/cart/CartSidebar'
import useCart from '../../hooks/useCart'
import { products } from '../../data/products'
import styles from '../page.module.css'

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  const {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    getShipping,
    getTotal,
    toggleCart,
    closeCart
  } = useCart()

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity)
    console.log(`${product.name} adicionado ao carrinho!`)
  }

  const handleViewDetails = (product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
  }

  const handleCheckout = () => {
    alert('Redirecionando para o checkout...')
    closeCart()
  }

  return (
    <div className={styles.appContainer}>
      <Header
        cartItemsCount={getTotalItems()}
        onCartClick={toggleCart}
      />

      <main>
        <section className={styles.sectionWhite}>
          <ProductGrid
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        </section>
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        subtotal={getSubtotal()}
        shipping={getShipping()}
        total={getTotal()}
        onCheckout={handleCheckout}
      />
    </div>
  )
}