'use client';

import { useState, useEffect } from 'react';
import { useOrders } from '@/contexts/OrderContext';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getCartTranslation } from '@/lib/cartTranslations';

export default function ConfirmationPage() {
  const { orders } = useOrders();
  const { clearCart } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    // Check if user is coming from confirmation page
    const urlParams = new URLSearchParams(window.location.search);
    const fromConfirmation = urlParams.get('from_confirmation');
    
    if (fromConfirmation === 'true') {
      // Clear cart if coming from confirmation page
      clearCart();
    }

    // Get the latest order
    const latestOrder = orders[orders.length - 1];
    if (latestOrder) {
      // Calculate points earned (1 point per €1 spent)
      const earned = Math.floor(latestOrder.subtotal);
      setPointsEarned(earned);
    }

    // Animate in details after a delay
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [orders, clearCart]);

  const latestOrder = orders[orders.length - 1];

  if (!latestOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Nie znaleziono zamówienia</h1>
          <p className="text-gray-600 mb-8">Nie znaleziono ostatniego zamówienia.</p>
          <Link
            href="/pl"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Powrót do Strony Głównej
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-lg">🍯</span>
            </div>
          </div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Zamówienie Potwierdzone!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 mb-8"
          >
            Dziękujemy za zamówienie. Wkrótce otrzymasz e-mail z potwierdzeniem.
          </motion.p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Szczegóły Zamówienia</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Informacje o Zamówieniu</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Numer zamówienia:</span> #{latestOrder.id}</p>
                  <p><span className="font-medium">Data:</span> {new Date(latestOrder.createdAt).toLocaleDateString('pl-PL')}</p>
                  <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">W przetwarzaniu</span></p>
                  <p><span className="font-medium">Metoda płatności:</span> iDEAL</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Adres Dostawy</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{latestOrder.shippingAddress.name}</p>
                  <p>{latestOrder.shippingAddress.address}</p>
                  <p>{latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.postalCode}</p>
                  <p>{latestOrder.shippingAddress.country}</p>
                  <p className="text-gray-600">{latestOrder.shippingAddress.email}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Zamówione Produkty</h3>
              <div className="space-y-4">
                {latestOrder.items.map((item, index) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{item.image}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Ilość: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">€{item.price.toFixed(2)} za sztukę</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6 mt-6">
              <div className="flex justify-end">
                <div className="w-full max-w-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Suma częściowa:</span>
                    <span className="font-medium">€{latestOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dostawa:</span>
                    <span className="font-medium">{latestOrder.shipping === 0 ? 'Darmowa' : `€${latestOrder.shipping.toFixed(2)}`}</span>
                  </div>
                  {latestOrder.loyaltyDiscount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zniżka lojalnościowa:</span>
                      <span className="font-medium text-green-600">-€{latestOrder.loyaltyDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Suma:</span>
                      <span className="text-lg font-bold text-yellow-600">€{latestOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loyalty Points */}
        {pointsEarned > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl p-6 mb-8 text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-600 mb-2">+{pointsEarned} punktów</div>
                <p className="text-yellow-700 font-medium">Zarobiłeś punkty lojalnościowe na następny zakup!</p>
                <p className="text-yellow-600 text-sm mt-2">
                  Zarabiaj 1 punkt za każde wydane €1 • 50 punktów = €5, 100 punktów = €12, 150 punktów = €20
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        <div className={`bg-amber-50 rounded-xl p-6 mb-8 transform transition-all duration-700 ${
          showDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ transitionDelay: '600ms' }}>
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Co dalej?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                1
              </div>
              <div>
                <p className="text-amber-900 font-medium">E-mail z potwierdzeniem zamówienia</p>
                <p className="text-amber-700 text-sm">Otrzymasz e-mail z potwierdzeniem ze szczegółami zamówienia w ciągu kilku minut.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                2
              </div>
              <div>
                <p className="text-amber-900 font-medium">Przetwarzanie zamówienia</p>
                <p className="text-amber-700 text-sm">Przetworzymy Twoje zamówienie i przygotujemy je do wysyłki w ciągu 1-2 dni roboczych.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                3
              </div>
              <div>
                <p className="text-amber-900 font-medium">Potwierdzenie wysyłki</p>
                <p className="text-amber-700 text-sm">Otrzymasz potwierdzenie wysyłki z informacjami śledzenia, gdy Twoje zamówienie zostanie wysłane.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={`bg-gray-50 rounded-xl p-6 mb-8 transform transition-all duration-700 ${
          showDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Potrzebujesz Pomocy?</h3>
          <p className="text-gray-600 mb-4">
            Jeśli masz pytania dotyczące zamówienia, nie wahaj się z nami skontaktować.
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">📧 E-mail: support@honeyfy.com</p>
            <p className="text-gray-600">📞 Telefon: +31 6 12345678</p>
            <p className="text-gray-600">🕒 Wsparcie: Pon-Pt 9:00 - 18:00 CET</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 ${
          showDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ transitionDelay: '1000ms' }}>
          <Link
            href="/pl?from_confirmation=true"
            className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>{getCartTranslation('pl', 'continueShoppingButton')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            {getCartTranslation('pl', 'printReceipt')}
          </button>
        </div>

        {/* Footer Note */}
        <div className={`text-center mt-8 transform transition-all duration-700 ${
          showDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ transitionDelay: '1200ms' }}>
          <p className="text-gray-500 text-sm">
            {getCartTranslation('pl', 'thankYouMessage')}
          </p>
        </div>
      </div>
    </div>
  );
}
