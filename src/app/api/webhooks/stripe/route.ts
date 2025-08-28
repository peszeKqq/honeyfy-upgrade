import { NextRequest, NextResponse } from 'next/server';
import { getStripeInstance } from '@/lib/stripe';
import { orderService } from '@/lib/firebase';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !endpointSecret) {
    console.error('Missing stripe signature or webhook secret');
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  const stripe = getStripeInstance();
  if (!stripe) {
    console.error('Stripe not initialized');
    return NextResponse.json({ error: 'Stripe not available' }, { status: 500 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  console.log('Webhook event received:', event.type);

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      
      // Check if we have pending order data for this payment
      const pendingOrderKey = `pending_order_${paymentIntent.id}`;
      const tempOrderKey = 'pending_order_temp_ideal_payment';
      
      // Try to find order data in localStorage (this will be done client-side)
      // For now, we'll just log the successful payment
      console.log('✅ Payment intent succeeded:', {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        payment_method: paymentIntent.payment_method
      });
      break;
      
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
