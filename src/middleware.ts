import { NextRequest, NextResponse } from 'next/server';

// Supported locales
const SUPPORTED_LOCALES = ['en', 'nl', 'pl'];
const DEFAULT_LOCALE = 'en';

// Function to get preferred locale from Accept-Language header
function getPreferredLocale(acceptLanguage: string): string {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  
  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [language, quality = '1'] = lang.trim().split(';q=');
      return {
        language: language.split('-')[0], // Get base language code
        quality: parseFloat(quality)
      };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality

  // Find the first supported locale
  for (const { language } of languages) {
    if (SUPPORTED_LOCALES.includes(language)) {
      return language;
    }
  }

  return DEFAULT_LOCALE;
}

// Function to check if pathname is already localized
function isLocalizedPath(pathname: string): boolean {
  // Check if the path starts with exactly one locale prefix
  for (const locale of SUPPORTED_LOCALES) {
    if (locale !== 'en' && (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
      return true;
    }
  }
  return false;
}

// Function to get locale from pathname
function getLocaleFromPath(pathname: string): string | null {
  for (const locale of SUPPORTED_LOCALES) {
    if (pathname.startsWith(`/${locale}`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return null;
}

// Function to remove locale from pathname
function removeLocaleFromPath(pathname: string): string {
  for (const locale of SUPPORTED_LOCALES) {
    if (pathname.startsWith(`/${locale}`)) {
      return pathname.replace(`/${locale}`, '') || '/';
    }
  }
  return pathname;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Middleware Debug:', {
      pathname,
      userAgent: request.headers.get('user-agent')?.substring(0, 50),
      acceptLanguage: request.headers.get('accept-language')
    });
  }

  // Check for malformed URLs with multiple locale prefixes and redirect to clean version
  const localePrefixes = ['nl', 'pl'];
  let cleanPathname = pathname;
  
  // Check for multiple locale prefixes in the path (more than 1)
  const localeCount = localePrefixes.reduce((count, locale) => {
    const regex = new RegExp(`/${locale}(?=/|$)`, 'g');
    const matches = pathname.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);
  
  // Debug logging for locale count
  if (process.env.NODE_ENV === 'development') {
    console.log('Locale count:', localeCount, 'for pathname:', pathname);
  }
  
  // Only redirect if there are multiple prefixes (more than 1)
  if (localeCount > 1) {
    // Remove all locale prefixes to get the clean path
    for (const locale of localePrefixes) {
      cleanPathname = cleanPathname.replace(new RegExp(`/${locale}(?=/|$)`, 'g'), '');
    }
    cleanPathname = cleanPathname || '/';
    
    // Debug logging for redirect
    if (process.env.NODE_ENV === 'development') {
      console.log('Redirecting from:', pathname, 'to:', cleanPathname);
    }
    
    // Redirect to the clean path
    const newUrl = new URL(cleanPathname, request.url);
    return NextResponse.redirect(newUrl);
  }

  // Check if the pathname is already properly localized (exactly one locale prefix)
  const isLocalized = isLocalizedPath(pathname);
  if (process.env.NODE_ENV === 'development') {
    console.log('Is localized:', isLocalized, 'for pathname:', pathname);
  }
  
  if (isLocalized) {
    return NextResponse.next();
  }

  // Only apply automatic language detection for the root path and only on first visit
  if (pathname === '/') {
    // Check if this is a fresh visit (no referer or referer is from external site)
    const referer = request.headers.get('referer');
    const isFreshVisit = !referer || !referer.includes('localhost:3000');
    
    if (isFreshVisit) {
      // Get user's preferred language from Accept-Language header
      const acceptLanguage = request.headers.get('accept-language') || '';
      const preferredLocale = getPreferredLocale(acceptLanguage);
      
      // Debug logging for language detection
      if (process.env.NODE_ENV === 'development') {
        console.log('Language detection:', { acceptLanguage, preferredLocale, isFreshVisit });
      }
      
      // If preferred locale is not English (default), redirect to localized version
      if (preferredLocale !== DEFAULT_LOCALE) {
        const newUrl = new URL(`/${preferredLocale}`, request.url);
        if (process.env.NODE_ENV === 'development') {
          console.log('Auto-redirecting to:', newUrl.pathname);
        }
        return NextResponse.redirect(newUrl);
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('Skipping auto-redirect for internal navigation');
      }
    }
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}; 
