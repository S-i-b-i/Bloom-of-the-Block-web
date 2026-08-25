import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOOKBOOK_INSTALLATIONS, LookbookItem, FALLBACK_FLORAL_IMAGE } from '../data/floristryData';
import { Maximize2, X, MapPin, Calendar, Sparkles } from 'lucide-react';

export const LookbookSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LookbookItem | null>(null);

  return (
    <section id="lookbook" className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
              [ EDITORIAL & INSTALLATIONS ]
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[var(--text-primary)] mt-1">
              SCULPTURAL ARCHIVE
            </h2>
          </div>

          <p className="text-sm text-[var(--text-secondary)] max-w-md font-mono-custom">
            Large scale botanical installations for Paris Fashion Week, museum atriums, and nightlife institutions.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOOKBOOK_INSTALLATIONS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden flex flex-col justify-between hover:border-[var(--accent-loud)] transition-all shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono-custom font-bold text-[var(--accent-acid)] uppercase">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="font-display font-black text-xl text-[var(--text-primary)] line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 border-t border-[var(--border-color)] space-y-3">
                <p className="text-xs text-[var(--text-secondary)] italic font-serif">
                  "{item.quote}"
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono-custom text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)]">
                  <span>{item.category.toUpperCase()}</span>
                  <span>{item.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[var(--accent-loud)] transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:col-span-8 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }}
                  className="w-full h-full object-cover max-h-[75vh]"
                />
              </div>

              <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-[var(--accent-loud)] text-white text-[10px] font-mono-custom font-bold uppercase">
                    {selectedItem.category}
                  </span>

                  <h3 className="font-display font-black text-2xl text-[var(--text-primary)]">
                    {selectedItem.title}
                  </h3>

                  <div className="space-y-2 font-mono-custom text-xs text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--accent-acid)]" />
                      <span>{selectedItem.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[var(--accent-electric)]" />
                      <span>COMMISSION YEAR: {selectedItem.year}</span>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] italic border-l-2 border-[var(--accent-loud)] pl-3 py-1 font-serif">
                    "{selectedItem.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-color)]">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      const contactElem = document.getElementById('footer');
                      contactElem?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--accent-loud)] hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>INQUIRE FOR CUSTOM INSTALLATION</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
