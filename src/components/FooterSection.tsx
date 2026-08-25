import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowUp, Send, CheckCircle2, Instagram, Music, MapPin, ExternalLink } from 'lucide-react';
import { triggerFloralConfetti } from '../utils/confetti';
import { soundscape } from '../utils/audio';

export const FooterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    triggerFloralConfetti();
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] pt-12 pb-8 relative overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
      >
        
        {/* Top Grid: Newsletter & Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Newsletter Subscription */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-xs font-mono-custom font-bold uppercase tracking-[0.3em] text-[var(--accent-loud)]">
                [ BOTANICAL DISPATCH ]
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] mt-1">
                JOIN THE UNCONVENTIONAL CLUB
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Receive secret seasonal drop announcements, workshop pre-sale codes, and editorial floral guides.
              </p>
            </div>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  required
                  placeholder="enter.your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-loud)] font-mono-custom"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[var(--accent-loud)] text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg"
                >
                  <span>SUBSCRIBE</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-2xl bg-[var(--bg-card)] border border-emerald-500/40 text-emerald-400 text-xs font-mono-custom font-bold flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>YOU ARE SUBSCRIBED TO THE BOTANICAL DISPATCH!</span>
              </div>
            )}
          </div>

          {/* Right Column: Locations & Hours */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono-custom text-xs">
            
            <div className="space-y-2">
              <div className="font-bold text-[var(--text-primary)] uppercase tracking-wider border-b border-[var(--border-color)] pb-1.5 flex items-center justify-between">
                <span>LONDON STUDIO</span>
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-loud)]" />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=74+Shoreditch+High+St+London+E1+6PQ"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundscape.playClick()}
                className="group block p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-loud)] transition-all space-y-1 shadow-sm"
                title="Open location in Google Maps"
              >
                <p className="text-[var(--text-primary)] font-semibold leading-snug group-hover:text-[var(--accent-loud)] transition-colors">
                  74 Shoreditch High St<br />
                  London, E1 6PQ<br />
                  United Kingdom
                </p>
                <div className="flex items-center gap-1 text-[var(--accent-loud)] font-bold text-[10px] uppercase tracking-wider pt-1">
                  <span>GET DIRECTIONS</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-[var(--text-primary)] uppercase tracking-wider border-b border-[var(--border-color)] pb-1.5">
                STUDIO HOURS
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                MON – FRI: 08:00 – 19:00<br />
                SAT – SUN: 09:00 – 18:00<br />
                SAME-DAY CUTOFF: 14:00
              </p>
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <div className="font-bold text-[var(--text-primary)] uppercase tracking-wider border-b border-[var(--border-color)] pb-1.5">
                SOCIAL & PRESS
              </div>
              <div className="space-y-1.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-loud)] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@BLOOM.BLOCK</span>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-acid)] transition-colors"
                >
                  <Music className="w-4 h-4" />
                  <span>TIKTOK ARCHIVE</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Kinetic Wordmark Text */}
        <div className="pt-6 border-t border-[var(--border-color)] text-center relative space-y-4">
          <motion.h2
            whileHover={{ scale: 1.01 }}
            className="font-display font-black text-4xl sm:text-7xl lg:text-8xl tracking-tighter leading-none text-stroke-thin text-[var(--text-primary)] hover:text-[var(--accent-loud)] transition-colors duration-500 cursor-default select-none"
          >
            BLOOM OF THE BLOCK
          </motion.h2>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 text-xs font-mono-custom text-[var(--text-secondary)] gap-4">
            <div>
              © 2026 BLOOM OF THE BLOCK LTD. ALL RIGHTS RESERVED.
            </div>

            <button
              onClick={scrollToTop}
              className="px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--accent-loud)] hover:text-white transition-all flex items-center gap-2"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </motion.div>
    </footer>
  );
};
