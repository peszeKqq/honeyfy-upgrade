import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json({
        success: false,
        error: 'Firebase not initialized',
        message: 'Database connection failed'
      });
    }

    // Test basic Firebase connection
    console.log('Testing Firebase connection...');
    
    // Try to read from a test collection
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    
    return NextResponse.json({
      success: true,
      message: 'Firebase connection successful',
      testCollectionSize: snapshot.size,
      canRead: true
    });
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      code: error instanceof Error && 'code' in error ? (error as any).code : 'unknown',
      message: 'Firebase connection failed'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json({
        success: false,
        error: 'Firebase not initialized',
        message: 'Database connection failed'
      });
    }

    // Test writing to Firebase
    console.log('Testing Firebase write...');
    
    const testDoc = {
      test: true,
      timestamp: serverTimestamp(),
      message: 'Test document from API'
    };

    const docRef = await addDoc(collection(db, 'test'), testDoc);
    
    return NextResponse.json({
      success: true,
      message: 'Firebase write successful',
      documentId: docRef.id,
      canWrite: true
    });
  } catch (error) {
    console.error('Firebase write test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      code: error instanceof Error && 'code' in error ? (error as any).code : 'unknown',
      message: 'Firebase write failed'
    }, { status: 500 });
  }
}
