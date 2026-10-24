import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

export type ButtonVariant = 'gold' | 'outline' | 'whatsapp' | 'ghost' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'gold', size = 'md', className = '', children, disabled, isLoading, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium font-body rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

    const sizeStyles = {
      sm: 'text-xs px-4 py-2 gap-1.5 min-h-[36px]',
      md: 'text-sm px-6 py-3 gap-2 min-h-[44px]',
      lg: 'text-base px-8 py-4 gap-2.5 min-h-[50px] font-semibold',
    }[size];

    const variantStyles = {
      gold: 'bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 text-ink font-semibold shadow-[0_4px_16px_rgba(201,150,46,0.3)] hover:shadow-[0_6px_22px_rgba(201,150,46,0.45)] hover:brightness-105 border border-gold-300/40',
      outline:
        'border border-gold-500 text-gold-700 bg-transparent hover:bg-gold-500/10 active:bg-gold-500/20',
      whatsapp:
        'bg-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.45)] hover:brightness-105 font-semibold',
      ghost: 'text-ink-soft hover:text-ink hover:bg-cream',
      dark: 'bg-espresso text-ivory border border-gold-500/30 shadow-[0_4px_16px_rgba(27,15,8,0.4)] hover:border-gold-500',
    }[variant];

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
