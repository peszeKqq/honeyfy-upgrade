'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { getTranslatedProduct, getTranslatedCategory } from '@/lib/productTranslations';

interface ProductCardProps {
  product: Product;
  locale?: 'en' | 'nl' | 'pl';
}

export default function ProductCard({ product, locale = 'en' }: ProductCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();

  // Get translated product data
  const translatedProduct = getTranslatedProduct(product.slug, locale);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    addItem(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleCardClick = () => {
    let localePath = '';
    
    if (locale === 'nl') {
      localePath = '/nl';
    } else if (locale === 'pl') {
      localePath = '/pl';
    }
    
    router.push(`${localePath}/products/${product.slug}`);
  };

  return (
    <motion.div 
      className="card-product cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
             {/* Product Image with Enhanced Animations */}
       <motion.div 
         className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center overflow-hidden"
         whileHover={{ scale: 1.05 }}
         transition={{ duration: 0.3 }}
       >
        {!imageError && product.image.startsWith('/') ? (
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
                         <Image
               src={product.image}
               alt={product.name}
               width={400}
               height={300}
               className="w-full h-full object-contain p-4 w-auto h-auto"
               style={{ transform: 'scale(0.85)' }}
               onError={() => setImageError(true)}
               priority={false}
             />
          </motion.div>
        ) : (
          <motion.span 
            className="text-6xl"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {product.image}
          </motion.span>
        )}
        
        {/* Animated Badges */}
        <AnimatePresence>
          {product.originalPrice && (
            <motion.div 
              className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              SALE
            </motion.div>
          )}
          {!product.inStock && (
            <motion.div 
              className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full z-10"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              OUT OF STOCK
            </motion.div>
          )}
        </AnimatePresence>

        
      </motion.div>

      {/* Product Info with Staggered Animations */}
      <motion.div 
        className="p-4 sm:p-6 flex-1 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Category */}
        <motion.div 
          className="text-xs text-yellow-600 font-medium mb-2"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {getTranslatedCategory(product.category, locale)}
        </motion.div>

        {/* Name */}
        <motion.h3 
          className="text-base sm:text-lg font-bold text-gray-900 mb-2"
          whileHover={{ color: "#d97706" }}
          transition={{ duration: 0.2 }}
        >
          {translatedProduct?.name || product.name}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {translatedProduct?.description || product.description}
        </motion.p>

        {/* Weight */}
        <motion.div 
          className="text-xs text-gray-500 mb-2 sm:mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {product.weight}
        </motion.div>

        {/* Rating with Animated Stars */}
        <motion.div 
          className="flex items-center mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <motion.span 
                key={i}
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </motion.span>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviews} reviews)
          </span>
        </motion.div>

        {/* Features with Hover Effects */}
        <motion.div 
          className="flex flex-wrap gap-1 mb-3 sm:mb-4 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {(translatedProduct?.features || product.features).slice(0, 2).map((feature, index) => (
            <motion.span 
              key={index}
              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#fef3c7",
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>

        {/* Price with Bounce Animation */}
        <motion.div 
          className="flex items-center justify-between mb-3 sm:mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <motion.span 
              className="text-xl font-bold text-gray-900"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              €{product.price.toFixed(2)}
            </motion.span>
            {product.originalPrice && (
              <motion.span 
                className="text-sm text-gray-500 line-through"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
              >
                €{product.originalPrice.toFixed(2)}
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Enhanced Add to Cart Button */}
        <motion.div 
          className="relative mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-3 px-4 rounded-lg font-semibold ${
              product.inStock
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={{ 
              scale: 1.02,
              boxShadow: product.inStock ? "0 10px 25px rgba(245, 158, 11, 0.3)" : "none"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>

          {/* Enhanced Success Notification */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="flex items-center space-x-2">
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
                  >
                    ✓
                  </motion.span>
                  <span className="text-sm font-medium">Added to cart!</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
