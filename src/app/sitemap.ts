import { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { generateSitemapData } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://localhost:3000';
  const currentDate = new Date().toISOString();
  const locales = ['', '/nl', '/pl'];

  // Generate localized base pages
  const localizedBasePages = locales.flatMap(locale => {
    const pages = [
      {
        url: `${baseUrl}${locale}`,
        lastModified: currentDate,
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}${locale}/products`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}${locale}/blog`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}${locale}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: `${baseUrl}${locale}/contact`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: `${baseUrl}${locale}/faq`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
    ];
    return pages;
  });

  // Product pages for all locales
  const productPages = locales.flatMap(locale => 
    products.map((product) => ({
      url: `${baseUrl}${locale}/products/${product.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  // Category pages (only for default locale for now)
  const categoryPages = [
    'bestseller',
    'premium',
    'classic',
    'superfood',
    'fruit-honey',
    'wellness',
    'dark-honey'
  ].map((category) => ({
    url: `${baseUrl}/products?category=${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...localizedBasePages,
    ...productPages,
    ...categoryPages,
  ];
} 
