import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Shield } from 'lucide-react';
import { InstagramIcon } from '../ui/Icons';
import { siteConfig } from '../../data/site';

export default function Footer() {
  return (
    <footer className="w-full bg-cream px-4 md:px-8 lg:px-12 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Brand */}
        <span className="font-display text-lg font-bold tracking-[0.14em] uppercase text-gold-700">
          {siteConfig.brandName}
        </span>
        <span className="text-[10px] tracking-[0.2em] text-ink-soft uppercase mt-0.5">
          {siteConfig.tagline}
        </span>

        <div className="w-16 h-px bg-gold-border my-6" />

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
          <Link to="/shop" className="text-sm text-ink-soft hover:text-gold-500 transition-colors font-medium">
            Shop
          </Link>
          <Link to="/contact" className="text-sm text-ink-soft hover:text-gold-500 transition-colors font-medium">
            Contact
          </Link>
          <a
            href={`https://instagram.com/${siteConfig.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-soft hover:text-gold-500 transition-colors font-medium flex items-center gap-1.5"
          >
            <InstagramIcon size={14} /> @{siteConfig.instagramHandle}
          </a>
        </div>

        {/* Contact row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-ink-soft mb-6">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gold-500 transition-colors"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
          <span className="hidden sm:inline text-gold-border">•</span>
          <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 hover:text-gold-500 transition-colors">
            <Phone size={14} /> {siteConfig.phone}
          </a>
          <span className="hidden sm:inline text-gold-border">•</span>
          <span className="flex items-center gap-1.5">
            <Shield size={14} /> 100% Authentic Attar
          </span>
        </div>

        <p className="text-[10px] text-ink-soft/60">
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
