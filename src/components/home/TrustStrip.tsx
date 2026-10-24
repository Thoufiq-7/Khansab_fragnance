import { ShieldCheck, Clock, PackageCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: ShieldCheck,
    title: '100% Alcohol Free',
    desc: 'Pure, uncut attar concentrate with zero synthetic fixatives or harsh spirit.',
  },
  {
    icon: Clock,
    title: 'Long Lasting Sillage',
    desc: 'Formulated to linger on clothing and skin pulse points for 14+ hours.',
  },
  {
    icon: PackageCheck,
    title: 'Secure Velvet Packaging',
    desc: 'Each flacon is nestled in tamper-proof cushioned presentation boxes.',
  },
  {
    icon: Award,
    title: 'Original Khanshab Seal',
    desc: 'Guaranteed authentic heritage formulations verified by our master perfumer.',
  },
];

export function TrustStrip() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-cream/60 border border-gold-border/80 rounded-3xl p-6 sm:p-10 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-700 block mb-2">
            The Khanshab Guarantee
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            Craftsmanship You Can Trust
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/80 rounded-2xl p-5 border border-gold-border/50 flex flex-col items-start gap-3 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-300/20 text-gold-700 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-ink mb-1">{f.title}</h4>
                  <p className="text-xs text-ink-soft leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
