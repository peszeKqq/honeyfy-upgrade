'use client';

import { motion } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function PolishTermsOfServicePage() {
  return (
    <>
      <HreflangTagsServer pathname="/pl/terms-of-service" currentLocale="pl" />
      
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
                Warunki Korzystania
              </h1>
              <p className="text-lg text-gray-600 font-body">
                Ostatnia aktualizacja: styczeń 2024
              </p>
            </div>

            <div className="prose prose-lg max-w-none font-body">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">1. Akceptacja Warunków</h2>
                <p className="text-gray-700 mb-4">
                  Uzyskując dostęp do i korzystając z witryny Honeyfy i usług, akceptujesz i zgadzasz się 
                  być związany warunkami i postanowieniami tej umowy. Jeśli nie zgadzasz się z powyższym, 
                  nie używaj tej usługi.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">2. Opis Usługi</h2>
                <p className="text-gray-700 mb-4">
                  Honeyfy świadczy premium polskie produkty miodowe i powiązane usługi poprzez naszą 
                  platformę online. Nasze usługi obejmują:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Zamawianie online i przetwarzanie płatności</li>
                  <li>Informacje o produktach i rekomendacje</li>
                  <li>Obsługę klienta i wsparcie</li>
                  <li>Newsletter i komunikację promocyjną</li>
                  <li>Program lojalnościowy i nagrody</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">3. Konta Użytkowników</h2>
                <p className="text-gray-700 mb-4">
                  Aby uzyskać dostęp do określonych funkcji naszej usługi, może być wymagane utworzenie 
                  konta. Jesteś odpowiedzialny za:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Zachowanie poufności danych logowania do konta</li>
                  <li>Wszystkie działania wykonywane pod Twoim kontem</li>
                  <li>Podawanie dokładnych i kompletnych informacji</li>
                  <li>Natychmiastowe powiadomienie nas o nieautoryzowanym użyciu</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">4. Informacje o Produktach</h2>
                <p className="text-gray-700 mb-4">
                  Staramy się zapewnić dokładne informacje o produktach, w tym opisy, ceny i dostępność. 
                  Nie gwarantujemy jednak, że opisy produktów lub inne treści są dokładne, kompletne, 
                  wiarygodne, aktualne lub wolne od błędów.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">5. Ceny i Płatności</h2>
                <p className="text-gray-700 mb-4">
                  Wszystkie ceny są podane w Euro (€) i obejmują obowiązujące podatki. Zastrzegamy sobie 
                  prawo do zmiany cen w dowolnym momencie. Płatności są bezpiecznie przetwarzane przez 
                  Stripe, a Ty zgadzasz się na podanie ważnych informacji płatniczych.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">6. Wysyłka i Dostawa</h2>
                <p className="text-gray-700 mb-4">
                  Wysyłamy na adresy w Holandii i wybranych krajach europejskich. Czasy dostawy są 
                  szacunkowe i mogą się różnić. Ryzyko utraty i własność przedmiotów przechodzi na 
                  Ciebie przy dostawie.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">7. Zwroty i Refundacje</h2>
                <p className="text-gray-700 mb-4">
                  Akceptujemy zwroty w ciągu 14 dni od dostawy dla nieużywanych produktów w oryginalnym 
                  opakowaniu. Refundacje są przetwarzane w ciągu 5-7 dni roboczych. Koszty wysyłki za 
                  zwroty są odpowiedzialnością klienta, chyba że produkt jest wadliwy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">8. Zakazane Użycie</h2>
                <p className="text-gray-700 mb-4">
                  Nie możesz używać naszej usługi do:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Naruszenia obowiązujących praw lub przepisów</li>
                  <li>Naruszenia praw własności intelektualnej</li>
                  <li>Przesyłania szkodliwego lub złośliwego kodu</li>
                  <li>Próby uzyskania nieautoryzowanego dostępu do naszych systemów</li>
                  <li>Zakłócania prawidłowego funkcjonowania naszej usługi</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">9. Własność Intelektualna</h2>
                <p className="text-gray-700 mb-4">
                  Cała zawartość na tej stronie, w tym tekst, grafika, logo i oprogramowanie, jest 
                  własnością Honeyfy i jest chroniona prawami autorskimi i innymi prawami własności intelektualnej.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">10. Ograniczenie Odpowiedzialności</h2>
                <p className="text-gray-700 mb-4">
                  Honeyfy nie ponosi odpowiedzialności za pośrednie, incydentalne, szczególne, 
                  konsekwencyjne lub karne szkody wynikające z korzystania z naszej usługi lub 
                  produktów zakupionych przez naszą platformę.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">11. Prawo Właściwe</h2>
                <p className="text-gray-700 mb-4">
                  Te warunki są rządzone przez i interpretowane zgodnie z prawami Holandii. 
                  Wszelkie spory będą rozstrzygane przez sądy Holandii.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">12. Zmiany w Warunkach</h2>
                <p className="text-gray-700 mb-4">
                  Zastrzegamy sobie prawo do modyfikacji tych warunków w dowolnym momencie. Zmiany 
                  wchodzą w życie natychmiast po opublikowaniu. Twoje dalsze korzystanie z naszej 
                  usługi oznacza akceptację zmodyfikowanych warunków.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">13. Informacje Kontaktowe</h2>
                <p className="text-gray-700 mb-4">
                  W przypadku pytań dotyczących tych Warunków Korzystania, skontaktuj się z nami:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>E-mail:</strong> legal@honeyfy.com<br />
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
