'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const menuRef = useRef<HTMLDivElement>(null);
  const { state, logout } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigateToAuth = (mode: 'login' | 'register') => {
    setIsMenuOpen(false);
    // We'll navigate to auth pages instead of modal
    window.location.href = mode === 'login' ? '/auth/login' : '/auth/signup';
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  if (state.isAuthenticated && state.user) {
    // Authenticated user menu
    return (
      <>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center space-x-3 text-gray-700 hover:text-yellow-600 transition-colors p-2 rounded-lg hover:bg-yellow-50"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {state.user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="hidden md:block font-medium">{state.user.name}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-medium text-gray-900">{state.user.name}</p>
                <p className="text-sm text-gray-500">{state.user.email}</p>
              </div>

              {/* Menu items */}
              <div className="py-2">
                <Link
                  href="/dashboard"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Dashboard
                </Link>
                
                <Link
                  href="/orders"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order History
                </Link>
                
                <Link
                  href="/wishlist"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Wishlist
                </Link>
                
                <Link
                  href="/profile"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Profile & Settings
                </Link>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>


      </>
    );
  }

  // Guest user buttons
  return (
    <>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigateToAuth('login')}
          className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={() => navigateToAuth('register')}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Sign Up
        </button>
      </div>
    </>
  );
}
