import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export function FloatingBottle() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smooth out scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Desktop transforms: bottle travels subtly across key sections
  const desktopY = useTransform(smoothProgress, [0, 0.25, 0.5, 0.8, 1], [0, 400, 950, 1600, 2200]);
  const desktopX = useTransform(smoothProgress, [0, 0.25, 0.5, 0.8, 1], [0, -180, 160, -80, 0]);
  const desktopScale = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.85, 0.95, 0.8, 0.9]);
  const desktopRotate = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, -6, 8, -4, 0]);
  const desktopOpacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.7, 0.85, 1],
    [0, 0.85, 0.85, 0.4, 0]
  );

  // Mobile transforms: minimal x movement, mostly y, scale, rotation
  const mobileY = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0, 250, 600, 1100]);
  const mobileScale = useTransform(smoothProgress, [0, 0.5, 1], [0.65, 0.75, 0.6]);
  const mobileRotate = useTransform(smoothProgress, [0, 0.5, 1], [0, 5, -4]);
  const mobileOpacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.6, 0.85, 1],
    [0, 0.65, 0.65, 0.2, 0]
  );

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <motion.div
        style={{
          y: isMobile ? mobileY : desktopY,
          x: isMobile ? 0 : desktopX,
          scale: isMobile ? mobileScale : desktopScale,
          rotate: isMobile ? mobileRotate : desktopRotate,
          opacity: isMobile ? mobileOpacity : desktopOpacity,
        }}
        className="absolute top-32 right-12 md:right-28 w-44 md:w-56 h-auto drop-shadow-[0_25px_40px_rgba(138,90,18,0.3)] filter contrast-105"
      >
        <img
          src="/signature-bottle.png"
          alt="Signature Attar Bottle"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </div>
  );
}
