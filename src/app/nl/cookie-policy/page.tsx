'use client';

import { motion } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function DutchCookiePolicyPage() {
  return (
    <>
      <HreflangTagsServer pathname="/nl/cookie-policy" currentLocale="nl" />
      
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
                Cookiebeleid
              </h1>
              <p className="text-lg text-gray-600 font-body">
                Laatst bijgewerkt: januari 2024
              </p>
            </div>

            <div className="prose prose-lg max-w-none font-body">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">1. Wat Zijn Cookies?</h2>
                <p className="text-gray-700 mb-4">
                  Cookies zijn kleine tekstbestanden die op uw apparaat worden geplaatst wanneer u onze website bezoekt. 
                  Ze helpen ons u een betere ervaring te bieden door uw voorkeuren te onthouden, 
                  te analyseren hoe u onze site gebruikt en content te personaliseren.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">2. Hoe We Cookies Gebruiken</h2>
                <p className="text-gray-700 mb-4">
                  We gebruiken cookies voor de volgende doeleinden:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Essentiële Cookies:</strong> Vereist voor basis website functionaliteit</li>
                  <li><strong>Prestatie Cookies:</strong> Helpen ons begrijpen hoe bezoekers met onze site interacteren</li>
                  <li><strong>Functionele Cookies:</strong> Onthouden uw voorkeuren en instellingen</li>
                  <li><strong>Marketing Cookies:</strong> Gebruikt voor advertenties en promotionele doeleinden</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">3. Soorten Cookies die We Gebruiken</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Essentiële Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    Deze cookies zijn noodzakelijk voor de website om correct te functioneren. Ze maken basis functies 
                    mogelijk zoals paginanavigatie, toegang tot beveiligde gebieden en winkelwagen functionaliteit.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Sessiebeheer</li>
                    <li>Beveiligingsfuncties</li>
                    <li>Winkelwagen functionaliteit</li>
                    <li>Gebruikersauthenticatie</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Analytics Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    Deze cookies helpen ons begrijpen hoe bezoekers met onze website interacteren door 
                    informatie anoniem te verzamelen en te rapporteren.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Google Analytics</li>
                    <li>Paginabekijkings tracking</li>
                    <li>Gebruikersgedrag analyse</li>
                    <li>Prestatie monitoring</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Functionele Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    Deze cookies maken verbeterde functionaliteit en personalisatie mogelijk, zoals het onthouden 
                    van uw taalvoorkeuren en login status.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Taalvoorkeuren</li>
                    <li>Gebruikersvoorkeuren</li>
                    <li>Formuliergegevens retentie</li>
                    <li>Gepersonaliseerde content</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Marketing Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    Deze cookies worden gebruikt om bezoekers over websites te volgen om relevante en 
                    boeiende advertenties weer te geven.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Social media integratie</li>
                    <li>Advertentienetwerken</li>
                    <li>Retargeting campagnes</li>
                    <li>Conversie tracking</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">4. Cookies van Derden</h2>
                <p className="text-gray-700 mb-4">
                  We kunnen diensten van derden gebruiken die cookies op uw apparaat plaatsen:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Google Analytics:</strong> Website analytics en prestatie tracking</li>
                  <li><strong>Stripe:</strong> Betalingsverwerking en beveiliging</li>
                  <li><strong>Social Media:</strong> Facebook, Instagram en TikTok integratie</li>
                  <li><strong>E-mail Marketing:</strong> Nieuwsbrief en promotionele communicatie</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">5. Uw Cookie Voorkeuren Beheren</h2>
                <p className="text-gray-700 mb-4">
                  U kunt cookies op verschillende manieren controleren en beheren:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Browser Instellingen:</strong> De meeste browsers laten u cookies blokkeren of verwijderen</li>
                  <li><strong>Cookie Toestemming:</strong> Gebruik onze cookie toestemmingsbanner om voorkeuren te beheren</li>
                  <li><strong>Opt-out Tools:</strong> Gebruik industrie opt-out mechanismen voor advertentie cookies</li>
                  <li><strong>Contact Opnemen:</strong> Neem contact met ons op voor hulp bij cookie beheer</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">6. Cookie Duur</h2>
                <p className="text-gray-700 mb-4">
                  Cookies hebben verschillende levensduren:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Sessie Cookies:</strong> Verwijderd wanneer u uw browser sluit</li>
                  <li><strong>Persistente Cookies:</strong> Blijven op uw apparaat voor een bepaalde periode</li>
                  <li><strong>First-Party Cookies:</strong> Direct ingesteld door onze website</li>
                  <li><strong>Third-Party Cookies:</strong> Ingesteld door externe diensten die we gebruiken</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">7. Uw Rechten</h2>
                <p className="text-gray-700 mb-4">
                  Onder GDPR en andere privacywetten heeft u het recht om:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Niet-essentiële cookies te accepteren of afwijzen</li>
                  <li>Toestemming op elk moment in te trekken</li>
                  <li>Informatie te verzoeken over cookies die we gebruiken</li>
                  <li>Cookies van uw apparaat te verwijderen</li>
                  <li>U af te melden voor tracking cookies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">8. Updates van Dit Beleid</h2>
                <p className="text-gray-700 mb-4">
                  We kunnen dit Cookiebeleid van tijd tot tijd bijwerken om wijzigingen in onze praktijken 
                  of om andere operationele, juridische of regelgevende redenen te weerspiegelen. We zullen u 
                  op de hoogte stellen van eventuele materiële wijzigingen door het bijgewerkte beleid op onze 
                  website te plaatsen.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">9. Contact</h2>
                <p className="text-gray-700 mb-4">
                  Als u vragen heeft over ons gebruik van cookies of dit Cookiebeleid, neem dan contact met ons op:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>E-mail:</strong> privacy@honeyfy.com<br />
                    <strong>Adres:</strong> Honeyfy, Nederland<br />
                    <strong>Telefoon:</strong> +31 (0) 123 456 789
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
