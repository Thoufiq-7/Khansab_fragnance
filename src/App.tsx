import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { OrderProvider } from './context/OrderContext';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
      <div className="w-10 h-10 border-2 border-gold-300 border-t-gold-700 rounded-full animate-spin" />
      <span className="text-xs uppercase font-medium tracking-widest text-gold-700">
        Khanshab Fragrance
      </span>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HelmetProvider>
        <OrderProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="attar/:slug" element={<ProductDetail />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </OrderProvider>
      </HelmetProvider>
    </MotionConfig>
  );
}
