'use client';

import { motion } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function PolishPrivacyPolicyPage() {
  return (
    <>
      <HreflangTagsServer pathname="/pl/privacy-policy" currentLocale="pl" />
      
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
                Polityka Prywatności
              </h1>
              <p className="text-lg text-gray-600 font-body">
                Ostatnia aktualizacja: styczeń 2024
              </p>
            </div>

            <div className="prose prose-lg max-w-none font-body">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">1. Informacje, Które Zbieramy</h2>
                <p className="text-gray-700 mb-4">
                  Zbieramy informacje, które przekazujesz nam bezpośrednio, takie jak podczas tworzenia konta, 
                  dokonywania zakupu lub kontaktowania się z nami w celu uzyskania wsparcia. Może to obejmować:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Imię i dane kontaktowe (e-mail, telefon, adres)</li>
                  <li>Informacje o płatności (bezpiecznie przetwarzane przez Stripe)</li>
                  <li>Historię zamówień i preferencje</li>
                  <li>Dane komunikacyjne</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">2. Jak Wykorzystujemy Twoje Informacje</h2>
                <p className="text-gray-700 mb-4">
                  Wykorzystujemy zbierane informacje do:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Przetwarzania i realizacji Twoich zamówień</li>
                  <li>Wysyłania potwierdzeń zamówień i aktualizacji</li>
                  <li>Świadczenia obsługi klienta</li>
                  <li>Wysyłania komunikacji marketingowej (za Twoją zgodą)</li>
                  <li>Ulepszania naszych produktów i usług</li>
                  <li>Przestrzegania zobowiązań prawnych</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">3. Udostępnianie Informacji</h2>
                <p className="text-gray-700 mb-4">
                  Nie sprzedajemy, nie wymieniamy ani nie przekazujemy Twoich danych osobowych stronom trzecim, 
                  z wyjątkiem następujących okoliczności:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Za Twoją wyraźną zgodą</li>
                  <li>Zaufanym usługodawcom zewnętrznym (procesorom płatności, partnerom wysyłkowym)</li>
                  <li>W celu przestrzegania wymagań prawnych</li>
                  <li>W celu ochrony naszych praw i bezpieczeństwa</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">4. Bezpieczeństwo Danych</h2>
                <p className="text-gray-700 mb-4">
                  Wdrażamy odpowiednie środki bezpieczeństwa, aby chronić Twoje dane osobowe przed 
                  nieautoryzowanym dostępem, zmianą, ujawnieniem lub zniszczeniem. Obejmuje to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Szyfrowanie SSL dla transmisji danych</li>
                  <li>Bezpieczne przetwarzanie płatności przez Stripe</li>
                  <li>Regularne oceny bezpieczeństwa</li>
                  <li>Ograniczony dostęp do danych osobowych</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">5. Twoje Prawa</h2>
                <p className="text-gray-700 mb-4">
                  Masz prawo do:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Dostępu do swoich danych osobowych</li>
                  <li>Poprawiania nieprawidłowych informacji</li>
                  <li>Żądania usunięcia swoich danych</li>
                  <li>Rezygnacji z komunikacji marketingowej</li>
                  <li>Cofnięcia zgody w dowolnym momencie</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">6. Pliki Cookie i Śledzenie</h2>
                <p className="text-gray-700 mb-4">
                  Używamy plików cookie i podobnych technologii, aby poprawić Twoje doświadczenie przeglądania, 
                  analizować ruch na stronie i personalizować treści. Możesz kontrolować ustawienia plików cookie 
                  przez preferencje przeglądarki.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">7. Kontakt</h2>
                <p className="text-gray-700 mb-4">
                  Jeśli masz pytania dotyczące tej Polityki Prywatności lub naszych praktyk dotyczących danych, 
                  skontaktuj się z nami:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>E-mail:</strong> privacy@honeyfy.com<br />
                    <strong>Adres:</strong> Honeyfy, Holandia<br />
                    <strong>Telefon:</strong> +31 685 713 773
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">8. Zmiany w Tej Polityce</h2>
                <p className="text-gray-700 mb-4">
                  Możemy od czasu do czasu aktualizować tę Politykę Prywatności. Powiadomimy Cię o wszelkich 
                  istotnych zmianach, publikując nową politykę na tej stronie i aktualizując 
                  datę "Ostatniej aktualizacji".
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
