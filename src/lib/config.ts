// Configuration for different environments
export const config = {
  // Base URL configuration
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://honeyfy.nl' 
    : 'http://localhost:3000',
  
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // Site configuration
  site: {
    name: 'Honeyfy',
    description: 'Premium Polish honey delivered to the Netherlands. Organic, pure, and sustainably sourced honey products.',
    ogImage: '/logo.png',
    twitterHandle: '@honeyfy_nl',
    locale: 'en_US',
    type: 'website',
  },
  
  // Supported locales
  locales: ['en', 'nl', 'pl', 'de'],
  defaultLocale: 'en',
  
  // API configuration
  api: {
    baseUrl: process.env.NODE_ENV === 'production' 
      ? 'https://honeyfy.nl/api' 
      : 'http://localhost:3000/api',
  },
  
  // SEO configuration
  seo: {
    title: 'Honeyfy - Premium Polish Honey | Buy Organic Honey Online',
    description: 'Discover the finest Polish honey delivered to the Netherlands. Organic, pure, and sustainably sourced honey products. Free shipping on orders over €69.',
    keywords: 'Polish honey, organic honey, buy honey online, Dutch honey, premium honey, honey delivery Netherlands, pure honey, natural honey, sustainable honey',
  }
};

// Helper function to get localized URL
export function getLocalizedUrl(path: string, locale: string = 'en'): string {
  const basePath = locale === 'en' ? path : `/${locale}${path}`;
  return `${config.baseUrl}${basePath}`;
}

// Helper function to get canonical URL
export function getCanonicalUrl(path: string, locale: string = 'en'): string {
  return getLocalizedUrl(path, locale);
}

// Helper function to check if current environment is development
export function isDevelopment(): boolean {
  return config.isDevelopment;
}

// Helper function to check if current environment is production
export function isProduction(): boolean {
  return config.isProduction;
}
