'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function DutchContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        console.error('Contact form error:', errorData);
        alert('Bericht kon niet worden verzonden. Probeer het opnieuw.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Bericht kon niet worden verzonden. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <HreflangTagsServer pathname="/nl/contact" currentLocale="nl" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50 relative overflow-hidden">
        {/* Floating Hexagons Background */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-200/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 2 + 1}rem`
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              >
                ⬡
              </motion.div>
            ))}
          </div>
        )}

        {/* Floating Bees */}
        <motion.div
          className="absolute top-20 left-10 text-3xl"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          🐝
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-2xl"
          animate={{ 
            y: [0, -20, 0],
            x: [0, -15, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          🐝
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-2xl"
          animate={{ 
            y: [0, -25, 0],
            x: [0, 20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          🐝
        </motion.div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Page Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl font-bold text-gray-900 mb-6 font-heading"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Neem Contact Op
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Heeft u vragen over onze honing? Wilt u meer weten over duurzame bijenteelt? 
              We horen graag van u! Stuur ons een bericht en we nemen zo snel mogelijk contact met u op.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                {/* Hexagon Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="text-yellow-400 text-sm">⬡</div>
                    ))}
                  </div>
                </div>

                <motion.h2 
                  className="text-3xl font-bold text-gray-900 mb-8 font-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Stuur ons een Bericht 🍯
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Uw Naam <span className="text-yellow-500">🐝</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-gray-900"
                        placeholder="Voer uw naam in"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400">
                        👤
                      </div>
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      E-mailadres <span className="text-yellow-500">📧</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-gray-900"
                        placeholder="Voer uw e-mailadres in"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400">
                        ✉️
                      </div>
                    </div>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Bericht <span className="text-yellow-500">💬</span>
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-gray-900 resize-none"
                        placeholder="Vertel ons wat er in u omgaat..."
                      />
                      <div className="absolute right-3 top-3 text-yellow-400">
                        💭
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Bericht Verzenden...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Bericht Versturen</span>
                        <span>🍯</span>
                      </div>
                    )}
                  </motion.button>
                </form>

                {/* Success Message */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      className="mt-6 bg-green-500 text-white p-4 rounded-xl text-center"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <motion.span
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
                        >
                          ✓
                        </motion.span>
                        <span className="font-semibold">Bericht succesvol verzonden!</span>
                      </div>
                      <p className="text-sm mt-1 opacity-90">We nemen snel contact met u op!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Contact Info Cards */}
              <div className="space-y-6">

                <motion.div
                  className="bg-white rounded-2xl shadow-xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Bel Ons</h3>
                      <p className="text-gray-600">+1 (555) 123-4567<br />Ma-Vr 9:00-18:00</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-2xl shadow-xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">E-mail Ons</h3>
                      <p className="text-gray-600">honeyfy.online@gmail.com<br />We reageren binnen 24 uur</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Fun Facts */}
              <motion.div
                className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-xl p-8 text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-2xl font-bold mb-4">🐝 Leuke Bijenweetjes</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span>🍯</span>
                    <span>Een bij produceert slechts 1/12 theelepel honing in zijn leven</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🏃</span>
                    <span>Bijen kunnen tot 24 km per uur vliegen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>👑</span>
                    <span>Een koningin kan tot 2000 eitjes per dag leggen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🌺</span>
                    <span>Bijen bezoeken 2 miljoen bloemen voor 1 pond honing</span>
                  </div>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                className="bg-white rounded-2xl shadow-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Volg Onze Reis</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://facebook.com/honeyfy.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center hover:bg-yellow-200 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img src="/facebook-svgrepo-com.svg" alt="Facebook" className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/honeyfy.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center hover:bg-yellow-200 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img src="/instagram-color-svgrepo-com.svg" alt="Instagram" className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center hover:bg-yellow-200 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img src="/tiktok-icon-black-1-logo-svgrepo-com.svg" alt="TikTok" className="w-6 h-6" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
