'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';

interface HeaderProps {
  bannerVisible?: boolean;
}

export default function Header({ bannerVisible = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll-based navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        // Hide navbar when scrolling down (but not at the very top)
        setIsVisible(false);
      }
      
      // Reset navbar to default state when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsMenuOpen(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Ensure page starts from top on refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header 
          className="fixed left-0 right-0 z-50 glass-dark border-b border-yellow-500/20 shadow-lg"
          style={{ top: bannerVisible ? '40px' : '0px' }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.3
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/">
                <div className="flex-grow items-start justify-start md:m-3 cursor-pointer md:mr-14">
                  <Image
                    src="/logoheader.png"
                    alt="Honeyfy Logo"
                    width={150}
                    height={40}
                    className="cursor-pointer object-contain"
                    priority
                    quality={100}
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link 
                  href="/" 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>Home</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/products" 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>Products</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/about" 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>About</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>Contact</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/blog" 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>Blog</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/faq" 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>FAQ</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href="/wholesale" 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>Wholesale</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </nav>

              {/* Right side icons */}
              <div className="flex items-center space-x-6">
                {isMounted && <CartIcon />}
                {isMounted && <UserMenu />}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  className="md:hidden border-t border-gray-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-4 space-y-4">
                    <Link 
                      href="/" 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      href="/products" 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Products
                    </Link>
                    <Link 
                      href="/about" 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link 
                      href="/contact" 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                    <Link 
                      href="/blog" 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Blog
                    </Link>
                    <Link 
                      href="/faq" 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      FAQ
                    </Link>
                    <Link 
                      href="/wholesale" 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Wholesale
                    </Link>
                    <div className="flex items-center">
                      {isMounted && <CartIcon />}
                      <span className="ml-2 text-white">Cart</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
