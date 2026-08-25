import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

export const PressReviewsSection: React.FC = () => {
  const reviews = [
    {
      quote: "The King Protea composition dominated our gallery opening. Guests were taking photos of the bouquet all night.",
      author: "MAYA CHEN",
      role: "Curator, Soho Arts",
      stars: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      quote: "No dried pampas or generic pastel roses in sight. Pure architectural genius for our runway show.",
      author: "JULIAN VANE",
      role: "Creative Director, VANE Studio",
      stars: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      quote: "The custom bouquet builder on their site let me pick exact neon anthuriams. Arrived in perfect crisp condition.",
      author: "ELENA ROSTOVA",
      role: "Architectural Digest Reader",
      stars: 5,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)] overflow-hidden">
      
      {/* Press Logo Marquee */}
      <div className="mb-16 border-b border-[var(--border-color)] pb-8 overflow-hidden whitespace-nowrap opacity-60">
        <div className="animate-marquee font-mono-custom text-xs font-bold tracking-[0.4em] uppercase text-[var(--text-secondary)] flex items-center gap-12">
          <span>VOGUE BOTANICAL</span>
          <span>✦</span>
          <span>DAZED DIGITAL</span>
          <span>✦</span>
          <span>ARCHITECTURAL DIGEST</span>
          <span>✦</span>
          <span>PAPER MAGAZINE</span>
          <span>✦</span>
          <span>VOGUE BOTANICAL</span>
          <span>✦</span>
          <span>DAZED DIGITAL</span>
          <span>✦</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-2"
        >
          <span className="text-xs font-mono-custom font-bold uppercase tracking-[0.3em] text-[var(--accent-loud)]">
            [ UNFILTERED REVIEWS ]
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[var(--text-primary)]">
            WHAT THE UNAPOLOGETIC SAY
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-6 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[var(--accent-acid)]">
                  {[...Array(rev.stars)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                <img
                  src={rev.image}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-[var(--border-color)]"
                />
                <div>
                  <div className="font-display font-bold text-xs text-[var(--text-primary)]">
                    {rev.author}
                  </div>
                  <div className="text-[10px] font-mono-custom text-[var(--text-muted)]">
                    {rev.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
