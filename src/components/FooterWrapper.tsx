'use client';

import { useEffect, useState } from 'react';
import Footer from './Footer';

export default function FooterWrapper() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // Detect locale from pathname
    const pathname = window.location.pathname;
    if (pathname.startsWith('/nl')) {
      setLocale('nl');
    } else if (pathname.startsWith('/pl')) {
      setLocale('pl');
    } else {
      setLocale('en');
    }
  }, []);

  return <Footer locale={locale} />;
}
