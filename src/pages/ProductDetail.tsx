import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Clock,
  Droplets,
  Share2,
} from 'lucide-react';
import { products, type ProductSize } from '../data/products';
import { formatPrice } from '../lib/format';
import { useOrder } from '../context/OrderContext';
import { openWhatsApp, buildSingleProductMessage } from '../lib/whatsapp';
import { SizeSelector } from '../components/ui/SizeSelector';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProductCard } from '../components/shop/ProductCard';
import { siteConfig } from '../data/site';
import { pageVariants } from '../lib/motion';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useOrder();

  const product = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [slug]);

  // Selected size state
  const [selectedSize, setSelectedSize] = useState<ProductSize>(() => {
    return product?.sizes[0] || { label: '3 ml', price: 499 };
  });

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddedToast, setIsAddedToast] = useState(false);

  // Fallback if not found
  if (!product) {
    return (
      <div className="py-24 px-4 text-center space-y-4">
        <h2 className="font-display text-3xl font-bold text-ink">Attar Not Found</h2>
        <p className="text-sm text-ink-soft">
          The requested fragrance does not exist or has been retired.
        </p>
        <Link to="/shop">
          <Button variant="gold" size="md">
            Return to Collection
          </Button>
        </Link>
      </div>
    );
  }

  const galleryImages = [
    product.image || '/bottle1.png',
    '/bottle2.png',
  ];

  const discountPercentage = selectedSize.oldPrice
    ? Math.round(((selectedSize.oldPrice - selectedSize.price) / selectedSize.oldPrice) * 100)
    : 0;

  const handleAddToOrder = () => {
    addItem(product, selectedSize, quantity);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2000);
  };

  const handleWhatsAppBuy = () => {
    const msg = buildSingleProductMessage(product, selectedSize, quantity);
    openWhatsApp(msg);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} — ${siteConfig.brandName}`,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.badge === 'Best Seller'))
    .slice(0, 3);

  // JSON-LD structured schema for rich Google results
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: galleryImages,
    description: product.longDescription,
    brand: {
      '@type': 'Brand',
      name: siteConfig.brandName,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: selectedSize.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 md:pb-12"
    >
      <Helmet>
        <title>{product.name} — Pure Attar Oil | {siteConfig.brandName}</title>
        <meta name="description" content={product.shortDescription} />
        <meta property="og:title" content={`${product.name} | ${siteConfig.brandName}`} />
        <meta property="og:description" content={product.shortDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Navigation & Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs uppercase font-semibold text-ink-soft hover:text-ink transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <button
          onClick={handleShare}
          aria-label="Share product"
          className="w-9 h-9 rounded-full border border-gold-border flex items-center justify-center text-ink-soft hover:text-ink hover:bg-cream transition-colors"
        >
          <Share2 size={16} />
        </button>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-b from-cream via-cream/60 to-ivory border border-gold-border/80 p-8 flex items-center justify-center overflow-hidden shadow-[0_12px_40px_rgba(201,150,46,0.12)]">
            {/* Ambient Oil Glow Backdrop */}
            <div
              className="absolute w-64 h-64 rounded-full blur-3xl opacity-60 pointer-events-none"
              style={{
                backgroundColor: product.oilColor || '#C9962E',
              }}
            />

            {/* Podium Base */}
            <div className="absolute bottom-6 w-3/4 h-8 bg-gradient-to-r from-cream via-white to-cream rounded-full border border-gold-border shadow-md" />

            {/* Bottle Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={galleryImages[activeImageIndex]}
                alt={product.name}
                className="relative z-10 max-h-[82%] max-w-[82%] object-contain drop-shadow-[0_20px_35px_rgba(138,90,18,0.3)] filter contrast-105"
              />
            </AnimatePresence>

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 z-20">
                <Badge variant={product.badge === 'Best Seller' ? 'bestSeller' : 'new'}>
                  {product.badge}
                </Badge>
              </div>
            )}
          </div>

          {/* Gallery Thumbnails */}
          <div className="flex gap-3 mt-4">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`w-16 h-16 rounded-2xl bg-cream border p-1 transition-all overflow-hidden ${
                  activeImageIndex === i
                    ? 'border-gold-500 shadow-md ring-2 ring-gold-500/20'
                    : 'border-gold-border/60 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Purchase Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-gold-700 block mb-1">
              {product.category} Attar
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              {product.name}
            </h1>
            <p className="text-sm text-ink-soft mt-1 italic">
              "{product.shortDescription}"
            </p>
          </div>

          {/* Price with Animated Number & Discount */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-gold-border/50">
            <motion.span
              key={selectedSize.price}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-4xl font-bold text-gold-700"
            >
              {formatPrice(selectedSize.price)}
            </motion.span>

            {selectedSize.oldPrice && (
              <span className="text-base text-ink-soft/70 line-through">
                {formatPrice(selectedSize.oldPrice)}
              </span>
            )}

            {discountPercentage > 0 && (
              <Badge variant="discount">Save {discountPercentage}%</Badge>
            )}

            <span className="text-xs text-ink-soft ml-auto">
              (Includes taxes & presentation packaging)
            </span>
          </div>

          {/* Size Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-ink uppercase tracking-wider">
                Select Flacon Size
              </span>
              <span className="text-gold-700 font-medium">Standard Attar Concentrates</span>
            </div>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
          </div>

          {/* Quantity Stepper & Desktop Add Buttons */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-ink uppercase tracking-wider block">
              Quantity
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <QuantityStepper value={quantity} onChange={setQuantity} />

              <div className="flex-1 flex gap-3 min-w-[280px]">
                <Button
                  onClick={handleAddToOrder}
                  variant="gold"
                  size="md"
                  className="flex-1"
                >
                  <ShoppingBag size={18} /> Add to Order
                </Button>

                <Button
                  onClick={handleWhatsAppBuy}
                  variant="whatsapp"
                  size="md"
                  className="flex-1"
                >
                  <MessageSquare size={18} /> WhatsApp Buy
                </Button>
              </div>
            </div>
          </div>

          {/* Olfactory Notes Architecture */}
          <div className="p-5 rounded-2xl bg-cream/70 border border-gold-border/70 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-gold-500" />
              <h3 className="font-display text-base font-bold text-ink uppercase tracking-wider">
                Fragrance Pyramid
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white/70 rounded-xl border border-gold-border/50">
                <span className="text-[10px] font-bold text-gold-700 uppercase block mb-1">
                  Top Notes
                </span>
                <p className="text-ink font-medium leading-relaxed">
                  {product.notes.top.join(', ')}
                </p>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-gold-border/50">
                <span className="text-[10px] font-bold text-gold-700 uppercase block mb-1">
                  Heart Notes
                </span>
                <p className="text-ink font-medium leading-relaxed">
                  {product.notes.heart.join(', ')}
                </p>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-gold-border/50">
                <span className="text-[10px] font-bold text-gold-700 uppercase block mb-1">
                  Base Notes
                </span>
                <p className="text-ink font-medium leading-relaxed">
                  {product.notes.base.join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-display text-base font-bold text-ink">The Scent Experience</h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-body">
              {product.longDescription}
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-ink-soft">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-gold-border/50">
              <Droplets size={16} className="text-gold-500" />
              <span>100% Pure Alcohol-Free</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-gold-border/50">
              <Clock size={16} className="text-gold-500" />
              <span>14+ Hours Wear Time</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-gold-border/50">
              <ShieldCheck size={16} className="text-gold-500" />
              <span>Tamper-proof Seal</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-gold-border/50">
              <Sparkles size={16} className="text-gold-500" />
              <span>Crystal Cut Applicator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products "You May Also Like" */}
      <div className="mt-16 pt-12 border-t border-gold-border/60">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-700 block mb-1">
            Complementary Blends
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            You May Also Like
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="fixed bottom-16 left-0 right-0 p-3 bg-ivory/95 backdrop-blur-xl border-t border-gold-border md:hidden z-40 flex items-center justify-between gap-3 shadow-[0_-8px_20px_rgba(0,0,0,0.08)]">
        <div>
          <span className="text-[10px] text-ink-soft block">
            {selectedSize.label} × {quantity}
          </span>
          <span className="font-display text-lg font-bold text-gold-700">
            {formatPrice(selectedSize.price * quantity)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="gold"
            onClick={handleAddToOrder}
            className="text-xs px-3"
          >
            <ShoppingBag size={14} /> Add
          </Button>

          <Button
            size="sm"
            variant="whatsapp"
            onClick={handleWhatsAppBuy}
            className="text-xs px-3"
          >
            <MessageSquare size={14} /> Buy
          </Button>
        </div>
      </div>

      {/* Added Toast Notification */}
      <AnimatePresence>
        {isAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed top-20 right-4 z-50 bg-espresso text-ivory px-4 py-3 rounded-2xl shadow-2xl border border-gold-500/40 text-xs flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            <span>Added <strong>{product.name} ({selectedSize.label})</strong> to order!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
