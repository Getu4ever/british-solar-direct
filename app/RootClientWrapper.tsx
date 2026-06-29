'use client';

import { useState } from 'react';
import PageTransition from "../components/PageTransition";
import { CartProvider } from "../components/CartContext";
import StickyBasket from "../components/StickyBasket";
import CartDrawer from "../components/CartDrawer";
import Header from "../components/Header";

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      {/* Pass the toggle function to Header */}
      <Header onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      
      {/* Pass the toggle function to StickyBasket */}
      <StickyBasket onOpenCart={() => setIsCartOpen(true)} />
      
      {/* The Drawer state */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartProvider>
  );
}