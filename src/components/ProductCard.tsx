'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <span className="text-6xl">{product.image}</span>
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            SALE
          </div>
        )}
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
            OUT OF STOCK
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <div className="text-xs text-yellow-600 font-medium mb-2">
          {product.category}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Weight */}
        <div className="text-xs text-gray-500 mb-3">
          {product.weight}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.features.slice(0, 2).map((feature, index) => (
            <span 
              key={index}
              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              €{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                €{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="relative">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              product.inStock
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          {/* Success Notification */}
          {showSuccess && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10 animate-bounce">
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span className="text-sm font-medium">Added to cart!</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
