import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { InstagramIcon } from '../components/ui/Icons';
import { siteConfig } from '../data/site';
import { openWhatsAppConsultation, openWhatsApp } from '../lib/whatsapp';
import { Button } from '../components/ui/Button';
import { pageVariants } from '../lib/motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: [] as string[],
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const noteOptions = ['Oud & Woody', 'Musk & Powdery', 'Taif Rose & Floral', 'Sweet Amber', 'Fresh Citrus'];

  const toggleNote = (note: string) => {
    setFormData((prev) => ({
      ...prev,
      notes: prev.notes.includes(note)
        ? prev.notes.filter((n) => n !== note)
        : [...prev.notes, note],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    openWhatsAppConsultation(formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const steps = [
    {
      num: '01',
      title: 'Choose Your Attars',
      desc: 'Browse our collection, select flacon sizes, or ask for bespoke olfactory recommendations.',
    },
    {
      num: '02',
      title: 'Send Order on WhatsApp',
      desc: 'Click "Send Order" or chat with us. Confirm your shipping address and preferred delivery timing.',
    },
    {
      num: '03',
      title: 'Receive & Cherish',
      desc: 'Your pure attar arrives securely packed in luxury velvet flacon boxes with guaranteed purity.',
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16"
    >
      <Helmet>
        <title>Contact & How to Order | {siteConfig.brandName}</title>
        <meta
          name="description"
          content="Contact Khanshab Fragrance via WhatsApp or phone. Learn how to order pure attar perfume oils with direct assistance."
        />
      </Helmet>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-700 block mb-2">
          Direct Customer Service
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink">
          Connect With Khanshab
        </h1>
        <p className="text-sm sm:text-base text-ink-soft mt-3">
          We believe luxury is a personal relationship. Connect directly with our attar artisans for orders, consultations, and gifting queries.
        </p>
      </div>

      {/* 3 Channel Cards (WhatsApp, Phone, Instagram) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp Card */}
        <div className="bg-white rounded-3xl p-6 border border-gold-border/70 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink">WhatsApp Ordering</h3>
              <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                Instant order placement, real-time consultation, and parcel tracking updates.
              </p>
            </div>
          </div>
          <Button
            variant="whatsapp"
            size="md"
            onClick={() => openWhatsApp(siteConfig.whatsappGreeting)}
            className="w-full mt-6"
          >
            Chat Now
          </Button>
        </div>

        {/* Direct Call Card */}
        <div className="bg-white rounded-3xl p-6 border border-gold-border/70 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-700 flex items-center justify-center">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink">Direct Telephone</h3>
              <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                Speak directly with our boutique manager during store hours.
              </p>
            </div>
          </div>
          <a href={`tel:${siteConfig.phone}`} className="w-full mt-6">
            <Button variant="outline" size="md" className="w-full">
              Call {siteConfig.phone}
            </Button>
          </a>
        </div>

        {/* Instagram Card */}
        <div className="bg-white rounded-3xl p-6 border border-gold-border/70 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
              <InstagramIcon size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink">Instagram Community</h3>
              <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                Follow our distillation stories, customer testimonials, and new release drops.
              </p>
            </div>
          </div>
          <a
            href={`https://instagram.com/${siteConfig.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-6"
          >
            <Button variant="ghost" size="md" className="w-full border border-gold-border">
              @{siteConfig.instagramHandle}
            </Button>
          </a>
        </div>
      </div>

      {/* How To Order (3 Steps) */}
      <div className="bg-cream/60 rounded-3xl p-8 sm:p-12 border border-gold-border/80">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-700 block mb-1">
            Effortless Experience
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            How Direct WhatsApp Ordering Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, i) => (
            <div key={i} className="bg-white/90 rounded-2xl p-6 border border-gold-border/60 relative flex flex-col">
              <span className="font-display text-4xl font-bold text-gold-300/80 mb-2">
                {st.num}
              </span>
              <h3 className="font-display text-lg font-bold text-ink mb-1.5">{st.title}</h3>
              <p className="text-xs text-ink-soft leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Form & Studio Address */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gold-border/80 shadow-xs">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-700 block mb-1">
              Bespoke Assistance
            </span>
            <h2 className="font-display text-2xl font-bold text-ink">
              Send a Fragrance Query
            </h2>
            <p className="text-xs text-ink-soft mt-1">
              Fill in your details below and we will automatically open WhatsApp with your tailored query.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tariq Khan"
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-border text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-border text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink block mb-2">
                Preferred Olfactory Profiles
              </label>
              <div className="flex flex-wrap gap-2">
                {noteOptions.map((opt) => {
                  const isSelected = formData.notes.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleNote(opt)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        isSelected
                          ? 'bg-gold-500 text-white border-gold-500 shadow-xs'
                          : 'bg-cream/60 text-ink-soft border-gold-border hover:border-gold-300'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink block mb-1">Your Message</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what you're looking for, special occasions, or delivery inquiries..."
                className="w-full px-4 py-2.5 rounded-xl border border-gold-border text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
              />
            </div>

            <Button type="submit" variant="whatsapp" size="lg" className="w-full">
              <Send size={16} /> Send via WhatsApp
            </Button>

            {isSubmitted && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                <span>Redirecting to WhatsApp to send your message...</span>
              </div>
            )}
          </form>
        </div>

        {/* Studio Info */}
        <div className="lg:col-span-5 bg-cream/70 rounded-3xl p-6 sm:p-8 border border-gold-border/80 space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-700 block mb-1">
              Atelier & Store
            </span>
            <h3 className="font-display text-xl font-bold text-ink">Visit Our Studio</h3>
          </div>

          <div className="space-y-4 text-xs text-ink-soft">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gold-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink block mb-0.5">Address</strong>
                <p className="leading-relaxed">{siteConfig.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={18} className="text-gold-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink block mb-0.5">Boutique Hours</strong>
                <p className="leading-relaxed">
                  Monday – Saturday: 10:30 AM – 9:00 PM<br />
                  Sunday: 12:00 PM – 8:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-gold-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink block mb-0.5">Fragrance Tasting</strong>
                <p className="leading-relaxed">
                  Private scent evaluations and bespoke flacon customisation available by appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
