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
    sitemap: 'http://localhost:3000/sitemap.xml',
  };
}
