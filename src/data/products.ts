/**
 * ============================================================
 *  PRODUCT CATALOGUE
 *  To add a product, copy any object below, change the values,
 *  and add it to the `products` array. That's it — no other
 *  file needs to change.
 * ============================================================
 */

export interface ProductSize {
  label: string;   // e.g. "3 ml"
  price: number;   // current price
  oldPrice?: number; // strike-through price (optional)
}

export interface ProductNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Oud' | 'Musk' | 'Floral' | 'Woody' | 'Gift Sets';
  shortDescription: string;
  longDescription: string;
  /** Hex colour used for the bottle glow effect */
  oilColor: string;
  /** Product image URL — use a local path like "/images/product-1.webp" or a remote URL */
  image: string;
  notes: ProductNotes;
  sizes: ProductSize[];
  badge?: 'New' | 'Best Seller' | 'Limited';
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'royal-dehn-al-oud',
    name: 'Royal Dehn Al Oud',
    category: 'Oud',
    shortDescription: 'Aged Cambodian Agarwood & Smoke',
    longDescription:
      'A masterpiece of Arabian perfumery — our signature Royal Dehn Al Oud is steam-distilled from 12-year aged Cambodian agarwood. The opening is a bold, resinous burst of smoky incense, melting into a heart of tanned leather and warm spices. The base lingers for 14+ hours as an earthy, velvety oud skin scent.',
    oilColor: '#8B6914',
    image: '/hero-bottle.jpg',
    notes: {
      top: ['Cambodian Agarwood', 'Sweet Incense Smoke'],
      heart: ['Smoky Leather', 'Labdanum', 'Warm Spices'],
      base: ['Earthy Vetiver', 'Amber', 'Dark Wood'],
    },
    sizes: [
      { label: '3 ml', price: 499, oldPrice: 599 },
      { label: '6 ml', price: 899, oldPrice: 1099 },
      { label: '12 ml', price: 1599, oldPrice: 1899 },
    ],
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: '2',
    slug: 'sultani-golden-amber',
    name: 'Sultani Golden Amber',
    category: 'Woody',
    shortDescription: 'Warm Amber, Vanilla Bean & Benzoin',
    longDescription:
      'Sultani Golden Amber is a warm, enveloping embrace of smoked vanilla and golden benzoin resin. Crafted for those who seek a rich, cozy sillage that wraps you in liquid gold. The maceration process takes 180 days to achieve this depth.',
    oilColor: '#D4A017',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkqQSJuLhb20PsjWLZ_JWKolAwu2s6u2Fu416u7It2aD7LVFzja9BaiZ6tZ_5Bh8TsY9WmEtHPB1QK_Gvcd_Zw85y4VVpATBMYakyAb3_qwYflb0r2TqN749yRceilsEGLB3iSra3AJUFZRr4gA4xxEUU_sia_yUe24tI33OjFrfAh9FMM6pDE7M3CZ8E4KXxQhMZjoZEX2KiW98HsKrWUCoGNk_ikBPgUsXmrUG0',
    notes: {
      top: ['Bergamot', 'Saffron Threads'],
      heart: ['Smoked Vanilla', 'Benzoin Resin', 'Tonka Bean'],
      base: ['Golden Amber', 'Sandalwood', 'Musk'],
    },
    sizes: [
      { label: '3 ml', price: 399 },
      { label: '6 ml', price: 749, oldPrice: 899 },
      { label: '12 ml', price: 1299, oldPrice: 1499 },
    ],
    badge: 'New',
    inStock: true,
  },
  {
    id: '3',
    slug: 'white-musk-al-khas',
    name: 'White Musk Al-Khas',
    category: 'Musk',
    shortDescription: 'Silky Powder, Jasmine & Cashmere Musk',
    longDescription:
      'A heavenly, pristine musk attar that captures the essence of freshly washed linen and delicate jasmine petals. White Musk Al-Khas is perfect for layering and leaves a clean, powdery trail that feels both intimate and expansive.',
    oilColor: '#F5E6D0',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTG8K1XT3Q-IRjEdJ_34gs8jwaL9HZRnCKp9wF4xSKVyghcJ3DOahqMxI1fgR6tkueDWI70ltbq0S0bc8_P5dsgHMM9a1hN50pzXqLEYmO9X24NVnK80H-DtBhohtSn-sbr2p7S5C2YiN871GrzeqYFFtbUZudPlR51fq_HIUboBFfIAZYBTO0VzW4JbLdHr16CkcaRfAqxf2o18I8UYqhC8wvLSxfV8kYD3smefE',
    notes: {
      top: ['Crisp Lily', 'White Jasmine'],
      heart: ['Powdery Cashmere', 'Iris Butter'],
      base: ['Clean Musk', 'Ambrette Seed', 'Soft Cedar'],
    },
    sizes: [
      { label: '3 ml', price: 349, oldPrice: 449 },
      { label: '6 ml', price: 649 },
      { label: '12 ml', price: 1199, oldPrice: 1399 },
    ],
    inStock: true,
  },
  {
    id: '4',
    slug: 'ruh-gulab-taifi',
    name: 'Ruh Gulab Taifi',
    category: 'Floral',
    shortDescription: 'Steam-Distilled Taif Rose & Saffron',
    longDescription:
      'Distilled from hand-picked Damascan roses of the Taif mountains, this attar is the epitome of floral luxury. Each drop contains the essence of over 40 rose petals, blended with threads of royal saffron and a whisper of honey.',
    oilColor: '#C25A7C',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrIrJEYpVQT5l1ZSBWkV8qndfgj1gIVvECsAkYLQ9vWyjmZkZPTMfSYFbM3D8BKrvcvuxOSWfxmpO2uwRdRtCuGHScg4nE37Oe6WeOMPy4jBQE5h6Enb22LHm3x6TYtyJ6elkaNjCzdxbhgDtjTJD4FM_kZqRK5gLZTdWxsPXEyzdcCLY0N-ey5-eA5YAQRn2tM0HoKClzghGJW4WbuyIqDYp5fPT9wlksCCLvkWs',
    notes: {
      top: ['Damascan Rose', 'Saffron Threads'],
      heart: ['Rose Absolute', 'Honey', 'Geranium'],
      base: ['Warm Musk', 'Sandalwood', 'Amber'],
    },
    sizes: [
      { label: '3 ml', price: 449 },
      { label: '6 ml', price: 849, oldPrice: 999 },
      { label: '12 ml', price: 1499, oldPrice: 1799 },
    ],
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: '5',
    slug: 'imperial-mysore-sandal',
    name: 'Imperial Mysore Sandal',
    category: 'Woody',
    shortDescription: 'Creamy Aged Sandalwood & Cardamom',
    longDescription:
      'Sourced from the legendary Mysore sandalwood forests, this attar is a meditation in a bottle. Creamy, warm, and deeply comforting — its woody sweetness is enhanced with green cardamom and a silky vetiver dry-down.',
    oilColor: '#C9962E',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtsNsmpnIh2yxt5aGCoY52M_8F24XITcvgPrB8mGJcS7uu853TrW6y_IUYfFwLmwYet-O6OatFH4eynkr8d1hfWUpzLBY9-XrAmktBm7L_5Nvir17OhOZ9pAYbjYf5J0SrilK9eH_0LbjSp3bwIuOgYswkPVvHWk19oxmz6finvFikodi-EerQlJCAHVIUAmD-HzHYYrG1mFDCgLxYC2Py7_1scgIBsR74bYPi6-g',
    notes: {
      top: ['Green Cardamom', 'Pink Pepper'],
      heart: ['Mysore Sandalwood', 'Creamy Cedar'],
      base: ['Vetiver', 'White Musk', 'Vanilla'],
    },
    sizes: [
      { label: '3 ml', price: 499 },
      { label: '6 ml', price: 949 },
      { label: '12 ml', price: 1699, oldPrice: 1999 },
    ],
    inStock: true,
  },
  {
    id: '6',
    slug: 'royal-discovery-set',
    name: 'Royal Discovery Set',
    category: 'Gift Sets',
    shortDescription: '4 × 3 ml Miniature Crystal Flacons',
    longDescription:
      'The perfect introduction to the world of Khanshab. This curated gift set includes four of our most beloved attars in hand-blown 3 ml crystal flacons, presented in a velvet-lined royal gift box. Includes: Royal Dehn Al Oud, Sultani Golden Amber, White Musk Al-Khas, and Ruh Gulab Taifi.',
    oilColor: '#C9962E',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZXRdigo5foyBu2njzdvngSt_eeUwTlEJl-Lgih-LN-P6zPj1jo3f9zBRd7uSvSGK1hhTEWHfAJw2u9N-03UhpuCIsAIyBvPY8cenn9b6fPSDruWkGJCmO7xLT143aUK3Mk-akKFpGuUlnyelX2UjCHdw7HKD51Hl059siqZjGTv1C_1Uv8NPeHffRDV6_xJN5O97Yw4J_i67sHGVk2csvL7ZkacfTppF7RrIcsMI',
    notes: {
      top: ['Agarwood', 'Rose', 'Bergamot'],
      heart: ['Amber', 'Vanilla', 'Jasmine'],
      base: ['Sandalwood', 'Musk', 'Vetiver'],
    },
    sizes: [{ label: '4 × 3 ml Set', price: 1999, oldPrice: 2499 }],
    badge: 'Limited',
    inStock: true,
  },
];

export const categories = ['All', 'Oud', 'Musk', 'Floral', 'Woody', 'Gift Sets'] as const;
export type Category = (typeof categories)[number];
