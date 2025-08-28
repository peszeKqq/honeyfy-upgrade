'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
  avatar: string;
}

// Translation object for testimonials section
const testimonialsTranslations = {
  en: {
    title: "What Our Customers Say",
    subtitle: "Real reviews from our Facebook community",
    seeMoreButton: "See More Reviews on Facebook"
  },
  nl: {
    title: "Wat Onze Klanten Zeggen",
    subtitle: "Echte beoordelingen van onze Facebook community",
    seeMoreButton: "Bekijk Meer Beoordelingen op Facebook"
  },
  pl: {
    title: "Co Mówią o Nas nasi Klienci",
    subtitle: "Prawdziwe opinie z naszej społeczności Facebook",
    seeMoreButton: "Zobacz Więcej Opinii na Facebooku"
  }
};

// Mock testimonials data (keeping original structure without actual reviews)
const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anna K.",
    review: "Amazing quality honey! The taste is incredible and delivery was super fast.",
    rating: 5,
    avatar: "👩‍🦰"
  },
  {
    id: 2,
    name: "Mark V.",
    review: "Best honey I've ever tasted. Will definitely order again!",
    rating: 5,
    avatar: "👨‍🦱"
  },
  {
    id: 3,
    name: "Lisa D.",
    review: "Excellent service and the honey is absolutely delicious.",
    rating: 5,
    avatar: "👩‍🦳"
  }
];

interface TestimonialsSectionProps {
  locale?: string;
}

export default function TestimonialsSection({ locale = 'en' }: TestimonialsSectionProps) {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([]);

  // Get translations for current locale
  const t = testimonialsTranslations[locale as keyof typeof testimonialsTranslations] || testimonialsTranslations.en;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setTestimonials(mockTestimonials);
      setDisplayedTestimonials(mockTestimonials.slice(0, 3));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading"
            >
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto font-body"
            >
              {t.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                </motion.div>
              ))
            ) : (
              displayedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 font-heading">{testimonial.name}</h4>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-lg">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 italic font-body">"{testimonial.review}"</p>
                  <div className="flex items-center justify-end">
                    <div className="flex items-center text-blue-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="text-xs font-body">Facebook</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-8"
          >
            <a
              href="https://www.facebook.com/profile.php?id=100090174670745"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-body">{t.seeMoreButton}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
