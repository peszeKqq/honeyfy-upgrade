'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import CheckoutForm from '@/components/CheckoutForm';
import PaymentForm from '@/components/PaymentForm';
import LoyaltyPoints from '@/components/LoyaltyPoints';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCartTranslation } from '@/lib/cartTranslations';
import { getTranslatedProduct } from '@/lib/productTranslations';
import Image from 'next/image';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export default function CheckoutPage() {
  const { state, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { state: authState } = useAuth();
  const [step, setStep] = useState<'customer' | 'payment'>('customer');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loyaltyDiscount, setLoyaltyDiscount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 69 ? 0 : 5.99;
  const total = subtotal + shipping - loyaltyDiscount;

  // Show loading state during SSR or before client hydration
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4 font-heading">{getCartTranslation('pl', 'cartEmptyTitle')}</h1>
          <p className="text-gray-600 mb-8 font-body">{getCartTranslation('pl', 'cartEmptyMessage')}</p>
          <Link
            href="/pl"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {getCartTranslation('pl', 'continueShopping')}
          </Link>
        </div>
      </div>
    );
  }

  const handleCustomerSubmit = (info: CustomerInfo) => {
    setCustomerInfo(info);
    setStep('payment');
    
    // Store order data and user data when moving to payment step
    if (typeof window !== 'undefined') {
      // Store order data
      localStorage.setItem('honeyfy-order-data', JSON.stringify({
        pointsEarned: 0,
        orderTotal: subtotal,
        timestamp: Date.now()
      }));
      
      // Store user data for loyalty points update
      if (authState.user) {
        localStorage.setItem('honeyfy-user-data', JSON.stringify({
          id: authState.user.id,
          email: authState.user.email
        }));
      }
      

    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    if (!customerInfo) return;
    
    // Create order object
    const orderData = {
      userId: authState.user?.id || 'guest',
      items: state.items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.originalPrice || item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        weight: item.product.weight
      })),
      subtotal,
      shipping,
      loyaltyDiscount,
      total,
      status: 'processing' as const,
      paymentIntentId,
      shippingAddress: {
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        email: customerInfo.email,
        address: `${customerInfo.address.line1} ${customerInfo.address.line2}`.trim(),
        city: customerInfo.address.city,
        postalCode: customerInfo.address.postalCode,
        country: customerInfo.address.country,
      },
    };

    try {
      // Add order to context
      await addOrder(orderData);
      
      // Clear cart
      clearCart();
      
      // Force clear localStorage as well
      if (typeof window !== 'undefined') {
        localStorage.removeItem('honeyfy-cart');
        localStorage.removeItem('honeyfy-cart-state');
      }
      
      // Force a small delay to ensure cart clearing is processed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      router.push(`/pl/confirmation?payment_intent=${paymentIntentId}`);
    } catch (error) {
      console.error('❌ Error completing order:', error);
      setError('Wystąpił błąd podczas finalizowania zamówienia. Spróbuj ponownie.');
    }
  };

  const handlePaymentError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 font-heading">{getCartTranslation('pl', 'checkout')}</h1>
          <p className="text-gray-600 font-body">{getCartTranslation('pl', 'completeOrderSecurely')}</p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${step === 'customer' ? 'text-yellow-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step === 'customer' ? 'bg-yellow-600 border-yellow-600 text-white' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium font-body">{getCartTranslation('pl', 'customerInfo')}</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
            <div className={`flex items-center ${step === 'payment' ? 'text-yellow-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step === 'payment' ? 'bg-yellow-600 border-yellow-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium font-body">{getCartTranslation('pl', 'payment')}</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 'customer' ? (
                <>
                  <LoyaltyPoints
                    totalAmount={subtotal}
                    onDiscountApplied={setLoyaltyDiscount}
                    onDiscountRemoved={() => setLoyaltyDiscount(0)}
                  />
                  <CheckoutForm onSubmit={handleCustomerSubmit} isLoading={isLoading} />
                </>
              ) : (
                <PaymentForm
                  amount={total}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center font-heading">
                  <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
                    📋
                  </span>
                  {getCartTranslation('pl', 'orderSummary')}
                </h3>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {state.items.map((item) => {
                    // Get translated product name
                    const translatedProduct = getTranslatedProduct(item.product.slug, 'pl');
                    const productName = translatedProduct?.name || item.product.name;
                    
                    return (
                      <div key={item.product.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-medium text-gray-900 font-body">{productName}</p>
                            <p className="text-sm text-gray-500 font-body">{getCartTranslation('pl', 'quantity')}: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">€{(item.product.price * item.quantity).toFixed(2)}</p>
                          {item.product.originalPrice && (
                            <p className="text-xs text-gray-400 line-through">€{(item.product.originalPrice * item.quantity).toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary */}
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-body">{getCartTranslation('pl', 'subtotal')}</span>
                    <span className="font-medium">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-body">{getCartTranslation('pl', 'shipping')}</span>
                    <span className="font-medium">{shipping === 0 ? getCartTranslation('pl', 'free') : `€${shipping.toFixed(2)}`}</span>
                  </div>
                  {loyaltyDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-body">{getCartTranslation('pl', 'loyaltyDiscount')}</span>
                      <span className="font-medium text-green-600">-€{loyaltyDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                    <span className="font-heading">{getCartTranslation('pl', 'total')}</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {subtotal < 69 && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800 font-body">
                      {getCartTranslation('pl', 'addForFreeShipping').replace('{amount}', (69 - subtotal).toFixed(2))}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
