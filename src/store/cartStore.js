import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Atom for cart items, persisted in localStorage
export const cartItemsAtom = atomWithStorage('atomic-cart', []);

// Atom for cart open state
export const isCartOpenAtom = atom(false);

// Derived atom for cart count
export const cartCountAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((acc, item) => acc + item.quantity, 0);
});

// Derived atom for cart total
export const cartTotalAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
});

// Action atoms
export const addToCartAtom = atom(
  null,
  (get, set, { product, quantity = 1 }) => {
    const prev = get(cartItemsAtom);
    const existing = prev.find((item) => item.id === product.id);
    
    if (existing) {
      set(cartItemsAtom, prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      set(cartItemsAtom, [...prev, { ...product, quantity }]);
    }
    set(isCartOpenAtom, true);
  }
);

export const removeFromCartAtom = atom(
  null,
  (get, set, productId) => {
    const prev = get(cartItemsAtom);
    set(cartItemsAtom, prev.filter((item) => item.id !== productId));
  }
);

export const updateQuantityAtom = atom(
  null,
  (get, set, { productId, newQuantity }) => {
    if (newQuantity <= 0) {
      // Logic to remove item can be called here or handled by the component
      const prev = get(cartItemsAtom);
      set(cartItemsAtom, prev.filter((item) => item.id !== productId));
      return;
    }
    
    const prev = get(cartItemsAtom);
    set(cartItemsAtom, prev.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  }
);

export const clearCartAtom = atom(
  null,
  (get, set) => {
    set(cartItemsAtom, []);
  }
);
