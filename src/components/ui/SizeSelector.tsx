import { motion } from 'framer-motion';
import type { ProductSize } from '../../data/products';
import { formatPrice } from '../../lib/format';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: ProductSize;
  onSelectSize: (size: ProductSize) => void;
}

export function SizeSelector({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {sizes.map((s) => {
        const isSelected = s.label === selectedSize.label;
        return (
          <button
            key={s.label}
            type="button"
            onClick={() => onSelectSize(s)}
            className={`relative px-4 py-2 rounded-2xl text-xs md:text-sm font-medium transition-all duration-200 border ${
              isSelected
                ? 'border-gold-500 text-ink font-semibold shadow-[0_2px_12px_rgba(201,150,46,0.18)]'
                : 'border-gold-border bg-white/70 text-ink-soft hover:border-gold-300 hover:text-ink'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="active-size-pill"
                className="absolute inset-0 bg-gold-300/20 rounded-2xl -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className="flex items-center gap-1.5">
              <span>{s.label}</span>
              <span className="text-[11px] text-gold-700">({formatPrice(s.price)})</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
