import { useState, useEffect } from 'react';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carregar carrinho do localStorage ao inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('rusticstore-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('rusticstore-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Adicionar produto ao carrinho
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Se o produto já existe, aumenta a quantidade
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Se é um produto novo, adiciona ao carrinho
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remover produto do carrinho
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Atualizar quantidade de um produto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular total de itens no carrinho
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calcular subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calcular frete (simulado)
  const getShipping = () => {
    const subtotal = getSubtotal();
    return subtotal >= 299 ? 0 : 29.90; // Frete grátis acima de R$ 299
  };

  // Calcular total final
  const getTotal = () => {
    return getSubtotal() + getShipping();
  };

  // Verificar se um produto está no carrinho
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Obter quantidade de um produto específico no carrinho
  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Abrir/fechar carrinho
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return {
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
    isInCart,
    getItemQuantity,
    toggleCart,
    openCart,
    closeCart
  };
};

export default useCart;
