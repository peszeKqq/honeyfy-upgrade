'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function PolishAboutPage() {
  const milestones = [
    {
      year: "2018",
      title: "Początek",
      description: "Założenie z pasją do zrównoważonego pszczelarstwa i naturalnej produkcji miodu. Rozpoczęcie z zaledwie 10 ulami w dziewiczym południowym regionie Polski, znanym z bogatej bioróżnorodności i tradycyjnego dziedzictwa pszczelarskiego.",
      icon: "🐝"
    },
    {
      year: "2019",
      title: "Pierwsze Zbiory",
      description: "Pomyślnie zebraliśmy naszą pierwszą partię premium polskiego miodu z regionu Świętokrzyskiego. Otrzymaliśmy certyfikację organiczną i rozpoczęliśmy sprzedaż czystego polskiego miodu na lokalnych rynkach.",
      icon: "🍯"
    },
    {
      year: "2020",
      title: "Rozwój",
      description: "Rozszerzenie do 50 uli w najbardziej żyznych regionach południowej Polski, w tym Małopolska i Świętokrzyskie. Uruchomienie naszego sklepu internetowego i rozpoczęcie wysyłania autentycznego polskiego miodu w całym kraju.",
      icon: "📈"
    },
    {
      year: "2021",
      title: "Ekspansja na Rynki Zagraniczne",
      description: "Rozwinęliśmy nasze charakterystyczne polskie odmiany miodu i wprowadziliśmy zrównoważone opakowania. Zdobyliśmy wiele nagród za jakość i rozpoczęliśmy przygotowania do ekspansji na rynki zagraniczne.",
      icon: "🏆"
    },
    {
      year: "2022",
      title: "Wspólnota",
      description: "Nawiązanie partnerstw z lokalnymi polskimi pszczelarzami i uruchomienie programów edukacyjnych. Osiągnięcie 100+ uli w wielu lokalizacjach w dziewiczym krajobrazie południowej Polski.",
      icon: "🤝"
    },
    {
      year: "2023",
      title: "Tworzenie Sub-marki Honeyfy",
      description: "Stworzenie sub-marki Honeyfy specjalnie dla rynku holenderskiego, dostarczając czysty polski miód z południowych regionów do holenderskich i polskich klientów mieszkających w Holandii. Świętowanie 5 lat doskonałości w produkcji polskiego miodu.",
      icon: "🌍"
    },
    {
      year: "2024",
      title: "Wizja Przyszłości",
      description: "Nawiązanie współpracy z piekarniami, lokalnymi i polskimi sklepami w całej Holandii, zaczynając od Zuid-Holland. Już dostarczamy do 8 sklepów, zachowując naturalne piękno i jakość, które czynią nasz czysty polski miód z południowych regionów naprawdę wyjątkowym.",
      icon: "✨"
    }
  ];

  const values = [
    {
      title: "Zrównoważony rozwój",
      description: "Praktykujemy zrównoważone metody pszczelarskie, które chronią dziewiczy region Świętokrzyski w Polsce i zapewniają zdrowie naszych kolonii pszczół.",
      icon: "🌱"
    },
    {
      title: "Jakość",
      description: "Każdy słoik czystego polskiego miodu jest starannie testowany i certyfikowany, aby spełniać najwyższe standardy jakości z żyznych dolin Świętokrzyskiego.",
      icon: "⭐"
    },
    {
      title: "Wspólnota",
      description: "Wspieramy lokalnych polskich pszczelarzy i przyczyniamy się do zachowania populacji pszczół w tradycyjnych regionach pszczelarskich Świętokrzyskiego.",
      icon: "🏘️"
    },
    {
      title: "Autentyczność",
      description: "Ciągle rozszerzamy się na rynki zagraniczne, szanując tradycyjne polskie praktyki pszczelarskie i zachowując autentyczny smak Świętokrzyskiego.",
      icon: "💡"
    }
  ];

  return (
    <>
      <HreflangTagsServer pathname="/pl/about" currentLocale="pl" />
      
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
                Nasza Historia
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Od skromnych początków w dziewiczym regionie Świętokrzyskim w Polsce po pasję do zachowania najsłodszej daru natury. 
                Odkryj podróż, która uczyniła Honeyfy głównym źródłem czystego polskiego miodu dla holenderskich i polskich klientów mieszkających w Holandii.
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
                    Nasza Misja
                  </motion.h2>
                  <motion.p 
                    className="text-lg text-gray-600 leading-relaxed mb-6 font-body"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Dostarczanie najwyższej jakości czystego polskiego miodu z dziewiczych południowych regionów Polski, zachowując delikatną równowagę naszego ekosystemu. 
                    Wierzymy, że zrównoważone pszczelarstwo nie jest tylko dobre dla biznesu—jest niezbędne dla przyszłości naszej planety.
                  </motion.p>
                  <motion.p 
                    className="text-lg text-gray-600 leading-relaxed font-body"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    Poprzez nasze zobowiązanie do tradycyjnych metod pszczelarskich i innowacyjnych praktyk zrównoważonego rozwoju, 
                    tworzymy most między bogatym dziedzictwem polskiego pszczelarstwa a nowoczesnymi potrzebami globalnego rynku.
                  </motion.p>
                </div>
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🍯</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Czysty Polski Miód</h3>
                      <p className="text-gray-600 font-body">
                        Każda kropla naszego miodu pochodzi z najczystszych regionów Polski, 
                        gdzie tradycja spotyka się z innowacją w harmonii z naturą.
                      </p>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✨</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-heading">Nasze Wartości</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
                Fundamenty, które kierują każdym aspektem naszej pracy i zobowiązań
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-body">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-heading">Nasza Podróż</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
                Od skromnych początków po wiodącą pozycję w branży miodowej
              </p>
            </motion.div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`flex items-center space-x-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="flex-1">
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-4">
                        <span className="text-3xl mr-4">{milestone.icon}</span>
                        <div>
                          <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                            {milestone.year}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed font-body">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-12 text-center text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 font-heading">Dołącz do Naszej Podróży</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto font-body">
                Odkryj smak autentycznego polskiego miodu i doświadcz różnicy, jaką robi zrównoważone pszczelarstwo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pl/products"
                  className="bg-white text-yellow-600 font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-body"
                >
                  Zobacz Produkty
                </Link>
                <Link
                  href="/pl/contact"
                  className="border-2 border-white text-white font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-yellow-600 transition-all duration-300 transform hover:scale-105 font-body"
                >
                  Skontaktuj się z Nami
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
