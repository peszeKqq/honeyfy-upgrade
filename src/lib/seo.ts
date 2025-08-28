import { Metadata } from 'next';

// SEO Configuration
export const siteConfig = {
  name: 'Honeyfy',
  description: 'Premium Polish honey delivered to the Netherlands. Organic, pure, and sustainably sourced honey products.',
  url: 'http://localhost:3000',
  ogImage: '/logo.png',
  twitterHandle: '@honeyfy_nl',
  locale: 'en_US',
  type: 'website',
};

// Product interface for SEO
export interface ProductSEO {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  weight: string;
  rating: number;
  reviews: number;
  features: string[];
  inStock: boolean;
}

// Generate structured data for products
export function generateProductStructuredData(product: ProductSEO) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": `${siteConfig.url}${product.image}`,
    "url": `${siteConfig.url}/products/${product.slug}`,
    "brand": {
      "@type": "Brand",
      "name": "Honeyfy"
    },
    "category": product.category,
    "sku": product.id,
    "mpn": product.id,
    "weight": {
      "@type": "QuantitativeValue",
      "value": product.weight.replace('kg', '').replace('g', ''),
      "unitText": product.weight.includes('kg') ? "kg" : "g"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "EUR",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Honeyfy"
      },
      "url": `${siteConfig.url}/products/${product.slug}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews,
      "bestRating": 5,
      "worstRating": 1
    }
  };

  if (product.originalPrice) {
    (structuredData.offers as any).priceSpecification = {
      "@type": "PriceSpecification",
      "price": product.price,
      "priceCurrency": "EUR",
      "valueAddedTaxIncluded": true
    };
  }

  return structuredData;
}

// Generate structured data for organization
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Honeyfy",
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/logo.png`,
    "description": siteConfig.description,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL",
      "addressLocality": "Netherlands"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "honeyfy.online@gmail.com"
    },
    "sameAs": [
      "https://www.facebook.com/honeyfy",
      "https://www.instagram.com/honeyfy_nl",
      "https://www.tiktok.com/@honeyfy_nl"
    ]
  };
}

// Generate structured data for FAQ
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Generate structured data for breadcrumbs
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

// Generate meta tags for pages
export function generateMetaTags({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noIndex = false,
  canonical
}: {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
  canonical?: string;
}): Metadata {
  const meta: Metadata = {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: url || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: siteConfig.locale,
      type: type as "website" | "article",
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image || siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: canonical || url || siteConfig.url,
    },
    other: {
      'theme-color': '#f59e0b',
    },
  };

  return meta;
}

// Generate product-specific meta tags
export function generateProductMetaTags(product: ProductSEO) {
  const keywords = [
    'Polish honey',
    'organic honey',
    'buy honey online',
    'Dutch honey',
    'premium honey',
    product.name.toLowerCase(),
    product.category.toLowerCase(),
    'honey delivery Netherlands',
    'pure honey',
    'natural honey'
  ].join(', ');

  return generateMetaTags({
    title: product.name,
    description: product.description,
    keywords,
    image: product.image,
    url: `${siteConfig.url}/products/${product.slug}`,
    type: 'product',
    canonical: `${siteConfig.url}/products/${product.slug}`,
  });
}

// Generate homepage meta tags
export function generateHomepageMetaTags() {
  return generateMetaTags({
    title: 'Premium Polish Honey | Buy Organic Honey Online',
    description: 'Discover the finest Polish honey delivered to the Netherlands. Organic, pure, and sustainably sourced honey products. Free shipping on orders over €69.',
    keywords: 'Polish honey, organic honey, buy honey online, Dutch honey, premium honey, honey delivery Netherlands, pure honey, natural honey, sustainable honey',
    url: siteConfig.url,
    type: 'website',
    canonical: siteConfig.url,
  });
}

// Generate products page meta tags
export function generateProductsMetaTags() {
  return generateMetaTags({
    title: 'All Honey Products | Premium Polish Honey Collection',
    description: 'Browse our complete collection of premium Polish honey products. From heather honey to acacia honey, find your perfect organic honey. Free shipping available.',
    keywords: 'honey products, Polish honey collection, organic honey varieties, premium honey selection, buy honey online Netherlands',
    url: `${siteConfig.url}/products`,
    type: 'website',
    canonical: `${siteConfig.url}/products`,
  });
}

// Generate blog meta tags
export function generateBlogMetaTags(post?: { title: string; description: string; slug: string; image?: string }) {
  if (post) {
    return generateMetaTags({
      title: post.title,
      description: post.description,
      keywords: 'honey blog, honey health benefits, honey recipes, Polish honey guide, organic honey tips',
      image: post.image,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: 'article',
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    });
  }

  return generateMetaTags({
    title: 'Honey Blog | Honey Health Benefits & Recipes',
    description: 'Discover honey health benefits, recipes, and tips. Learn about Polish honey varieties and how to use honey in your daily life.',
    keywords: 'honey blog, honey health benefits, honey recipes, Polish honey guide, organic honey tips, honey wellness',
    url: `${siteConfig.url}/blog`,
    type: 'website',
    canonical: `${siteConfig.url}/blog`,
  });
}

// Generate sitemap data
export function generateSitemapData() {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}

// SEO-friendly URL generation
export function generateSEOUrl(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Generate internal linking suggestions
export function generateInternalLinks(product: ProductSEO) {
  const links = [
    {
      text: 'View All Products',
      url: '/products',
      description: 'Browse our complete honey collection'
    },
    {
      text: 'Learn About Honey Benefits',
      url: '/blog',
      description: 'Discover honey health benefits and recipes'
    },
    {
      text: 'Contact Us',
      url: '/contact',
      description: 'Get in touch with our honey experts'
    }
  ];

  // Add category-specific links
  if (product.category === 'Bestseller') {
    links.push({
      text: 'Our Bestsellers',
      url: '/products?category=bestseller',
      description: 'See our most popular honey products'
    });
  }

  return links;
} 
