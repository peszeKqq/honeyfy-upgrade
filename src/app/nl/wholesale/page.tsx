'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function DutchWholesalePage() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hallo! Ik ben geïnteresseerd in groothandel honing voor mijn bedrijf. Kunt u meer informatie geven over uw groothandel programma?");
    const whatsappUrl = `https://wa.me/31612345678?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <HreflangTagsServer pathname="/nl/wholesale" currentLocale="nl" />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-heading">Groothandel Inquiries</h1>
                <p className="text-gray-600 mt-1 font-body">Partner met ons voor premium honingproducten</p>
              </div>
              <Link
                href="/nl/products"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors font-body"
              >
                🍯 Bekijk Producten
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Why Partner Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">Waarom Partner Worden Met Honeyfy?</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 font-body">Premium Kwaliteit</h3>
                    <p className="text-gray-600 text-sm font-body">Duurzaam geproduceerde, natuurlijke honingproducten die voldoen aan de hoogste kwaliteitsstandaarden.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 font-body">Betrouwbare Levering</h3>
                    <p className="text-gray-600 text-sm font-body">Consistente voorraad en tijdige levering om uw bedrijf soepel te laten draaien.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 font-body">Concurrerende Prijzen</h3>
                    <p className="text-gray-600 text-sm font-body">Aantrekkelijke groothandelsprijzen die u helpen uw winstmarges te maximaliseren.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 font-body">Toegewijde Ondersteuning</h3>
                    <p className="text-gray-600 text-sm font-body">Persoonlijk accountmanagement en marketingondersteuning om u te helpen slagen.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">Poolse Winkels</h3>
              <p className="text-gray-600 font-body">Traditionele Poolse supermarkten en speciaalzaken</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">Cafés & Restaurants</h3>
              <p className="text-gray-600 font-body">Koffiehuizen, restaurants en horecabedrijven</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🥐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-heading">Bakkerijen</h3>
              <p className="text-gray-600 font-body">Ambachtelijke bakkerijen en banketbakkerijen</p>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-6">🍯</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                Geïnteresseerd in Groothandel?
              </h2>
              <p className="text-lg text-gray-600 mb-8 font-body">
                Krijg concurrerende prijzen, kwantumkortingen en persoonlijke service voor uw bedrijf. 
                Wij bieden premium honingvariëteiten perfect voor Poolse winkels, cafés en bakkerijen.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700 font-body">Tot 30% korting op retailprijzen</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700 font-body">Gratis bezorging in heel Nederland voor bestellingen boven €300</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700 font-body">Persoonlijk accountmanager</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700 font-body">Flexibele bezorgopties</span>
                </div>
              </div>

              <motion.button
                onClick={handleWhatsAppClick}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 mx-auto font-body"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>Neem contact op via WhatsApp</span>
              </motion.button>

              <p className="text-sm text-gray-500 mt-4 font-body">
                We reageren binnen 24 uur met prijzen en beschikbaarheid
              </p>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 font-heading">Waarom Kiezen Voor Ons Groothandel Programma?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl mb-4">💰</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">Concurrerende Prijzen</h3>
                <p className="text-gray-600 text-sm font-body">Tot 30% korting op retailprijzen met kwantumkortingen</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl mb-4">🚚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">Gratis Bezorging</h3>
                <p className="text-gray-600 text-sm font-body">Gratis bezorging in heel Nederland voor bestellingen boven €300</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl mb-4">🏆</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">Premium Kwaliteit</h3>
                <p className="text-gray-600 text-sm font-body">100% natuurlijke, pure honing zonder toevoegingen</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">Toegewijde Ondersteuning</h3>
                <p className="text-gray-600 text-sm font-body">Persoonlijk accountmanager voor groothandelklanten</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
