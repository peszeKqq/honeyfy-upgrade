import { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { generateSitemapData } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://honeyfy.nl';
  const currentDate = new Date().toISOString();

  // Base pages
  const basePages = generateSitemapData().map(page => ({
    ...page,
    changeFrequency: page.changeFrequency as "daily" | "weekly" | "monthly" | "always" | "hourly" | "yearly" | "never"
  }));

  // Product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Blog pages (if you have blog posts)
  const blogPages = [
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Add individual blog posts here when you have them
  ];

  // Category pages
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
    ...basePages,
    ...productPages,
    ...blogPages,
    ...categoryPages,
  ];
} 
