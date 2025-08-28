// Hreflang Configuration for Multilingual SEO
// This implementation avoids common problems like circular references, missing x-default, and incorrect language codes

export interface HreflangConfig {
  locale: string;
  language: string;
  region?: string;
  url: string;
  isDefault?: boolean;
}

// Define your supported languages and regions
export const SUPPORTED_LOCALES: HreflangConfig[] = [
  {
    locale: 'en',
    language: 'en',
    region: 'US',
    url: 'http://localhost:3000',
    isDefault: true
  },
  {
    locale: 'nl',
    language: 'nl',
    region: 'NL',
    url: 'http://localhost:3000'
  },
  {
    locale: 'pl',
    language: 'pl',
    region: 'PL',
    url: 'http://localhost:3000'
  }
];

// Get the default locale
export function getDefaultLocale(): HreflangConfig {
  return SUPPORTED_LOCALES.find(locale => locale.isDefault) || SUPPORTED_LOCALES[0];
}

// Get locale by code
export function getLocaleByCode(code: string): HreflangConfig | undefined {
  return SUPPORTED_LOCALES.find(locale => locale.locale === code);
}

// Generate hreflang tags for a specific page
export function generateHreflangTags(
  currentPath: string,
  currentLocale: string = 'en'
): Array<{ rel: string; href: string; hreflang?: string }> {
  const tags: Array<{ rel: string; href: string; hreflang?: string }> = [];
  
  // Get the current locale config
  const currentLocaleConfig = getLocaleByCode(currentLocale);
  if (!currentLocaleConfig) {
    console.warn(`Locale ${currentLocale} not found in supported locales`);
    return tags;
  }

  // First, clean the current path by removing any existing locale prefix
  let cleanPath = currentPath;
  
  // Use a more robust approach to clean the path
  const localePattern = /^\/(nl|pl)(\/.*)?$/;
  const match = cleanPath.match(localePattern);
  if (match) {
    cleanPath = match[2] || '/'; // Use the part after locale, or '/' if nothing
  }

  // Generate hreflang tags for each supported locale
  SUPPORTED_LOCALES.forEach(locale => {
    let localizedPath = cleanPath;
    
    // Handle path localization
    if (locale.locale !== 'en') {
      // For non-English locales, add locale prefix
      if (cleanPath === '/') {
        localizedPath = `/${locale.locale}`;
      } else {
        localizedPath = `/${locale.locale}${cleanPath}`;
      }
    } else {
      // For English (default), use clean path
      localizedPath = cleanPath;
    }

    const fullUrl = `http://localhost:3000${localizedPath}`;
    
    // Create hreflang tag
    const hreflang = locale.region ? `${locale.language}-${locale.region}` : locale.language;
    
    tags.push({
      rel: 'alternate',
      href: fullUrl,
      hreflang
    });
  });

  // Add x-default tag (points to the default language version)
  const defaultUrl = `http://localhost:3000${cleanPath}`;
  tags.push({
    rel: 'alternate',
    href: defaultUrl,
    hreflang: 'x-default'
  });

  return tags;
}

// Generate hreflang meta tags for Next.js
export function generateHreflangMetaTags(
  currentPath: string,
  currentLocale: string = 'en'
): Array<{ rel: string; href: string; hreflang?: string }> {
  return generateHreflangTags(currentPath, currentLocale);
}

// Validate hreflang implementation
export function validateHreflangImplementation(tags: Array<{ rel: string; href: string; hreflang?: string }>): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for x-default
  const hasXDefault = tags.some(tag => tag.hreflang === 'x-default');
  if (!hasXDefault) {
    errors.push('Missing x-default hreflang tag');
  }

  // Check for duplicate hreflang values
  const hreflangValues = tags.map(tag => tag.hreflang).filter(Boolean);
  const duplicates = hreflangValues.filter((value, index) => hreflangValues.indexOf(value) !== index);
  if (duplicates.length > 0) {
    errors.push(`Duplicate hreflang values: ${duplicates.join(', ')}`);
  }

  // Check for valid URLs
  tags.forEach(tag => {
    try {
      new URL(tag.href);
    } catch {
      errors.push(`Invalid URL in hreflang: ${tag.href}`);
    }
  });

  // Check for self-referencing
  const selfReferencing = tags.filter(tag => tag.href.includes('localhost:3000'));
  if (selfReferencing.length === 0) {
    warnings.push('No self-referencing hreflang tags found');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Get canonical URL for a specific locale
export function getCanonicalUrl(path: string, locale: string = 'en'): string {
  const localeConfig = getLocaleByCode(locale);
  if (!localeConfig) {
    return `http://localhost:3000${path}`;
  }

  // First, clean the path by removing any existing locale prefix
  let cleanPath = path;
  
  // Use a more robust approach to clean the path
  const localePattern = /^\/(nl|pl|de)(\/.*)?$/;
  const match = cleanPath.match(localePattern);
  if (match) {
    cleanPath = match[2] || '/'; // Use the part after locale, or '/' if nothing
  }

  let canonicalPath = cleanPath;
  
  // For non-default locales, include locale in canonical
  if (locale !== 'en') {
    if (cleanPath === '/') {
      canonicalPath = `/${locale}`;
    } else {
      canonicalPath = `/${locale}${cleanPath}`;
    }
  }

  return `http://localhost:3000${canonicalPath}`;
}

// Language switcher utility
export function getLanguageSwitcherLinks(currentPath: string, currentLocale: string = 'en') {
  // First, remove any existing locale prefix from the current path
  let cleanPath = currentPath;
  
  // Use a more robust approach to clean the path
  const localePattern = /^\/(nl|pl|de)(\/.*)?$/;
  const match = cleanPath.match(localePattern);
  if (match) {
    cleanPath = match[2] || '/'; // Use the part after locale, or '/' if nothing
  }



  return SUPPORTED_LOCALES.map(locale => {
    let localizedPath = cleanPath;
    
    if (locale.locale !== 'en') {
      if (cleanPath === '/') {
        localizedPath = `/${locale.locale}`;
      } else {
        localizedPath = `/${locale.locale}${cleanPath}`;
      }
    } else {
      localizedPath = cleanPath;
    }

    const result = {
      locale: locale.locale,
      language: locale.language,
      region: locale.region,
      url: `http://localhost:3000${localizedPath}`,
      isCurrent: locale.locale === currentLocale
    };



    return result;
  });
}
