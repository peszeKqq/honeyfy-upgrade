import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/checkout/',
        '/confirmation/',
        '/dashboard/',
        '/orders/',
        '/profile/',
        '/auth/',
      ],
    },
    sitemap: 'https://honeyfy.nl/sitemap.xml',
  };
}
