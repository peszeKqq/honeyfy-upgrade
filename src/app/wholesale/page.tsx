'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WholesalePage() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in wholesale honey for my business. Can you provide more information about your wholesale program?");
    const whatsappUrl = `https://wa.me/31685713773?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-heading">Wholesale Inquiries</h1>
              <p className="text-gray-600 mt-1 font-body">Partner with us for premium honey products</p>
            </div>
            <Link
              href="/products"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors font-body"
            >
              🍯 View Products
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Why Partner Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Why Partner With Honeyfy?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🌟</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 font-body">Premium Quality</h3>
                  <p className="text-gray-600 text-sm font-body">Sustainably sourced, natural honey products that meet the highest quality standards.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 font-body">Reliable Supply</h3>
                  <p className="text-gray-600 text-sm font-body">Consistent inventory and timely delivery to keep your business running smoothly.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 font-body">Competitive Pricing</h3>
                  <p className="text-gray-600 text-sm font-body">Attractive wholesale rates that help you maximize your profit margins.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 font-body">Dedicated Support</h3>
                  <p className="text-gray-600 text-sm font-body">Personal account management and marketing support to help you succeed.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Business Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-4">🏪</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">Polish Shops</h3>
            <p className="text-gray-600 font-body">Traditional Polish grocery stores and specialty shops</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-4">☕</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">Cafes & Restaurants</h3>
            <p className="text-gray-600 font-body">Coffee shops, restaurants, and hospitality businesses</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-4">🥐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">Bakeries</h3>
            <p className="text-gray-600 font-body">Artisan bakeries and pastry shops</p>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-6">🍯</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
              Interested in Wholesale?
            </h2>
            <p className="text-lg text-gray-600 mb-8 font-body">
              Get competitive pricing, volume discounts, and personalized service for your business. 
              We offer premium honey varieties perfect for Polish shops, cafes, and bakeries.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-body">Up to 30% off retail prices</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-body">Free delivery across Netherlands for orders over €300</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-body">Personal account manager</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-body">Flexible delivery options</span>
              </div>
            </div>

            <motion.button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 mx-auto font-body"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>Contact us on WhatsApp</span>
            </motion.button>

            <p className="text-sm text-gray-500 mt-4 font-body">
              We'll respond within 24 hours with pricing and availability
            </p>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 font-heading">Why Choose Our Wholesale Program?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">Competitive Pricing</h3>
              <p className="text-gray-600 text-sm font-body">Up to 30% off retail prices with volume discounts</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">Free Delivery</h3>
              <p className="text-gray-600 text-sm font-body">Free delivery across Netherlands for orders over €300</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">Premium Quality</h3>
              <p className="text-gray-600 text-sm font-body">100% natural, pure honey with no additives</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">Dedicated Support</h3>
              <p className="text-gray-600 text-sm font-body">Personal account manager for wholesale customers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
