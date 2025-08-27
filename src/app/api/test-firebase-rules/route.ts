import { NextRequest, NextResponse } from 'next/server';
import { orderService } from '@/lib/firebase';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    // Test reading from orders collection
    const orders = await orderService.getAllOrders();
    
    return NextResponse.json({
      success: true,
      message: 'Firebase rules test - READ access',
      ordersCount: orders.length,
      canRead: true
    });
  } catch (error) {
    console.error('Firebase rules test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Firebase rules test - READ access failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      canRead: false
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Test writing to orders collection
    const testOrder = {
      userId: 'test-user-' + Date.now(),
      items: [
        {
          productId: 'test-product',
          name: 'Test Product',
          price: 10.00,
          quantity: 1,
          image: '🍯'
        }
      ],
      subtotal: 10.00,
      shipping: 5.99,
      loyaltyDiscount: 0,
      total: 15.99,
      status: 'pending',
      paymentIntentId: 'pi_test_' + Date.now(),
      shippingAddress: {
        name: 'Test User',
        email: 'test@example.com',
        address: '123 Test St',
        city: 'Test City',
        postalCode: '12345',
        country: 'Test Country'
      }
    };

    // Try direct Firebase access first
    if (db) {
      try {
        const orderWithTimestamp = {
          ...testOrder,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, 'orders'), orderWithTimestamp);
        console.log('✅ Direct Firebase write successful:', docRef.id);
        
        return NextResponse.json({
          success: true,
          message: 'Direct Firebase write successful',
          orderId: docRef.id,
          canWrite: true,
          method: 'direct'
        });
      } catch (directError) {
        console.error('❌ Direct Firebase write failed:', directError);
        
        // Fallback to orderService
        const orderId = await orderService.addOrder(testOrder);
        
        return NextResponse.json({
          success: true,
          message: 'Firebase rules test - WRITE access (fallback)',
          orderId,
          canWrite: true,
          method: 'fallback',
          directError: directError instanceof Error ? directError.message : 'Unknown error'
        });
      }
    } else {
      // No Firebase connection
      const orderId = await orderService.addOrder(testOrder);
      
      return NextResponse.json({
        success: true,
        message: 'Firebase rules test - WRITE access (localStorage)',
        orderId,
        canWrite: true,
        method: 'localStorage'
      });
    }
  } catch (error) {
    console.error('Firebase rules test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Firebase rules test - WRITE access failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      canWrite: false
    }, { status: 500 });
  }
}
