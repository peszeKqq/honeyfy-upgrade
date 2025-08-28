'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

interface ProductsSectionProps {
  locale?: 'en' | 'nl' | 'pl';
}

export default function ProductsSection({ locale = 'en' }: ProductsSectionProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Translation object for the section
  const translations = {
    en: {
      title: "Our Premium Honey Collection",
      description: "Discover our carefully curated selection of natural, sustainable honey products. Each jar is harvested with care and tested for the highest quality standards."
    },
    nl: {
      title: "Onze Premium Honing Collectie",
      description: "Ontdek onze zorgvuldig geselecteerde collectie van natuurlijke, duurzame honingproducten. Elke pot wordt met zorg geoogst en getest op de hoogste kwaliteitsstandaarden."
    },
    pl: {
      title: "Nasza Premium Kolekcja Miodu",
      description: "Odkryj naszą starannie wyselekcjonowaną kolekcję naturalnych, zrównoważonych produktów miodowych. Każdy słoik jest zbierany z troską i testowany według najwyższych standardów jakości."
    }
  };

  const t = translations[locale];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => 
        product.category === selectedCategory || 
        (product.categories && product.categories.includes(selectedCategory))
      );

  // Calculate total slides based on filtered products
  const productsPerSlide = 3;
  const totalSlides = Math.ceil(filteredProducts.length / productsPerSlide);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const paginate = (direction: number) => {
    const newSlide = currentSlide + direction;
    if (newSlide >= 0 && newSlide < totalSlides) {
      setCurrentSlide(newSlide);
    }
  };

  const handleProductClick = (productSlug: string) => {
    const basePath = locale === 'en' ? '' : `/${locale}`;
    router.push(`${basePath}/products/${productSlug}`);
  };

  // Get current slide products
  const getCurrentSlideProducts = () => {
    const startIndex = currentSlide * productsPerSlide;
    return filteredProducts.slice(startIndex, startIndex + productsPerSlide);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-amber-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Enhanced Typography */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4 font-heading"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t.description}
          </motion.p>
        </motion.div>

        {/* Category Filter with Stagger Animation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                category === "SALE!"
                  ? selectedCategory === category
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                    : 'bg-gradient-to-r from-red-400 to-orange-400 text-white hover:from-red-500 hover:to-orange-500 border border-red-300'
                  : selectedCategory === category
                    ? 'bg-yellow-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 300
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Advanced Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons with 3D Effects */}
          <motion.button
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 flex items-center justify-center ${
              currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            whileHover={{ 
              scale: 1.1, 
              rotateY: -15,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.svg 
              className="w-7 h-7 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: -3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
          </motion.button>

          <motion.button
            onClick={() => paginate(1)}
            disabled={currentSlide >= totalSlides - 1}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 flex items-center justify-center ${
              currentSlide >= totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            whileHover={{ 
              scale: 1.1, 
              rotateY: 15,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.svg 
              className="w-7 h-7 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: 3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>

          {/* Products Grid with Enhanced Carousel */}
          <div 
            className="overflow-hidden rounded-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${currentSlide}`}
                                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              >
                                 {getCurrentSlideProducts().map((product, index) => (
                   <motion.div
                     key={product.id}
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ 
                       duration: 0.5, 
                       delay: index * 0.1,
                       type: "spring",
                       stiffness: 300
                     }}
                     whileHover={{ 
                       y: -10,
                       scale: 1.02,
                       transition: { duration: 0.2 }
                     }}
                     onClick={() => handleProductClick(product.slug)}
                     className="cursor-pointer group h-full"
                   >
                     <ProductCard product={product} locale={locale} />
                   </motion.div>
                 ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Pagination Dots */}
          {totalSlides > 1 && (
            <motion.div 
              className="flex justify-center mt-8 space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              {Array.from({ length: totalSlides }, (_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-yellow-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Call-to-Action Section */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          {/* Assuming Link is from next/link or a similar component */}
          {/* For now, using a simple anchor tag as a placeholder */}
          <a
            href={locale === 'en' ? '/products' : `/${locale}/products`}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <span className="mr-2">
              {locale === 'en' ? 'View All Products' : 
               locale === 'nl' ? 'Bekijk Alle Producten' : 
               'Zobacz Wszystkie Produkty'}
            </span>
            <motion.svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
