'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';

function TopBarContent() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const notifications = [
    {
      text: "Customers rate us ⭐️ 9.9/10",
      icon: "⭐️",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      text: "Order before 2 p.m.? Delivered tomorrow 🚀",
      icon: "🚀",
      color: "from-green-400 to-green-600"
    },
    {
      text: "Gratis bezorgd from €69",
      icon: "📦",
      color: "from-blue-400 to-blue-600"
    },
    {
      text: "Friendly Customer Service ❤️",
      icon: "❤️",
      color: "from-pink-400 to-pink-600"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [notifications.length]);

  // Handle scroll-based banner visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide banner when scrolling down (even slightly)
      if (currentScrollY > 10) {
        setBannerVisible(false);
      } else {
        // Show banner when at the top
        setBannerVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Update body class based on banner visibility
  useEffect(() => {
    if (bannerVisible) {
      document.body.classList.remove('banner-hidden');
    } else {
      document.body.classList.add('banner-hidden');
    }
  }, [bannerVisible]);

  const handleCloseBanner = () => {
    setBannerVisible(false);
  };

  return (
    <>
      {/* Notification Banner */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-yellow-50 via-orange-50 to-yellow-50 border-b border-yellow-200 shadow-sm overflow-hidden"
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-200 animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 py-2 relative z-10">
              <div className="flex items-center justify-between">
                {/* Notification content */}
                <div className="flex-1 flex justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-800"
                    >
                      <span className="text-lg">{notifications[currentIndex].icon}</span>
                      <span>{notifications[currentIndex].text}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Close button */}
                <button
                  onClick={handleCloseBanner}
                  className="ml-4 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close notification"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <Header bannerVisible={bannerVisible} />
    </>
  );
}

// Client-side wrapper to prevent hydration issues
export default function TopBar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on server
  }

  return <TopBarContent />;
}
