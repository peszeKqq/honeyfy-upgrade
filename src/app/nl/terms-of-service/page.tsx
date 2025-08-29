'use client';

import { motion } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function DutchTermsOfServicePage() {
  return (
    <>
      <HreflangTagsServer pathname="/nl/terms-of-service" currentLocale="nl" />
      
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
                Algemene Voorwaarden
              </h1>
              <p className="text-lg text-gray-600 font-body">
                Laatst bijgewerkt: januari 2024
              </p>
            </div>

            <div className="prose prose-lg max-w-none font-body">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">1. Aanvaarding van Voorwaarden</h2>
                <p className="text-gray-700 mb-4">
                  Door toegang te krijgen tot en gebruik te maken van de Honeyfy website en diensten, aanvaardt en 
                  gaat u akkoord met de voorwaarden en bepalingen van deze overeenkomst. Als u niet akkoord gaat 
                  met het bovenstaande, gebruik dan deze service niet.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">2. Beschrijving van Service</h2>
                <p className="text-gray-700 mb-4">
                  Honeyfy biedt premium Poolse honingproducten en gerelateerde diensten aan via ons online platform. 
                  Onze diensten omvatten:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Online bestellen en betalingsverwerking</li>
                  <li>Productinformatie en aanbevelingen</li>
                  <li>Klantenservice en ondersteuning</li>
                  <li>Nieuwsbrief en promotionele communicatie</li>
                  <li>Loyaliteitsprogramma en beloningen</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">3. Gebruikersaccounts</h2>
                <p className="text-gray-700 mb-4">
                  Om toegang te krijgen tot bepaalde functies van onze service, kan het zijn dat u een account 
                  moet aanmaken. U bent verantwoordelijk voor:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Het behoud van de vertrouwelijkheid van uw accountgegevens</li>
                  <li>Alle activiteiten die onder uw account plaatsvinden</li>
                  <li>Het verstrekken van nauwkeurige en volledige informatie</li>
                  <li>Ons onmiddellijk op de hoogte stellen van ongeautoriseerd gebruik</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">4. Productinformatie</h2>
                <p className="text-gray-700 mb-4">
                  We streven ernaar om nauwkeurige productinformatie te verstrekken, inclusief beschrijvingen, 
                  prijzen en beschikbaarheid. We garanderen echter niet dat productbeschrijvingen of andere 
                  content nauwkeurig, volledig, betrouwbaar, actueel of foutloos is.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">5. Prijzen en Betaling</h2>
                <p className="text-gray-700 mb-4">
                  Alle prijzen zijn vermeld in Euro's (€) en omvatten toepasselijke belastingen. We behouden 
                  ons het recht voor om prijzen te allen tijde te wijzigen. Betaling wordt veilig verwerkt 
                  via Stripe, en u gaat akkoord met het verstrekken van geldige betalingsinformatie.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">6. Verzending en Levering</h2>
                <p className="text-gray-700 mb-4">
                  We verzenden naar adressen binnen Nederland en geselecteerde Europese landen. Leveringstijden 
                  zijn schattingen en kunnen variëren. Risico van verlies en eigendom van artikelen gaan over 
                  op u bij levering.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">7. Retourneren en Terugbetalingen</h2>
                <p className="text-gray-700 mb-4">
                  We accepteren retouren binnen 14 dagen na levering voor ongebruikte producten in originele 
                  verpakking. Terugbetalingen worden binnen 5-7 werkdagen verwerkt. Verzendkosten voor retouren 
                  zijn de verantwoordelijkheid van de klant, tenzij het product defect is.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">8. Verboden Gebruik</h2>
                <p className="text-gray-700 mb-4">
                  U mag onze service niet gebruiken om:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Toepasselijke wetten of voorschriften te overtreden</li>
                  <li>Intellectuele eigendomsrechten te schenden</li>
                  <li>Schadelijke of kwaadaardige code te verzenden</li>
                  <li>Ongeautoriseerde toegang tot onze systemen te proberen te krijgen</li>
                  <li>De goede werking van onze service te verstoren</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">9. Intellectuele Eigendom</h2>
                <p className="text-gray-700 mb-4">
                  Alle content op deze website, inclusief tekst, afbeeldingen, logo's en software, is eigendom 
                  van Honeyfy en wordt beschermd door auteursrecht en andere intellectuele eigendomsrechten.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">10. Beperking van Aansprakelijkheid</h2>
                <p className="text-gray-700 mb-4">
                  Honeyfy is niet aansprakelijk voor indirecte, incidentele, bijzondere, gevolgschade of 
                  strafschade als gevolg van uw gebruik van onze service of producten die via ons platform 
                  zijn gekocht.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">11. Toepasselijk Recht</h2>
                <p className="text-gray-700 mb-4">
                  Deze voorwaarden worden beheerst door en geïnterpreteerd in overeenstemming met de wetten 
                  van Nederland. Eventuele geschillen worden opgelost door de rechtbanken van Nederland.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">12. Wijzigingen in Voorwaarden</h2>
                <p className="text-gray-700 mb-4">
                  We behouden ons het recht voor om deze voorwaarden te allen tijde te wijzigen. Wijzigingen 
                  zijn onmiddellijk van kracht na plaatsing. Uw voortgezette gebruik van onze service betekent 
                  aanvaarding van de gewijzigde voorwaarden.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">13. Contactinformatie</h2>
                <p className="text-gray-700 mb-4">
                  Voor vragen over deze Algemene Voorwaarden, neem contact met ons op:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>E-mail:</strong> legal@honeyfy.com<br />
                    <strong>Adres:</strong> Honeyfy, Nederland<br />
                    <strong>Telefoon:</strong> +31 685 713 773
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
