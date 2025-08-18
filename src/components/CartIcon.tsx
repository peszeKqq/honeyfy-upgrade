'use client';

import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function CartIcon() {
  const { getTotalItems, toggleCart } = useCart();
  const itemCount = getTotalItems();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={toggleCart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-2 text-gray-700 hover:text-yellow-600 transition-all duration-300 group"
      aria-label="Shopping cart"
    >
      {/* Enhanced Cart Icon */}
      <div className="relative">
        <svg
          className={`w-6 h-6 transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
          />
        </svg>

        {/* Enhanced Item Count Badge */}
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg border-2 border-white transform scale-100 group-hover:scale-110 transition-all duration-300">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}

        {/* Pulse Animation for New Items */}
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-400 rounded-full h-6 w-6 animate-ping opacity-75"></span>
        )}
      </div>

      {/* Enhanced Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>

      {/* Tooltip */}
      <div className={`absolute top-full right-0 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 ${
        isHovered ? 'translate-y-0' : '-translate-y-1'
      }`}>
        {itemCount > 0 ? `${itemCount} item${itemCount > 1 ? 's' : ''} in cart` : 'Cart is empty'}
        <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
      </div>
    </button>
  );
}
