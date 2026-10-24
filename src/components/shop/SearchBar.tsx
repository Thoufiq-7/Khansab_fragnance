import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search by note, collection, or mood (e.g. Oud, Musk, Rose)...',
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ink-soft">
        <Search size={18} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-gold-border text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 shadow-xs transition-all"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-ink-soft hover:text-ink transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
