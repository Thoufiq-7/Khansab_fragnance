import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { products, type Product } from '../data/products';
import { SearchBar } from '../components/shop/SearchBar';
import { CategoryPills, type CategoryOption } from '../components/shop/CategoryPills';
import { SortControls, type SortOption } from '../components/shop/SortControls';
import { ProductGrid } from '../components/shop/ProductGrid';
import { siteConfig } from '../data/site';
import { pageVariants } from '../lib/motion';

export default function Shop() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryOption>('All');
  const [sort, setSort] = useState<SortOption>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((p: Product) => {
        const matchesCategory = category === 'All' || p.category === category;
        const query = search.toLowerCase().trim();
        const matchesSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          [...p.notes.top, ...p.notes.heart, ...p.notes.base].some((n) =>
            n.toLowerCase().includes(query)
          );
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const priceA = a.sizes[0]?.price ?? 0;
        const priceB = b.sizes[0]?.price ?? 0;

        if (sort === 'price-asc') return priceA - priceB;
        if (sort === 'price-desc') return priceB - priceA;
        if (sort === 'name') return a.name.localeCompare(b.name);
        // default featured
        if (a.badge === 'Best Seller' && b.badge !== 'Best Seller') return -1;
        if (b.badge === 'Best Seller' && a.badge !== 'Best Seller') return 1;
        return 0;
      });
  }, [search, category, sort]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <Helmet>
        <title>The Attar Collection | {siteConfig.brandName}</title>
        <meta
          name="description"
          content="Explore our complete catalogue of concentrated attars, pure oud oils, Kashmiri musk, and rare floral extracts. Order directly on WhatsApp."
        />
      </Helmet>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-700 block mb-2">
          Pure Concentrated Oils
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink">
          The Attar Collection
        </h1>
        <p className="text-sm sm:text-base text-ink-soft mt-3">
          Steam-distilled without alcohol or synthetics. Every bottle is hand-poured with love and reverence.
        </p>
      </div>

      {/* Controls: Search, Categories, Sort */}
      <div className="space-y-6 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <SearchBar value={search} onChange={setSearch} />
          <SortControls value={sort} onChange={setSort} />
        </div>

        <div className="flex items-center justify-between border-b border-gold-border/40 pb-4">
          <CategoryPills selected={category} onSelect={setCategory} />
          <span className="text-xs text-ink-soft whitespace-nowrap hidden sm:inline ml-4">
            Showing <strong className="text-ink">{filteredProducts.length}</strong> attars
          </span>
        </div>
      </div>

      {/* Grid */}
      <ProductGrid products={filteredProducts} />
    </motion.div>
  );
}
