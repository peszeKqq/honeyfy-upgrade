'use client';

import { motion } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function PolishCookiePolicyPage() {
  return (
    <>
      <HreflangTagsServer pathname="/pl/cookie-policy" currentLocale="pl" />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">
                Polityka Plików Cookie
              </h1>
              <p className="text-lg text-gray-600 font-body">
                Ostatnia aktualizacja: styczeń 2024
              </p>
            </div>

            <div className="prose prose-lg max-w-none font-body">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">1. Czym Są Pliki Cookie?</h2>
                <p className="text-gray-700 mb-4">
                  Pliki cookie to małe pliki tekstowe, które są umieszczane na Twoim urządzeniu podczas 
                  odwiedzania naszej strony internetowej. Pomagają nam zapewnić Ci lepsze doświadczenie, 
                  zapamiętując Twoje preferencje, analizując sposób korzystania z naszej strony i 
                  personalizując treści.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">2. Jak Używamy Plików Cookie</h2>
                <p className="text-gray-700 mb-4">
                  Używamy plików cookie do następujących celów:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Pliki Cookie Niezbędne:</strong> Wymagane do podstawowej funkcjonalności strony</li>
                  <li><strong>Pliki Cookie Wydajnościowe:</strong> Pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję z naszą stroną</li>
                  <li><strong>Pliki Cookie Funkcjonalne:</strong> Zapamiętują Twoje preferencje i ustawienia</li>
                  <li><strong>Pliki Cookie Marketingowe:</strong> Używane do reklam i celów promocyjnych</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">3. Rodzaje Plików Cookie, Których Używamy</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Pliki Cookie Niezbędne</h3>
                  <p className="text-gray-700 mb-2">
                    Te pliki cookie są niezbędne do prawidłowego funkcjonowania strony internetowej. Umożliwiają 
                    podstawowe funkcje, takie jak nawigacja po stronach, dostęp do zabezpieczonych obszarów 
                    i funkcjonalność koszyka zakupów.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Zarządzanie sesją</li>
                    <li>Funkcje bezpieczeństwa</li>
                    <li>Funkcjonalność koszyka zakupów</li>
                    <li>Uwierzytelnianie użytkowników</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Pliki Cookie Analityczne</h3>
                  <p className="text-gray-700 mb-2">
                    Te pliki cookie pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję z naszą 
                    stroną internetową, zbierając i raportując informacje anonimowo.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Google Analytics</li>
                    <li>Śledzenie wyświetleń stron</li>
                    <li>Analiza zachowań użytkowników</li>
                    <li>Monitorowanie wydajności</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Pliki Cookie Funkcjonalne</h3>
                  <p className="text-gray-700 mb-2">
                    Te pliki cookie umożliwiają rozszerzoną funkcjonalność i personalizację, takie jak 
                    zapamiętywanie preferencji językowych i statusu logowania.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Preferencje językowe</li>
                    <li>Preferencje użytkownika</li>
                    <li>Przechowywanie danych formularzy</li>
                    <li>Spersonalizowana zawartość</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Pliki Cookie Marketingowe</h3>
                  <p className="text-gray-700 mb-2">
                    Te pliki cookie są używane do śledzenia odwiedzających na różnych stronach internetowych 
                    w celu wyświetlania odpowiednich i angażujących reklam.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Integracja z mediami społecznościowymi</li>
                    <li>Sieci reklamowe</li>
                    <li>Kampanie retargetingowe</li>
                    <li>Śledzenie konwersji</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">4. Pliki Cookie Stron Trzecich</h2>
                <p className="text-gray-700 mb-4">
                  Możemy używać usług stron trzecich, które umieszczają pliki cookie na Twoim urządzeniu:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Google Analytics:</strong> Analityka strony internetowej i śledzenie wydajności</li>
                  <li><strong>Stripe:</strong> Przetwarzanie płatności i bezpieczeństwo</li>
                  <li><strong>Media Społecznościowe:</strong> Integracja z Facebook, Instagram i TikTok</li>
                  <li><strong>Marketing E-mailowy:</strong> Newsletter i komunikacja promocyjna</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">5. Zarządzanie Preferencjami Plików Cookie</h2>
                <p className="text-gray-700 mb-4">
                  Możesz kontrolować i zarządzać plikami cookie na kilka sposobów:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Ustawienia Przeglądarki:</strong> Większość przeglądarek pozwala blokować lub usuwać pliki cookie</li>
                  <li><strong>Zgoda na Pliki Cookie:</strong> Użyj naszego banera zgody na pliki cookie, aby zarządzać preferencjami</li>
                  <li><strong>Narzędzia Opt-out:</strong> Użyj branżowych mechanizmów opt-out dla plików cookie reklamowych</li>
                  <li><strong>Skontaktuj się z Nami:</strong> Skontaktuj się z nami, aby uzyskać pomoc w zarządzaniu plikami cookie</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">6. Czas Trwania Plików Cookie</h2>
                <p className="text-gray-700 mb-4">
                  Pliki cookie mają różne okresy ważności:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Pliki Cookie Sesyjne:</strong> Usuwane po zamknięciu przeglądarki</li>
                  <li><strong>Pliki Cookie Trwałe:</strong> Pozostają na Twoim urządzeniu przez określony czas</li>
                  <li><strong>Pliki Cookie First-Party:</strong> Ustawiane bezpośrednio przez naszą stronę internetową</li>
                  <li><strong>Pliki Cookie Third-Party:</strong> Ustawiane przez zewnętrzne usługi, których używamy</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">7. Twoje Prawa</h2>
                <p className="text-gray-700 mb-4">
                  Zgodnie z RODO i innymi prawami dotyczącymi prywatności masz prawo do:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Akceptowania lub odrzucania plików cookie nieistotnych</li>
                  <li>Cofnięcia zgody w dowolnym momencie</li>
                  <li>Żądania informacji o plikach cookie, których używamy</li>
                  <li>Usuwania plików cookie ze swojego urządzenia</li>
                  <li>Rezygnacji z plików cookie śledzących</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">8. Aktualizacje Tej Polityki</h2>
                <p className="text-gray-700 mb-4">
                  Możemy od czasu do czasu aktualizować tę Politykę Plików Cookie, aby odzwierciedlić 
                  zmiany w naszych praktykach lub z innych operacyjnych, prawnych lub regulacyjnych 
                  powodów. Powiadomimy Cię o wszelkich istotnych zmianach, publikując zaktualizowaną 
                  politykę na naszej stronie internetowej.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">9. Kontakt</h2>
                <p className="text-gray-700 mb-4">
                  Jeśli masz pytania dotyczące naszego użycia plików cookie lub tej Polityki Plików Cookie, 
                  skontaktuj się z nami:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>E-mail:</strong> privacy@honeyfy.com<br />
                    <strong>Adres:</strong> Honeyfy, Holandia<br />
                    <strong>Telefon:</strong> +31 (0) 123 456 789
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
