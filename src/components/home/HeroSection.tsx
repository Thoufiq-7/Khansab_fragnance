import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { siteConfig } from '../../data/site';
import { openWhatsApp } from '../../lib/whatsapp';

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const headlineWords = ['Luxury', 'in', 'Every', 'Drop'];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Arch & Radiant Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[700px] h-[400px] sm:h-[550px] md:h-[650px] bg-gradient-to-b from-gold-300/25 via-yellow-400/15 to-transparent rounded-[200px] blur-2xl -z-10 pointer-events-none" />

      {/* Decorative Gold Dust Particles */}
      <div className="absolute inset-0 pointer-events-none -z-5 overflow-hidden">
        {[
          { top: '15%', left: '10%', delay: 0 },
          { top: '35%', left: '85%', delay: 1.5 },
          { top: '65%', left: '15%', delay: 2.5 },
          { top: '75%', left: '80%', delay: 0.8 },
          { top: '20%', left: '70%', delay: 3.2 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gold-400 rounded-full shadow-[0_0_8px_rgba(201,150,46,0.8)]"
            style={{ top: dot.top, left: dot.left }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -15, 0],
                    opacity: [0.3, 0.9, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: dot.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 text-center lg:text-left z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream border border-gold-border shadow-xs mb-6"
          >
            <Sparkles size={14} className="text-gold-500" />
            <span className="text-xs font-semibold tracking-wider uppercase text-gold-700">
              Artisanal Pure Perfume Oils
            </span>
          </motion.div>

          {/* Animated Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.08] mb-6">
            {headlineWords.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block mr-3 ${
                  word === 'Luxury' || word === 'Drop'
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold-700 via-gold-500 to-yellow-600'
                    : ''
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-ink-soft max-w-xl mx-auto lg:mx-0 font-body leading-relaxed mb-8"
          >
            Immerse yourself in centuries of royal Arabian perfumery. 100% concentrated,
            alcohol-free pure attars distilled from aged agarwood, rich amber, and handpicked blossoms.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5"
          >
            <Link to="/shop" className="w-full sm:w-auto">
              <Button size="lg" variant="gold" className="w-full sm:w-auto shadow-lg">
                Shop Collection <ArrowRight size={18} />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="whatsapp"
              onClick={() => openWhatsApp(siteConfig.whatsappGreeting)}
              className="w-full sm:w-auto"
            >
              <MessageSquare size={18} /> Order on WhatsApp
            </Button>
          </motion.div>

          {/* Trust Highlights below CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 pt-6 border-t border-gold-border/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-ink-soft"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-gold-500" />
              <span>100% Alcohol-Free</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-gold-500" />
              <span>14+ Hours Sillage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles size={16} className="text-gold-500" />
              <span>Authentic Sealed Bottles</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual / Authentic Brand Showcase */}
        <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
          {/* Architectural Luxury Frame */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] rounded-3xl sm:rounded-[36px] overflow-hidden border-2 border-gold-300/60 shadow-[0_24px_60px_rgba(138,90,18,0.3)] bg-espresso group"
          >
            {/* Amber aura glow */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-gold-500/30 to-yellow-400/20 rounded-[36px] blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
              <motion.img
                src="/hero-bottle.jpg"
                alt="Khanshab Luxury Fragrance Signature Flacon"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.03, 1],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.02]"
              />

              {/* Subtle vignette gradient on bottom for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent pointer-events-none" />

              {/* Monogram / Signature stamp at bottom */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ivory pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                  <span className="text-[11px] font-medium tracking-widest uppercase text-gold-300 drop-shadow-md">
                    Royal Blend Original
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase text-ivory/80 font-display">
                  Pure Concentrated Oil
                </span>
              </div>
            </div>

            {/* Floating Tag Left: Grade-A Oud */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute top-6 -left-3 sm:-left-4 bg-ivory/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gold-300 shadow-[0_8px_20px_rgba(0,0,0,0.15)] z-20 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-ink">
                Grade-A Oud
              </span>
            </motion.div>

            {/* Floating Tag Right: 14h+ Longevity */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="absolute bottom-16 -right-3 sm:-right-4 bg-ivory/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gold-300 shadow-[0_8px_20px_rgba(0,0,0,0.15)] z-20 flex items-center gap-2"
            >
              <Sparkles size={13} className="text-gold-500" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-ink">
                14h+ Longevity
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
