import Stripe from 'stripe';

// Server-side Stripe instance
const secretKey = process.env.STRIPE_SECRET_KEY;
console.log('Stripe Secret Key:', secretKey ? 'Present' : 'Missing');

if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

export const stripe = new Stripe(secretKey, {
  apiVersion: '2025-07-30.basil',
});

// Client-side Stripe instance
export const getStripe = () => {
  if (typeof window !== 'undefined') {
    return require('@stripe/stripe-js').loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return null;
};

// Create payment intent
export const createPaymentIntent = async (amount: number, currency: string = 'eur') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Format amount for display
export const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};
