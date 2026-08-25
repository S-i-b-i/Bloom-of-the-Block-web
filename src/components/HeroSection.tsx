import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { FALLBACK_FLORAL_IMAGE } from '../data/floristryData';
import { soundscape } from '../utils/audio';

interface HeroSectionProps {
  onExploreClick: () => void;
  onCustomBuildClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onCustomBuildClick
}) => {
  const { scrollY } = useScroll();

  // Parallax shifts for hero background & floating floral cards
  const imageY = useTransform(scrollY, [0, 800], [0, 180]);
  const textY = useTransform(scrollY, [0, 800], [0, -60]);
  const rotateImage = useTransform(scrollY, [0, 800], [0, 12]);
  const badgeRotate = useTransform(scrollY, [0, 800], [0, 360]);

  // Words for animated split reveal
  const titleWords = ['UNCONVENTIONAL.', 'SCULPTURAL.', 'FLORISTRY.'];
  const subtitleText = 'High-tension botanical compositions, brutalist stems, and unapologetic floral installation design.';

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Top Live Studio Alert Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex flex-wrap items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono-custom tracking-wider uppercase text-[var(--text-secondary)] shadow-sm"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[var(--text-primary)] font-semibold">STUDIO OPEN NOW</span>
          <span className="text-[var(--border-color)]">|</span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=74+Shoreditch+High+St+London+E1+6PQ"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundscape.playClick()}
            className="text-[var(--accent-acid)] font-bold hover:underline flex items-center gap-1 group"
            title="View London Studio on Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-[var(--accent-loud)]" />
            <span>SHOREDITCH, LONDON ↗</span>
          </a>
        </motion.div>
      </div>

      {/* Main Hero Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* Left Column: Loud Kinetic Typography */}
        <motion.div style={{ y: textY }} className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            {/* Split Word Reveal */}
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-[var(--text-primary)]">
              {titleWords.map((word, index) => (
                <div key={index} className="overflow-hidden block">
                  <motion.span
                    initial={{ y: '100%', rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1 * index,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`inline-block ${
                      index === 1 ? 'text-stroke-thin text-[var(--text-primary)] hover:text-[var(--accent-loud)] transition-colors' : ''
                    } ${index === 2 ? 'text-[var(--accent-loud)]' : ''}`}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-xl font-normal leading-relaxed"
          >
            {subtitleText}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="pt-2 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onExploreClick}
              className="px-8 py-4 rounded-full bg-[var(--accent-loud)] text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-[var(--bg-primary)] transition-all shadow-lg hover:shadow-[0_0_25px_rgba(255,42,95,0.4)] flex items-center gap-3 group shrink-0 whitespace-nowrap"
            >
              <span>EXPLORE DROPS</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={onCustomBuildClick}
              className="px-8 py-4 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold text-sm uppercase tracking-wider hover:border-[var(--accent-acid)] hover:text-[var(--accent-acid)] transition-all flex items-center gap-3 shrink-0 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-[var(--accent-acid)]" />
              <span>BUILD CUSTOM BOUQUET</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: Multi-Layer Floral Image Parallax Card */}
        <div className="lg:col-span-5 relative">
          <motion.div
            style={{ y: imageY, rotate: rotateImage }}
            className="relative z-10 rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-2xl group bg-[var(--bg-card)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.img
                initial={{ scale: 1.25 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1200&q=80"
                alt="Neon Hydra Sculptural Floristry"
                onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />

              {/* Floating Overlay Badge on Hero Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[var(--bg-primary)]/80 backdrop-blur-md border border-[var(--border-color)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono-custom font-bold text-[var(--accent-acid)] tracking-widest uppercase">
                      FEATURED ARRANGEMENT
                    </div>
                    <div className="font-display font-bold text-lg text-[var(--text-primary)]">
                      NEON HYDRA 01
                    </div>
                  </div>
                  <div className="font-mono-custom font-black text-xl text-[var(--accent-loud)]">
                    $210
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Floating Layer Card behind main hero image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute -top-6 -right-6 w-48 h-48 rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-xl hidden sm:block z-0 opacity-80"
          >
            <img
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80"
              alt="Electric Cobalt Stems"
              onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Kinetic Scroll Indicator Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 flex items-center justify-end">
        <button
          onClick={onExploreClick}
          className="text-xs font-mono-custom text-[var(--text-secondary)] hover:text-[var(--accent-loud)] transition-colors flex items-center gap-2"
        >
          <span>SEASONAL CATALOGUE #04</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
