'use client';

import { useState } from 'react';
import { products, categories, Product } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [displayCount, setDisplayCount] = useState(6);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const displayedProducts = filteredProducts.slice(0, displayCount);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Premium Honey Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of natural, sustainable honey products. 
            Each jar is harvested with care and tested for the highest quality standards.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-yellow-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {displayedProducts.length < filteredProducts.length && (
          <div className="text-center">
            <button
              onClick={() => setDisplayCount(prev => prev + 3)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Load More Products
            </button>
          </div>
        )}

        {/* Empty State */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
