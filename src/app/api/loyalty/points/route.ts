import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

// Get user's loyalty points
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const loyaltyRef = doc(db, 'loyalty_points', userId);
    const loyaltyDoc = await getDoc(loyaltyRef);

    if (loyaltyDoc.exists()) {
      const data = loyaltyDoc.data();
      // Convert old data structure to new one if needed
      const convertedData = {
        userId: data.userId,
        totalPoints: data.totalPoints || data.points || 0,
        availablePoints: data.availablePoints || 0,
        totalSpent: data.totalSpent || 0,
        discountAvailable: data.discountAvailable || 0,
        pointsUsed: data.pointsUsed || data.discountUsed || 0,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
      return NextResponse.json(convertedData);
    } else {
      // Create new loyalty record if it doesn't exist
      const newLoyaltyData = {
        userId,
        totalPoints: 0,
        availablePoints: 0,
        totalSpent: 0,
        discountAvailable: 0,
        pointsUsed: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(loyaltyRef, newLoyaltyData);
      return NextResponse.json(newLoyaltyData);
    }
  } catch (error) {
    console.error('Error fetching loyalty points:', error);
    return NextResponse.json({ error: 'Failed to fetch loyalty points' }, { status: 500 });
  }
}

// Update loyalty points (called after successful order)
export async function POST(request: NextRequest) {
  try {
    const { userId, orderAmount } = await request.json();

    if (!userId || !orderAmount) {
      return NextResponse.json({ error: 'User ID and order amount are required' }, { status: 400 });
    }

    const loyaltyRef = doc(db, 'loyalty_points', userId);
    const loyaltyDoc = await getDoc(loyaltyRef);

    let currentData;
    if (loyaltyDoc.exists()) {
      currentData = loyaltyDoc.data();
    } else {
      currentData = {
        userId,
        totalPoints: 0,
        availablePoints: 0,
        totalSpent: 0,
        discountAvailable: 0,
        pointsUsed: 0,
        createdAt: serverTimestamp()
      };
    }

    // Calculate new values
    const newTotalSpent = currentData.totalSpent + orderAmount;
    const pointsEarnedThisOrder = orderAmount; // 1€ = 1 point
    const newTotalPoints = (currentData.totalPoints || 0) + pointsEarnedThisOrder;
    
    // Calculate available discount based on points tiers
    let discountAvailable = 0;
    let pointsUsed = 0;
    
    if (newTotalPoints >= 150) {
      discountAvailable = 20; // 150 points = €20
      pointsUsed = 150;
    } else if (newTotalPoints >= 100) {
      discountAvailable = 12; // 100 points = €12
      pointsUsed = 100;
    } else if (newTotalPoints >= 50) {
      discountAvailable = 5; // 50 points = €5
      pointsUsed = 50;
    }
    
    const remainingPoints = newTotalPoints - pointsUsed;

    const updatedData = {
      ...currentData,
      totalPoints: newTotalPoints,
      availablePoints: remainingPoints,
      totalSpent: newTotalSpent,
      discountAvailable: discountAvailable,
      pointsUsed: pointsUsed,
      updatedAt: serverTimestamp()
    };

    await setDoc(loyaltyRef, updatedData);

    return NextResponse.json({
      success: true,
      loyaltyData: updatedData,
      message: `Earned ${pointsEarnedThisOrder} points!`
    });

  } catch (error) {
    console.error('Error updating loyalty points:', error);
    return NextResponse.json({ error: 'Failed to update loyalty points' }, { status: 500 });
  }
}

// Use loyalty points (called when applying discount)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { userId, discountAmount } = body;

    if (!userId || !discountAmount) {
      return NextResponse.json({ error: 'User ID and discount amount are required' }, { status: 400 });
    }

    const loyaltyRef = doc(db, 'loyalty_points', userId);
    const loyaltyDoc = await getDoc(loyaltyRef);

    if (!loyaltyDoc.exists()) {
      return NextResponse.json({ error: 'Loyalty record not found' }, { status: 404 });
    }

    const currentData = loyaltyDoc.data();
    
    // Check if user has enough discount available
    if (currentData.discountAvailable < discountAmount) {
      return NextResponse.json({ error: 'Insufficient loyalty discount available' }, { status: 400 });
    }

    // Calculate how many points this discount costs
    let pointsToDeduct = 0;
    if (discountAmount >= 20) {
      pointsToDeduct = 150; // €20 = 150 points
    } else if (discountAmount >= 12) {
      pointsToDeduct = 100; // €12 = 100 points
    } else if (discountAmount >= 5) {
      pointsToDeduct = 50; // €5 = 50 points
    }

    const updatedData = {
      ...currentData,
      totalPoints: currentData.totalPoints - pointsToDeduct,
      availablePoints: currentData.availablePoints - pointsToDeduct,
      discountAvailable: 0, // Reset discount available after use
      pointsUsed: currentData.pointsUsed + pointsToDeduct,
      updatedAt: serverTimestamp()
    };

    await updateDoc(loyaltyRef, updatedData);

    return NextResponse.json({
      success: true,
      loyaltyData: updatedData,
      message: `Applied ${discountAmount}€ discount using ${pointsToDeduct} points`
    });

  } catch (error) {
    console.error('Error using loyalty points:', error);
    return NextResponse.json({ error: 'Failed to use loyalty points' }, { status: 500 });
  }
}
