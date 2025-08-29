'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const milestones = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Founded with a passion for sustainable beekeeping and natural honey production. Started with just 10 hives in the pristine southern regions of Poland, known for their rich biodiversity and traditional beekeeping heritage.",
      icon: "🐝"
    },
    {
      year: "2019",
      title: "First Harvest",
      description: "Successfully harvested our first batch of premium Polish honey from the Świętokrzyskie region. Received organic certification and began selling pure Polish honey to local markets.",
      icon: "🍯"
    },
    {
      year: "2020",
      title: "Expansion",
      description: "Expanded to 50 hives across southern Poland's most fertile regions including Małopolska and Świętokrzyskie. Launched our online store and began shipping authentic Polish honey nationwide.",
      icon: "📈"
    },
    {
      year: "2021",
      title: "Expand for Foreign Markets",
      description: "Developed our signature Polish honey varieties and introduced sustainable packaging. Won multiple awards for quality and began preparations to expand for foreign markets.",
      icon: "🏆"
    },
    {
      year: "2022",
      title: "Community",
      description: "Established partnerships with local Polish beekeepers and launched educational programs. Reached 100+ hives across multiple locations in southern Poland's pristine landscapes.",
      icon: "🤝"
    },
    {
      year: "2023",
      title: "Honeyfy Sub-brand Creation",
      description: "Created the Honeyfy sub-brand specifically for the Netherlands market, bringing pure Polish honey from southern regions to Dutch and Polish customers living in the Netherlands. Celebrated 5 years of excellence in Polish honey production.",
      icon: "🌍"
    },
    {
      year: "2024",
      title: "Future Vision",
      description: "Making cooperation with bakeries, local and Polish shops across the whole Netherlands, beginning from Zuid-Holland. Already delivering to 8 shops while preserving the natural beauty and quality that makes our pure Polish honey from southern regions truly special.",
      icon: "✨"
    }
  ];

  const values = [
    {
      title: "Sustainability",
      description: "We practice sustainable beekeeping methods that protect Poland's pristine Świętokrzyskie region and ensure the health of our bee colonies.",
      icon: "🌱"
    },
    {
      title: "Quality",
      description: "Every jar of pure Polish honey is carefully tested and certified to meet the highest quality standards from Świętokrzyskie's fertile valleys.",
      icon: "⭐"
    },
    {
      title: "Community",
      description: "We support local Polish beekeepers and contribute to the preservation of bee populations in Świętokrzyskie's traditional beekeeping regions.",
      icon: "🏘️"
    },
    {
      title: "Authenticity",
      description: "Constantly expanding for foreign markets while respecting traditional Polish beekeeping practices and preserving the authentic taste of Świętokrzyskie.",
      icon: "💡"
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
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
              Our Story
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From humble beginnings in the pristine Świętokrzyskie region of Poland to a passion for preserving nature's sweetest gift. 
              Discover the journey that made Honeyfy the premier source of pure Polish honey for Dutch and Polish customers living in the Netherlands.
            </motion.p>
          </motion.div>

          {/* Floating Bee Animation */}
          <motion.div
            className="absolute top-20 left-10 text-4xl"
            animate={{ 
              y: [0, -20, 0],
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
            className="absolute top-40 right-20 text-3xl"
            animate={{ 
              y: [0, -15, 0],
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
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl p-12 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2 
                  className="text-4xl font-bold text-gray-900 mb-6 font-heading"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Our Mission
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600 leading-relaxed mb-6 font-body"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  To provide the world's finest pure Polish honey from the pristine southern regions of Poland while preserving the delicate balance of our ecosystem. 
                  We believe that sustainable beekeeping is not just good for business—it's essential for our planet's future.
                </motion.p>
                <motion.p 
                  className="text-lg text-gray-600 leading-relaxed font-body"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Every jar of Honeyfy pure Polish honey represents our commitment to quality, sustainability, and the preservation 
                  of bee populations that are vital to our food chain. Our honey comes from the fertile valleys of southern Poland, 
                  including the Carpathian Mountains, Podkarpacie, Małopolska, and Świętokrzyskie regions, known for their rich 
                  biodiversity and traditional beekeeping heritage, specifically serving Dutch and Polish customers living in the Netherlands.
                </motion.p>
              </div>
              <div className="relative">
                <motion.div 
                  className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="text-8xl mb-4">🍯</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pure & Natural</h3>
                  <p className="text-gray-600">100% Organic Honey</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Journey
          </motion.h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-yellow-300 h-full"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div 
                    className="bg-white rounded-2xl shadow-xl p-8"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-4">{milestone.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{milestone.title}</h3>
                        <p className="text-yellow-600 font-semibold">{milestone.year}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </motion.div>
                </div>
                
                {/* Timeline Dot */}
                <div className="w-2/12 flex justify-center">
                  <motion.div 
                    className="w-8 h-8 bg-yellow-500 rounded-full border-4 border-white shadow-lg"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                {/* Empty space for alignment */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Values
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl shadow-xl p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-gray-900 text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Visit Our Location
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                         {/* Google Maps */}
             <motion.div
               className="bg-white rounded-2xl shadow-xl overflow-hidden"
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
             >
                               <div className="h-96 relative">
                  {/* Google Maps Embed */}
                  {/* Interactive Map with Fallback */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🗺️</div>
                      <div className="text-2xl font-bold text-gray-800 mb-2">Dordtselaan 67c 04</div>
                      <div className="text-lg text-gray-600">3081 BG Rotterdam</div>
                      <div className="text-sm text-gray-500 mt-2 mb-6">The Netherlands</div>
                      
                      {/* Map Buttons */}
                      <div className="space-y-3">
                        <a 
                          href="https://maps.google.com/?q=Dordtselaan+67c+04+3081+BG+Rotterdam+Netherlands"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          📍 Open in Google Maps
                        </a>
                        
                        <div className="text-xs text-gray-500">
                          Click to get directions and view the full map
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-4 left-4 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-8 right-8 w-3 h-3 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-6 left-8 w-2 h-2 bg-yellow-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                 
                 {/* View Larger Map Button */}
                 <div className="absolute bottom-4 left-4">
                   <a
                     href="https://maps.google.com/?q=Dordtselaan+67c+04+3081+BG+Rotterdam+Netherlands"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-white/90 backdrop-blur-sm hover:bg-white transition-colors rounded-lg px-3 py-2 shadow-lg flex items-center space-x-2 text-sm font-medium text-gray-700"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                     <span>View Larger</span>
                   </a>
                 </div>
                 
                 {/* Overlay with Honeyfy branding */}
                 <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                   <div className="flex items-center space-x-2">
                     <span className="text-yellow-600 text-lg">🍯</span>
                     <span className="text-sm font-semibold text-gray-800">Honeyfy</span>
                   </div>
                 </div>
                 
                 {/* Location indicator */}
                 <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                   <div className="flex items-center space-x-2">
                     <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                     <span className="text-xs font-medium text-gray-700">You are here</span>
                   </div>
                 </div>
               </div>
             </motion.div>
            
            {/* Location Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Address</h3>
                    <p className="text-gray-600">Find us in Rotterdam</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Dordtselaan 67c 04</p>
                      <p className="text-gray-600">3081 BG Rotterdam</p>
                      <p className="text-gray-500">The Netherlands</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Business Hours</p>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-500">Sunday: Closed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Contact</p>
                      <p className="text-gray-600">Email: honeyfy.online@gmail.com</p>
                      <p className="text-gray-600">Phone: +31 685 713 773</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Directions */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Getting Here</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🚇</span>
                    <span className="text-gray-700">Metro: Take line A or B to Zuidplein station</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🚌</span>
                    <span className="text-gray-700">Bus: Lines 32, 44, or 66 to Dordtselaan</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🚗</span>
                    <span className="text-gray-700">Car: Parking available on-site</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl shadow-2xl p-12 text-center text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Join Our Honey Journey
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Experience the difference that sustainable, natural honey makes. 
              Taste the sweetness of nature, preserved with care.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/products">
                <motion.button
                  className="bg-white text-yellow-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Our Products
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
