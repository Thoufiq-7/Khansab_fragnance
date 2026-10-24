import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import { formatPrice } from '../../lib/format';
import { siteConfig } from '../../data/site';
import { buildWhatsAppOrderMessage, openWhatsApp } from '../../lib/whatsapp';
import { QuantityStepper } from '../ui/QuantityStepper';
import { Button } from '../ui/Button';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDrawer({ isOpen, onClose }: OrderDrawerProps) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearOrder } = useOrder();

  // Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    const msg = buildWhatsAppOrderMessage(items);
    openWhatsApp(msg);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md h-full bg-ivory shadow-2xl flex flex-col z-10 border-l border-gold-border overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Your Order Bag"
          >
            {/* Header */}
            <div className="p-5 border-b border-gold-border flex items-center justify-between bg-cream/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-700">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">Your Order Bag</h2>
                  <p className="text-xs text-ink-soft">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearOrder}
                    className="text-xs text-ink-soft hover:text-red-600 transition-colors px-2 py-1"
                    title="Clear bag"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close drawer"
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream text-ink-soft hover:text-ink transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content / Items list */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center text-gold-500 shadow-inner">
                    <ShoppingBag size={36} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">Your bag is empty</h3>
                    <p className="text-xs text-ink-soft mt-1 max-w-xs">
                      Discover our handcrafted artisanal attars distilled from pure natural ingredients.
                    </p>
                  </div>
                  <Button
                    onClick={onClose}
                    className="mt-2"
                    size="sm"
                    variant="gold"
                  >
                    <Link to="/shop" className="flex items-center gap-2">
                      Explore Collection <ArrowRight size={14} />
                    </Link>
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size.label}`}
                    className="p-3.5 rounded-2xl bg-white border border-gold-border flex gap-3 shadow-xs items-center"
                  >
                    {/* Bottle/Product thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-cream flex-shrink-0 overflow-hidden flex items-center justify-center relative p-1">
                      <img
                        src={item.product.image || '/bottle1.png'}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-bold text-ink truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-ink-soft">
                        Size: <span className="text-gold-700 font-medium">{item.size.label}</span>
                      </p>
                      <p className="text-xs font-semibold text-ink mt-0.5">
                        {formatPrice(item.size.price * item.quantity)}
                      </p>
                    </div>

                    {/* Stepper + Delete */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.product.id, item.size.label)}
                        aria-label="Remove item"
                        className="text-ink-soft/60 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(qty) => updateQuantity(item.product.id, item.size.label, qty)}
                        size="sm"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & WhatsApp Order */}
            {items.length > 0 && (
              <div className="p-5 border-t border-gold-border bg-cream/40 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">Subtotal</span>
                  <span className="font-semibold text-ink">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-ink-soft">
                  <span>Shipping</span>
                  <span className="text-gold-700 font-medium">Calculated on WhatsApp</span>
                </div>
                <div className="h-px bg-gold-border" />
                <div className="flex items-center justify-between">
                  <span className="font-display text-base font-bold text-ink">Estimated Total</span>
                  <span className="font-display text-xl font-bold text-gold-700">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <Button
                    onClick={handleWhatsAppOrder}
                    variant="whatsapp"
                    size="lg"
                    className="w-full justify-center text-sm shadow-md"
                  >
                    Send Order on WhatsApp
                  </Button>

                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-ink-soft hover:text-ink transition-colors"
                  >
                    <Phone size={14} /> Call to Order: {siteConfig.phone}
                  </a>
                </div>

                <p className="text-[11px] text-center text-ink-soft/80">
                  No online payment needed. Pay via UPI or Cash upon order confirmation.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
