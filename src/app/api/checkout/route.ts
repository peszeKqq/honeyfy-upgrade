import { NextRequest, NextResponse } from 'next/server';
import { getStripeInstance } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'eur' } = await request.json();

    console.log('Checkout API called with amount:', amount, 'currency:', currency);

    if (!amount || amount <= 0) {
      console.error('Invalid amount provided:', amount);
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Get Stripe instance
    const stripe = getStripeInstance();
    
    // Check if Stripe is properly initialized
    if (!stripe) {
      console.error('Stripe is not initialized');
      return NextResponse.json(
        { error: 'Payment service not available' },
        { status: 500 }
      );
    }

    // Create payment intent with specific payment methods
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      payment_method_types: ['card', 'ideal'],
      // Additional configuration for digital wallets
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
      },
    });

    console.log('Payment intent created successfully:', paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Failed to create payment intent';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
