'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDashboardTranslation } from '@/lib/dashboardTranslations';
import { usePathname } from 'next/navigation';

export default function DashboardPage() {
  const { state } = useAuth();
  const { getUserOrders, loadUserOrders, loadAllOrders, addOrder, state: orderState } = useOrders();
  const router = useRouter();
  const pathname = usePathname();
  
  // Detect locale from pathname
  const detectLocale = () => {
    const localeMatch = pathname.match(/^\/(nl|pl)(\/.*)?$/);
    return localeMatch ? localeMatch[1] : 'en';
  };
  
  const locale = detectLocale();

  // Loyalty points state
  const [loyaltyData, setLoyaltyData] = useState({
    totalPoints: 0,
    availablePoints: 0,
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

  // Load user orders and all orders
  useEffect(() => {
    if (state.user?.id) {
      console.log('🔄 Loading orders for user:', state.user.id);
      // Load both user orders and all orders to ensure we get everything
      Promise.all([
        loadUserOrders(state.user.id),
        loadAllOrders()
      ]).then(() => {
        console.log('✅ Finished loading orders');
      }).catch((error) => {
        console.error('❌ Error loading orders:', error);
      });
    }
  }, [state.user?.id, loadUserOrders, loadAllOrders]);

  // Force refresh orders when user returns to dashboard (e.g., after checkout)
  useEffect(() => {
    const handleFocus = () => {
      if (state.user?.id) {
        console.log('🔄 User returned to dashboard, refreshing orders...');
        loadUserOrders(state.user.id);
        loadAllOrders();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [state.user?.id, loadUserOrders, loadAllOrders]);

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
  
  console.log('📊 Dashboard order stats:', {
    totalOrdersInState: orderState.orders.length,
    userOrdersFound: userOrders.length,
    userId: user.id
  });
  
  // Show user-specific orders if available, otherwise show all orders
  const ordersToShow = userOrders.length > 0 ? userOrders : orderState.orders;
  const recentOrders = ordersToShow.slice(0, 3);
  
  console.log('📋 Recent orders to display:', recentOrders.length);



  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
                             <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">
                 {getDashboardTranslation(locale, "dashboard.welcomeBack")}, {user.name}! 🍯
               </h1>
               <p className="text-gray-600 font-body">
                 {getDashboardTranslation(locale, "dashboard.manageAccount")}
               </p>
             </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
                         <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold text-gray-900">{getDashboardTranslation(locale, "dashboard.accountInfo")}</h3>
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="space-y-3">
                             <div>
                 <p className="text-sm text-gray-500">{getDashboardTranslation(locale, "dashboard.email")}</p>
                 <p className="font-medium text-gray-900">{user.email}</p>
               </div>
               <div>
                 <p className="text-sm text-gray-500">{getDashboardTranslation(locale, "dashboard.memberSince")}</p>
                 <p className="font-medium text-gray-900">
                   {new Date(user.createdAt).toLocaleDateString()}
                 </p>
               </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
                         <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold text-gray-900">{getDashboardTranslation(locale, "dashboard.recentOrders")}</h3>
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
                         {recentOrders.length === 0 ? (
               <div className="text-center py-8">
                 <p className="text-gray-500 mb-4">{getDashboardTranslation(locale, "dashboard.noOrdersYet")}</p>
                                   <Link
                    href={locale === 'en' ? "/" : `/${locale}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {getDashboardTranslation(locale, "dashboard.startShopping")}
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
                   href={locale === 'en' ? "/orders" : `/${locale}/orders`}
                   className="block text-center text-yellow-600 hover:text-yellow-700 font-medium text-sm mt-4"
                 >
                   {getDashboardTranslation(locale, "dashboard.viewAllOrders")}
                 </Link>
              </div>
            )}
          </div>

          {/* Loyalty Points */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
                         <div className="flex items-center justify-between mb-4">
               <h3 className="text-lg font-semibold text-gray-900">{getDashboardTranslation(locale, "dashboard.loyaltyProgram")}</h3>
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
                     <h4 className="text-sm font-semibold text-gray-900">{getDashboardTranslation(locale, "dashboard.availablePoints")}</h4>
                     <div className="text-2xl font-bold text-yellow-600">{Math.round(loyaltyData.totalPoints || 0)}</div>
                   </div>
                   <p className="text-xs text-gray-600 mb-3">
                     {getDashboardTranslation(locale, "dashboard.earnPoints")}
                   </p>
                  <div className="bg-white rounded-lg p-2">
                                         <div className="flex justify-between text-xs mb-1">
                       <span className="text-gray-600">{getDashboardTranslation(locale, "dashboard.progressToNext")}</span>
                       <span className="font-medium text-gray-900">
                         {Math.round(loyaltyData.totalPoints || 0)}/50 points
                       </span>
                     </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(((Math.round(loyaltyData.totalPoints || 0)) % 50) / 50 * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                   <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                     <p className="text-blue-800 font-medium text-xs">{getDashboardTranslation(locale, "dashboard.availableDiscount")}</p>
                     <p className="text-lg font-bold text-blue-600">€{Math.round(loyaltyData.discountAvailable || 0)}</p>
                   </div>
                </div>

                                 <div className="bg-gray-50 rounded-lg p-3">
                   <h5 className="font-medium text-gray-900 text-xs mb-2">{getDashboardTranslation(locale, "dashboard.howItWorks")}</h5>
                   <ul className="text-xs text-gray-600 space-y-1">
                     <li>{getDashboardTranslation(locale, "dashboard.points50")}</li>
                     <li>{getDashboardTranslation(locale, "dashboard.points100")}</li>
                     <li>{getDashboardTranslation(locale, "dashboard.points150")}</li>
                   </ul>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     <Link
             href={locale === 'en' ? "/orders" : `/${locale}/orders`}
             className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
           >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
                             <div>
                 <h4 className="font-semibold text-gray-900">{getDashboardTranslation(locale, "dashboard.orderHistory")}</h4>
                 <p className="text-sm text-gray-500">{getDashboardTranslation(locale, "dashboard.viewPastOrders")}</p>
               </div>
            </div>
          </Link>



                     <Link
             href={locale === 'en' ? "/profile" : `/${locale}/profile`}
             className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
           >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
                             <div>
                 <h4 className="font-semibold text-gray-900">{getDashboardTranslation(locale, "dashboard.profile")}</h4>
                 <p className="text-sm text-gray-500">{getDashboardTranslation(locale, "dashboard.editDetails")}</p>
               </div>
            </div>
          </Link>

                     <Link
             href={locale === 'en' ? "/products" : `/${locale}/products`}
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
                 <h4 className="font-semibold text-gray-900">{getDashboardTranslation(locale, "dashboard.shopNow")}</h4>
                 <p className="text-sm text-gray-500">{getDashboardTranslation(locale, "dashboard.browseProducts")}</p>
               </div>
            </div>
          </Link>

                     <Link
             href={locale === 'en' ? "/checkout" : `/${locale}/checkout`}
             className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
           >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎁</span>
              </div>
                             <div>
                 <h4 className="font-semibold text-gray-900">{getDashboardTranslation(locale, "dashboard.usePoints")}</h4>
                 <p className="text-sm text-gray-500">{getDashboardTranslation(locale, "dashboard.applyLoyaltyDiscount")}</p>
               </div>
            </div>
          </Link>
        </div>

        {/* Recommendations */}
                 <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
           <h3 className="text-xl font-bold text-gray-900 mb-6">{getDashboardTranslation(locale, "dashboard.recommendedForYou")} 🍯</h3>
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
                   href={locale === 'en' ? "/products/heather-honey" : `/${locale}/products/heather-honey`}
                   className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                 >
                   {getDashboardTranslation(locale, "dashboard.viewProduct")}
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
                   href={locale === 'en' ? "/products/acacia-honey" : `/${locale}/products/acacia-honey`}
                   className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                 >
                   {getDashboardTranslation(locale, "dashboard.viewProduct")}
                 </Link>
             </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <div className="w-20 h-20 mx-auto mb-3 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/beepollen.webp" 
                  alt="Bee Pollen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Bee Pollen</h4>
              <p className="text-sm text-gray-600 mb-4">Nature's complete superfood</p>
                             <Link
                 href={locale === 'en' ? "/products/bee-pollen" : `/${locale}/products/bee-pollen`}
                 className="inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
               >
                 {getDashboardTranslation(locale, "dashboard.viewProduct")}
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
