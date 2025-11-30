'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './checkout.module.css';
import useCart from '../../hooks/useCart';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const { cartItems, getSubtotal, getShipping, getTotal, clearCart } = cart;
  
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(true);

  useEffect(() => {
    if (cartItems.length === 0 && shouldRedirect) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cartItems, router, shouldRedirect]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setShouldRedirect(false);

    // Simular processamento do pedido
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Aqui você implementaria a integração com um gateway de pagamento
    alert('Pedido realizado com sucesso!');
    clearCart();
    
    // Aguarda um pouco antes de redirecionar
    setTimeout(() => {
      setShouldRedirect(true);
      router.push('/');
    }, 500);

    setIsProcessing(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.appContainer}>
        <Header cartItemsCount={0} onCartClick={() => {}} />
        <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <h2>Seu carrinho está vazio</h2>
          <p>Redirecionando para a home...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      <Header cartItemsCount={cartItems.length} onCartClick={() => {}} />
      
      <main>
        <div className={styles.checkoutContainer}>
          <div className={styles.checkoutContent}>
            <h1 className={styles.title}>Finalizar Compra</h1>

            <div className={styles.checkoutGrid}>
              {/* Formulário de Entrega e Pagamento */}
              <div className={styles.checkoutForm}>
                <form onSubmit={handleSubmit}>
                  {/* Informações Pessoais */}
                  <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Nome Completo</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>E-mail</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>Telefone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Endereço de Entrega */}
                  <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Endereço de Entrega</h2>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label htmlFor="address" className={styles.label}>Endereço</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="city" className={styles.label}>Cidade</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="state" className={styles.label}>Estado</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="zipCode" className={styles.label}>CEP</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className={styles.input}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Método de Pagamento */}
                  <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Método de Pagamento</h2>
                    <div className={styles.paymentMethods}>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit_card"
                          checked={formData.paymentMethod === 'credit_card'}
                          onChange={handleInputChange}
                        />
                        Cartão de Crédito
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="debit_card"
                          checked={formData.paymentMethod === 'debit_card'}
                          onChange={handleInputChange}
                        />
                        Cartão de Débito
                      </label>
                      <label className={styles.radioLabel}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="pix"
                          checked={formData.paymentMethod === 'pix'}
                          onChange={handleInputChange}
                        />
                        PIX
                      </label>
                    </div>

                    {(formData.paymentMethod === 'credit_card' || formData.paymentMethod === 'debit_card') && (
                      <div className={styles.cardDetails}>
                        <div className={styles.formGrid}>
                          <div className={styles.formGroup}>
                            <label htmlFor="cardNumber" className={styles.label}>Número do Cartão</label>
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className={styles.input}
                              placeholder="1234 5678 9012 3456"
                              required
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor="expiryDate" className={styles.label}>Data de Validade</label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className={styles.input}
                              placeholder="MM/AA"
                              required
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label htmlFor="cvv" className={styles.label}>CVV</label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className={styles.input}
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
                  </button>
                </form>
              </div>

              {/* Resumo do Pedido */}
              <div className={styles.orderSummary}>
                <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>

                <div className={styles.orderItems}>
                  {cartItems.map((item) => (
                    <div key={item.id} className={styles.orderItem}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.itemImage}
                      />
                      <div className={styles.itemDetails}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <p className={styles.itemCategory}>{item.category}</p>
                        <p className={styles.itemQuantity}>Quantidade: {item.quantity}</p>
                        <p className={styles.itemPrice}>
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryDetails}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Frete:</span>
                    <span className={shipping === 0 ? styles.freeShipping : ''}>
                      {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Total:</span>
                    <span className={styles.totalAmount}>
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}