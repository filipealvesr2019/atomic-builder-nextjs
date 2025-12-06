'use client';

import React from 'react';
import { useCart } from '@/components/builder/context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function ShopCart() {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    cartTotal,
    clearCart 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 transform transition-transform flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag size={20} />
            Shopping Cart ({cartItems.length})
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p>Your cart is empty.</p>
              <button 
                onClick={closeCart}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                {/* Image */}
                {item.images && item.images[0] && (
                  <div className="w-20 h-20 bg-white rounded overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-blue-600 font-bold">
                        R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-white border border-gray-200 rounded">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 text-gray-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 text-gray-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 p-1 hover:bg-red-50 rounded hover:text-red-600"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span>R$ {cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <button 
                    onClick={clearCart}
                    className="py-3 px-4 border border-gray-300 rounded font-medium text-gray-700 hover:bg-white transition-colors text-center"
                >
                    Clear Cart
                </button>
                <button 
                    // onClick={handleCheckout} 
                    className="py-3 px-4 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-center"
                >
                    Checkout
                </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
