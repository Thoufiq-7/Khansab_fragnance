import { useRef } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';

export function BestSellersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const bestSellers = products.filter(
    (p) => p.badge === 'Best Seller' || p.badge === 'New' || p.category === 'Oud'
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-700 mb-2">
            <Sparkles size={14} />
            <span>Curated Selections</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Most Coveted Attars
          </h2>
        </div>

        {/* Desktop Carousel Controls & View All */}
        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="text-xs uppercase font-semibold text-gold-700 hover:text-ink transition-colors mr-2"
          >
            View All ({products.length}) →
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-gold-border bg-white flex items-center justify-center text-ink-soft hover:text-ink hover:border-gold-500 transition-colors shadow-xs"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-gold-border bg-white flex items-center justify-center text-ink-soft hover:text-ink hover:border-gold-500 transition-colors shadow-xs"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Swipeable Carousel Track */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="w-[260px] sm:w-[280px] md:w-[300px] flex-shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
