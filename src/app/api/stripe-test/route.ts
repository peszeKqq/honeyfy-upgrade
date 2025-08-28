import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    return NextResponse.json({
      secretKeyPresent: !!secretKey,
      publishableKeyPresent: !!publishableKey,
      secretKeyPrefix: secretKey ? secretKey.substring(0, 7) + '...' : 'missing',
      publishableKeyPrefix: publishableKey ? publishableKey.substring(0, 7) + '...' : 'missing',
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error('Stripe test error:', error);
    return NextResponse.json(
      { error: 'Failed to check Stripe configuration' },
      { status: 500 }
    );
  }
}
