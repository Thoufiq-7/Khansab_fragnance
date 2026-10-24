import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { siteConfig } from '../../data/site';
import { openWhatsApp } from '../../lib/whatsapp';

export function TrilogyShowcase() {
  const sizes = [
    {
      size: '3 ml',
      name: 'Travel Flacon',
      desc: 'Pocket luxury for daily carrying and discreet application',
    },
    {
      size: '6 ml',
      name: 'Signature Flacon',
      desc: 'The quintessential collector size for connoisseurs',
    },
    {
      size: '12 ml',
      name: 'Imperial Flacon',
      desc: 'The grand crown centerpiece crafted for royalty',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl sm:rounded-[36px] bg-gradient-to-b from-cream/90 via-white to-ivory border-2 border-gold-300/50 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(201,150,46,0.12)] overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: The Trio Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative flex justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[460px] aspect-square rounded-3xl overflow-hidden border-2 border-gold-300/60 shadow-[0_20px_40px_rgba(138,90,18,0.25)] bg-espresso group">
              {/* Image */}
              <img
                src="/collection-trio.png"
                alt="Khanshab Fragrance Royal Flacon Trilogy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03] brightness-[1.02]"
              />

              {/* Gradient overlay on bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Bottom Label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-ivory">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                  <span className="font-display text-sm font-semibold text-gold-300 tracking-wide">
                    The Complete Flacon Trilogy
                  </span>
                </div>
                <span className="text-[10px] tracking-widest uppercase text-ivory/80 font-medium">
                  3 ml • 6 ml • 12 ml
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-300/20 border border-gold-500/30 text-gold-700 text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles size={13} className="text-gold-500" />
                <span>Handcrafted Editions</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight">
                Three Iconic Silhouettes, One Unrivaled Scent
              </h2>

              <p className="text-sm sm:text-base text-ink-soft font-body leading-relaxed mt-3">
                Every Khanshab attar is bottled in hand-forged filigree crystal flacons crowned with royal jeweled caps. Choose your desired volume or curate an all-sizes trilogy gift set.
              </p>
            </div>

            {/* 3 Size Highlights */}
            <div className="space-y-3 pt-1">
              {sizes.map((s, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white/80 border border-gold-border/70 flex items-center justify-between gap-4 hover:border-gold-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-11 h-11 rounded-xl bg-cream border border-gold-border flex items-center justify-center font-display text-sm font-bold text-gold-700 flex-shrink-0">
                      {s.size}
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-bold text-ink">{s.name}</h4>
                      <p className="text-xs text-ink-soft leading-snug">{s.desc}</p>
                    </div>
                  </div>
                  <Droplets size={16} className="text-gold-500 flex-shrink-0 mr-1" />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
              <Link to="/shop" className="w-full sm:w-auto">
                <Button size="md" variant="gold" className="w-full sm:w-auto">
                  Explore Sizes & Prices <ArrowRight size={16} />
                </Button>
              </Link>

              <Button
                size="md"
                variant="whatsapp"
                onClick={() =>
                  openWhatsApp(
                    `Hello ${siteConfig.brandName}! I'm interested in the 3-bottle Flacon Trilogy set. Could you share details?`
                  )
                }
                className="w-full sm:w-auto"
              >
                <MessageSquare size={16} /> Order Trilogy on WhatsApp
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-ink-soft pt-1">
              <ShieldCheck size={14} className="text-gold-500" />
              <span>Complimentary velvet gift packaging included with all flacons</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
