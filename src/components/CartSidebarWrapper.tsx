'use client';

import { useEffect, useState } from 'react';
import CartSidebar from './CartSidebar';

export default function CartSidebarWrapper() {
  const [locale, setLocale] = useState<'en' | 'nl' | 'pl'>('en');

  const updateLocale = () => {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/nl')) {
      setLocale('nl');
    } else if (pathname.startsWith('/pl')) {
      setLocale('pl');
    } else {
      setLocale('en');
    }
  };

  useEffect(() => {
    // Initial locale detection
    updateLocale();

    // Listen for URL changes
    const handlePopState = () => {
      updateLocale();
    };

    // Listen for navigation events
    const handleRouteChange = () => {
      updateLocale();
    };

    // Add event listeners
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('pushstate', handleRouteChange);
    window.addEventListener('replacestate', handleRouteChange);

    // Set up interval to check for URL changes (fallback)
    const interval = setInterval(updateLocale, 100);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pushstate', handleRouteChange);
      window.removeEventListener('replacestate', handleRouteChange);
      clearInterval(interval);
    };
  }, []);

  return <CartSidebar locale={locale} />;
}
