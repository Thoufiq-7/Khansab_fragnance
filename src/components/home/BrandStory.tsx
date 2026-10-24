import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function BrandStory() {
  const points = [
    'Hand-distilled in small seasonal batches from rare aged wood',
    'Pure concentrated oils with zero alcohol, water, or carrier chemicals',
    'Centuries-old heritage blending techniques preserved through generations',
    'Supplied in crystal cut flacons with gold-accented precision dipsticks',
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Arch-shaped visual with authentic bottle image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          {/* Outer glow ring */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
            {/* Arch Photo Container */}
            <div className="w-full aspect-[9/14] sm:aspect-[9/15] arch-top rounded-b-3xl overflow-hidden border-2 border-gold-300/60 shadow-[0_24px_50px_rgba(138,90,18,0.25)] bg-espresso relative group">
              <img
                src="/legacy-bottle.png"
                alt="The Khanshab Fragrance Heritage Bottle"
                className="w-full h-full object-cover object-center filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
              />

              {/* Bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative Gold Accent Badge */}
            <div className="absolute -bottom-4 right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-gold-300 shadow-[0_8px_25px_rgba(0,0,0,0.12)] z-10">
              <span className="text-[10px] uppercase font-bold text-gold-700 tracking-wider block">
                Heritage
              </span>
              <span className="font-display text-base font-bold text-ink">
                Since 1988
              </span>
            </div>
          </div>
        </motion.div>

        {/* Narrative Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-gold-border text-gold-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>The Khanshab Legacy</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink tracking-tight leading-tight">
            Distilling Soul and Sillage into Every Pure Drop
          </h2>

          <p className="text-sm sm:text-base text-ink-soft leading-relaxed font-body">
            At Khanshab Fragrance, attar is not simply a cosmetic scent — it is an intimate art form.
            Unlike commercial sprays diluted with 80% alcohol, our pure perfume oils interact directly
            with your natural skin chemistry, blooming slowly over hours and leaving an unforgettable,
            regal aura.
          </p>

          <div className="space-y-3 pt-2">
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-ink-soft font-medium leading-snug">
                  {point}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link to="/shop">
              <Button variant="gold" size="md">
                Explore The Attars
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="md">
                Our Story & Studio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
