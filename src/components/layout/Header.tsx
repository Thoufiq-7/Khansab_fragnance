import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { siteConfig } from '../../data/site';
import { useOrder } from '../../context/OrderContext';
import { badgePop } from '../../lib/motion';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Contact', path: '/contact' },
];

export default function Header({ onCartOpen }: { onCartOpen: () => void }) {
  const { totalItems } = useOrder();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 pt-safe bg-ivory/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(201,150,46,0.08)]">
        <div className="h-16 md:h-20 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <div className="flex flex-col min-w-0">
              <span className="font-display text-base md:text-lg font-bold tracking-[0.12em] text-gold-700 uppercase leading-tight truncate">
                {siteConfig.brandName}
              </span>
              <span className="text-[9px] md:text-[10px] font-medium tracking-[0.2em] text-ink-soft uppercase leading-tight">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-body text-sm font-medium tracking-wide uppercase transition-colors hover:text-gold-500 focus-gold ${
                  location.pathname === link.path ? 'text-gold-500' : 'text-ink-soft'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500 rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side: Cart + Mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCartOpen}
              aria-label="Open order list"
              className="relative w-11 h-11 flex items-center justify-center text-ink rounded-full hover:bg-cream transition-colors focus-gold"
            >
              <ShoppingBag size={22} />
              <AnimatePresence mode="wait">
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    variants={badgePop}
                    initial="initial"
                    animate="animate"
                    className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-gold-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold shadow-[0_2px_8px_rgba(201,150,46,0.45)]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden w-11 h-11 flex items-center justify-center text-ink rounded-full hover:bg-cream transition-colors focus-gold"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-ivory shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gold-border">
                <span className="font-display text-lg font-bold text-gold-700 uppercase tracking-wider">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-3 px-4 rounded-2xl font-body text-sm font-medium tracking-wide uppercase transition-colors ${
                      location.pathname === link.path
                        ? 'bg-cream text-gold-500'
                        : 'text-ink-soft hover:bg-cream'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
