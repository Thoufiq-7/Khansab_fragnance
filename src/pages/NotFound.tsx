import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { pageVariants } from '../lib/motion';

export default function NotFound() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center"
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-full bg-cream border border-gold-border flex items-center justify-center mx-auto text-gold-500 shadow-inner">
          <Sparkles size={36} />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-700">
            Error 404
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink">
            Page Not Found
          </h1>
          <p className="text-sm text-ink-soft">
            The page you are seeking might have vanished like a transient fragrance note. Let us guide you back to our sanctuary of pure scents.
          </p>
        </div>

        <div className="pt-2">
          <Link to="/">
            <Button variant="gold" size="md">
              <ArrowLeft size={16} /> Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
