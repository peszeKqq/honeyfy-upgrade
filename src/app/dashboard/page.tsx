'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { state } = useAuth();
  const { getUserOrders } = useOrders();
  const router = useRouter();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push('/');
    }
  }, [state.isAuthenticated, router]);

  if (!state.isAuthenticated || !state.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const user = state.user;
  const userOrders = getUserOrders(user.id);
  const recentOrders = userOrders.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 🍯
          </h1>
          <p className="text-gray-600">
            Manage your account and track your sweet journey with Honeyfy
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Account Info</h3>
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member since</p>
                <p className="font-medium text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No orders yet</p>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">#{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-sm text-gray-600">{order.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">€{order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                    </div>
                  </div>
                ))}
                <Link
                  href="/orders"
                  className="block text-center text-yellow-600 hover:text-yellow-700 font-medium text-sm mt-4"
                >
                  View All Orders
                </Link>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Wishlist</h3>
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No saved items</p>
              <Link
                href="/wishlist"
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                View Wishlist
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/orders"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Order History</h4>
                <p className="text-sm text-gray-500">View past orders</p>
              </div>
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Wishlist</h4>
                <p className="text-sm text-gray-500">Saved items</p>
              </div>
            </div>
          </Link>

          <Link
            href="/profile"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Profile</h4>
                <p className="text-sm text-gray-500">Edit your details</p>
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🍯</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Shop Now</h4>
                <p className="text-sm text-gray-500">Browse products</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recommendations */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recommended for You 🍯</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <div className="text-4xl mb-3">🍯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Premium Wildflower Honey</h4>
              <p className="text-sm text-gray-600 mb-4">Perfect for your morning toast</p>
              <Link
                href="/"
                className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
              >
                View Product
              </Link>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <div className="text-4xl mb-3">🍯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Manuka Honey</h4>
              <p className="text-sm text-gray-600 mb-4">Premium healing properties</p>
              <Link
                href="/"
                className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
              >
                View Product
              </Link>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <div className="text-4xl mb-3">🍯</div>
              <h4 className="font-semibold text-gray-900 mb-2">Raw Clover Honey</h4>
              <p className="text-sm text-gray-600 mb-4">Pure and unprocessed</p>
              <Link
                href="/"
                className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
              >
                View Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
