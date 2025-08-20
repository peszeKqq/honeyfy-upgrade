'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const { state: authState } = useAuth();
  const { getUserOrders, updateOrderStatus } = useOrders();
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push('/');
    }
  }, [authState.isAuthenticated, router]);

  if (!authState.isAuthenticated || !authState.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const userOrders = getUserOrders(authState.user.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">Track your orders and view past purchases</p>
        </div>

        {userOrders.length === 0 ? (
          // Empty state
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-6">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="text-xl mr-2">🍯</span>
              Start Shopping
            </Link>
          </div>
        ) : (
          // Orders list
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="text-lg font-bold text-gray-900">€{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Items ({order.items.length})</h4>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">{item.image || '🍯'}</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.name}</h5>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">€{item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="px-6 pb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Shipping Address</h5>
                    <p className="text-sm text-gray-700">
                      {order.shippingAddress.name}<br />
                      {order.shippingAddress.address}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="px-6 pb-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                    </button>
                    
                    {order.status === 'delivered' && (
                      <Link
                        href={`/products/${order.items[0]?.productId}?review=true`}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                      >
                        Write Review
                      </Link>
                    )}
                    
                    {order.status === 'processing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>

                {/* Expandable Details */}
                {selectedOrder === order.id && (
                  <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="font-semibold text-gray-900 mb-2">Payment Information</h6>
                        <p className="text-sm text-gray-600">
                          Payment ID: {order.paymentIntentId || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Email: {order.shippingAddress.email}
                        </p>
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-900 mb-2">Order Timeline</h6>
                        <p className="text-sm text-gray-600">
                          Ordered: {formatDate(order.createdAt)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Last Updated: {formatDate(order.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
