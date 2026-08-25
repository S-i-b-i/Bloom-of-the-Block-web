import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Compass } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="py-24 relative overflow-hidden bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      
      {/* Loud Kinetic Marquee */}
      <div className="overflow-hidden whitespace-nowrap py-4 border-b border-[var(--border-color)] bg-[var(--accent-loud)] text-white">
        <div className="animate-marquee font-display font-black text-2xl sm:text-4xl tracking-tighter uppercase flex items-center gap-8">
          <span>NO BORING ROSES</span>
          <span>✦</span>
          <span>NO DRIED PAMPAS</span>
          <span>✦</span>
          <span>PURE ARCHITECTURAL BOTANICAL DRAMA</span>
          <span>✦</span>
          <span>UNAPOLOGETIC SCULPTURES</span>
          <span>✦</span>
          <span>NO BORING ROSES</span>
          <span>✦</span>
          <span>NO DRIED PAMPAS</span>
          <span>✦</span>
          <span>PURE ARCHITECTURAL BOTANICAL DRAMA</span>
          <span>✦</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Manifesto Text & Pillars */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8"
        >
          <div>
            <span className="text-xs font-mono-custom font-bold uppercase tracking-[0.3em] text-[var(--accent-acid)]">
              [ OUR MANIFESTO ]
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[var(--text-primary)] mt-2">
              WE DO NOT COMPROMISE ON SILHOUETTE OR DRAMA.
            </h2>
          </div>

          <p className="text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
            Standard floristry is stuck in pastel symmetries and predictable arrangements. We treat stems as heavy architectural beams, petals as high-friction textiles, and arrangements as living sculptures designed to disrupt static spaces.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-2"
            >
              <Sparkles className="w-6 h-6 text-[var(--accent-loud)]" />
              <h3 className="font-display font-bold text-base text-[var(--text-primary)]">RAW ASYMMETRY</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Off-balance compositions engineered to catch light and create spatial tension.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-2"
            >
              <Compass className="w-6 h-6 text-[var(--accent-acid)]" />
              <h3 className="font-display font-bold text-base text-[var(--text-primary)]">ETHICAL BOTANICS</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Direct farm partnerships, zero floral foam, and 100% recyclable mechanics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-2"
            >
              <ShieldCheck className="w-6 h-6 text-[var(--accent-electric)]" />
              <h3 className="font-display font-bold text-base text-[var(--text-primary)]">GUARANTEED VASE LIFE</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Heavy-stemmed varieties selected for 10-14 days of vivid home performance.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Visual Reveal Image Card */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl overflow-hidden border border-[var(--border-color)] relative aspect-[4/5] bg-[var(--bg-card)] shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=80"
              alt="Venus Volcano Sculptural Composition"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-70" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[var(--bg-primary)]/80 backdrop-blur-md border border-[var(--border-color)]">
              <div className="font-mono-custom text-xs font-bold text-[var(--accent-tangerine)] uppercase tracking-wider">
                MANIFESTO INSTALLATION #09
              </div>
              <div className="font-display font-black text-xl text-[var(--text-primary)]">
                VENUS VOLCANO
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
