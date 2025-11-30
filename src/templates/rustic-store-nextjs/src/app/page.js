
'use client'

import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/layout/HeroSection'
import ProductSlider from '../components/product/ProductSlider'
import ProductGrid from '../components/product/ProductGrid'
import ProductModal from '../components/product/ProductModal'
import CartSidebar from '../components/cart/CartSidebar'
import useCart from '../hooks/useCart'
import { products, featuredProducts } from '../data/products'
import { Home as HomeIcon, Truck, Shield, MapPin, Phone, Mail } from 'lucide-react'
import styles from './page.module.css'; // Importar CSS Module para a página

export default function Home() {
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

  const handleShopNow = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleCheckout = () => {
    closeCart()
    // O redirecionamento será feito no CartSidebar
  }

  return (
    <div className={styles.appContainer}>
      <Header
        cartItemsCount={getTotalItems()}
        onCartClick={toggleCart}
      />

      <main>
        <section id="home">
          <HeroSection onShopNow={handleShopNow} />
        </section>

        <section className={styles.sectionWhite}>
          <ProductSlider
            products={featuredProducts}
            title="Produtos em Destaque"
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        </section>

        <section id="about" className={styles.sectionGray}>
          <div className={styles.container}>
            <div className={styles.aboutContent}>
              <h2 className={styles.aboutTitle}>Sobre a RusticStore</h2>
              <div className={styles.aboutDivider}></div>
              <p className={styles.aboutDescription}>
                Somos uma loja especializada em móveis e decoração rústica artesanal. 
                Cada peça é cuidadosamente selecionada e produzida por artesãos experientes, 
                garantindo qualidade e exclusividade para transformar sua casa em um lar aconchegante.
              </p>
              <div className={styles.aboutGrid}>
                <div className={styles.aboutItem}>
                  <div className={styles.aboutIconContainer}>
                    <HomeIcon className={styles.aboutIcon} />
                  </div>
                  <h3 className={styles.aboutItemTitle}>Qualidade Artesanal</h3>
                  <p className={styles.aboutItemDescription}>Produtos únicos feitos à mão com materiais de primeira qualidade.</p>
                </div>
                <div className={styles.aboutItem}>
                  <div className={styles.aboutIconContainer}>
                    <Truck className={styles.aboutIcon} />
                  </div>
                  <h3 className={styles.aboutItemTitle}>Entrega Rápida</h3>
                  <p className={styles.aboutItemDescription}>Frete grátis para todo o Brasil em compras acima de R$ 299.</p>
                </div>
                <div className={styles.aboutItem}>
                  <div className={styles.aboutIconContainer}>
                    <Shield className={styles.aboutIcon} />
                  </div>
                  <h3 className={styles.aboutItemTitle}>Garantia Total</h3>
                  <p className={styles.aboutItemDescription}>1 ano de garantia e 30 dias para trocas sem complicações.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className={styles.sectionWhite}>
          <ProductGrid
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        </section>

        <section className={styles.newsletterSection}>
          <div className={styles.container}>
            <div className={styles.newsletterContent}>
              <h2 className={styles.newsletterTitle}>Fique por Dentro das Novidades</h2>
              <p className={styles.newsletterDescription}>
                Receba ofertas exclusivas e seja o primeiro a conhecer nossos novos produtos.
              </p>
              <div className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className={styles.newsletterInput}
                />
                <button className={styles.newsletterButton}>
                  Inscrever-se
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className={styles.sectionGray}>
          <div className={styles.container}>
            <div className={styles.contactContent}>
              <div className={styles.contactHeader}>
                <h2 className={styles.contactTitle}>Entre em Contato</h2>
                <div className={styles.contactDivider}></div>
              </div>
              
              <div className={styles.contactGrid}>
                <div className={styles.contactInfo}>
                  <h3 className={styles.contactInfoTitle}>Fale Conosco</h3>
                  <div className={styles.contactInfoList}>
                    <div className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIconContainer}>
                        <MapPin className={styles.contactInfoIcon} />
                      </div>
                      <div>
                        <p className={styles.contactInfoLabel}>Endereço</p>
                        <p className={styles.contactInfoText}>Rua das Flores, 123 - São Paulo, SP</p>
                      </div>
                    </div>
                    <div className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIconContainer}>
                        <Phone className={styles.contactInfoIcon} />
                      </div>
                      <div>
                        <p className={styles.contactInfoLabel}>Telefone</p>
                        <p className={styles.contactInfoText}>(11) 9999-9999</p>
                      </div>
                    </div>
                    <div className={styles.contactInfoItem}>
                      <div className={styles.contactInfoIconContainer}>
                        <Mail className={styles.contactInfoIcon} />
                      </div>
                      <div>
                        <p className={styles.contactInfoLabel}>E-mail</p>
                        <p className={styles.contactInfoText}>contato@rusticstore.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <form className={styles.contactForm}>
                    <div>
                      <input
                        type="text"
                        placeholder="Seu nome"
                        className={styles.contactInput}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Seu e-mail"
                        className={styles.contactInput}
                      />
                    </div>
                    <div>
                      <textarea
                        rows="5"
                        placeholder="Sua mensagem"
                        className={`${styles.contactInput} ${styles.contactTextarea}`}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className={styles.contactSubmitButton}
                    >
                      Enviar Mensagem
                    </button>
                  </form>
                </div>
              </div>
            </div>
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

