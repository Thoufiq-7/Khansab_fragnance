import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import Footer from './Footer';
import { OrderDrawer } from '../cart/OrderDrawer';

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink selection:bg-gold-300 selection:text-ink relative">
      <Header onCartOpen={() => setIsCartOpen(true)} />

      <main className="flex-1 pt-16 md:pt-20 pb-16 md:pb-0">
        <Outlet context={{ openCart: () => setIsCartOpen(true) }} />
      </main>

      <Footer />

      <BottomNav onCartOpen={() => setIsCartOpen(true)} />

      <OrderDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
