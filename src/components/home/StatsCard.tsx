import { motion } from 'framer-motion';
import { Award, Droplets, Users } from 'lucide-react';

export function StatsCard() {
  const stats = [
    {
      icon: Droplets,
      number: '100%',
      label: 'Pure & Alcohol-Free',
      description: 'Zero synthetics, uncut pure oil',
    },
    {
      icon: Award,
      number: '14+ Hrs',
      label: 'Enduring Sillage',
      description: 'Slow release on warm skin pulse points',
    },
    {
      icon: Users,
      number: '5,000+',
      label: 'Fragrance Connoisseurs',
      description: 'Satisfied patrons across India',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-6 sm:-mt-10 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl border border-gold-300/40 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(201,150,46,0.12)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-gold-border/60">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`flex items-start gap-4 ${
                  i !== 0 ? 'pt-6 md:pt-0 md:pl-8' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-cream border border-gold-border flex items-center justify-center flex-shrink-0 text-gold-700 shadow-xs">
                  <Icon size={24} />
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                    {s.number}
                  </div>
                  <div className="font-display text-base font-semibold text-gold-700 mt-0.5">
                    {s.label}
                  </div>
                  <div className="text-xs text-ink-soft mt-1 leading-relaxed">
                    {s.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
