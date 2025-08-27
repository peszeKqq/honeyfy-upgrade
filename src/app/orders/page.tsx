'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const { state: authState } = useAuth();
  const { getUserOrders, loadUserOrders, loadAllOrders, addOrder, state: orderState } = useOrders();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  // Set client flag to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load orders - always load all orders for testing purposes
  useEffect(() => {
    // Only load orders on the client side to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      // For testing purposes, always load all orders
      console.log('Loading all orders for testing...');
      loadAllOrders();
    }
  }, [loadAllOrders]);

  // For testing purposes, always show all orders
  const userOrders = orderState.orders;
  
  // Pagination logic
  const totalPages = Math.ceil(userOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = userOrders.slice(startIndex, endIndex);



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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'processing':
        return '⚙️';
      case 'shipped':
        return '📦';
      case 'delivered':
        return '✅';
      case 'cancelled':
        return '❌';
      default:
        return '📋';
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Pagination functions
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      if (end - start < 4) {
        if (start === 1) {
          end = Math.min(totalPages, start + 4);
        } else {
          start = Math.max(1, end - 4);
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
                         <div>
               <h1 className="text-3xl font-bold text-gray-900 font-heading">Order History</h1>
               <p className="text-gray-600 mt-1 font-body">Check what you've ordered</p>
             </div>
            <Link
              href="/products"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🍯 Shop Now
            </Link>
          </div>
        </div>
      </div>

             {/* Content */}
       <div className="container mx-auto px-4 py-8">
         {!isClient || orderState.isLoading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                         <p className="text-gray-600 font-body">Loading your orders...</p>
          </div>
        ) : userOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
                         <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">No Orders Yet</h2>
             <p className="text-gray-600 mb-6 font-body">You haven't placed any orders yet.</p>
            <Link
              href="/products"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
            >
              Start Shopping
            </Link>
          </div>
                 ) : (
           <div>
             {/* Orders List */}
             <div className="space-y-6">
               {currentOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                                             <h3 className="font-semibold text-gray-900 font-body">Order #{order.id.slice(-8)}</h3>
                       <p className="text-sm text-gray-600 font-body">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        €{order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🍯</span>
                        </div>
                        <div className="flex-1">
                                                     <h4 className="font-medium text-gray-900 font-body">{item.name}</h4>
                           <p className="text-sm text-gray-600 font-body">
                             Quantity: {item.quantity} × €{item.price.toFixed(2)}
                           </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            €{(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.name}<br />
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                        {order.shippingAddress.country}
                      </p>
                    </div>
                                     )}
                 </div>
               </div>
             ))}
             </div>

             {/* Pagination */}
             {totalPages > 1 && (
               <div className="mt-8 flex items-center justify-center">
                 <nav className="flex items-center space-x-2" aria-label="Pagination">
                   {/* Previous Button */}
                   <button
                     onClick={goToPreviousPage}
                     disabled={currentPage === 1}
                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                       currentPage === 1
                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                         : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                     }`}
                   >
                     ← Previous
                   </button>

                   {/* Page Numbers */}
                   <div className="flex items-center space-x-1">
                     {getPageNumbers().map((page) => (
                       <button
                         key={page}
                         onClick={() => goToPage(page)}
                         className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                           page === currentPage
                             ? 'bg-yellow-500 text-white'
                             : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                         }`}
                       >
                         {page}
                       </button>
                     ))}
                   </div>

                   {/* Next Button */}
                   <button
                     onClick={goToNextPage}
                     disabled={currentPage === totalPages}
                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                       currentPage === totalPages
                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                         : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                     }`}
                   >
                     Next →
                   </button>
                 </nav>

                 {/* Page Info */}
                 <div className="ml-6 text-sm text-gray-600">
                   Page {currentPage} of {totalPages} • Showing {startIndex + 1}-{Math.min(endIndex, userOrders.length)} of {userOrders.length} orders
                 </div>
               </div>
             )}
           </div>
         )}

                 
      </div>
    </div>
  );
}
