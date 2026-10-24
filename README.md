# ✨ Khanshab Fragrance — Luxury in Every Drop

Production-ready, mobile-first, luxury attar (perfume oil) storefront for **Khanshab Fragrance**. Built with React 18+, Vite, TypeScript, Tailwind CSS, and Framer Motion.

Designed according to royal Arabian perfumery aesthetics with gold foil accents, crystal bottle flacon presentations, and direct **WhatsApp & Phone ordering** (no complex backend or payment gateways required).

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start the local development server
```bash
npm run dev
```

### 3. Build for production
```bash
npm run build
```

---

## 🛠️ Store Owner Guide (How to Customize)

The codebase is built so that anyone without deep technical knowledge can easily update branding, products, and contact details in just two files.

### 1. How to Edit Contact Details & Branding

Open [`src/data/site.ts`](file:///c:/projects/Khansab_fragnance/src/data/site.ts):

```typescript
export const siteConfig = {
  brandName: 'Khanshab Fragrance',
  tagline: 'Luxury in Every Drop',
  phone: '+91 91000 00000',            // Your boutique telephone number
  whatsappNumber: '910000000000',      // WhatsApp number with country code (no '+' or dashes)
  instagramHandle: 'khanshabfragrance',// Instagram username
  email: 'concierge@khanshab.com',
  address: '14 Royal Perfumery Arcade, Nizamuddin West, New Delhi, India',
  currency: '₹',                       // Currency symbol
  whatsappGreeting: 'Hello Khanshab Fragrance! I would like to place an order:',
};
```
Save the file. All pages, headers, footers, phone dialers, and WhatsApp message templates will automatically update across the entire store.

---

### 2. How to Add or Edit Products & Prices

Open [`src/data/products.ts`](file:///c:/projects/Khansab_fragnance/src/data/products.ts):

Each product is a simple object in the `products` array. To add a new attar, copy and paste this template:

```typescript
{
  id: '7',
  slug: 'royal-amber-supreme',
  name: 'Royal Amber Supreme',
  category: 'Oud', // Choose: 'Oud' | 'Musk' | 'Floral' | 'Woody' | 'Gift Sets'
  shortDescription: 'Golden Ambergris & Bourbon Vanilla',
  longDescription: 'A rich, decadent pure attar concentrate...',
  oilColor: '#C9962E', // Hex color for the bottle glow
  image: '/bottle1.png', // Or image URL
  notes: {
    top: ['Sweet Mandarin', 'Incense'],
    heart: ['Golden Ambergris', 'Taif Rose'],
    base: ['Bourbon Vanilla', 'Sandalwood'],
  },
  sizes: [
    { label: '3 ml', price: 499, oldPrice: 599 },
    { label: '6 ml', price: 899, oldPrice: 1099 },
    { label: '12 ml', price: 1599, oldPrice: 1899 },
  ],
  badge: 'Best Seller', // Optional: 'Best Seller' | 'New' | 'Limited'
  inStock: true,
}
```

- **Price changes**: Update the `price` and optional `oldPrice` inside `sizes`.
- **Badges**: Set `badge: 'Best Seller'`, `'New'`, or remove it.
- **Out of stock**: Set `inStock: false`.

---

### 3. How to Replace Images

1. Place your bottle and banner images in the `public/` directory (e.g., `public/bottle1.png`, `public/bottle2.png`).
2. Reference them in `src/data/products.ts` as `image: '/your-image.png'`.
3. The store supports PNG, JPG, and WebP images. Recommended dimensions: `1000 × 1000px` on transparent or soft ivory backdrops.

---

### 4. How to Deploy

#### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository `Khansab_fragnance`.
4. Framework Preset: **Vite** (auto-detected).
5. Click **"Deploy"**.

#### Deploy to Netlify
1. Push your code to GitHub.
2. Sign in to [Netlify](https://netlify.com) and select **"Import an existing project"**.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy"**.

---

## 🎨 Design System & Highlights

- **Palette**: Ivory (`#FFFDF7`), Cream (`#FBF3E0`), Gold (`#C9962E`, `#E6C36A`, `#8A5A12`), Yellow (`#F5C842`), Espresso (`#1B0F08`).
- **Typography**: Cormorant Garamond (headings) & Jost (body).
- **Cart & Order State**: LocalStorage persistent cart with zero-backend WhatsApp checkout builder.
- **Signature Effect**: Scroll-driven floating flacon choreography across key landing sections.
- **Accessibility & Performance**: Strict TypeScript, safe-area inset support for iPhone notches, WCAG contrast compliance, and full keyboard accessibility.
