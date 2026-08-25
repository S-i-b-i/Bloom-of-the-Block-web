import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Arrangement, FALLBACK_FLORAL_IMAGE } from '../data/floristryData';
import { X, ShoppingBag, ShieldCheck, Clock, Layers, Sparkles } from 'lucide-react';

interface ArrangementModalProps {
  arrangement: Arrangement | null;
  onClose: () => void;
  onAddToCart: (arrangement: Arrangement, quantity: number) => void;
}

export const ArrangementModal: React.FC<ArrangementModalProps> = ({
  arrangement,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<'main' | 'alt'>('main');

  if (!arrangement) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-[var(--accent-loud)] transition-colors border border-white/20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image Gallery */}
          <div className="md:col-span-6 bg-[var(--bg-secondary)] relative flex flex-col justify-between">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={activeImage === 'main' ? arrangement.image : arrangement.hoverImage}
                alt={arrangement.name}
                onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
            </div>

            {/* Thumbnail selector */}
            <div className="p-4 flex items-center gap-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
              <button
                onClick={() => setActiveImage('main')}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === 'main' ? 'border-[var(--accent-loud)] scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={arrangement.image} alt="Main view" onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }} className="w-full h-full object-cover" />
              </button>

              <button
                onClick={() => setActiveImage('alt')}
                className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === 'alt' ? 'border-[var(--accent-loud)] scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={arrangement.hoverImage} alt="Alternate view" onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }} className="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          {/* Right: Details & Order Controls */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[var(--accent-loud)] text-white text-[10px] font-mono-custom font-bold uppercase tracking-wider">
                  {arrangement.category}
                </span>
                <span className="font-mono-custom text-xs text-[var(--text-muted)]">
                  REF: {arrangement.id.toUpperCase()}
                </span>
              </div>

              <div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)]">
                  {arrangement.name}
                </h2>
                <p className="text-sm font-medium text-[var(--accent-acid)] mt-1">
                  {arrangement.subtitle}
                </p>
              </div>

              <div className="font-mono-custom font-black text-3xl text-[var(--text-primary)]">
                ${arrangement.price * quantity}
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {arrangement.vibeDescription}
              </p>

              {/* Stem Architecture Breakdown */}
              <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-2 text-xs font-mono-custom font-bold text-[var(--text-primary)] uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-[var(--accent-loud)]" />
                  <span>BOTANICAL STEM BREAKDOWN</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {arrangement.stems.map((stem, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]"
                    >
                      {stem}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-1">
                  <div className="text-[10px] font-mono-custom text-[var(--text-muted)] uppercase">DIMENSIONS</div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">{arrangement.dimensions}</div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-1">
                  <div className="text-[10px] font-mono-custom text-[var(--text-muted)] uppercase">VASE PERFORMANCE</div>
                  <div className="text-xs font-bold text-[var(--accent-acid)]">10-14 DAYS GUARANTEED</div>
                </div>
              </div>

              {/* Care Tips */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] flex items-start gap-3">
                <Clock className="w-4 h-4 text-[var(--accent-loud)] shrink-0 mt-0.5" />
                <span>{arrangement.careGuide}</span>
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div className="space-y-4 pt-4 border-t border-[var(--border-color)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-custom font-bold text-[var(--text-primary)] uppercase tracking-wider">
                  QUANTITY
                </span>
                <div className="flex items-center border border-[var(--border-color)] rounded-xl overflow-hidden bg-[var(--bg-secondary)]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--accent-loud)] hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono-custom font-bold text-[var(--text-primary)]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--accent-loud)] hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  onAddToCart(arrangement, quantity);
                  onClose();
                }}
                className="w-full py-4 rounded-xl bg-[var(--accent-loud)] text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_0_20px_rgba(255,42,95,0.4)]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG — ${arrangement.price * quantity}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
