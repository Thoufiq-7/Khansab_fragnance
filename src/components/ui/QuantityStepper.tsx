import { Plus, Minus } from 'lucide-react';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
}: QuantityStepperProps) {
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center rounded-full border border-gold-border bg-white shadow-xs ${
        isSm ? 'p-0.5 h-8' : 'p-1 h-10'
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center rounded-full text-ink-soft hover:text-ink hover:bg-cream transition-colors disabled:opacity-30 disabled:pointer-events-none ${
          isSm ? 'w-6 h-6' : 'w-8 h-8'
        }`}
      >
        <Minus size={isSm ? 12 : 14} />
      </button>

      <span
        className={`text-center font-bold text-ink select-none ${
          isSm ? 'w-7 text-xs' : 'w-10 text-sm'
        }`}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`flex items-center justify-center rounded-full text-ink-soft hover:text-ink hover:bg-cream transition-colors disabled:opacity-30 disabled:pointer-events-none ${
          isSm ? 'w-6 h-6' : 'w-8 h-8'
        }`}
      >
        <Plus size={isSm ? 12 : 14} />
      </button>
    </div>
  );
}
