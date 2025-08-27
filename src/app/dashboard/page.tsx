'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { state } = useAuth();
  const { getUserOrders } = useOrders();
  const router = useRouter();

  // Loyalty points state
  const [loyaltyData, setLoyaltyData] = useState({
    totalPoints: 0,
    availablePoints: 0,
    totalSpent: 0,
    discountAvailable: 0,
    pointsUsed: 0
  });
  const [loyaltyLoading, setLoyaltyLoading] = useState(true);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push('/');
    }
  }, [state.isAuthenticated, router]);

  // Load loyalty points
  useEffect(() => {
    const fetchLoyaltyPoints = async () => {
      if (!state.user?.id) return;
      
      try {
        setLoyaltyLoading(true);
        const response = await fetch(`/api/loyalty/points?userId=${state.user.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setLoyaltyData(data);
        } else {
          console.error('Error fetching loyalty points:', data.error);
        }
      } catch (error) {
        console.error('Error fetching loyalty points:', error);
      } finally {
        setLoyaltyLoading(false);
      }
    };

    fetchLoyaltyPoints();
  }, [state.user?.id]);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">
            Welcome back, {user.name}! 🍯
          </h1>
          <p className="text-gray-600 font-body">
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

          {/* Loyalty Points */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Loyalty Points</h3>
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎁</span>
              </div>
            </div>
            {loyaltyLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                <span className="text-gray-600">Loading...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">Available Points</h4>
                    <div className="text-2xl font-bold text-yellow-600">{loyaltyData.totalPoints || 0}</div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    Earn 1 point for every €1 spent!
                  </p>
                  <div className="bg-white rounded-lg p-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress to next reward:</span>
                      <span className="font-medium text-gray-900">
                        {loyaltyData.totalPoints || 0}/50 points
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(((loyaltyData.totalPoints || 0) % 50) / 50 * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <p className="text-blue-800 font-medium text-xs">Available Discount</p>
                    <p className="text-lg font-bold text-blue-600">€{loyaltyData.discountAvailable || 0}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-green-800 font-medium text-xs">Total Spent</p>
                    <p className="text-lg font-bold text-green-600">€{(loyaltyData.totalSpent || 0).toFixed(2)}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-medium text-gray-900 text-xs mb-2">How it works:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 50 points = €5 discount</li>
                    <li>• 100 points = €12 discount</li>
                    <li>• 150 points = €20 discount</li>
                  </ul>
                </div>
              </div>
            )}
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
            href="/products"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/honey-forest.webp" 
                  alt="Honey Products" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Shop Now</h4>
                <p className="text-sm text-gray-500">Browse products</p>
              </div>
            </div>
          </Link>

          <Link
            href="/checkout"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎁</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Use Points</h4>
                <p className="text-sm text-gray-500">Apply loyalty discount</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recommendations */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recommended for You 🍯</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
               <div className="w-20 h-20 mx-auto mb-3 rounded-lg overflow-hidden shadow-md">
                 <img 
                   src="/heather-honey.webp" 
                   alt="Heather Honey" 
                   className="w-full h-full object-cover"
                 />
               </div>
               <h4 className="font-semibold text-gray-900 mb-2">Heather Honey</h4>
               <p className="text-sm text-gray-600 mb-4">Rare Highland honey with strong aromatic flavor</p>
               <Link
                 href="/products/heather-honey"
                 className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
               >
                 View Product
               </Link>
             </div>
            
                         <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
               <div className="w-20 h-20 mx-auto mb-3 rounded-lg overflow-hidden shadow-md">
                 <img 
                   src="/acacia-honey.webp" 
                   alt="Acacia Honey" 
                   className="w-full h-full object-cover"
                 />
               </div>
               <h4 className="font-semibold text-gray-900 mb-2">Acacia Honey</h4>
               <p className="text-sm text-gray-600 mb-4">Light and delicate with slow crystallization</p>
               <Link
                 href="/products/acacia-honey"
                 className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
               >
                 View Product
               </Link>
             </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <div className="w-20 h-20 mx-auto mb-3 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/logoheader.png" 
                  alt="Raw Clover Honey" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Raw Clover Honey</h4>
              <p className="text-sm text-gray-600 mb-4">Pure and unprocessed</p>
              <Link
                href="/products/raw-forest-honey"
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
