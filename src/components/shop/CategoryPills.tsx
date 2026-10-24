import { motion } from 'framer-motion';

export type CategoryOption = 'All' | 'Oud' | 'Musk' | 'Floral' | 'Woody' | 'Gift Sets';

const categories: CategoryOption[] = ['All', 'Oud', 'Musk', 'Floral', 'Woody', 'Gift Sets'];

interface CategoryPillsProps {
  selected: CategoryOption;
  onSelect: (cat: CategoryOption) => void;
}

export function CategoryPills({ selected, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((cat) => {
        const isSelected = cat === selected;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors whitespace-nowrap ${
              isSelected ? 'text-ink font-semibold' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="category-pill-bg"
                className="absolute inset-0 bg-gold-300/30 rounded-full border border-gold-500/50 shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            {!isSelected && (
              <div className="absolute inset-0 bg-cream/70 rounded-full border border-gold-border/60 -z-20" />
            )}
            {cat}
          </button>
        );
      })}
    </div>
  );
}
