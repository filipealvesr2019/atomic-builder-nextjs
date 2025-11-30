'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react'
import { products } from '../../../data/products'
import useCart from '../../../hooks/useCart'
import styles from '../../page.module.css'
import productStyles from '../../../components/product/ProductCard.module.css'

export default function ProductDetail() {
  const params = useParams()
  const productId = parseInt(params.id)
  const [product, setProduct] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)

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

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId)
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      console.log(`${product.name} adicionado ao carrinho!`)
    }
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleCheckout = () => {
    alert('Redirecionando para o checkout...')
    closeCart()
  }

  if (!product) {
    return (
      <div className={styles.appContainer}>
        <Header />
        <main style={{ padding: '4rem 0', textAlign: 'center' }}>
          <p>Produto não encontrado.</p>
        </main>
        <Footer />
      </div>
    )
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className={styles.appContainer}>
      <Header
        cartItemsCount={getTotalItems()}
        onCartClick={toggleCart}
      />

      <main>
        <section className={styles.sectionWhite} style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          <div className={styles.container}>
            {/* Botão Voltar */}
            <button
              onClick={() => window.history.back()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                color: '#374151'
              }}
            >
              <ArrowLeft style={{ height: '1rem', width: '1rem' }} />
              Voltar
            </button>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'start'
            }}>
              {/* Imagem do Produto */}
              <div style={{ position: 'relative' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '500px',
                    objectFit: 'cover',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />

                {/* Badge de Desconto */}
                {discountPercentage > 0 && (
                  <div className={productStyles.discountBadge}>
                    -{discountPercentage}%
                  </div>
                )}

                {/* Badge de Estoque */}
                {!product.inStock && (
                  <div className={productStyles.outOfStockBadge}>
                    Esgotado
                  </div>
                )}

                {/* Botão Favoritar */}
                <button
                  onClick={handleToggleFavorite}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '3rem',
                    height: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Heart
                    style={{
                      height: '1.5rem',
                      width: '1.5rem',
                      color: isFavorite ? '#ef4444' : '#6b7280',
                      fill: isFavorite ? '#ef4444' : 'none'
                    }}
                  />
                </button>
              </div>

              {/* Informações do Produto */}
              <div>
                {/* Categoria */}
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {product.category}
                </p>

                {/* Nome do Produto */}
                <h1 style={{
                  fontSize: '2.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  {product.name}
                </h1>

                {/* Avaliação */}
                {product.rating && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          style={{
                            height: '1.25rem',
                            width: '1.25rem',
                            color: i < Math.floor(product.rating) ? '#facc15' : '#d1d5db',
                            fill: i < Math.floor(product.rating) ? 'currentColor' : 'none'
                          }}
                        />
                      ))}
                    </div>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginLeft: '0.5rem'
                    }}>
                      ({product.reviews} avaliações)
                    </span>
                  </div>
                )}

                {/* Preços */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <span style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && (
                    <span style={{
                      fontSize: '1.125rem',
                      color: '#6b7280',
                      textDecoration: 'line-through',
                      marginLeft: '1rem'
                    }}>
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>

                {/* Descrição */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    Descrição
                  </h3>
                  <p style={{
                    color: '#4b5563',
                    lineHeight: '1.7'
                  }}>
                    {product.description || 'Descrição detalhada do produto não disponível.'}
                  </p>
                </div>

                {/* Controles de Quantidade e Adicionar ao Carrinho */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem'
                  }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{
                        padding: '0.5rem 1rem',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        color: '#6b7280'
                      }}
                    >
                      -
                    </button>
                    <span style={{
                      padding: '0.5rem 1rem',
                      minWidth: '3rem',
                      textAlign: 'center'
                    }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{
                        padding: '0.5rem 1rem',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        color: '#6b7280'
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    style={{
                      flex: 1,
                      backgroundColor: product.inStock ? '#ea580c' : '#d1d5db',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontWeight: '600',
                      cursor: product.inStock ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <ShoppingCart style={{ height: '1.25rem', width: '1.25rem' }} />
                    {product.inStock ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}
                  </button>
                </div>

                {/* Informações Adicionais */}
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    Informações do Produto
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    <li style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      ✓ Frete grátis para compras acima de R$ 299
                    </li>
                    <li style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      ✓ 1 ano de garantia
                    </li>
                    <li style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      ✓ 30 dias para troca
                    </li>
                    <li style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      ✓ Atendimento personalizado
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}