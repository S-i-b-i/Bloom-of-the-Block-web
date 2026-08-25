import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { HeaderNavbar } from './components/HeaderNavbar';
import { DynamicBackground } from './components/DynamicBackground';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { CatalogueSection } from './components/CatalogueSection';
import { ArrangementModal } from './components/ArrangementModal';
import { LoudBouquetBuilder } from './components/LoudBouquetBuilder';
import { LookbookSection } from './components/LookbookSection';
import { WorkshopsSection } from './components/WorkshopsSection';
import { PressReviewsSection } from './components/PressReviewsSection';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FooterSection } from './components/FooterSection';
import { Arrangement, CATALOG_ARRANGEMENTS } from './data/floristryData';
import { soundscape } from './utils/audio';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { arrangement: CATALOG_ARRANGEMENTS[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedArrangement, setSelectedArrangement] = useState<Arrangement | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Synchronize Dark / Light class on document element
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    soundscape.playChime(theme === 'dark' ? 680 : 380, 'sine', 0.2);
  };

  // Cart operations
  const handleAddToCart = (arrangement: Arrangement, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.arrangement.id === arrangement.id);
      if (existing) {
        return prev.map(item =>
          item.arrangement.id === arrangement.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { arrangement, quantity }];
    });
    setIsCartOpen(true);
    soundscape.playAddCart();
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    soundscape.playClick();
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.arrangement.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    soundscape.playRemoveCart();
    setCartItems(prev => prev.filter(item => item.arrangement.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 overflow-x-hidden">
      
      {/* Top Scroll Progress Indicator Bar */}
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent-loud)] z-50 pointer-events-none"
      />

      {/* Motion Background Layer */}
      <DynamicBackground theme={theme} />

      {/* Top Bar Header */}
      <HeaderNavbar
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="relative z-10">
        <HeroSection
          onExploreClick={() => scrollToSection('catalogue')}
          onCustomBuildClick={() => scrollToSection('builder')}
        />

        <ManifestoSection />

        <CatalogueSection
          onSelectArrangement={(arr) => setSelectedArrangement(arr)}
          onAddToCart={(arr) => handleAddToCart(arr, 1)}
        />

        <LoudBouquetBuilder
          onAddCustomToCart={(customArr) => handleAddToCart(customArr, 1)}
        />

        <LookbookSection />

        <WorkshopsSection />

        <PressReviewsSection />
      </main>

      {/* Footer */}
      <FooterSection />

      {/* Modal Detail View */}
      <ArrangementModal
        arrangement={selectedArrangement}
        onClose={() => setSelectedArrangement(null)}
        onAddToCart={(arr, qty) => handleAddToCart(arr, qty)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
