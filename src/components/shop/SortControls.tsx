import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

interface SortControlsProps {
  value: SortOption;
  onChange: (val: SortOption) => void;
}

export function SortControls({ value, onChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-ink-soft hidden sm:inline flex-items-center gap-1">
        <ArrowUpDown size={14} className="inline mr-1" />
        Sort:
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="text-xs sm:text-sm font-medium bg-white border border-gold-border rounded-full px-3.5 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-gold-500/40 shadow-xs cursor-pointer"
      >
        <option value="featured">Featured / Best Sellers</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name">Name: A to Z</option>
      </select>
    </div>
  );
}
