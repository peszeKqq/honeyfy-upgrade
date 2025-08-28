'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface LoyaltyPointsProps {
  totalAmount: number;
  onDiscountApplied: (discountAmount: number) => void;
  onDiscountRemoved: () => void;
}

export default function LoyaltyPoints({ totalAmount, onDiscountApplied, onDiscountRemoved }: LoyaltyPointsProps) {
  const { state } = useAuth();
  const [loyaltyData, setLoyaltyData] = useState({
    totalPoints: 0,
    availablePoints: 0,
    totalSpent: 0,
    discountAvailable: 0,
    pointsUsed: 0
  });
  const [loading, setLoading] = useState(true);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [showLoyalty, setShowLoyalty] = useState(false);

  // Load loyalty points
  useEffect(() => {
    const fetchLoyaltyPoints = async () => {
      if (!state.user?.id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`/api/loyalty/points?userId=${state.user.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setLoyaltyData(data);
          setShowLoyalty(data.discountAvailable > 0);
        }
      } catch (error) {
        console.error('Error fetching loyalty points:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoyaltyPoints();
  }, [state.user?.id]);

  const handleApplyDiscount = async () => {
    if (!state.user?.id || loyaltyData.discountAvailable === 0) {
      return;
    }

    const discountToApply = Math.min(loyaltyData.discountAvailable, totalAmount);
    
    try {
      const requestBody = {
        userId: state.user.id,
        discountAmount: discountToApply
      };
      
      const response = await fetch('/api/loyalty/points', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (response.ok) {
        setLoyaltyData(data.loyaltyData);
        setAppliedDiscount(discountToApply);
        onDiscountApplied(discountToApply);
        setShowLoyalty(false);
      }
    } catch (error) {
      console.error('Error applying discount:', error);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(0);
    onDiscountRemoved();
    setShowLoyalty(loyaltyData.discountAvailable > 0);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-center py-4">
          <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-3"></div>
          <span className="text-gray-600">Loading loyalty points...</span>
        </div>
      </div>
    );
  }

  if (!state.user) {
    return null;
  }
  
  // Manual refresh function
  const refreshLoyaltyData = async () => {
    if (!state.user?.id) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/loyalty/points?userId=${state.user.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setLoyaltyData(data);
        setShowLoyalty(data.discountAvailable > 0);
      }
    } catch (error) {
      console.error('Error refreshing loyalty points:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Show different content based on points status
  if (loyaltyData.totalPoints === 0) {
    // User hasn't earned any points yet
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
              🎁
            </span>
            Loyalty Points
          </h3>
                     <div className="flex space-x-2">
             <button
               onClick={refreshLoyaltyData}
               className="text-xs bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded text-blue-600"
             >
               Refresh
             </button>
           </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200">
          <div className="text-center">
            <p className="text-yellow-800 font-medium mb-2">Start earning loyalty points!</p>
            <p className="text-sm text-yellow-700 mb-3">
              Complete this purchase to earn {Math.round(totalAmount)} points for your next order.
            </p>
            <div className="text-xs text-yellow-600">
              <p>• Earn 1 point for every €1 spent</p>
              <p>• 50 points = €5, 100 points = €12, 150 points = €20</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (loyaltyData.discountAvailable === 0) {
    // User has points but no discount available (points used up)
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
            🎁
          </span>
          Loyalty Points
        </h3>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="text-center">
            <p className="text-blue-800 font-medium mb-2">Keep earning points!</p>
            <p className="text-sm text-blue-700 mb-3">
              You have {Math.round(loyaltyData.totalPoints)} total points. Complete this purchase to earn {Math.round(totalAmount)} more points.
            </p>
            <div className="text-xs text-blue-600">
              <p>• Earn 1 point for every €1 spent</p>
              <p>• 50 points = €5, 100 points = €12, 150 points = €20</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
          🎁
        </span>
        Loyalty Points
      </h3>

      {appliedDiscount > 0 ? (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-800 font-medium">Discount Applied</p>
                <p className="text-2xl font-bold text-green-600">-€{appliedDiscount}</p>
              </div>
              <button
                onClick={handleRemoveDiscount}
                className="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">Available Discount</span>
              <span className="text-2xl font-bold text-yellow-600">€{loyaltyData.discountAvailable}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Use your loyalty points to get a discount on this order!
            </p>
            <button
              onClick={handleApplyDiscount}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Apply €{Math.min(loyaltyData.discountAvailable, totalAmount)} Discount
            </button>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>• Earn 1 point for every €1 spent</p>
            <p>• 50 points = €5, 100 points = €12, 150 points = €20</p>
          </div>
        </div>
      )}
    </div>
  );
}
