'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductsSection from "@/components/ProductsSection";
import VideoBackground from "@/components/VideoBackground";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import StructuredData from "@/components/StructuredData";
import { generateOrganizationStructuredData } from "@/lib/seo";
import { useTranslation } from '@/lib/translations';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function PolishHomePage() {
  const t = useTranslation('pl');

  // Check and clear cart if user is coming from confirmation page
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const fromConfirmation = urlParams.get('from_confirmation');
    
    if (fromConfirmation === 'true') {
      // Clear cart if coming from confirmation page
      localStorage.removeItem('honeyfy-cart');
      console.log('Cart cleared on homepage after confirmation');
      
      // Remove the parameter from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }

  return (
    <>
      <HreflangTagsServer pathname="/pl" currentLocale="pl" />
      
      {/* Structured Data for SEO */}
      <StructuredData data={generateOrganizationStructuredData()} />
      
      <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
        {/* Optimized Video Background from Envato Elements */}
        <VideoBackground 
          videoSrc="/honey-video.mp4"
          
        />
        
        {/* Luxury Background Pattern (subtle overlay) */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Brand */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.div 
                className="mb-6 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Glowing Background Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-amber-500/20 to-orange-500/20 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main Logo with Enhanced Effects */}
                <motion.div
                  className="relative"
                  animate={{ 
                    rotateY: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Image 
                    src="/logohero.png" 
                    alt="Honeyfy Logo" 
                    width={500} 
                    height={500} 
                    className="mx-auto h-56 w-auto object-contain drop-shadow-2xl opacity-75 relative z-10"
                    priority
                    quality={100}
                  />
                </motion.div>
              </motion.div>
              
              <motion.p 
                className="text-2xl text-yellow-200 font-light tracking-wide luxury-float font-body"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Naturalny Polski Miód w Holandii!
              </motion.p>
            </motion.div>

            {/* Hero Content */}
            <div className="mb-16">
              <h2 className="text-5xl font-bold text-white mb-8 text-shadow font-heading">
                Odkryj Najsłodszy Dar Natury z Polski
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Doświadcz czystego smaku naturalnego miodu, starannie zebranego z naszych 
                zrównoważonych praktyk pszczelarskich. Każdy słoik zawiera esencję 
                najszlachetniejszego nektaru natury, stworzonego z luksusem i troską.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/pl/products" className="btn-primary luxury-pulse">
                  <span className="relative z-10">Kup Teraz</span>
                </Link>
                <Link href="/pl/about" className="btn-secondary">
                  Dowiedz Się Więcej
                </Link>
              </div>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <motion.div 
                className="card-luxury group text-center p-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 luxury-float">🌿</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 font-heading">100% Naturalny</h3>
                <p className="text-gray-300 leading-relaxed font-body">Czysty miód bez dodatków czy konserwantów, starannie zebrany</p>
              </motion.div>
              <motion.div 
                className="card-luxury group text-center p-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 luxury-float">🐝</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 font-heading">Zrównoważony</h3>
                <p className="text-gray-300 leading-relaxed font-body">Etyczne praktyki pszczelarskie chroniące nasze środowisko i przyszłość</p>
              </motion.div>
              <motion.div 
                className="card-luxury group text-center p-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 luxury-float">🏆</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 font-heading">Premium Jakość</h3>
                <p className="text-gray-300 leading-relaxed font-body">Starannie wyselekcjonowany i przetestowany dla najwyższych standardów luksusu</p>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      {/* Products Section */}
              <ProductsSection locale="pl" />

      {/* Testimonials & Payment Methods Section */}
      <TestimonialsSection locale="pl" />

      {/* Newsletter Signup Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <NewsletterSignup locale="pl" />
        </div>
      </section>
    </>
  );
}
