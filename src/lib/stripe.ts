import Stripe from 'stripe';

// Server-side Stripe instance
let stripe: Stripe | null = null;

const initializeStripe = () => {
  if (stripe) return stripe;
  
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  console.log('Stripe Secret Key:', secretKey ? 'Present' : 'Missing');
  console.log('Stripe Publishable Key:', publishableKey ? 'Present' : 'Missing');

  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY environment variable is not set');
    return null;
  }

  if (!publishableKey) {
    console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable is not set');
    return null;
  }

  try {
    stripe = new Stripe(secretKey, {
      apiVersion: '2025-07-30.basil',
    });
    console.log('✅ Stripe initialized successfully');
    return stripe;
  } catch (error) {
    console.error('❌ Failed to initialize Stripe:', error);
    return null;
  }
};

export const getStripeInstance = () => {
  return initializeStripe();
};

// Client-side Stripe instance
export const getStripe = () => {
  if (typeof window !== 'undefined') {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
      return null;
    }
    return require('@stripe/stripe-js').loadStripe(publishableKey);
  }
  return null;
};

// Create payment intent
export const createPaymentIntent = async (amount: number, currency: string = 'eur') => {
  try {
    const stripeInstance = getStripeInstance();
    if (!stripeInstance) {
      throw new Error('Stripe is not initialized');
    }
    
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      payment_method_types: ['card', 'ideal', 'google_pay', 'apple_pay'],
      // Additional configuration for digital wallets
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
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
