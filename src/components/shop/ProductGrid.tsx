import { AnimatePresence, motion } from 'framer-motion';
import type { Product } from '../../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto text-gold-500">
          <Sparkles size={28} />
        </div>
        <h3 className="font-display text-2xl font-bold text-ink">No attars found</h3>
        <p className="text-xs sm:text-sm text-ink-soft max-w-sm mx-auto">
          We couldn't find any blends matching your criteria. Try adjusting your search or category filter.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
