'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSuccess(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (err: any) {
      console.error('Newsletter signup error:', err);
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🎉</span>
              <div>
                <h3 className="text-green-800 font-semibold">Welcome to Honeyfy!</h3>
                <p className="text-green-700 text-sm">
                  Check your email for your exclusive 10% discount code!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            🍯 Sweet Deals Await!
          </h2>
          <p className="text-gray-600 text-lg">
            Subscribe to our newsletter and get <span className="font-bold text-yellow-600">10% OFF</span> your first order!
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🎁</span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900">Exclusive Discounts</h4>
              <p className="text-sm text-gray-600">First-time subscriber bonus</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📰</span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900">Latest Updates</h4>
              <p className="text-sm text-gray-600">New products & blog posts</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🐝</span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900">Honey Tips</h4>
              <p className="text-sm text-gray-600">Recipes & health benefits</p>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                'Get 10% OFF! 🍯'
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 mt-4">
          By subscribing, you agree to receive marketing emails from Honeyfy. 
          You can unsubscribe at any time. We respect your privacy.
        </p>
      </motion.div>
    </div>
  );
}
