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
    question: "Welke soorten Poolse honing bieden jullie aan?",
    answer: "We bieden premium Poolse honingsoorten aan, waaronder Heidehoning, Acaciahoning, Koolzaadhoning, Bijenpollen, Frambozenhoning, Lindehoning, Boekweithoning, Bloemenhoning, Bos- en Guldenroedehoning. Elke soort komt uit de ongerepte zuidelijke regio's van Polen, inclusief de Świętokrzyskie regio, en heeft unieke smaken en gezondheidsvoordelen.",
    category: "Producten"
  },
  {
    id: 2,
    question: "Waar komt jullie honing vandaan?",
    answer: "Onze honing komt uitsluitend uit de ongerepte zuidelijke regio's van Polen, inclusief de Świętokrzyskie regio, Karpaten, Podkarpacie en Klein-Polen. Deze regio's staan bekend om hun rijke biodiversiteit en traditioneel imkererfgoed, wat de hoogste kwaliteit pure Poolse honing garandeert.",
    category: "Kwaliteit"
  },
  {
    id: 3,
    question: "Hoe weet ik dat jullie honing puur en natuurlijk is?",
    answer: "Al onze honing wordt verkregen van vertrouwde Poolse imkers in Zuid-Polen en ondergaat strenge kwaliteitstests. We voegen nooit kunstmatige zoetstoffen, conserveermiddelen of andere toevoegingen toe. Elke pot is gecertificeerd als biologisch en bevat 100% pure Poolse honing uit duurzame imkerpraktijken.",
    category: "Kwaliteit"
  },
  {
    id: 4,
    question: "Leveren jullie aan winkels en bakkerijen in Nederland?",
    answer: "Ja! We leveren momenteel aan 8 winkels in heel Nederland, beginnend met Zuid-Holland. We breiden actief onze samenwerking uit met bakkerijen, lokale winkels en Poolse winkels in heel Nederland. Neem contact met ons op voor groothandelsaanvragen en samenwerkingsmogelijkheden.",
    category: "Zakelijk"
  },
  {
    id: 5,
    question: "Wat zijn de verzendkosten en levertijden?",
    answer: "We bieden gratis verzending voor bestellingen boven €69. Standaardlevering duurt 2-3 werkdagen in Nederland en 3-5 werkdagen voor andere Europese landen. Alle bestellingen worden zorgvuldig verpakt om ervoor te zorgen dat je pure Poolse honing in perfecte staat aankomt.",
    category: "Verzending"
  },
  {
    id: 6,
    question: "Welke betaalmethoden accepteren jullie?",
    answer: "We accepteren iDEAL, creditcards (Visa, Mastercard, American Express), SEPA-incasso, Google Pay en Apple Pay. Alle betalingen worden veilig verwerkt via Stripe. We accepteren geen PayPal, Bancontact of Sofort.",
    category: "Betaling"
  },
  {
    id: 7,
    question: "Wat is jullie retourbeleid?",
    answer: "We bieden een 30-dagen retourbeleid voor alle ongeopende producten in de originele verpakking. Als je niet tevreden bent met je aankoop, neem dan contact op met ons klantenserviceteam via honeyfy.online@gmail.com of bel +31 685713773.",
    category: "Retour"
  },
  {
    id: 8,
    question: "Hoe moet ik honing bewaren?",
    answer: "Bewaar honing op een koele, droge plaats, weg van direct zonlicht. Hoewel honing niet bederft, kan het na verloop van tijd kristalliseren. Je kunt gekristalliseerde honing voorzichtig verwarmen om de vloeibare consistentie te herstellen. Onze pure Poolse honing behoudt zijn kwaliteit en smaak bij correcte bewaring.",
    category: "Bewaring"
  },
  {
    id: 9,
    question: "Is jullie honing geschikt voor veganisten?",
    answer: "Honing wordt niet als veganistisch beschouwd omdat het door bijen wordt geproduceerd. Onze honing is echter 100% natuurlijk en ethisch verkregen uit duurzame imkerpraktijken in Zuid-Polen. We prioriteren de gezondheid en het welzijn van onze bijenkolonies.",
    category: "Dieet"
  },
  {
    id: 10,
    question: "Bieden jullie groothandels- of bulkbestellingen aan?",
    answer: "Ja, we bieden groothandelsprijzen voor bestellingen boven €200. We breiden actief ons netwerk van winkelpartners en bakkerijen in heel Nederland uit. Neem direct contact met ons op voor groothandelsaanvragen, maatwerkprijzen en samenwerkingsmogelijkheden.",
    category: "Zakelijk"
  },
  {
    id: 11,
    question: "Hoe kan ik mijn bestelling volgen?",
    answer: "Wanneer je bestelling wordt verzonden, ontvang je een trackingnummer per e-mail. Je kunt je bestelling ook volgen via het accountpaneel. Ons klantenserviceteam staat klaar om te helpen bij vragen over tracking.",
    category: "Bestellingen"
  },
  {
    id: 12,
    question: "Hebben jullie een loyaliteitsprogramma?",
    answer: "Ja! Schrijf je in voor onze nieuwsbrief om 10% korting op je eerste bestelling te ontvangen en op de hoogte te blijven van speciale aanbiedingen, nieuwe Poolse honingsoorten en exclusieve aanbiedingen voor Nederlandse en Poolse klanten in Nederland.",
    category: "Loyaliteit"
  },
  {
    id: 13,
    question: "Kan ik mijn bestelling annuleren of wijzigen?",
    answer: "Bestellingen kunnen binnen 2 uur na bestelling worden gewijzigd of geannuleerd. Neem onmiddellijk contact op met ons klantenserviceteam via honeyfy.online@gmail.com of bel +31 685713773 als je wijzigingen moet aanbrengen.",
    category: "Bestellingen"
  },
  {
    id: 14,
    question: "Wat maakt jullie Poolse honing uniek?",
    answer: "Onze honing komt uit de ongerepte zuidelijke regio's van Polen, bekend om hun rijke biodiversiteit en traditioneel imkererfgoed. Elke soort heeft unieke eigenschappen - van de zeldzame Heidehoning uit de Poolse hooglanden tot de delicate Acaciahoning. Al onze honing is 100% puur, biologisch en duurzaam geoogst.",
    category: "Kwaliteit"
  },
  {
    id: 15,
    question: "Leveren jullie aan Poolse klanten in Nederland?",
    answer: "Absoluut! We hebben het submerk Honeyfy specifiek voor de Nederlandse markt gecreëerd en brengen pure Poolse honing uit de zuidelijke regio's naar Nederlandse en Poolse klanten in Nederland. We begrijpen het belang van authentieke Poolse honing voor de Poolse gemeenschap.",
    category: "Verzending"
  },
  {
    id: 16,
    question: "Wat zijn jullie openingstijden en contactgegevens?",
    answer: "Onze openingstijden zijn maandag-vrijdag 9:00-18:00, zaterdag 10:00-16:00. Neem contact met ons op via honeyfy.online@gmail.com of bel +31 685713773. We zijn gevestigd aan Dordtselaan 67c 04, 3081 BG Rotterdam, Nederland.",
    category: "Contact"
  }
];

const categories = ['Alles', 'Producten', 'Kwaliteit', 'Verzending', 'Retour', 'Bewaring', 'Dieet', 'Zakelijk', 'Betaling', 'Bestellingen', 'Loyaliteit', 'Contact'];

export default function DutchFAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('Alles');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredFAQs = selectedCategory === 'Alles' 
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
      <HreflangTagsServer pathname="/nl/faq" currentLocale="nl" />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
        {/* Header */}
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4 font-heading text-gray-900"
            >
              🍯 Veelgestelde Vragen
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto font-body"
            >
              Vind antwoorden op veelgestelde vragen over onze honingproducten en diensten
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
                Heb je nog vragen?
              </h2>
              <p className="text-gray-600 mb-6 font-body">
                Kun je niet vinden wat je zoekt? Ons klantenserviceteam staat klaar om te helpen!
              </p>
              <div className="flex justify-center">
                <a
                  href="/nl/contact"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Neem Contact Op
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
