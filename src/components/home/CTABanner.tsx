import { MessageSquare, Phone, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { siteConfig } from '../../data/site';
import { openWhatsApp } from '../../lib/whatsapp';

export function CTABanner() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-espresso text-ivory border border-gold-500/40 p-8 sm:p-12 md:p-16 shadow-[0_20px_60px_rgba(27,15,8,0.5)]">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles size={13} />
            <span>Personal Fragrance Consultation</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ivory leading-tight">
            Need Help Choosing Your Signature Scent?
          </h2>

          <p className="text-sm sm:text-base text-ivory/80 font-body leading-relaxed max-w-lg mx-auto">
            Speak directly with our attar specialists. Share your scent preferences and occasion,
            and we will handpick the ideal blend for your body chemistry.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              variant="whatsapp"
              onClick={() => openWhatsApp('Hello Khanshab Fragrance! I need fragrance guidance.')}
              className="w-full sm:w-auto shadow-lg"
            >
              <MessageSquare size={18} /> Chat on WhatsApp
            </Button>

            <a href={`tel:${siteConfig.phone}`} className="w-full sm:w-auto">
              <Button size="lg" variant="dark" className="w-full sm:w-auto">
                <Phone size={18} /> Call Us: {siteConfig.phone}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
