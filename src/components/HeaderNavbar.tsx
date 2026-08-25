import React, { useState, useEffect } from 'react';
import { ShoppingBag, Volume2, VolumeX, Sun, Moon, Menu, X } from 'lucide-react';
import { soundscape } from '../utils/audio';

interface HeaderNavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  cartCount: number;
  openCart: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  theme,
  toggleTheme,
  cartCount,
  openCart
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [showSoundToast, setShowSoundToast] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const newState = soundscape.toggleSound();
    setIsAudioActive(newState);
    const toastMsg = newState ? 'AUDIO SOUNDSCAPE: ENABLED' : 'AUDIO SOUNDSCAPE: MUTED';
    setShowSoundToast(toastMsg);
    setTimeout(() => {
      setShowSoundToast(null);
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    soundscape.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[var(--bg-primary)]/85 backdrop-blur-md border-b border-[var(--border-color)] shadow-xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Brand Title */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left group"
          aria-label="Bloom of the Block Homepage"
        >
          <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-[var(--text-primary)] group-hover:text-[var(--accent-loud)] transition-colors whitespace-nowrap">
            BLOOM OF THE BLOCK
          </span>
        </button>

        {/* Zone 2: Nav Links - 4-5 short links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide">
          <button
            onClick={() => scrollToSection('catalogue')}
            className="hover:text-[var(--accent-loud)] transition-colors whitespace-nowrap uppercase text-xs tracking-widest font-mono-custom"
          >
            Catalogue
          </button>
          <button
            onClick={() => scrollToSection('builder')}
            className="hover:text-[var(--accent-loud)] transition-colors whitespace-nowrap uppercase text-xs tracking-widest font-mono-custom"
          >
            Build Bouquet
          </button>
          <button
            onClick={() => scrollToSection('manifesto')}
            className="hover:text-[var(--accent-loud)] transition-colors whitespace-nowrap uppercase text-xs tracking-widest font-mono-custom"
          >
            Manifesto
          </button>
          <button
            onClick={() => scrollToSection('workshops')}
            className="hover:text-[var(--accent-loud)] transition-colors whitespace-nowrap uppercase text-xs tracking-widest font-mono-custom"
          >
            Workshops
          </button>
          <button
            onClick={() => scrollToSection('lookbook')}
            className="hover:text-[var(--accent-loud)] transition-colors whitespace-nowrap uppercase text-xs tracking-widest font-mono-custom"
          >
            Installations
          </button>
        </nav>

        {/* Zone 3: Actions - Sound, Theme, Cart */}
        <div className="flex items-center gap-2 sm:gap-3 relative">
          
          {/* Sound Toast Badge Banner */}
          {showSoundToast && (
            <div className="absolute top-12 right-0 bg-[var(--bg-card)] border border-[var(--accent-loud)] text-[var(--accent-loud)] font-mono-custom text-[10px] font-bold px-3 py-1.5 rounded-full shadow-2xl whitespace-nowrap animate-in fade-in slide-in-from-top-2 duration-200 z-50 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-loud)] animate-ping" />
              {showSoundToast}
            </div>
          )}

          {/* Soundscape Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-full border border-[var(--border-color)] transition-all ${
              isAudioActive
                ? 'bg-[var(--accent-loud)] text-white border-[var(--accent-loud)] shadow-[0_0_12px_rgba(255,42,95,0.5)]'
                : 'hover:bg-[var(--bg-card)] text-[var(--text-secondary)]'
            }`}
            title={isAudioActive ? 'Mute ambient soundscape' : 'Enable ambient soundscape'}
            aria-label="Toggle soundscape"
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              soundscape.playClick();
              toggleTheme();
            }}
            className="p-2 rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] transition-all"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => {
              soundscape.playClick();
              openCart();
            }}
            className="relative px-3 sm:px-4 py-2 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[var(--accent-loud)] hover:text-white transition-all shadow-md shrink-0 whitespace-nowrap"
            aria-label={`Open Cart (${cartCount} items)`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">BAG</span>
            <span className="w-5 h-5 rounded-full bg-[var(--accent-loud)] text-white text-[11px] font-mono-custom flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => scrollToSection('catalogue')}
            className="block w-full text-left py-2 font-display text-lg font-bold hover:text-[var(--accent-loud)]"
          >
            CATALOGUE
          </button>
          <button
            onClick={() => scrollToSection('builder')}
            className="block w-full text-left py-2 font-display text-lg font-bold hover:text-[var(--accent-loud)]"
          >
            BUILD BOUQUET
          </button>
          <button
            onClick={() => scrollToSection('manifesto')}
            className="block w-full text-left py-2 font-display text-lg font-bold hover:text-[var(--accent-loud)]"
          >
            MANIFESTO
          </button>
          <button
            onClick={() => scrollToSection('workshops')}
            className="block w-full text-left py-2 font-display text-lg font-bold hover:text-[var(--accent-loud)]"
          >
            WORKSHOPS
          </button>
          <button
            onClick={() => scrollToSection('lookbook')}
            className="block w-full text-left py-2 font-display text-lg font-bold hover:text-[var(--accent-loud)]"
          >
            INSTALLATIONS
          </button>
        </div>
      )}
    </header>
  );
};
