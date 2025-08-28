import { generateHreflangTags, validateHreflangImplementation } from '@/lib/hreflang';

interface HreflangTagsServerProps {
  pathname: string;
  currentLocale?: string;
}

export default function HreflangTagsServer({ pathname, currentLocale = 'en' }: HreflangTagsServerProps) {
  // Generate hreflang tags for the current page
  const hreflangTags = generateHreflangTags(pathname, currentLocale);
  
  // Validate the implementation (only in development)
  if (process.env.NODE_ENV === 'development') {
    const validation = validateHreflangImplementation(hreflangTags);
    if (!validation.isValid) {
      console.error('Hreflang validation errors:', validation.errors);
    }
    if (validation.warnings.length > 0) {
      console.warn('Hreflang validation warnings:', validation.warnings);
    }
  }

  return (
    <>
      {hreflangTags.map((tag, index) => (
        <link
          key={index}
          rel={tag.rel}
          href={tag.href}
          hrefLang={tag.hreflang}
        />
      ))}
    </>
  );
}
