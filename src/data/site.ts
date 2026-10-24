/**
 * ============================================================
 *  SITE CONFIGURATION
 *  Edit the values below to update your store's branding,
 *  contact details and WhatsApp messages.
 * ============================================================
 */

export const siteConfig = {
  /** Brand name shown in the header, footer and meta tags */
  brandName: 'Khanshab Fragrance',

  /** Tagline shown below the logo */
  tagline: 'Luxury in Every Drop',

  /** Phone number used for "Call to Order" (with country code) */
  phone: '+910000000000',

  /** WhatsApp number WITHOUT the "+" sign (digits only) */
  whatsappNumber: '910000000000',

  /** Instagram handle (without the @) */
  instagramHandle: 'KhanshabFragrance',

  /** Email address */
  email: 'orders@khanshabfragrance.com',

  /** Physical address */
  address: 'Khanshab Parfumerie, Perfume District, Dubai, UAE',

  /** Currency symbol shown before prices */
  currency: '₹',

  /** WhatsApp greeting text (appears at the start of every order message) */
  whatsappGreeting:
    'Assalamu Alaikum, I would like to place an order with Khanshab Fragrance.',

  /** SEO defaults */
  seo: {
    title: 'Khanshab Fragrance — Luxury Attar & Perfume Oils',
    description:
      'Discover pure, handcrafted attar perfume oils by Khanshab Fragrance. 100% alcohol-free, long-lasting luxury in every drop. Order via WhatsApp.',
    url: 'https://khanshabfragrance.com',
    ogImage: '/og-image.jpg',
  },
} as const;

export type SiteConfig = typeof siteConfig;
