import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WORKSHOPS_LIST, Workshop, FALLBACK_FLORAL_IMAGE } from '../data/floristryData';
import { Calendar, Clock, UserCheck, Sparkles, CheckCircle2, X } from 'lucide-react';
import { triggerFloralConfetti } from '../utils/confetti';

export const WorkshopsSection: React.FC = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerFloralConfetti();
    setBookingSubmitted(true);
  };

  const closeDrawer = () => {
    setSelectedWorkshop(null);
    setBookingSubmitted(false);
    setAttendeeName('');
    setAttendeeEmail('');
  };

  return (
    <section id="workshops" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <span className="text-xs font-mono-custom font-bold uppercase tracking-[0.3em] text-[var(--accent-acid)]">
            [ STUDIO MASTERCLASSES ]
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-[var(--text-primary)] mt-1">
            WORKSHOPS & RIGGING
          </h2>
        </div>

        <p className="text-sm text-[var(--text-secondary)] max-w-md font-mono-custom">
          Learn asymmetrical stem architecture, chromatic stem dying, and large-scale ceiling suspensions directly from our head floral architects.
        </p>
      </motion.div>

      {/* Workshop Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {WORKSHOPS_LIST.map((ws, idx) => (
          <motion.div
            key={ws.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden flex flex-col justify-between hover:border-[var(--accent-acid)] transition-all shadow-xl p-6 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[10px] font-mono-custom font-bold text-[var(--accent-acid)] uppercase">
                  {ws.level}
                </span>
                <span className="text-xs font-mono-custom font-bold text-emerald-400 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{ws.seatsLeft} SEATS LEFT</span>
                </span>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--border-color)]">
                <img src={ws.image} alt={ws.title} onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }} className="w-full h-full object-cover" />
              </div>

              <div>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                  {ws.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 line-clamp-3 leading-relaxed">
                  {ws.description}
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono-custom text-[var(--text-secondary)] pt-2 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--accent-loud)]" />
                  <span>{ws.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--accent-electric)]" />
                  <span>{ws.time}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-4">
              <div className="font-mono-custom font-black text-2xl text-[var(--text-primary)]">
                ${ws.price}
              </div>

              <button
                onClick={() => setSelectedWorkshop(ws)}
                className="px-5 py-3 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--accent-acid)] hover:text-black transition-colors"
              >
                RESERVE SEAT
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Drawer Modal */}
      <AnimatePresence>
        {selectedWorkshop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-lg w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 z-10 space-y-6 shadow-2xl"
            >
              <button
                onClick={closeDrawer}
                className="absolute top-4 right-4 p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent-loud)] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!bookingSubmitted ? (
                <>
                  <div>
                    <span className="text-[10px] font-mono-custom font-bold text-[var(--accent-acid)] uppercase tracking-wider">
                      RESERVE WORKSHOP SEAT
                    </span>
                    <h3 className="font-display font-black text-2xl text-[var(--text-primary)] mt-1">
                      {selectedWorkshop.title}
                    </h3>
                    <p className="text-xs font-mono-custom text-[var(--text-secondary)] mt-1">
                      {selectedWorkshop.date} • {selectedWorkshop.time}
                    </p>
                  </div>

                  <form onSubmit={handleBookSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono-custom font-bold text-[var(--text-primary)] uppercase">
                        YOUR FULL NAME
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Maya Lin"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-loud)]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono-custom font-bold text-[var(--text-primary)] uppercase">
                        EMAIL ADDRESS FOR TICKET
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="maya@example.com"
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-loud)]"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-between font-mono-custom text-xs">
                      <span className="text-[var(--text-secondary)]">TUITION FEE:</span>
                      <span className="font-black text-lg text-[var(--accent-acid)]">${selectedWorkshop.price}</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[var(--accent-acid)] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>CONFIRM RESERVATION</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-[var(--text-primary)]">
                    SEAT CONFIRMED!
                  </h3>
                  <p className="text-xs font-mono-custom text-[var(--text-secondary)]">
                    Confirmation ticket sent to <span className="text-[var(--accent-acid)]">{attendeeEmail}</span>. See you at the studio!
                  </p>
                  <button
                    onClick={closeDrawer}
                    className="w-full py-3 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-wider"
                  >
                    CLOSE
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
