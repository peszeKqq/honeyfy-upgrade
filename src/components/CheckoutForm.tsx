'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

interface CheckoutFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void;
  isLoading: boolean;
}

export default function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const { state } = useAuth();
  
  const [formData, setFormData] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      postalCode: '',
      country: 'NL',
    },
  });

  const [errors, setErrors] = useState<any>({});
  const [addressLoaded, setAddressLoaded] = useState(false);

  // Load saved shipping address and user data
  useEffect(() => {
    if (state.user && !addressLoaded) {
      // Pre-fill with user's email and name from profile
      const updatedFormData = {
        ...formData,
        email: state.user.email || '',
        firstName: state.user.name?.split(' ')[0] || '',
        lastName: state.user.name?.split(' ').slice(1).join(' ') || '',
      };

      // Try to load saved shipping address
      if (typeof window !== 'undefined') {
        const savedAddress = localStorage.getItem(`honeyfy-address-${state.user.id}`);
        
        if (savedAddress) {
          try {
            const addressData = JSON.parse(savedAddress);
            
            // Map profile address fields to checkout format
            updatedFormData.firstName = addressData.firstName || updatedFormData.firstName;
            updatedFormData.lastName = addressData.lastName || updatedFormData.lastName;
            updatedFormData.phone = addressData.phone || '';
            updatedFormData.address = {
              line1: addressData.address1 || '',
              line2: addressData.address2 || '',
              city: addressData.city || '',
              postalCode: addressData.postalCode || '',
              country: addressData.country || 'NL',
            };
          } catch (error) {
            console.error('Error loading saved address:', error);
          }
        }
      }

      setFormData(updatedFormData);
      setAddressLoaded(true);
    }
  }, [state.user, addressLoaded]);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof CustomerInfo] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Handle address errors
    const addressErrors: any = {};
    if (!formData.address.line1.trim()) addressErrors.line1 = 'Address is required';
    if (!formData.address.city.trim()) addressErrors.city = 'City is required';
    if (!formData.address.postalCode.trim()) addressErrors.postalCode = 'Postal code is required';
    
    if (Object.keys(addressErrors).length > 0) {
      newErrors.address = addressErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
            👤
          </span>
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-black ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-black ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-black ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-black ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+31 6 12345678"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              📦
            </span>
            Shipping Address
          </h3>
          {state.user && (
            <a
              href="/profile"
              className="text-yellow-600 hover:text-yellow-700 text-sm font-medium flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Edit in Profile</span>
            </a>
          )}
        </div>

        {/* Address loaded indicator */}
        {state.user && addressLoaded && formData.address.line1 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-800 font-medium">
                Shipping address loaded from your profile
              </span>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1 *
            </label>
            <input
              type="text"
              id="address1"
              value={formData.address.line1}
              onChange={(e) => handleInputChange('address.line1', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-black ${
                errors.address?.line1 ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123 Main Street"
            />
            {errors.address?.line1 && (
              <p className="text-red-500 text-sm mt-1">{errors.address.line1}</p>
            )}
          </div>

          <div>
            <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              id="address2"
              value={formData.address.line2}
              onChange={(e) => handleInputChange('address.line2', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-black"
              placeholder="Apartment, suite, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="city"
                value={formData.address.city}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-black ${
                  errors.address?.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Amsterdam"
              />
              {errors.address?.city && (
                <p className="text-red-500 text-sm mt-1">{errors.address.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code *
              </label>
              <input
                type="text"
                id="postalCode"
                value={formData.address.postalCode}
                onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-black ${
                  errors.address?.postalCode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1234 AB"
              />
              {errors.address?.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.address.postalCode}</p>
              )}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                id="country"
                value={formData.address.country}
                onChange={(e) => handleInputChange('address.country', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-black"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="IT">Italy</option>
                <option value="ES">Spain</option>
                <option value="NL">Netherlands</option>
                <option value="PL">Poland</option>
                <option value="AU">Australia</option>
                <option value="JP">Japan</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-none"
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>Continue to Payment</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        )}
      </button>
    </form>
  );
}
