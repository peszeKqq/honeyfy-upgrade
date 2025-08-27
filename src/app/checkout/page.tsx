'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import CheckoutForm from '@/components/CheckoutForm';
import PaymentForm from '@/components/PaymentForm';
import LoyaltyPoints from '@/components/LoyaltyPoints';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 69 ? 0 : 5.99;
  const total = subtotal + shipping - loyaltyDiscount;

  // Redirect if cart is empty
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Your cart is empty</h1>
          <p className="text-gray-600 mb-8 font-body">Add some products to your cart before checkout.</p>
          <Link
            href="/"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Continue Shopping
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
      
      console.log('✅ Stored order and user data for payment step');
      console.log('Order total:', subtotal);
      console.log('User ID:', authState.user?.id);
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
    
    // Save order
    addOrder(orderData);
    
    console.log('Order saved:', orderData);
    
    // Update loyalty points after successful order
    let loyaltyPointsEarned = 0;
    console.log('=== LOYALTY POINTS UPDATE DEBUG ===');
    console.log('Auth state:', authState);
    console.log('User ID:', authState.user?.id);
    console.log('Subtotal:', subtotal);
    console.log('User logged in:', !!authState.user?.id);
    console.log('Subtotal > 0:', subtotal > 0);
    
    if (authState.user?.id && subtotal > 0) {
      console.log('✅ Proceeding with loyalty points update');
      console.log('Updating loyalty points for user:', authState.user.id, 'amount:', subtotal);
      try {
        const requestBody = {
          userId: authState.user.id,
          orderAmount: subtotal
        };
        console.log('Sending loyalty points request:', requestBody);
        
        const response = await fetch('/api/loyalty/points', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        
        console.log('Loyalty points response status:', response.status);
        console.log('Loyalty points response headers:', response.headers);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Loyalty points response data:', data);
          // Extract points earned from the message
          const message = data.message || '';
          const match = message.match(/Earned ([\d.]+) points/);
          if (match) {
            loyaltyPointsEarned = parseFloat(match[1]);
            console.log('✅ Points earned:', loyaltyPointsEarned);
          }
        } else {
          const errorData = await response.json();
          console.error('❌ Loyalty points API error:', errorData);
        }
      } catch (error) {
        console.error('❌ Error updating loyalty points:', error);
      }
    } else {
      console.log('❌ Skipping loyalty points update - user not logged in or subtotal is 0');
      console.log('User ID:', authState.user?.id, 'Subtotal:', subtotal);
    }
    console.log('=== END LOYALTY POINTS UPDATE DEBUG ===');
    
    // Store order data and user data temporarily for confirmation page
    if (typeof window !== 'undefined') {
      // Store order data
      localStorage.setItem('honeyfy-order-data', JSON.stringify({
        pointsEarned: loyaltyPointsEarned,
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
    
    // Clear cart and redirect to confirmation
    console.log('About to clear cart, current items:', state.items);
    clearCart();
    console.log('Cart cleared, redirecting to confirmation with:', {
      paymentIntentId,
      loyaltyPointsEarned,
      subtotal
    });
    
    // Force clear localStorage as well
    if (typeof window !== 'undefined') {
      localStorage.removeItem('honeyfy-cart');
      console.log('localStorage cart cleared');
      
      // Also clear any other cart-related data
      localStorage.removeItem('honeyfy-cart-state');
      console.log('All cart data cleared from localStorage');
    }
    
    // Force a small delay to ensure cart clearing is processed
    await new Promise(resolve => setTimeout(resolve, 100));
    
    router.push(`/confirmation?payment_intent=${paymentIntentId}`);
  };

  const handlePaymentError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order securely</p>
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
              <span className="ml-2 font-medium">Customer Info</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 mx-4"></div>
            <div className={`flex items-center ${step === 'payment' ? 'text-yellow-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step === 'payment' ? 'bg-yellow-600 border-yellow-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
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
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
                    📋
                  </span>
                  Order Summary
                </h3>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {state.items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg flex items-center justify-center">
                          <span className="text-lg">{item.product.image}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">
                        €{((item.product.originalPrice || item.product.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={subtotal >= 50 ? 'text-green-600' : 'text-gray-600'}>
                      {subtotal >= 50 ? 'FREE' : '€5.99'}
                    </span>
                  </div>
                  {loyaltyDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Loyalty Discount</span>
                      <span>-€{loyaltyDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Free Shipping Notice */}
                {subtotal < 50 && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      Add €{(50 - subtotal).toFixed(2)} more for <strong>FREE shipping</strong>
                    </p>
                  </div>
                )}

                {/* Back to Cart */}
                <Link
                  href="/"
                  className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors text-center block"
                >
                  ← Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
