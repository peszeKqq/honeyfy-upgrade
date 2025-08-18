'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ConfirmationPage() {
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [showHoney, setShowHoney] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get payment intent ID from URL
    const paymentIntent = searchParams.get('payment_intent');
    if (paymentIntent) {
      setPaymentIntentId(paymentIntent);
    }

    // Animate elements on mount
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setShowHoney(true), 800);
    const timer3 = setTimeout(() => setShowDetails(true), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [searchParams]);

  // Handle Stripe redirect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentIntent = urlParams.get('payment_intent');
      
      if (paymentIntent) {
        setPaymentIntentId(paymentIntent);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 flex items-center justify-center py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-amber-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        {/* Success Animation */}
        <div className={`text-center mb-8 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Animated Checkmark */}
            <div className={`w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center transform transition-all duration-700 ${
              isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {/* Confetti Effect */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>

        {/* Success Message */}
        <div className={`bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className={`text-3xl font-bold text-gray-900 mb-4 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            🎉 Order Confirmed!
          </h1>
          
          <p className={`text-lg text-gray-600 mb-6 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            Your order has been successfully placed and payment has been processed.
          </p>

          {/* Animated Honey Message */}
          <div className={`mb-8 transform transition-all duration-700 ${
            showHoney ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
          }`}>
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border-2 border-yellow-200 relative overflow-hidden">
              {/* Floating honey emojis */}
              <div className="absolute top-2 left-2 text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>🍯</div>
              <div className="absolute top-2 right-2 text-lg animate-bounce" style={{ animationDelay: '1s' }}>🍯</div>
              <div className="absolute bottom-2 left-2 text-lg animate-bounce" style={{ animationDelay: '1.5s' }}>🍯</div>
              <div className="absolute bottom-2 right-2 text-xl animate-bounce" style={{ animationDelay: '2s' }}>🍯</div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <span className="text-3xl animate-pulse">🍯</span>
                  <span className="text-2xl font-bold text-yellow-800">Thank you for choosing Honeyfy!</span>
                  <span className="text-3xl animate-pulse">🍯</span>
                </div>
                <p className="text-yellow-700 font-medium text-lg">
                  Your sweet journey with us begins now! 🍯✨
                </p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className={`bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 mb-8 transform transition-all duration-700 ${
            showDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-sm bg-white px-3 py-1 rounded-lg border shadow-sm">
                  {paymentIntentId || 'PI_XXXXXX'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  ✓ Paid
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="text-gray-900">Credit Card</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className={`bg-amber-50 rounded-xl p-6 mb-8 transform transition-all duration-700 ${
            showDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <h3 className="text-lg font-semibold text-amber-900 mb-3">What's Next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-amber-900 font-medium">Order Confirmation Email</p>
                  <p className="text-amber-700 text-sm">You'll receive a confirmation email with your order details within the next few minutes.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-amber-900 font-medium">Order Processing</p>
                  <p className="text-amber-700 text-sm">We'll process your order and prepare it for shipping within 1-2 business days.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-amber-900 font-medium">Shipping Notification</p>
                  <p className="text-amber-700 text-sm">You'll receive a shipping confirmation with tracking information once your order ships.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`bg-gray-50 rounded-xl p-6 mb-8 transform transition-all duration-700 ${
            showDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '800ms' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">📧 Email: support@honeyfy.com</p>
              <p className="text-gray-600">📞 Phone: +31 6 12345678</p>
              <p className="text-gray-600">🕒 Support Hours: Mon-Fri 9:00 AM - 6:00 PM CET</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 ${
            showDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '1000ms' }}>
            <Link
              href="/"
              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Continue Shopping</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Print Receipt
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className={`text-center mt-8 transform transition-all duration-700 ${
          showDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ transitionDelay: '1200ms' }}>
          <p className="text-gray-500 text-sm">
            Thank you for choosing Honeyfy! 🍯✨
          </p>
        </div>
      </div>


    </div>
  );
}
