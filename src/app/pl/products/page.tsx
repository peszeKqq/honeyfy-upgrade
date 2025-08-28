'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import StructuredData from '@/components/StructuredData';
import { generateProductsMetaTags, generateBreadcrumbStructuredData } from '@/lib/seo';
import { useTranslation } from '@/lib/translations';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function PolishProductsPage() {
  const router = useRouter();
  const t = useTranslation('pl');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Category mapping: Polish display names to English category names
  const categoryMapping = {
    'Wszystko': 'All',
    'Bestseller': 'Bestseller',
    'Premium': 'Premium',
    'Klasyczny': 'Classic',
    'Superfood': 'Superfood',
    'Miód Owocowy': 'Fruit Honey',
    'Wellness': 'Wellness',
    'Ciemny Miód': 'Dark Honey',
    'Wyprzedaż': 'SALE!'
  };

  // Debug logging
  console.log('Available categories:', categories);
  console.log('Products:', products.map(p => ({ name: p.name, category: p.category, categories: p.categories })));

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollY + windowHeight > documentHeight - 200; // 200px from bottom
      
      setShowScrollTop(scrollY > 50 || isNearBottom); // Show when scrolling or near bottom
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => {
        const matches = product.category === selectedCategory || 
          (product.categories && product.categories.includes(selectedCategory));
        console.log(`Product: ${product.name}, Category: ${product.category}, Categories: ${product.categories}, Selected: ${selectedCategory}, Matches: ${matches}`);
        return matches;
      });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleProductClick = (productSlug: string) => {
    router.push(`/pl/products/${productSlug}`);
  };

  const handleCategoryClick = (polishCategoryName: string) => {
    const englishCategoryName = categoryMapping[polishCategoryName as keyof typeof categoryMapping];
    console.log('Category clicked:', polishCategoryName, '->', englishCategoryName);
    setSelectedCategory(englishCategoryName);
  };

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Strona Główna', url: 'http://localhost:3000/pl' },
    { name: 'Produkty', url: 'http://localhost:3000/pl/products' }
  ]);

  return (
    <>
      <HreflangTagsServer pathname="/pl/products" currentLocale="pl" />
      
      {/* Structured Data for SEO */}
      <StructuredData data={breadcrumbData} />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl font-bold text-gray-900 mb-6 font-heading"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nasza Kolekcja Miodu
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Odkryj naszą starannie wyselekcjonowaną kolekcję premium naturalnych produktów miodowych. 
            Każdy słoik jest zbierany z troską i testowany według najwyższych standardów jakości.
          </motion.p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {Object.keys(categoryMapping).map((polishCategoryName, index) => (
                <motion.button
                  key={polishCategoryName}
                  onClick={() => handleCategoryClick(polishCategoryName)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === categoryMapping[polishCategoryName as keyof typeof categoryMapping]
                      ? 'bg-yellow-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {polishCategoryName}
                </motion.button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="name">Sortuj według Nazwy</option>
                  <option value="price-low">Cena: Od Najniższej</option>
                  <option value="price-high">Cena: Od Najwyższej</option>
                  <option value="rating">Sortuj według Oceny</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Count */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 font-body">
            Znaleziono {sortedProducts.length} {sortedProducts.length === 1 ? 'produkt' : sortedProducts.length < 5 ? 'produkty' : 'produktów'}
          </p>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleProductClick(product.slug)}
              >
                <ProductCard product={product} locale="pl" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Products Found */}
        {sortedProducts.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-6xl mb-4">🍯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Nie znaleziono produktów</h3>
            <p className="text-gray-600 font-body">Spróbuj inną kategorię lub termin wyszukiwania</p>
          </motion.div>
        )}

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg z-50"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
