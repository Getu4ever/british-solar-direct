'use client';

import { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type AddToCartProduct = Pick<CartItem, 'slug' | 'name' | 'price' | 'image'>;

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: AddToCartProduct) => void;
  updateQuantity: (slug: string, delta: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalVat: number;
  totalIncVat: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = 'bsd-cart';
const CART_EVENT = 'bsd-cart-change';

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CART_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CART_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): CartItem[] {
  return loadCartFromStorage();
}

function getServerSnapshot(): CartItem[] {
  return [];
}

function persistCart(cart: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addToCart = (product: AddToCartProduct) => {
    const prev = loadCartFromStorage();
    const existing = prev.find((item) => item.slug === product.slug);
    const next = existing
      ? prev.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...prev, { ...product, quantity: 1 }];
    persistCart(next);
  };

  const removeFromCart = (slug: string) => {
    persistCart(loadCartFromStorage().filter((item) => item.slug !== slug));
  };

  const updateQuantity = (slug: string, delta: number) => {
    const next = loadCartFromStorage()
      .map((item) =>
        item.slug === slug ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
      .filter((item) => item.quantity > 0);
    persistCart(next);
  };

  const clearCart = () => persistCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) / 100;
  const totalVat = totalPrice * 0.2;
  const totalIncVat = totalPrice * 1.2;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalVat,
        totalIncVat,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
