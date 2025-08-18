'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';

// Load Stripe outside of component to avoid recreating on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  isLoading: boolean;
}

function CheckoutForm({ amount, onSuccess, onError, isLoading }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Confirm payment with any payment method
      const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/confirmation`,
        },
        redirect: 'if_required',
      });

      if (paymentError) {
        throw new Error(paymentError.message || 'Payment failed');
      }

      if (paymentIntent?.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      } else if (paymentIntent?.status === 'requires_action') {
        // Handle 3D Secure or other authentication
        const { error: confirmError } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/confirmation`,
          },
        });
        
        if (confirmError) {
          throw new Error(confirmError.message || 'Payment authentication failed');
        }
      } else {
        throw new Error('Payment was not successful');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const paymentElementOptions = {
    layout: 'tabs' as const,
    paymentMethodOrder: ['card', 'ideal', 'sofort', 'bancontact', 'giropay', 'sepa_debit', 'eps', 'p24'],
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Amount */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
          <span className="text-2xl font-bold text-yellow-600">€{amount.toFixed(2)}</span>
        </div>
      </div>

             {/* Payment Element */}
       <div className="bg-white rounded-xl shadow-lg p-6">
         <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
           <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
             💳
           </span>
           Payment Information
         </h3>
         
         <div className="space-y-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">
               Choose Payment Method
             </label>
             <div className="border border-gray-300 rounded-lg p-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:border-yellow-500 transition-colors">
               <PaymentElement options={paymentElementOptions} />
             </div>
           </div>

          {/* Security Notice */}
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">Secure Payment</p>
              <p className="text-sm text-blue-700">Your payment information is encrypted and secure. We never store your card details.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-red-900">Payment Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

             {/* Submit Button */}
       <button
         type="submit"
         disabled={!stripe || processing || isLoading}
         className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-none"
       >
        {processing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Payment...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>Pay €{amount.toFixed(2)}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}
      </button>
    </form>
  );
}

export default function PaymentForm(props: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: props.amount }),
        });

        const { clientSecret, error: apiError } = await response.json();

        if (apiError) {
          throw new Error(apiError);
        }

        setClientSecret(clientSecret);
      } catch (err) {
        console.error('Failed to create payment intent:', err);
        props.onError('Failed to initialize payment');
      }
    };

    createPaymentIntent();
  }, [props.amount, props.onError]);

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Initializing payment...</span>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
