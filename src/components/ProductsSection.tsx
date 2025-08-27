'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { products, categories, Product } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  // Use all products from the data file (already has 10 products)
  const allProducts = products;

  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(product => {
        const matches = product.category === selectedCategory || 
          (product.categories && product.categories.includes(selectedCategory));
        return matches;
      });

  // Responsive carousel logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2); // Tablet: 2 cards
      } else {
        setCardsPerSlide(3); // Desktop: 3 cards
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(filteredProducts.length / cardsPerSlide);
  const visibleProducts = filteredProducts.slice(currentSlide * cardsPerSlide, (currentSlide + 1) * cardsPerSlide);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (newDirection > 0 && currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    } else if (newDirection < 0 && currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleDragEnd = (event: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  // Reset to first slide when category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCategory]);

  // Reset to first slide when cards per slide changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [cardsPerSlide]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header with Animation */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
                    <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4 font-heading"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Premium Honey Collection
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our carefully curated selection of natural, sustainable honey products.
            Each jar is harvested with care and tested for the highest quality standards.
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
            transition={{ duration: 0.6, delay: 1 }}
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

          {/* Products Carousel with 3D Transforms */}
          <div className="overflow-hidden perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 500, damping: 25 },
                  opacity: { duration: 0.1 },
                  scale: { type: "spring", stiffness: 500, damping: 25 },
                  rotateY: { type: "spring", stiffness: 500, damping: 25 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="flex gap-8"
              >
                {visibleProducts.map((product, index) => (
                  <motion.div 
                    key={product.id}
                    className="flex-1 min-w-0"
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 400
                    }}
                    whileHover={{ 
                      y: -10,
                      scale: 1.02,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Slide Indicators */}
          <motion.div 
            className="flex justify-center mt-8 space-x-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {Array.from({ length: totalSlides }, (_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-yellow-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                animate={{
                  scale: currentSlide === index ? 1.2 : 1,
                  backgroundColor: currentSlide === index ? "#d97706" : "#d1d5db"
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </motion.div>

          {/* Enhanced Slide Counter */}
          <motion.div 
            className="text-center mt-4 text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.span
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentSlide + 1} of {totalSlides} • {filteredProducts.length} products
            </motion.span>
          </motion.div>
        </div>

        {/* Empty State with Animation */}
        {filteredProducts.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🍯
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category or check back later.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
