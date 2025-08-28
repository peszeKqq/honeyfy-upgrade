'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function DutchAboutPage() {
  const milestones = [
    {
      year: "2018",
      title: "Het Begin",
      description: "Opgericht met een passie voor duurzame bijenteelt en natuurlijke honingproductie. Begonnen met slechts 10 bijenkasten in de ongerepte zuidelijke regio's van Polen, bekend om hun rijke biodiversiteit en traditionele bijenteelt erfgoed.",
      icon: "🐝"
    },
    {
      year: "2019",
      title: "Eerste Oogst",
      description: "Succesvol onze eerste batch premium Poolse honing geoogst uit de Świętokrzyskie regio. Organische certificering ontvangen en begonnen met de verkoop van pure Poolse honing aan lokale markten.",
      icon: "🍯"
    },
    {
      year: "2020",
      title: "Uitbreiding",
      description: "Uitgebreid naar 50 bijenkasten in de meest vruchtbare regio's van zuidelijk Polen, inclusief Małopolska en Świętokrzyskie. Onze online winkel gelanceerd en begonnen met het verzenden van authentieke Poolse honing landelijk.",
      icon: "📈"
    },
    {
      year: "2021",
      title: "Uitbreiding naar Buitenlandse Markten",
      description: "Onze kenmerkende Poolse honingvariëteiten ontwikkeld en duurzame verpakking geïntroduceerd. Meerdere prijzen gewonnen voor kwaliteit en begonnen met voorbereidingen voor uitbreiding naar buitenlandse markten.",
      icon: "🏆"
    },
    {
      year: "2022",
      title: "Gemeenschap",
      description: "Partnerships opgezet met lokale Poolse imkers en educatieve programma's gelanceerd. Bereikt 100+ bijenkasten op meerdere locaties in de ongerepte landschappen van zuidelijk Polen.",
      icon: "🤝"
    },
    {
      year: "2023",
      title: "Honeyfy Sub-brand Creatie",
      description: "Het Honeyfy sub-brand specifiek voor de Nederlandse markt gecreëerd, waarbij pure Poolse honing uit zuidelijke regio's wordt gebracht naar Nederlandse en Poolse klanten die in Nederland wonen. Gevierd 5 jaar uitmuntendheid in Poolse honingproductie.",
      icon: "🌍"
    },
    {
      year: "2024",
      title: "Toekomstvisie",
      description: "Samenwerking met bakkerijen, lokale en Poolse winkels in heel Nederland, beginnend vanuit Zuid-Holland. Al leverend aan 8 winkels terwijl we de natuurlijke schoonheid en kwaliteit behouden die onze pure Poolse honing uit zuidelijke regio's werkelijk speciaal maken.",
      icon: "✨"
    }
  ];

  const values = [
    {
      title: "Duurzaamheid",
      description: "We beoefenen duurzame bijenteeltmethoden die de ongerepte Świętokrzyskie regio van Polen beschermen en de gezondheid van onze bijenkolonies waarborgen.",
      icon: "🌱"
    },
    {
      title: "Kwaliteit",
      description: "Elke pot pure Poolse honing wordt zorgvuldig getest en gecertificeerd om te voldoen aan de hoogste kwaliteitsstandaarden uit de vruchtbare valleien van Świętokrzyskie.",
      icon: "⭐"
    },
    {
      title: "Gemeenschap",
      description: "We ondersteunen lokale Poolse imkers en dragen bij aan het behoud van bijenpopulaties in de traditionele bijenteeltregio's van Świętokrzyskie.",
      icon: "🏘️"
    },
    {
      title: "Authenticiteit",
      description: "Voortdurend uitbreidend voor buitenlandse markten terwijl we traditionele Poolse bijenteeltpraktijken respecteren en de authentieke smaak van Świętokrzyskie behouden.",
      icon: "💡"
    }
  ];

  return (
    <>
      <HreflangTagsServer pathname="/nl/about" currentLocale="nl" />
      
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
                Ons Verhaal
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Van bescheiden begin in de ongerepte Świętokrzyskie regio van Polen tot een passie voor het behoud van de zoetste gave van de natuur. 
                Ontdek de reis die Honeyfy de belangrijkste bron van pure Poolse honing maakte voor Nederlandse en Poolse klanten die in Nederland wonen.
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
                    Onze Missie
                  </motion.h2>
                  <motion.p 
                    className="text-lg text-gray-600 leading-relaxed mb-6 font-body"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Het leveren van 's werelds fijnste pure Poolse honing uit de ongerepte zuidelijke regio's van Polen terwijl we het delicate evenwicht van ons ecosysteem behouden. 
                    We geloven dat duurzame bijenteelt niet alleen goed is voor het bedrijf—het is essentieel voor de toekomst van onze planeet.
                  </motion.p>
                  <motion.p 
                    className="text-lg text-gray-600 leading-relaxed font-body"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    Elke pot Honeyfy pure Poolse honing vertegenwoordigt onze toewijding aan kwaliteit, duurzaamheid en het behoud 
                    van bijenpopulaties die essentieel zijn voor onze voedselketen. Onze honing komt uit de vruchtbare valleien van zuidelijk Polen, 
                    inclusief de Karpaten, Podkarpacie, Małopolska en Świętokrzyskie regio's, bekend om hun rijke 
                    biodiversiteit en traditionele bijenteelt erfgoed, specifiek bedoeld voor Nederlandse en Poolse klanten die in Nederland wonen.
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Puur & Natuurlijk</h3>
                    <p className="text-gray-600">100% Biologische Honing</p>
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
              Onze Reis
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
              Onze Waarden
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
              Bezoek Onze Locatie
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
                      <div className="text-sm text-gray-500 mt-2 mb-6">Nederland</div>
                      
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
                          Klik om routebeschrijving te krijgen en de volledige kaart te bekijken
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
                     <span>Groter Bekijken</span>
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
                     <span className="text-xs font-medium text-gray-700">U bent hier</span>
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
                    <h3 className="text-2xl font-bold text-gray-900">Ons Adres</h3>
                    <p className="text-gray-600">Vind ons in Rotterdam</p>
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
                      <p className="text-gray-500">Nederland</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Openingstijden</p>
                      <p className="text-gray-600">Maandag - Vrijdag: 9:00 - 18:00</p>
                      <p className="text-gray-600">Zaterdag: 10:00 - 16:00</p>
                      <p className="text-gray-500">Zondag: Gesloten</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Contact</p>
                      <p className="text-gray-600">Email: honeyfy.online@gmail.com</p>
                      <p className="text-gray-600">Telefoon: +31 (0)10 123 4567</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Directions */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Hoe U Hier Komt</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🚇</span>
                    <span className="text-gray-700">Metro: Neem lijn A of B naar station Zuidplein</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🚌</span>
                    <span className="text-gray-700">Bus: Lijnen 32, 44, of 66 naar Dordtselaan</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🚗</span>
                    <span className="text-gray-700">Auto: Parkeren beschikbaar op locatie</span>
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
              Doe Mee Aan Onze Honingreis
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Ervaar het verschil dat duurzame, natuurlijke honing maakt. 
              Proef de zoetheid van de natuur, bewaard met zorg.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/nl/products">
                <motion.button
                  className="bg-white text-yellow-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Verken Onze Producten
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
