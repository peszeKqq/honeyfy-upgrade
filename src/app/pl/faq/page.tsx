'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Jakie rodzaje polskiego miodu oferujecie?",
    answer: "Oferujemy premium polskie odmiany miodu, w tym Miód Wrzosowy, Miód Akacjowy, Miód Rzepakowy, Pyłek Pszczeli, Miód Malinowy, Miód Lipowy, Miód Gryczany, Miód Wielokwiatowy, Miód Leśny i Miód Nawłociowy. Każdy rodzaj pochodzi z dziewiczym południowych regionów Polski, w tym Świętokrzyskiego, i ma unikalne smaki i korzyści zdrowotne.",
    category: "Produkty"
  },
  {
    id: 2,
    question: "Skąd pochodzi wasz miód?",
    answer: "Nasz miód pochodzi wyłącznie z dziewiczym południowych regionów Polski, w tym regionu Świętokrzyskiego, Karpat, Podkarpacia i Małopolski. Te regiony są znane ze swojej bogatej bioróżnorodności i tradycyjnego dziedzictwa pszczelarskiego, zapewniając najwyższą jakość czystego polskiego miodu.",
    category: "Jakość"
  },
  {
    id: 3,
    question: "Jak mogę wiedzieć, że wasz miód jest czysty i naturalny?",
    answer: "Cały nasz miód jest pozyskiwany od zaufanych polskich pszczelarzy w południowej Polsce i przechodzi rygorystyczne testy jakościowe. Nigdy nie dodajemy sztucznych słodzików, konserwantów ani innych dodatków. Każdy słoik jest certyfikowany jako organiczny i zawiera 100% czysty polski miód z zrównoważonych praktyk pszczelarskich.",
    category: "Jakość"
  },
  {
    id: 4,
    question: "Dostarczacie do sklepów i piekarni w Holandii?",
    answer: "Tak! Obecnie dostarczamy do 8 sklepów w całej Holandii, zaczynając od Zuid-Holland. Aktywnie rozszerzamy naszą współpracę z piekarniami, lokalnymi sklepami i polskimi sklepami w całej Holandii. Skontaktuj się z nami w sprawie zapytań hurtowych i możliwości współpracy.",
    category: "Biznes"
  },
  {
    id: 5,
    question: "Jakie są koszty wysyłki i czasy dostawy?",
    answer: "Oferujemy darmową wysyłkę dla zamówień powyżej €69. Standardowa dostawa trwa 2-3 dni robocze w Holandii i 3-5 dni roboczych dla innych krajów europejskich. Wszystkie zamówienia są starannie pakowane, aby zapewnić, że twój czysty polski miód dotrze w idealnym stanie.",
    category: "Wysyłka"
  },
  {
    id: 6,
    question: "Jakie metody płatności akceptujecie?",
    answer: "Akceptujemy iDEAL, karty kredytowe (Visa, Mastercard, American Express), SEPA Direct Debit, Google Pay i Apple Pay. Wszystkie płatności są bezpiecznie przetwarzane przez Stripe. Nie akceptujemy PayPal, Bancontact ani Sofort.",
    category: "Płatność"
  },
  {
    id: 7,
    question: "Jaka jest wasza polityka zwrotów?",
    answer: "Oferujemy 30-dniową politykę zwrotów dla wszystkich nieotwartych produktów w oryginalnym opakowaniu. Jeśli nie jesteś zadowolony z zakupu, skontaktuj się z naszym zespołem obsługi klienta pod adresem honeyfy.online@gmail.com lub zadzwoń +31 685713773.",
    category: "Zwroty"
  },
  {
    id: 8,
    question: "Jak powinienem przechowywać miód?",
    answer: "Przechowuj miód w chłodnym, suchym miejscu z dala od bezpośredniego światła słonecznego. Chociaż miód nie psuje się, może krystalizować się z czasem. Możesz delikatnie ogrzać skrystalizowany miód, aby przywrócić jego płynną konsystencję. Nasz czysty polski miód zachowuje swoją jakość i smak, gdy jest prawidłowo przechowywany.",
    category: "Przechowywanie"
  },
  {
    id: 9,
    question: "Czy wasz miód jest odpowiedni dla wegan?",
    answer: "Miód nie jest uważany za wegański, ponieważ jest produkowany przez pszczoły. Jednak nasz miód jest w 100% naturalny i etycznie pozyskiwany z zrównoważonych praktyk pszczelarskich w południowej Polsce. Priorytetowo traktujemy zdrowie i dobrostan naszych kolonii pszczół.",
    category: "Dieta"
  },
  {
    id: 10,
    question: "Czy oferujecie zamówienia hurtowe lub masowe?",
    answer: "Tak, oferujemy ceny hurtowe dla zamówień powyżej €200. Aktywnie rozszerzamy naszą sieć partnerów sklepów i piekarni w całej Holandii. Skontaktuj się z nami bezpośrednio w sprawie zapytań hurtowych, niestandardowych cen i możliwości współpracy.",
    category: "Biznes"
  },
  {
    id: 11,
    question: "Jak mogę śledzić moje zamówienie?",
    answer: "Gdy twoje zamówienie zostanie wysłane, otrzymasz numer śledzenia drogą elektroniczną. Możesz również śledzić swoje zamówienie przez panel konta. Nasz zespół obsługi klienta jest dostępny, aby pomóc w przypadku pytań dotyczących śledzenia.",
    category: "Zamówienia"
  },
  {
    id: 12,
    question: "Czy macie program lojalnościowy?",
    answer: "Tak! Zapisz się do naszego newslettera, aby otrzymać 10% zniżki na pierwsze zamówienie i być na bieżąco ze specjalnymi ofertami, nowymi polskimi odmianami miodu i ekskluzywnymi ofertami dla holenderskich i polskich klientów mieszkających w Holandii.",
    category: "Lojalność"
  },
  {
    id: 13,
    question: "Czy mogę anulować lub zmodyfikować moje zamówienie?",
    answer: "Zamówienia mogą być modyfikowane lub anulowane w ciągu 2 godzin od złożenia. Skontaktuj się natychmiast z naszym zespołem obsługi klienta pod adresem honeyfy.online@gmail.com lub zadzwoń +31 685713773, jeśli musisz wprowadzić zmiany.",
    category: "Zamówienia"
  },
  {
    id: 14,
    question: "Co czyni wasz polski miód wyjątkowym?",
    answer: "Nasz miód pochodzi z dziewiczym południowych regionów Polski, znanych ze swojej bogatej bioróżnorodności i tradycyjnego dziedzictwa pszczelarskiego. Każda odmiana ma unikalne cechy - od rzadkiego Miodu Wrzosowego z polskich wyżyn po delikatny Miód Akacjowy. Cały nasz miód jest w 100% czysty, organiczny i zrównoważenie zbierany.",
    category: "Jakość"
  },
  {
    id: 15,
    question: "Czy wysyłacie do polskich klientów w Holandii?",
    answer: "Absolutnie! Stworzyliśmy submarkę Honeyfy specjalnie dla holenderskiego rynku, przywożąc czysty polski miód z południowych regionów do holenderskich i polskich klientów mieszkających w Holandii. Rozumiemy znaczenie autentycznego polskiego miodu dla polskiej społeczności.",
    category: "Wysyłka"
  },
  {
    id: 16,
    question: "Jakie są wasze godziny pracy i informacje kontaktowe?",
    answer: "Nasze godziny pracy to poniedziałek-piątek 9:00-18:00, sobota 10:00-16:00. Skontaktuj się z nami pod adresem honeyfy.online@gmail.com lub zadzwoń +31 685713773. Mamy siedzibę przy Dordtselaan 67c 04, 3081 BG Rotterdam, Holandia.",
    category: "Kontakt"
  }
];

const categories = ['Wszystko', 'Produkty', 'Jakość', 'Wysyłka', 'Zwroty', 'Przechowywanie', 'Dieta', 'Biznes', 'Płatność', 'Zamówienia', 'Lojalność', 'Kontakt'];

export default function PolishFAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('Wszystko');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredFAQs = selectedCategory === 'Wszystko' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <HreflangTagsServer pathname="/pl/faq" currentLocale="pl" />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
        {/* Header */}
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 font-heading text-gray-900"
            >
              🍯 Często Zadawane Pytania
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto font-body"
            >
              Znajdź odpowiedzi na często zadawane pytania o nasze produkty miodowe i usługi
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-yellow-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-yellow-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 font-heading pr-4">
                      {faq.question}
                    </h3>
                    <span className="text-yellow-500 text-2xl font-light">
                      {openItems.includes(faq.id) ? '−' : '+'}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {openItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed font-body">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                Masz jeszcze pytania?
              </h2>
              <p className="text-gray-600 mb-6 font-body">
                Nie możesz znaleźć tego, czego szukasz? Nasz zespół obsługi klienta jest tutaj, aby pomóc!
              </p>
              <div className="flex justify-center">
                <a
                  href="/pl/contact"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Skontaktuj Się z Nami
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
