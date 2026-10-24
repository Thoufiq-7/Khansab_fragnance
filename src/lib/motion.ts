import type { Variants } from 'framer-motion';

/* ──────────────────────────────────────────────
 *  Shared Framer Motion variants
 *  Import these in components to keep animations
 *  consistent across the app.
 * ────────────────────────────────────────────── */

/** Page transition (wrap routes in AnimatePresence) */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } },
};

/** Fade-in on scroll (whileInView) */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 },
  }),
};

/** Stagger container */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/** Card hover lift */
export const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.01, transition: { duration: 0.25, ease: 'easeOut' } },
};

/** Button interaction */
export const buttonTap = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
};

/** Drawer spring */
export const drawerSpring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
};

/** Badge pop when count changes */
export const badgePop: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

/** Hero headline word reveal */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 30, clipPath: 'inset(100% 0 0 0)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
  }),
};

/** Hero bottle entrance + idle float */
export const bottleEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

/** Floating label slide-in */
export const floatingLabel: Variants = {
  hidden: (direction: 'left' | 'right') => ({
    opacity: 0,
    x: direction === 'left' ? -30 : 30,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.8 },
  },
};
