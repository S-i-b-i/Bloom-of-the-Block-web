import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Arrangement, CATALOG_ARRANGEMENTS, FALLBACK_FLORAL_IMAGE } from '../data/floristryData';
import { ShoppingBag, Eye, Layers } from 'lucide-react';
import { soundscape } from '../utils/audio';

interface CatalogueSectionProps {
  onSelectArrangement: (arrangement: Arrangement) => void;
  onAddToCart: (arrangement: Arrangement) => void;
}

const CATEGORIES = ['ALL', 'Acid & Neon', 'Sculptural', 'Monochrome Raw', 'Ceiling Suspensions', 'Wearables'];

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
  onSelectArrangement,
  onAddToCart
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredArrangements = activeCategory === 'ALL'
    ? CATALOG_ARRANGEMENTS
    : CATALOG_ARRANGEMENTS.filter(item => item.category === activeCategory);

  return (
    <section id="catalogue" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <span className="text-xs font-mono-custom font-bold uppercase tracking-[0.3em] text-[var(--accent-loud)]">
            [ DROP #04 — SEASONAL COLLECTION ]
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[var(--text-primary)] mt-1">
            SCULPTURAL ARRANGEMENTS
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => {
                soundscape.playClick();
                setActiveCategory(category);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono-custom font-semibold tracking-wider transition-all whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-[var(--accent-loud)] text-white shadow-md'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid of Arrangements */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredArrangements.map((arrangement, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
              key={arrangement.id}
              className="group rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden flex flex-col justify-between hover:border-[var(--accent-loud)] transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {/* Image Container with Hover Crossfade */}
              <div
                onClick={() => onSelectArrangement(arrangement)}
                className="relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <img
                  src={arrangement.image}
                  alt={arrangement.name}
                  onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Secondary hover image overlay */}
                <img
                  src={arrangement.hoverImage}
                  alt={arrangement.name}
                  onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }}
                  className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Badge Tag */}
                {arrangement.tag && (
                  <span
                    style={{ backgroundColor: arrangement.badgeColor || '#ff2a5f' }}
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono-custom font-bold text-white uppercase tracking-wider shadow-sm"
                  >
                    {arrangement.tag}
                  </span>
                )}

                {/* Dimensions pill */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono-custom text-white uppercase tracking-wider border border-white/10">
                  {arrangement.dimensions}
                </span>

                {/* Hover Quick Action Buttons */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectArrangement(arrangement);
                    }}
                    className="flex-1 py-2.5 rounded-full bg-[var(--bg-primary)]/90 backdrop-blur-md text-[var(--text-primary)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--accent-loud)] hover:text-white transition-colors flex items-center justify-center gap-2 border border-[var(--border-color)]"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>VIEW DETAILS</span>
                  </button>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-custom font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      {arrangement.category}
                    </span>
                    <span className="font-mono-custom font-black text-lg text-[var(--accent-loud)]">
                      ${arrangement.price}
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectArrangement(arrangement)}
                    className="font-display font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-loud)] transition-colors cursor-pointer line-clamp-1"
                  >
                    {arrangement.name}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                    {arrangement.subtitle}
                  </p>
                </div>

                {/* Stems tags preview */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {arrangement.stems.slice(0, 2).map((stem, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[10px] font-mono-custom text-[var(--text-secondary)] border border-[var(--border-color)]"
                    >
                      {stem.split('(')[0]}
                    </span>
                  ))}
                  {arrangement.stems.length > 2 && (
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[10px] font-mono-custom text-[var(--text-muted)] border border-[var(--border-color)]">
                      +{arrangement.stems.length - 2} stems
                    </span>
                  )}
                </div>

                {/* Add to Cart Quick Trigger */}
                <button
                  onClick={() => onAddToCart(arrangement)}
                  className="w-full py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--accent-loud)] hover:text-white hover:border-[var(--accent-loud)] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG — ${arrangement.price}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
