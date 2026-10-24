import { Link, useLocation } from 'react-router-dom';
import { Home, Store, ShoppingBag, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Shop', path: '/shop', icon: Store },
  { label: 'Orders', path: '/orders', icon: ShoppingBag },
  { label: 'Contact', path: '/contact', icon: Phone },
];

export default function BottomNav({ onCartOpen }: { onCartOpen: () => void }) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-ivory/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(201,150,46,0.12)] md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const Icon = tab.icon;

          if (tab.path === '/orders') {
            return (
              <button
                key={tab.path}
                onClick={onCartOpen}
                className={`relative flex flex-col items-center justify-center w-14 h-12 transition-colors ${
                  active ? 'text-gold-500 font-bold' : 'text-ink-soft'
                }`}
              >
                <Icon size={22} />
                <span className="text-[10px] mt-0.5 tracking-wider">{tab.label}</span>
                {active && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute -bottom-1 w-6 h-1 rounded-full bg-gold-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          }

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`relative flex flex-col items-center justify-center w-14 h-12 transition-colors ${
                active ? 'text-gold-500 font-bold' : 'text-ink-soft'
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] mt-0.5 tracking-wider">{tab.label}</span>
              {active && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -bottom-1 w-6 h-1 rounded-full bg-gold-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
