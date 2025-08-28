'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/lib/translations';

interface HeaderProps {
  bannerVisible?: boolean;
}

export default function Header({ bannerVisible = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentLocale, setCurrentLocale] = useState('en');

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Detect current locale from pathname - update when pathname changes
  useEffect(() => {
    const detectLocale = () => {
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        const localeMatch = pathname.match(/^\/(nl|pl)(\/.*)?$/);
        const detectedLocale = localeMatch ? localeMatch[1] : 'en';
        

        
        setCurrentLocale(detectedLocale);
      }
    };

    // Detect on mount
    detectLocale();

    // Listen for route changes
    const handleRouteChange = () => {
      detectLocale();
    };

    // Add event listener for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Also check periodically for pathname changes (fallback)
    const interval = setInterval(() => {
      detectLocale();
    }, 1000);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      clearInterval(interval);
    };
  }, []);

  // Get translations for current locale
  const t = useTranslation(currentLocale);



  // Temporary fallback translations for testing
  const getNavText = (key: string) => {
    const fallbackTranslations = {
      en: {
        home: 'Home',
        products: 'Products',
        about: 'About',
        contact: 'Contact',
        blog: 'Blog',
        faq: 'FAQ',
        wholesale: 'Wholesale'
      },
      nl: {
        home: 'Home',
        products: 'Producten',
        about: 'Over Ons',
        contact: 'Contact',
        blog: 'Blog',
        faq: 'FAQ',
        wholesale: 'Groothandel'
      },
      pl: {
        home: 'Strona Główna',
        products: 'Produkty',
        about: 'O Nas',
        contact: 'Kontakt',
        blog: 'Blog',
        faq: 'FAQ',
        wholesale: 'Hurt'
      },

    };
    
    return fallbackTranslations[currentLocale as keyof typeof fallbackTranslations]?.[key as keyof typeof fallbackTranslations.en] || t.nav[key as keyof typeof t.nav];
  };

  // Helper function to generate localized links
  const getLocalizedLink = (path: string) => {
    if (currentLocale === 'en') {
      return path;
    }
    return `/${currentLocale}${path}`;
  };

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
              <Link href={getLocalizedLink('/')} className="flex-shrink-0">
                <div className="flex items-center cursor-pointer">
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

              {/* Desktop Navigation - Center */}
              <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
                <Link 
                  href={getLocalizedLink('/')} 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>{getNavText('home')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href={getLocalizedLink('/products')} 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>{getNavText('products')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href={getLocalizedLink('/about')} 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>{getNavText('about')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href={getLocalizedLink('/contact')} 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>{getNavText('contact')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href={getLocalizedLink('/blog')} 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>{getNavText('blog')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href={getLocalizedLink('/faq')} 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>{getNavText('faq')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link 
                  href={getLocalizedLink('/wholesale')} 
                  className="btn-ghost text-white hover:text-yellow-400 relative group"
                >
                  <span>{getNavText('wholesale')}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </nav>

              {/* Right side icons */}
              <div className="flex items-center space-x-4 flex-shrink-0">
                {/* Debug: Show current locale */}
                <span className="text-xs text-yellow-400 bg-black/20 px-2 py-1 rounded">
                  {currentLocale}
                </span>
                {isMounted && <LanguageSwitcher />}
                {isMounted && <CartIcon />}
                {isMounted && <UserMenu />}
                
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-white hover:text-yellow-400 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  className="lg:hidden border-t border-gray-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-4 space-y-4">
                    <Link 
                      href={getLocalizedLink('/')} 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getNavText('home')}
                    </Link>
                    <Link 
                      href={getLocalizedLink('/products')} 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getNavText('products')}
                    </Link>
                    <Link 
                      href={getLocalizedLink('/about')} 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getNavText('about')}
                    </Link>
                    <Link 
                      href={getLocalizedLink('/contact')} 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getNavText('contact')}
                    </Link>
                    <Link 
                      href={getLocalizedLink('/blog')} 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getNavText('blog')}
                    </Link>
                    <Link 
                      href={getLocalizedLink('/faq')} 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getNavText('faq')}
                    </Link>
                    <Link 
                      href={getLocalizedLink('/wholesale')} 
                      className="block text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {getNavText('wholesale')}
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
