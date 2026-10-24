interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'bestSeller' | 'new' | 'limited' | 'discount' | 'neutral';
  className?: string;
}

export function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const variantStyles = {
    gold: 'bg-gold-500/10 text-gold-700 border border-gold-500/30',
    bestSeller: 'bg-gradient-to-r from-gold-500 to-gold-700 text-white shadow-sm font-semibold',
    new: 'bg-yellow-400 text-ink font-bold shadow-sm',
    limited: 'bg-espresso text-gold-300 border border-gold-500/40 font-semibold',
    discount: 'bg-red-500/10 text-red-700 border border-red-500/30 font-semibold',
    neutral: 'bg-cream text-ink-soft border border-gold-border',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide uppercase ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
}
