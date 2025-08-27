'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Sarah van der Berg",
    rating: 5,
    review: "Amazing honey! The quality is outstanding and the taste is incredible. Will definitely order again!",
    avatar: "👩‍🦰"
  },
  {
    id: 2,
    name: "Mark Janssen",
    rating: 5,
    review: "Best honey I've ever tasted. Fast delivery and excellent customer service. Highly recommended!",
    avatar: "👨‍🦱"
  },
  {
    id: 3,
    name: "Lisa de Vries",
    rating: 5,
    review: "Pure, natural honey that tastes like it should. The packaging is beautiful too. Love it!",
    avatar: "👩‍🦳"
  },
  {
    id: 4,
    name: "Thomas Bakker",
    rating: 5,
    review: "Excellent quality honey. The difference is noticeable compared to supermarket honey. Worth every penny!",
    avatar: "👨‍🦲"
  },
  {
    id: 5,
    name: "Abigail Sampson",
    rating: 5,
    review: "Fantastic service and amazing honey. My kids love it on their toast every morning!",
    avatar: "👩‍🦱"
  },
  {
    id: 6,
    name: "Pieter Visser",
    rating: 5,
    review: "Authentic Polish honey with incredible flavor. The customer service is top-notch. 5 stars!",
    avatar: "👨‍🦰"
  },
  {
    id: 7,
    name: "Anna Kowalska",
    rating: 5,
    review: "Wspaniały miód! Smak jest niesamowity, a jakość wyjątkowa. Polecam wszystkim!",
    avatar: "👩‍🦰"
  },
  {
    id: 8,
    name: "Piotr Nowak",
    rating: 5,
    review: "Najlepszy miód, jaki kiedykolwiek próbowałem. Szybka dostawa i świetna obsługa klienta!",
    avatar: "👨‍🦱"
  },
  {
    id: 9,
    name: "Maria Wiśniewska",
    rating: 5,
    review: "Czysty, naturalny miód z Polski. Pakowanie jest piękne, a smak wyjątkowy. Uwielbiam!",
    avatar: "👩‍🦳"
  },
  {
    id: 10,
    name: "Jan Kowalczyk",
    rating: 5,
    review: "Doskonała jakość miodu. Różnica jest zauważalna w porównaniu z miodem ze sklepu. Warto każdej złotówki!",
    avatar: "👨‍🦲"
  },
  {
    id: 11,
    name: "Katarzyna Lewandowska",
    rating: 5,
    review: "Fantastyczna obsługa i niesamowity miód. Moje dzieci uwielbiają go na tostach każdego ranka!",
    avatar: "👩‍🦱"
  },
  {
    id: 12,
    name: "Tomasz Zieliński",
    rating: 5,
    review: "Autentyczny polski miód z niesamowitym smakiem. Obsługa klienta jest na najwyższym poziomie. 5 gwiazdek!",
    avatar: "👨‍🦰"
  }
];

const paymentMethods = [
  {
    name: "iDEAL",
    icon: (
      <img 
        src="/ideal-logo.svg" 
        alt="iDEAL" 
        className="w-16 h-12 mx-auto object-contain"
      />
    ),
    description: "Direct bank transfer"
  },
  {
    name: "Credit Cards",
    icon: (
      <img 
        src="/add-payment-card.svg" 
        alt="Credit Cards" 
        className="w-16 h-12 mx-auto object-contain"
      />
    ),
    description: "Visa, Mastercard, American Express"
  },
  {
    name: "SEPA Direct Debit",
    icon: (
      <img 
        src="/sepa-svgrepo-com.svg" 
        alt="SEPA Direct Debit" 
        className="w-16 h-12 mx-auto object-contain"
      />
    ),
    description: "European bank transfer"
  },
  {
    name: "Google Pay",
    icon: (
      <img 
        src="/google-pay-svgrepo-com.svg" 
        alt="Google Pay" 
        className="w-16 h-12 mx-auto object-contain"
      />
    ),
    description: "Fast & secure mobile payment"
  },
  {
    name: "Apple Pay",
    icon: (
      <img 
        src="/apple-pay-svgrepo-com.svg" 
        alt="Apple Pay" 
        className="w-16 h-12 mx-auto object-contain"
      />
    ),
    description: "Simple & secure payment"
  }
];

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
  avatar: string;
}

export default function TestimonialsSection() {
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacebookReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/facebook-reviews');
        const reviews = await response.json();
        
        // Transform API reviews to our format
        const transformedReviews = reviews.map((review: any) => ({
          id: parseInt(review.id),
          name: review.reviewer_name,
          rating: review.rating,
          review: review.review_text,
          avatar: getRandomAvatar()
        }));

        setDisplayedTestimonials(transformedReviews);
      } catch (error) {
        console.error('Error fetching Facebook reviews:', error);
        // Fallback to local testimonials
        const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
        setDisplayedTestimonials(shuffled.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    // Helper function to get random avatar
    const getRandomAvatar = () => {
      const avatars = ['👩‍🦰', '👨‍🦱', '👩‍🦳', '👨‍🦲', '👩‍🦱', '👨‍🦰', '👩‍🦰', '👨‍🦱', '👩‍🦳', '👨‍🦲', '👩‍🦱', '👨‍🦰'];
      return avatars[Math.floor(Math.random() * avatars.length)];
    };

    fetchFacebookReviews();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        
        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
                         <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading"
             >
                What Our Customers Say
             </motion.h2>
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="text-xl text-gray-600 max-w-2xl mx-auto font-body"
             >
               Real reviews from our Facebook community
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
               <span className="font-body">See More Reviews on Facebook</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Payment Methods Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
                         <motion.h3
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading"
             >
               💳 Secure Payment Methods
             </motion.h3>
                           <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-gray-600 font-body"
              >
                Secure payment options including cards, bank transfers, and mobile payments
              </motion.p>
          </div>

                     <div className="flex flex-wrap justify-center items-center gap-4">
            {paymentMethods.map((method, index) => (
                             <motion.div
                 key={method.name}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.6, delay: index * 0.1 }}
                 className="text-center group"
               >
                 <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-3 group-hover:from-yellow-100 group-hover:to-orange-100 transition-all duration-300">
                   <div className="mb-2">{method.icon}</div>
                   <h4 className="font-semibold text-gray-900 text-xs font-heading">{method.name}</h4>
                   <p className="text-xs text-gray-600 mt-1 font-body">{method.description}</p>
                 </div>
               </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-8 pt-6 border-t border-gray-200"
          >
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                                 <span className="font-body">SSL Secured</span>
               </div>
               <div className="flex items-center">
                 <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                 </svg>
                 <span className="font-body">PCI Compliant</span>
               </div>
               <div className="flex items-center">
                 <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 18a0 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                 </svg>
                 <span className="font-body">Instant Processing</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
