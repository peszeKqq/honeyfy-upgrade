// Translation system for multilingual support
export interface TranslationKeys {
  // Navigation
  nav: {
    home: string;
    products: string;
    about: string;
    contact: string;
    blog: string;
    faq: string;
    wholesale: string;
  };
  
  // Homepage
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    features: string[];
  };
  
  // Products
  products: {
    title: string;
    subtitle: string;
    viewAll: string;
    addToCart: string;
    outOfStock: string;
    categories: {
      bestseller: string;
      premium: string;
      classic: string;
      superfood: string;
      fruitHoney: string;
      wellness: string;
      darkHoney: string;
    };
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    currency: string;
    freeShipping: string;
    readMore: string;
    learnMore: string;
    contactUs: string;
    email: string;
    phone: string;
    address: string;
  };
  
  // Footer
  footer: {
    description: string;
    quickLinks: string;
    contact: string;
    followUs: string;
    newsletter: {
      title: string;
      subtitle: string;
      placeholder: string;
      button: string;
    };
  };
}

export const translations: Record<string, TranslationKeys> = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      blog: 'Blog',
      faq: 'FAQ',
      wholesale: 'Wholesale'
    },
    hero: {
      title: 'Premium Polish Honey',
      subtitle: 'Discover the finest Polish honey delivered to the Netherlands. Organic, pure, and sustainably sourced honey products.',
      cta: 'Shop Now',
      features: [
        '100% Organic',
        'Free Shipping',
        'Premium Quality',
        'Sustainably Sourced'
      ]
    },
    products: {
      title: 'Our Honey Collection',
      subtitle: 'Discover our premium selection of Polish honey varieties',
      viewAll: 'View All Products',
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock',
      categories: {
        bestseller: 'Bestseller',
        premium: 'Premium',
        classic: 'Classic',
        superfood: 'Superfood',
        fruitHoney: 'Fruit Honey',
        wellness: 'Wellness',
        darkHoney: 'Dark Honey'
      }
    },
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      success: 'Success!',
      currency: '€',
      freeShipping: 'Free shipping on orders over €69',
      readMore: 'Read More',
      learnMore: 'Learn More',
      contactUs: 'Contact Us',
      email: 'Email',
      phone: 'Phone',
      address: 'Address'
    },
    footer: {
      description: 'Premium Polish honey delivered to the Netherlands. Organic, pure, and sustainably sourced honey products.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followUs: 'Follow Us',
      newsletter: {
        title: 'Stay Updated',
        subtitle: 'Get the latest news and special offers',
        placeholder: 'Enter your email',
        button: 'Subscribe'
      }
    }
  },
  nl: {
    nav: {
      home: 'Home',
      products: 'Producten',
      about: 'Over Ons',
      contact: 'Contact',
      blog: 'Blog',
      faq: 'FAQ',
      wholesale: 'Groothandel'
    },
    hero: {
      title: 'Premium Poolse Honing',
      subtitle: 'Ontdek de fijnste Poolse honing geleverd in Nederland. Biologische, pure en duurzaam geproduceerde honingproducten.',
      cta: 'Nu Winkelen',
      features: [
        '100% Biologisch',
        'Gratis Verzending',
        'Premium Kwaliteit',
        'Duurzaam Geproduceerd'
      ]
    },
    products: {
      title: 'Onze Honing Collectie',
      subtitle: 'Ontdek onze premium selectie Poolse honingsoorten',
      viewAll: 'Bekijk Alle Producten',
      addToCart: 'Toevoegen aan Winkelwagen',
      outOfStock: 'Niet op Voorraad',
      categories: {
        bestseller: 'Bestseller',
        premium: 'Premium',
        classic: 'Klassiek',
        superfood: 'Superfood',
        fruitHoney: 'Fruithoning',
        wellness: 'Wellness',
        darkHoney: 'Donkere Honing'
      }
    },
    common: {
      loading: 'Laden...',
      error: 'Er is iets misgegaan',
      success: 'Succes!',
      currency: '€',
      freeShipping: 'Gratis verzending bij bestellingen boven €69',
      readMore: 'Lees Meer',
      learnMore: 'Meer Informatie',
      contactUs: 'Neem Contact Op',
      email: 'E-mail',
      phone: 'Telefoon',
      address: 'Adres'
    },
    footer: {
      description: 'Premium Poolse honing geleverd in Nederland. Biologische, pure en duurzaam geproduceerde honingproducten.',
      quickLinks: 'Snelle Links',
      contact: 'Contact',
      followUs: 'Volg Ons',
      newsletter: {
        title: 'Blijf Op de Hoogte',
        subtitle: 'Ontvang het laatste nieuws en speciale aanbiedingen',
        placeholder: 'Voer je e-mail in',
        button: 'Abonneren'
      }
    }
  },
  pl: {
    nav: {
      home: 'Strona Główna',
      products: 'Produkty',
      about: 'O Nas',
      contact: 'Kontakt',
      blog: 'Blog',
      faq: 'FAQ',
      wholesale: 'Hurt'
    },
    hero: {
      title: 'Premium Polski Miód',
      subtitle: 'Odkryj najwyższej jakości polski miód dostarczany do Holandii. Organiczne, czyste i zrównoważone produkty miodowe.',
      cta: 'Kup Teraz',
      features: [
        '100% Organiczny',
        'Darmowa Dostawa',
        'Premium Jakość',
        'Zrównoważone Źródła'
      ]
    },
    products: {
      title: 'Nasza Kolekcja Miodu',
      subtitle: 'Odkryj naszą premium selekcję polskich odmian miodu',
      viewAll: 'Zobacz Wszystkie Produkty',
      addToCart: 'Dodaj do Koszyka',
      outOfStock: 'Niedostępny',
      categories: {
        bestseller: 'Bestseller',
        premium: 'Premium',
        classic: 'Klasyczny',
        superfood: 'Superfood',
        fruitHoney: 'Miód Owocowy',
        wellness: 'Wellness',
        darkHoney: 'Ciemny Miód'
      }
    },
    common: {
      loading: 'Ładowanie...',
      error: 'Coś poszło nie tak',
      success: 'Sukces!',
      currency: '€',
      freeShipping: 'Darmowa dostawa przy zamówieniach powyżej €69',
      readMore: 'Czytaj Więcej',
      learnMore: 'Dowiedz Się Więcej',
      contactUs: 'Skontaktuj Się z Nami',
      email: 'E-mail',
      phone: 'Telefon',
      address: 'Adres'
    },
    footer: {
      description: 'Premium polski miód dostarczany do Holandii. Organiczne, czyste i zrównoważone produkty miodowe.',
      quickLinks: 'Szybkie Linki',
      contact: 'Kontakt',
      followUs: 'Śledź Nas',
      newsletter: {
        title: 'Bądź na Bieżąco',
        subtitle: 'Otrzymuj najnowsze wiadomości i specjalne oferty',
        placeholder: 'Wprowadź swój e-mail',
        button: 'Subskrybuj'
      }
    }
  }
};

// Hook to get translations
export function useTranslation(locale: string = 'en'): TranslationKeys {
  return translations[locale] || translations.en;
}

// Get translation for a specific key
export function getTranslation(locale: string, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      return key; // Return key if translation not found
    }
  }
  
  return value;
}

// Get all available locales
export function getAvailableLocales(): string[] {
  return Object.keys(translations);
} 
