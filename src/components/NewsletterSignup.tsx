'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Translation object for newsletter section
const newsletterTranslations = {
  en: {
    title: "🍯 Sweet Deals Await!",
    subtitle: "Subscribe to our newsletter and get",
    discount: "5% OFF",
    subtitleEnd: "your first order!",
    benefits: {
      exclusive: {
        title: "Exclusive Discounts",
        description: "First-time subscriber bonus"
      },
      updates: {
        title: "Latest Updates",
        description: "New products & blog posts"
      },
      tips: {
        title: "Honey Tips",
        description: "Recipes & health benefits"
      }
    },
    placeholder: "Enter your email address",
    button: "Get 5% OFF! 🍯",
    subscribing: "Subscribing...",
    success: {
      title: "Welcome to Honeyfy!",
      message: "Check your email for your exclusive 10% discount code!"
    },
    privacy: "By subscribing, you agree to receive marketing emails from Honeyfy. You can unsubscribe at any time. We respect your privacy."
  },
  nl: {
    title: "🍯 Zoete Aanbiedingen Wachten!",
    subtitle: "Abonneer je op onze nieuwsbrief en krijg",
    discount: "5% KORTING",
    subtitleEnd: "op je eerste bestelling!",
    benefits: {
      exclusive: {
        title: "Exclusieve Kortingen",
        description: "Bonus voor nieuwe abonnees"
      },
      updates: {
        title: "Laatste Updates",
        description: "Nieuwe producten & blog posts"
      },
      tips: {
        title: "Honing Tips",
        description: "Recepten & gezondheidsvoordelen"
      }
    },
    placeholder: "Voer je e-mailadres in",
    button: "Krijg 5% KORTING! 🍯",
    subscribing: "Abonneren...",
    success: {
      title: "Welkom bij Honeyfy!",
      message: "Controleer je e-mail voor je exclusieve 10% kortingscode!"
    },
    privacy: "Door je te abonneren ga je akkoord met het ontvangen van marketing e-mails van Honeyfy. Je kunt je op elk moment afmelden. We respecteren je privacy."
  },
  pl: {
    title: "🍯 Słodkie Oferty Czekają!",
    subtitle: "Zapisz się do naszego newslettera i otrzymaj",
    discount: "5% ZNIŻKI",
    subtitleEnd: "na pierwsze zamówienie!",
    benefits: {
      exclusive: {
        title: "Ekskluzywne Zniżki",
        description: "Bonus dla nowych subskrybentów"
      },
      updates: {
        title: "Najnowsze Aktualizacje",
        description: "Nowe produkty & posty na blogu"
      },
      tips: {
        title: "Wskazówki o Miodzie",
        description: "Przepisy & korzyści zdrowotne"
      }
    },
    placeholder: "Wprowadź swój adres e-mail",
    button: "Otrzymaj 5% ZNIŻKI!",
    subscribing: "Zapisywanie...",
    success: {
      title: "Witamy w Honeyfy!",
      message: "Sprawdź swój e-mail, aby otrzymać ekskluzywny kod zniżkowy 5%!"
    },
    privacy: "Zapisując się, zgadzasz się na otrzymywanie e-maili marketingowych od Honeyfy. Możesz zrezygnować z subskrypcji w dowolnym momencie. Szanujemy Twoją prywatność."
  }
};

interface NewsletterSignupProps {
  locale?: string;
}

export default function NewsletterSignup({ locale = 'en' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get translations for current locale
  const t = newsletterTranslations[locale as keyof typeof newsletterTranslations] || newsletterTranslations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSuccess(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (err: any) {
      console.error('Newsletter signup error:', err);
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🎉</span>
              <div>
                <h3 className="text-green-800 font-semibold">{t.success.title}</h3>
                <p className="text-green-700 text-sm">
                  {t.success.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t.title}
          </h2>
          <p className="text-gray-600 text-lg">
            {t.subtitle} <span className="font-bold text-yellow-600">{t.discount}</span> {t.subtitleEnd}
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🎁</span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900">{t.benefits.exclusive.title}</h4>
              <p className="text-sm text-gray-600">{t.benefits.exclusive.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📰</span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900">{t.benefits.updates.title}</h4>
              <p className="text-sm text-gray-600">{t.benefits.updates.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🐝</span>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900">{t.benefits.tips.title}</h4>
              <p className="text-sm text-gray-600">{t.benefits.tips.description}</p>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-gray-900"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {t.subscribing}
                </div>
              ) : (
                t.button
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 mt-4">
          {t.privacy}
        </p>
      </motion.div>
    </div>
  );
}
