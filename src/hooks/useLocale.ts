'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useLocale() {
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    const detectLocale = () => {
      const localeMatch = pathname.match(/^\/(nl|pl)(\/.*)?$/);
      const detectedLocale = localeMatch ? localeMatch[1] : 'en';
      setCurrentLocale(detectedLocale);
    };

    detectLocale();
  }, [pathname]);

  return currentLocale;
}
