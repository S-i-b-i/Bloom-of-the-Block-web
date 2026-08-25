import React, { useState } from 'react';
import { motion } from 'motion/react';
import { STEM_LIBRARY, WRAPPING_OPTIONS, StemOption, Arrangement, FALLBACK_FLORAL_IMAGE } from '../data/floristryData';
import { Sparkles, Plus, Trash2, ShoppingBag, Check, Layers } from 'lucide-react';
import { triggerFloralConfetti } from '../utils/confetti';
import { soundscape } from '../utils/audio';

interface LoudBouquetBuilderProps {
  onAddCustomToCart: (customArrangement: Arrangement) => void;
}

interface SelectedStem {
  stem: StemOption;
  count: number;
}

export const LoudBouquetBuilder: React.FC<LoudBouquetBuilderProps> = ({ onAddCustomToCart }) => {
  const [selectedStems, setSelectedStems] = useState<SelectedStem[]>([
    { stem: STEM_LIBRARY[0], count: 2 }, // King Protea default
    { stem: STEM_LIBRARY[1], count: 2 }, // Acid Anthurium
    { stem: STEM_LIBRARY[2], count: 3 }  // Cobalt Delphinium
  ]);

  const [selectedWrap, setSelectedWrap] = useState(WRAPPING_OPTIONS[0]);
  const [customName, setCustomName] = useState('CUSTOM BOTANICAL MATRIX #01');

  // Add stem to bouquet selection
  const handleAddStem = (stem: StemOption) => {
    soundscape.playClick();
    setSelectedStems(prev => {
      const existing = prev.find(item => item.stem.id === stem.id);
      if (existing) {
        return prev.map(item =>
          item.stem.id === stem.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prev, { stem, count: 1 }];
    });
  };

  // Modify stem count
  const handleUpdateCount = (stemId: string, delta: number) => {
    soundscape.playClick();
    setSelectedStems(prev => {
      return prev
        .map(item => {
          if (item.stem.id === stemId) {
            const newCount = item.count + delta;
            return newCount > 0 ? { ...item, count: newCount } : null;
          }
          return item;
        })
        .filter(Boolean) as SelectedStem[];
    });
  };

  // Total Calculation
  const stemsTotal = selectedStems.reduce((acc, item) => acc + item.stem.pricePerStem * item.count, 0);
  const totalPrice = stemsTotal + selectedWrap.price;

  const handleBuildOrder = () => {
    triggerFloralConfetti();

    const customArrangement: Arrangement = {
      id: `custom-${Date.now()}`,
      name: customName.toUpperCase(),
      subtitle: `Custom Sculptural Assembly in ${selectedWrap.name}`,
      category: 'Sculptural',
      price: totalPrice,
      image: selectedStems[0]?.stem.image || STEM_LIBRARY[0].image,
      hoverImage: selectedStems[1]?.stem.image || STEM_LIBRARY[1].image,
      dimensions: 'Custom 95cm H × 60cm W',
      stems: selectedStems.map(s => `${s.count}x ${s.stem.name}`),
      vibeDescription: ` Bespoke user-built bouquet crafted with ${selectedStems.map(s => s.stem.name).join(', ')} wrapped in ${selectedWrap.name}.`,
      careGuide: 'Recut stems every 48 hours. Fresh water required daily.',
      inStock: true
    };

    onAddCustomToCart(customArrangement);
  };

  return (
    <section id="builder" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[var(--border-color)]">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <span className="text-xs font-mono-custom font-bold uppercase tracking-[0.3em] text-[var(--accent-acid)]">
          [ INTERACTIVE STUDIO CREATOR ]
        </span>
        <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[var(--text-primary)] mt-1">
          BUILD CUSTOM BOUQUET
        </h2>
        <p className="text-base text-[var(--text-secondary)] mt-2 max-w-2xl">
          Select heavy stems, assemble your custom color palette, pick architectural wrapping, and order your bespoke bouquet.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Stem Palette Selector */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Stem Cards Selection */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--accent-loud)]" />
              <span>1. CHOOSE YOUR BOTANICAL STEMS</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STEM_LIBRARY.map(stem => {
                const selected = selectedStems.find(s => s.stem.id === stem.id);
                return (
                  <div
                    key={stem.id}
                    className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-loud)] transition-all flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[var(--border-color)]">
                      <img src={stem.image} alt={stem.name} onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-sm text-[var(--text-primary)] truncate">
                        {stem.name}
                      </div>
                      <div className="text-xs font-mono-custom text-[var(--text-muted)]">
                        ${stem.pricePerStem}/stem
                      </div>
                    </div>

                    {selected ? (
                      <div className="flex items-center gap-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-1">
                        <button
                          onClick={() => handleUpdateCount(stem.id, -1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-[var(--accent-loud)] hover:text-white rounded"
                        >
                          -
                        </button>
                        <span className="font-mono-custom font-bold text-xs px-1">
                          {selected.count}
                        </span>
                        <button
                          onClick={() => handleUpdateCount(stem.id, 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-[var(--accent-loud)] hover:text-white rounded"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddStem(stem)}
                        className="px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-mono-custom font-bold hover:bg-[var(--accent-loud)] hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Wrapping Material Selection */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
              2. SELECT ARCHITECTURAL WRAPPING
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {WRAPPING_OPTIONS.map(wrap => (
                <button
                  key={wrap.id}
                  onClick={() => setSelectedWrap(wrap)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedWrap.id === wrap.id
                      ? 'bg-[var(--accent-loud)] text-white border-[var(--accent-loud)] shadow-lg'
                      : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div className="font-display font-bold text-xs">{wrap.name}</div>
                  <div className="text-[10px] font-mono-custom mt-2 font-semibold">
                    +${wrap.price}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Live Bouquet Canvas & Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
              <div>
                <span className="text-[10px] font-mono-custom font-bold text-[var(--accent-acid)] uppercase tracking-wider">
                  LIVE BOUQUET COMPOSITION
                </span>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="font-display font-black text-xl text-[var(--text-primary)] bg-transparent border-b border-dashed border-[var(--border-color)] focus:outline-none focus:border-[var(--accent-loud)] w-full mt-1"
                />
              </div>
              <Sparkles className="w-6 h-6 text-[var(--accent-acid)] shrink-0" />
            </div>

            {/* Visual Canvas Representation of Stems */}
            <div className="h-56 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] relative overflow-hidden flex items-center justify-center p-4">
              {/* Stem Visual Bars */}
              <div className="flex items-end justify-center gap-3 h-full pb-6">
                {selectedStems.length === 0 ? (
                  <div className="text-center text-xs font-mono-custom text-[var(--text-muted)]">
                    ADD STEMS FROM THE PALETTE TO SEE VISUAL COMPOSITION
                  </div>
                ) : (
                  selectedStems.map((item, idx) => (
                    <motion.div
                      key={item.stem.id}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.min(100, 40 + item.count * 15)}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      style={{ backgroundColor: item.stem.colorHex }}
                      className="w-8 rounded-t-xl relative shadow-md group flex items-start justify-center pt-2"
                    >
                      <span className="text-[9px] font-mono-custom font-bold text-white bg-black/60 rounded px-1">
                        {item.count}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Wrapped base indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-[var(--bg-primary)] border-t border-[var(--border-color)] flex items-center justify-center text-[10px] font-mono-custom font-bold uppercase text-[var(--accent-loud)]">
                WRAPPED IN: {selectedWrap.name}
              </div>
            </div>

            {/* Selected Stems Inventory List */}
            <div className="space-y-2">
              <div className="text-xs font-mono-custom font-bold text-[var(--text-muted)] uppercase">
                SELECTED STEM INVENTORY
              </div>

              {selectedStems.length === 0 ? (
                <p className="text-xs text-[var(--text-secondary)] italic">No stems selected yet.</p>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {selectedStems.map(item => (
                    <div
                      key={item.stem.id}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                    >
                      <span className="font-medium text-[var(--text-primary)]">
                        {item.count}x {item.stem.name}
                      </span>
                      <span className="font-mono-custom font-bold text-[var(--accent-loud)]">
                        ${item.stem.pricePerStem * item.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Total & Action Button */}
            <div className="pt-4 border-t border-[var(--border-color)] space-y-4">
              <div className="flex items-center justify-between font-mono-custom">
                <span className="text-xs uppercase text-[var(--text-secondary)]">TOTAL PRICE:</span>
                <span className="font-black text-2xl text-[var(--text-primary)]">${totalPrice}</span>
              </div>

              <button
                disabled={selectedStems.length === 0}
                onClick={handleBuildOrder}
                className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl ${
                  selectedStems.length > 0
                    ? 'bg-[var(--accent-acid)] text-black hover:bg-white hover:text-black shadow-[0_0_20px_rgba(204,255,0,0.4)] cursor-pointer'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD CUSTOM BOUQUET TO BAG — ${totalPrice}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
