import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/home/HeroSection';
import { TrilogyShowcase } from '../components/home/TrilogyShowcase';
import { StatsCard } from '../components/home/StatsCard';
import { NotesMarquee } from '../components/home/NotesMarquee';
import { BrandStory } from '../components/home/BrandStory';
import { TrustStrip } from '../components/home/TrustStrip';
import { BestSellersCarousel } from '../components/home/BestSellersCarousel';
import { CTABanner } from '../components/home/CTABanner';
import { siteConfig } from '../data/site';
import { pageVariants } from '../lib/motion';

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      <Helmet>
        <title>{siteConfig.brandName} — {siteConfig.tagline} | Pure Artisanal Attar</title>
        <meta
          name="description"
          content="Handcrafted luxury Arabian attars and perfume oils. 100% alcohol-free pure oils steam-distilled from Cambodia oud, Taif rose, and Kashmir musk."
        />
        <meta property="og:title" content={`${siteConfig.brandName} — ${siteConfig.tagline}`} />
        <meta
          property="og:description"
          content="Luxury in every drop. Explore pure artisanal perfume oils and attars."
        />
        <meta property="og:type" content="website" />
      </Helmet>


      <HeroSection />
      <TrilogyShowcase />
      <StatsCard />
      <NotesMarquee />
      <BrandStory />
      <TrustStrip />
      <BestSellersCarousel />
      <CTABanner />
    </motion.div>
  );
}
