import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Arrangement, FALLBACK_FLORAL_IMAGE } from '../data/floristryData';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, Truck } from 'lucide-react';

export interface CartItem {
  arrangement: Arrangement;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = items.reduce(
    (acc, item) => acc + item.arrangement.price * item.quantity,
    0
  );
  
  const discountAmount = discountApplied ? subtotal * 0.2 : 0;
  const shippingFee = subtotal > 200 || items.length === 0 ? 0 : 25;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LOUD20' || promoCode.trim().toUpperCase() === 'BLOOM') {
      setDiscountApplied(true);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Slide-over Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen max-w-md bg-[var(--bg-card)] border-l border-[var(--border-color)] shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[var(--accent-loud)]" />
                <h2 className="font-display font-black text-xl text-[var(--text-primary)]">
                  YOUR BOTANICAL BAG ({items.reduce((a, b) => a + b.quantity, 0)})
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] text-xs font-mono-custom">
              {subtotal >= 200 ? (
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <Truck className="w-4 h-4" /> FREE EXPRESS COURIER UNLOCKED!
                </span>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Add ${200 - subtotal} for FREE Express Delivery</span>
                    <span>${subtotal}/$200</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--accent-acid)] transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 200) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <ShoppingBag className="w-12 h-12 text-[var(--text-muted)] mx-auto stroke-1" />
                  <p className="font-display font-bold text-lg text-[var(--text-primary)]">
                    YOUR BAG IS EMPTY
                  </p>
                  <p className="text-xs font-mono-custom text-[var(--text-secondary)]">
                    Explore our seasonal drop or build your custom bouquet.
                  </p>
                </div>
              ) : (
                items.map(({ arrangement, quantity }) => (
                  <div
                    key={arrangement.id}
                    className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex gap-4 items-center"
                  >
                    <img
                      src={arrangement.image}
                      alt={arrangement.name}
                      onError={(e) => { e.currentTarget.src = FALLBACK_FLORAL_IMAGE; }}
                      className="w-16 h-20 rounded-xl object-cover shrink-0 border border-[var(--border-color)]"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-sm text-[var(--text-primary)] truncate">
                        {arrangement.name}
                      </h3>
                      <p className="text-[10px] font-mono-custom text-[var(--text-muted)] truncate">
                        {arrangement.category}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[var(--border-color)] rounded-lg overflow-hidden bg-[var(--bg-card)]">
                          <button
                            onClick={() => onUpdateQuantity(arrangement.id, -1)}
                            className="px-2 py-0.5 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--accent-loud)] hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-mono-custom font-bold text-[var(--text-primary)]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(arrangement.id, 1)}
                            className="px-2 py-0.5 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--accent-loud)] hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono-custom font-bold text-sm text-[var(--accent-loud)]">
                          ${arrangement.price * quantity}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(arrangement.id)}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Calculation & Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-4">
                
                {/* Promo Code input */}
                <form onSubmit={applyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="PROMO CODE (e.g. LOUD20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none uppercase font-mono-custom"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono-custom font-bold hover:bg-[var(--accent-loud)] hover:text-white transition-colors"
                  >
                    APPLY
                  </button>
                </form>

                {discountApplied && (
                  <div className="text-xs font-mono-custom text-emerald-400 font-bold flex items-center justify-between">
                    <span>PROMO "LOUD20" APPLIED (20% OFF):</span>
                    <span>-${discountAmount.toFixed(0)}</span>
                  </div>
                )}

                <div className="space-y-1.5 font-mono-custom text-xs text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-3">
                  <div className="flex justify-between">
                    <span>SUBTOTAL:</span>
                    <span className="text-[var(--text-primary)]">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EXPRESS DELIVERY:</span>
                    <span className="text-[var(--text-primary)]">
                      {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-[var(--text-primary)] pt-2 border-t border-[var(--border-color)]">
                    <span>GRAND TOTAL:</span>
                    <span className="text-[var(--accent-loud)]">${grandTotal}</span>
                  </div>
                </div>

                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-4 rounded-xl bg-[var(--accent-loud)] text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-[0_0_20px_rgba(255,42,95,0.4)]"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
