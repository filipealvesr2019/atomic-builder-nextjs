'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import ProductGrid from '../../../components/product/ProductGrid'
import ProductModal from '../../../components/product/ProductModal'
import CartSidebar from '../../../components/cart/CartSidebar'
import useCart from '../../../hooks/useCart'
import { products } from '../../../data/products'
import styles from '../../page.module.css'

const categoryNames = {
  'móveis': 'Móveis',
  'iluminação': 'Iluminação',
  'decoração': 'Decoração',
  'artesanato': 'Artesanato',
  'ofertas': 'Ofertas'
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category
  const categoryName = categoryNames[categorySlug] || 'Categoria'

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

  // Filtrar produtos por categoria
  const categoryProducts = useMemo(() => {
    if (categorySlug === 'ofertas') {
      // Produtos com desconto
      return products.filter(product => product.originalPrice && product.originalPrice > product.price)
    }
    return products.filter(product =>
      product.category.toLowerCase() === categorySlug.toLowerCase()
    )
  }, [categorySlug])

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
        <section className={styles.sectionWhite} style={{ paddingTop: '2rem' }}>
          <div className={styles.container}>
            {/* Cabeçalho da Categoria */}
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                {categoryName}
              </h1>
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280'
              }}>
                {categorySlug === 'ofertas'
                  ? `${categoryProducts.length} produtos com desconto encontrados`
                  : `${categoryProducts.length} produtos encontrados na categoria ${categoryName.toLowerCase()}`
                }
              </p>
            </div>

            {/* Grid de Produtos da Categoria */}
            {categoryProducts.length > 0 ? (
              <ProductGrid
                products={categoryProducts}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                margin: '2rem 0'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Nenhum produto encontrado
                </h3>
                <p style={{
                  color: '#6b7280',
                  marginBottom: '2rem'
                }}>
                  Não há produtos disponíveis nesta categoria no momento.
                </p>
                <a
                  href="/products"
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#ea580c',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    fontWeight: '600',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  Ver Todos os Produtos
                </a>
              </div>
            )}
          </div>
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