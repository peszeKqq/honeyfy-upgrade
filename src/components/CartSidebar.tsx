'use client';

import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCartTranslation, formatCartMessage } from '@/lib/cartTranslations';
import { getTranslatedProduct } from '@/lib/productTranslations';

interface CartSidebarProps {
  locale?: 'en' | 'nl' | 'pl';
}

export default function CartSidebar({ locale = 'en' }: CartSidebarProps) {
  const { state, removeItem, updateQuantity, clearCart, closeCart, getTotalPrice } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    if (state.isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [state.isOpen]);

  const handleCheckout = () => {
    closeCart();
    const checkoutPath = locale === 'en' ? '/checkout' : `/${locale}/checkout`;
    router.push(checkoutPath);
  };

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Enhanced Backdrop with Blur */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-black/20 via-black/10 to-transparent backdrop-blur-sm z-40 transition-opacity duration-300 ${
          state.isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Enhanced Cart Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-white via-gray-50 to-yellow-50 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 border-b border-yellow-400/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{getCartTranslation(locale, 'shoppingCart')}</h2>
                  <p className="text-yellow-100 text-sm">{getCartTranslation(locale, 'yourHoneySelection')}</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 relative">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🍯</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">🛒</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{getCartTranslation(locale, 'yourCartIsEmpty')}</h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                  {getCartTranslation(locale, 'emptyCartMessage')}
                </p>
                <button
                  onClick={closeCart}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {getCartTranslation(locale, 'continueShopping')}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item, index) => {
                  // Get translated product name
                  const translatedProduct = getTranslatedProduct(item.product.slug, locale);
                  const productName = translatedProduct?.name || item.product.name;
                  
                  return (
                    <div 
                      key={item.product.id} 
                      className="group bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Enhanced Product Image */}
                        <div className="flex-shrink-0 relative">
                          <div className="w-20 h-20 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl flex items-center justify-center shadow-inner overflow-hidden">
                            {!imageErrors[item.product.id] && item.product.image.startsWith('/') ? (
                              <Image
                                src={item.product.image}
                                alt={productName}
                                width={80}
                                height={80}
                                className="w-full h-full object-contain p-2 w-auto h-auto"
                                onError={() => handleImageError(item.product.id)}
                                priority={false}
                              />
                            ) : (
                              <span className="text-2xl">{item.product.image}</span>
                            )}
                          </div>
                          {item.product.originalPrice && (
                            <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                              {getCartTranslation(locale, 'sale')}
                            </div>
                          )}
                        </div>

                        {/* Enhanced Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-gray-900 truncate group-hover:text-yellow-600 transition-colors">
                            {productName}
                          </h3>
                          <p className="text-xs text-gray-500 mb-1">{item.product.weight}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-yellow-600">
                              €{item.product.price.toFixed(2)}
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                €{item.product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Enhanced Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-gray-900 bg-gray-50 rounded-full py-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gradient-to-br from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                          >
                            <svg className="w-4 h-4 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        {/* Enhanced Remove Button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="w-8 h-8 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm group/remove"
                        >
                          <svg className="w-4 h-4 text-red-500 group-hover/remove:text-red-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Enhanced Footer */}
          {state.items.length > 0 && (
            <div className="relative bg-gradient-to-r from-gray-50 to-yellow-50 border-t border-yellow-200/50 p-6">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>
              
              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-lg font-semibold text-gray-900">{getCartTranslation(locale, 'total')}</span>
                  <p className="text-sm text-gray-600">{getCartTranslation(locale, 'freeShippingMessage')}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-yellow-600">
                    €{getTotalPrice().toFixed(2)}
                  </span>
                  {getTotalPrice() < 50 && (
                    <p className="text-xs text-gray-500">{formatCartMessage(getCartTranslation(locale, 'addForFreeShipping'), 50 - getTotalPrice())}</p>
                  )}
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{getCartTranslation(locale, 'proceedToCheckout')}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                >
                  {getCartTranslation(locale, 'clearCart')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
