'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import StructuredData from '@/components/StructuredData';
import { generateProductsMetaTags, generateBreadcrumbStructuredData } from '@/lib/seo';

export default function ProductsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showScrollTop, setShowScrollTop] = useState(false);

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
    router.push(`/products/${productSlug}`);
  };

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://honeyfy.nl' },
    { name: 'Products', url: 'https://honeyfy.nl/products' }
  ]);

  return (
    <>
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
            Our Honey Collection
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our carefully curated selection of premium natural honey products. 
            Each jar is harvested with care and tested for the highest quality standards.
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
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => {
                    console.log('Category clicked:', category);
                    setSelectedCategory(category);
                  }}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-yellow-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {category}
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
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Sort by Rating</option>
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
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
            {selectedCategory !== 'All' && ` (Filtered by: ${selectedCategory})`}
          </p>
          {/* Debug info */}
          <div className="text-xs text-gray-400 mt-2">
            Debug: Selected category: "{selectedCategory}" | 
            Products with this category: {products.filter(p => p.category === selectedCategory || (p.categories && p.categories.includes(selectedCategory))).length}
          </div>
        </motion.div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => handleProductClick(product.slug)}
                  className="cursor-pointer"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                                     <div className="flex items-center space-x-4">
                     {/* Product Image - Small and compact for list view */}
                     <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                       {product.image.startsWith('/') ? (
                         <img
                           src={product.image}
                           alt={product.name}
                           className="w-full h-full object-cover rounded-lg"
                         />
                       ) : (
                         <span className="text-xl sm:text-2xl">{product.image}</span>
                       )}
                     </div>

                     {/* Product Info - Compact layout */}
                     <div className="flex-1 min-w-0">
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                         <div className="flex-1 min-w-0">
                           <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
                           <p className="text-sm text-gray-600 mb-2 line-clamp-1 sm:line-clamp-2">
                             {product.description}
                           </p>
                           <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                             <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                               {product.category}
                             </span>
                             <span className="hidden sm:inline">•</span>
                             <span>{product.weight}</span>
                             <span className="hidden sm:inline">•</span>
                             <div className="flex text-yellow-400">
                               {[...Array(5)].map((_, i) => (
                                 <span key={i} className="text-xs">{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                               ))}
                             </div>
                             <span>({product.reviews})</span>
                           </div>
                         </div>
                         <div className="flex items-center space-x-3 sm:space-x-4">
                           <div className="text-right">
                             <div className="text-lg sm:text-xl font-bold text-gray-900">
                               €{product.price.toFixed(2)}
                             </div>
                             {product.originalPrice && (
                               <div className="text-xs sm:text-sm text-gray-500 line-through">
                                 €{product.originalPrice.toFixed(2)}
                               </div>
                             )}
                           </div>
                           <motion.button
                             onClick={() => handleProductClick(product.slug)}
                             className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center space-x-1 sm:space-x-2 text-sm"
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                           >
                             <span>View</span>
                             <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                             </svg>
                           </motion.button>
                         </div>
                       </div>
                     </div>
                   </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-8xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🍯
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try selecting a different category or check back later.
            </p>
            <motion.button
              onClick={() => setSelectedCategory('All')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Products
            </motion.button>
          </motion.div>
                 )}

         {/* Scroll to Top Button - Always visible when scrolling */}
         <AnimatePresence>
           {showScrollTop && (
             <motion.button
               onClick={scrollToTop}
               className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-white"
               initial={{ opacity: 0, scale: 0, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0, y: 20 }}
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
