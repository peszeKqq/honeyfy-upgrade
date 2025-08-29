'use client';

import { motion } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function DutchPrivacyPolicyPage() {
  return (
    <>
      <HreflangTagsServer pathname="/nl/privacy-policy" currentLocale="nl" />
      
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
                Privacybeleid
              </h1>
              <p className="text-lg text-gray-600 font-body">
                Laatst bijgewerkt: januari 2024
              </p>
            </div>

            <div className="prose prose-lg max-w-none font-body">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">1. Informatie die We Verzamelen</h2>
                <p className="text-gray-700 mb-4">
                  We verzamelen informatie die u rechtstreeks aan ons verstrekt, zoals wanneer u een account aanmaakt, 
                  een aankoop doet of contact met ons opneemt voor ondersteuning. Dit kan omvatten:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Naam en contactgegevens (e-mail, telefoon, adres)</li>
                  <li>Betalingsinformatie (veilig verwerkt via Stripe)</li>
                  <li>Bestelgeschiedenis en voorkeuren</li>
                  <li>Communicatiegegevens</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">2. Hoe We Uw Informatie Gebruiken</h2>
                <p className="text-gray-700 mb-4">
                  We gebruiken de informatie die we verzamelen om:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Uw bestellingen te verwerken en uit te voeren</li>
                  <li>Bestelbevestigingen en updates te sturen</li>
                  <li>Klantenservice te bieden</li>
                  <li>Marketingcommunicatie te sturen (met uw toestemming)</li>
                  <li>Onze producten en diensten te verbeteren</li>
                  <li>Te voldoen aan wettelijke verplichtingen</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">3. Informatiedeling</h2>
                <p className="text-gray-700 mb-4">
                  We verkopen, verhandelen of dragen uw persoonlijke informatie niet over aan derden, 
                  behalve in de volgende omstandigheden:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Met uw uitdrukkelijke toestemming</li>
                  <li>Aan vertrouwde derde partijen (betalingsverwerkers, verzendpartners)</li>
                  <li>Om te voldoen aan wettelijke vereisten</li>
                  <li>Om onze rechten en veiligheid te beschermen</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">4. Gegevensbeveiliging</h2>
                <p className="text-gray-700 mb-4">
                  We implementeren passende beveiligingsmaatregelen om uw persoonlijke informatie te beschermen tegen 
                  ongeautoriseerde toegang, wijziging, openbaarmaking of vernietiging. Dit omvat:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>SSL-versleuteling voor gegevensoverdracht</li>
                  <li>Veilige betalingsverwerking via Stripe</li>
                  <li>Regelmatige beveiligingsbeoordelingen</li>
                  <li>Beperkte toegang tot persoonlijke informatie</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">5. Uw Rechten</h2>
                <p className="text-gray-700 mb-4">
                  U heeft het recht om:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Uw persoonlijke informatie in te zien</li>
                  <li>Onjuiste informatie te corrigeren</li>
                  <li>Verwijdering van uw gegevens te verzoeken</li>
                  <li>U af te melden voor marketingcommunicatie</li>
                  <li>Uw toestemming te allen tijde in te trekken</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">6. Cookies en Tracking</h2>
                <p className="text-gray-700 mb-4">
                  We gebruiken cookies en vergelijkbare technologieën om uw browse-ervaring te verbeteren, 
                  websiteverkeer te analyseren en content te personaliseren. U kunt cookie-instellingen 
                  beheren via uw browservoorkeuren.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">7. Contact</h2>
                <p className="text-gray-700 mb-4">
                  Als u vragen heeft over dit Privacybeleid of onze gegevenspraktijken, 
                  neem dan contact met ons op:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>E-mail:</strong> privacy@honeyfy.com<br />
                    <strong>Adres:</strong> Honeyfy, Nederland<br />
                    <strong>Telefoon:</strong> +31 685 713 773
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">8. Wijzigingen in Dit Beleid</h2>
                <p className="text-gray-700 mb-4">
                  We kunnen dit Privacybeleid van tijd tot tijd bijwerken. We zullen u op de hoogte stellen van eventuele 
                  materiële wijzigingen door het nieuwe beleid op deze pagina te plaatsen en de 
                  "Laatst bijgewerkt" datum bij te werken.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
