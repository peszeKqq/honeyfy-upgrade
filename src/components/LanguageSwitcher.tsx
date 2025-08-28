'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLanguageSwitcherLinks, SUPPORTED_LOCALES } from '@/lib/hreflang';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Determine current locale from pathname
  const getCurrentLocale = (pathname: string): string => {
    // Check for exact matches first to avoid partial matches
    if (pathname === '/nl' || pathname.startsWith('/nl/')) return 'nl';
    if (pathname === '/pl' || pathname.startsWith('/pl/')) return 'pl';
    return 'en';
  };
  
  const currentLocale = getCurrentLocale(pathname);
  
  const languageLinks = getLanguageSwitcherLinks(pathname, currentLocale);
  const currentLanguage = SUPPORTED_LOCALES.find(locale => locale.locale === currentLocale);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when pressing Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const getLanguageName = (locale: string) => {
    const names: { [key: string]: string } = {
      'en': 'English',
      'nl': 'Nederlands',
      'pl': 'Polski'
    };
    return names[locale] || locale;
  };

  const getFlagEmoji = (locale: string) => {
    const flags: { [key: string]: string } = {
      'en': '🇺🇸',
      'nl': '🇳🇱',
      'pl': '🇵🇱'
    };
    return flags[locale] || '🌐';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-white hover:text-yellow-400 transition-colors duration-200 rounded-lg hover:bg-white/10"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{getFlagEmoji(currentLocale)}</span>
        <span className="hidden sm:block text-sm font-medium">
          {getLanguageName(currentLocale)}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {languageLinks.map((link) => (
            <Link
              key={link.locale}
              href={link.url}
              className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                link.isCurrent
                  ? 'bg-yellow-50 text-yellow-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">{getFlagEmoji(link.locale)}</span>
              <span>{getLanguageName(link.locale)}</span>
              {link.isCurrent && (
                <svg className="w-4 h-4 ml-auto text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 
