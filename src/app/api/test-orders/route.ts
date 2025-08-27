import { NextRequest, NextResponse } from 'next/server';
import { orderService } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    // Test getting all orders
    const orders = await orderService.getAllOrders();
    
    return NextResponse.json({
      success: true,
      message: 'Firebase order system is working',
      ordersCount: orders.length,
      orders: orders.slice(0, 5) // Return first 5 orders for testing
    });
  } catch (error) {
    console.error('Error testing Firebase orders:', error);
    return NextResponse.json({
      success: false,
      message: 'Firebase order system test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      // If no body provided, use default values
      body = {};
    }
    
    const { userId, items, total } = body;

    // Test adding an order
    const testOrder = {
      userId: userId || 'test-user-' + Date.now(),
      items: items || [
        {
          productId: 'test-product-1',
          name: 'Test Honey Product',
          price: 25.99,
          quantity: 2,
          image: '🍯'
        }
      ],
      subtotal: total || 51.98,
      shipping: 5.99,
      loyaltyDiscount: 0,
      total: (total || 51.98) + 5.99,
      status: 'processing',
      paymentIntentId: 'pi_test_' + Date.now(),
      shippingAddress: {
        name: 'Test User',
        email: 'test@example.com',
        address: '123 Test Street',
        city: 'Test City',
        postalCode: '12345',
        country: 'Test Country'
      }
    };

    console.log('Creating test order:', testOrder);
    const orderId = await orderService.addOrder(testOrder);
    
    if (orderId) {
      return NextResponse.json({
        success: true,
        message: 'Test order created successfully',
        orderId,
        order: testOrder
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to create order in Firebase',
        error: 'Firebase returned null orderId'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating test order:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create test order',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
