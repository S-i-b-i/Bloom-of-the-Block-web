import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from './CartDrawer';
import { X, CheckCircle2, Truck, CreditCard, Sparkles, Calendar, ShieldCheck } from 'lucide-react';
import { triggerFloralConfetti } from '../utils/confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [deliveryDate, setDeliveryDate] = useState('2026-08-26');
  const [giftNote, setGiftNote] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const subtotal = items.reduce(
    (acc, item) => acc + item.arrangement.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerFloralConfetti();
    setStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    setStep('form');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-w-2xl w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent-loud)] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'form' ? (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono-custom font-bold text-[var(--accent-acid)] uppercase tracking-wider">
                  EXPRESS FLORAL CHECKOUT
                </span>
                <h2 className="font-display font-black text-3xl text-[var(--text-primary)] mt-1">
                  DELIVERY DETAILS & PAYMENT
                </h2>
              </div>

              {/* Order Items Preview */}
              <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2">
                <div className="text-xs font-mono-custom font-bold text-[var(--text-muted)] uppercase">
                  ORDER SUMMARY ({items.length} ARRANGEMENTS)
                </div>
                {items.map(item => (
                  <div key={item.arrangement.id} className="flex justify-between text-xs">
                    <span className="font-medium text-[var(--text-primary)]">
                      {item.quantity}x {item.arrangement.name}
                    </span>
                    <span className="font-mono-custom font-bold text-[var(--accent-loud)]">
                      ${item.arrangement.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono-custom font-bold text-[var(--text-primary)] uppercase">
                      RECIPIENT FULL NAME
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sasha Fierce"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-loud)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono-custom font-bold text-[var(--text-primary)] uppercase">
                      PREFERRED DELIVERY DATE
                    </label>
                    <input
                      required
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-loud)] font-mono-custom"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-custom font-bold text-[var(--text-primary)] uppercase">
                    DELIVERY STREET ADDRESS
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="74 Shoreditch High St, London E1 6PQ"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-loud)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-custom font-bold text-[var(--text-primary)] uppercase">
                    OPTIONAL HANDWRITTEN GIFT NOTE CARD
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Write a message to include with the bouquet..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-loud)] resize-none"
                  />
                </div>

                {/* Mock Card Details */}
                <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-custom font-bold text-[var(--text-primary)]">
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[var(--accent-loud)]" /> CARD PAYMENT (MOCK SECURE)
                    </span>
                    <span className="text-[var(--accent-acid)]">TOTAL: ${subtotal}</span>
                  </div>

                  <input
                    type="text"
                    placeholder="4242 •••• •••• 4242"
                    defaultValue="4242 4242 4242 4242"
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono-custom text-[var(--text-primary)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[var(--accent-loud)] text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-[0_0_20px_rgba(255,42,95,0.4)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>PAY NOW & DISPATCH — ${subtotal}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-mono-custom font-bold text-emerald-400 uppercase tracking-widest">
                  DISPATCH CONFIRMED
                </span>
                <h2 className="font-display font-black text-3xl text-[var(--text-primary)] mt-1">
                  ORDER #BOTB-{Math.floor(100000 + Math.random() * 900000)} IS LIVE!
                </h2>
              </div>

              <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[var(--text-primary)] font-bold">{customerName}</span>. Your sculptural floral composition will be hand-assembled and dispatched to <span className="text-[var(--accent-acid)] font-bold">{customerAddress}</span> on <span className="font-mono-custom text-[var(--accent-loud)]">{deliveryDate}</span>.
              </p>

              <button
                onClick={handleFinish}
                className="w-full py-4 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--accent-loud)] hover:text-white transition-colors"
              >
                RETURN TO BOTANICAL STUDIO
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
