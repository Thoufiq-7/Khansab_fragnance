import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../data/products';
import { formatPrice } from '../../lib/format';
import { useOrder } from '../../context/OrderContext';
import { Badge } from '../ui/Badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useOrder();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Load wishlist state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('khanshab_wishlist');
      if (saved) {
        const list = JSON.parse(saved) as string[];
        setIsWishlisted(list.includes(product.id));
      }
    } catch {
      // Ignore
    }
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = localStorage.getItem('khanshab_wishlist');
      let list: string[] = saved ? JSON.parse(saved) : [];
      if (list.includes(product.id)) {
        list = list.filter((id) => id !== product.id);
        setIsWishlisted(false);
      } else {
        list.push(product.id);
        setIsWishlisted(true);
      }
      localStorage.setItem('khanshab_wishlist', JSON.stringify(list));
    } catch {
      // Ignore
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to the first size
    const defaultSize = product.sizes[0];
    addItem(product, defaultSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const startingPrice = Math.min(...product.sizes.map((s) => s.price));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-3xl border border-gold-border/70 overflow-hidden shadow-xs hover:shadow-[0_12px_32px_rgba(201,150,46,0.14)] hover:border-gold-300 transition-all flex flex-col relative"
    >
      {/* Top Badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        <div>
          {product.badge && (
            <Badge
              variant={
                product.badge === 'Best Seller'
                  ? 'bestSeller'
                  : product.badge === 'New'
                  ? 'new'
                  : 'limited'
              }
            >
              {product.badge}
            </Badge>
          )}
        </div>

        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="pointer-events-auto w-8 h-8 rounded-full bg-ivory/90 backdrop-blur-md border border-gold-border flex items-center justify-center text-ink-soft hover:text-red-500 transition-colors shadow-xs"
        >
          <Heart
            size={15}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-ink-soft'}
          />
        </button>
      </div>

      {/* Product Image Area with soft gold circle backdrop */}
      <Link
        to={`/attar/${product.slug}`}
        className="block p-5 bg-gradient-to-b from-cream/60 to-ivory/30 relative flex items-center justify-center overflow-hidden aspect-[4/3]"
      >
        {/* Soft gold halo circle */}
        <div
          className="w-32 h-32 rounded-full absolute transition-transform duration-500 group-hover:scale-110 opacity-70"
          style={{
            background: `radial-gradient(circle, ${product.oilColor}25 0%, transparent 70%)`,
          }}
        />

        <motion.img
          whileHover={{ rotate: [-1, 2, 0], scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={product.image || '/bottle1.png'}
          alt={product.name}
          className="h-36 sm:h-40 w-auto object-contain z-1 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
        />
      </Link>

      {/* Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[10px] font-semibold tracking-widest uppercase text-gold-700 block mb-1">
            {product.category}
          </span>

          {/* Title */}
          <Link to={`/attar/${product.slug}`}>
            <h3 className="font-display text-base sm:text-lg font-bold text-ink hover:text-gold-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Note line snippet */}
          <p className="text-xs text-ink-soft mt-1 line-clamp-1">
            {product.notes.top.join(', ')}
          </p>
        </div>

        {/* Price & Quick Add Button */}
        <div className="mt-4 pt-3 border-t border-gold-border/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-ink-soft uppercase block font-medium">From</span>
            <span className="font-display text-lg font-bold text-gold-700">
              {formatPrice(startingPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to order`}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
              isAdded
                ? 'bg-green-600 text-white'
                : 'bg-gold-500 text-white hover:bg-gold-700 shadow-sm active:scale-90'
            }`}
          >
            {isAdded ? <Check size={16} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
