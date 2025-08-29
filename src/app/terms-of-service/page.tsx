'use client';

import { motion } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function TermsOfServicePage() {
  return (
    <>
      <HreflangTagsServer pathname="/terms-of-service" currentLocale="en" />
      
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
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600 font-body">
                Last updated: January 2024
              </p>
            </div>

            <div className="prose prose-lg max-w-none font-body">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using the Honeyfy website and services, you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  Honeyfy provides premium Polish honey products and related services through our online platform. 
                  Our services include:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Online ordering and payment processing</li>
                  <li>Product information and recommendations</li>
                  <li>Customer support and assistance</li>
                  <li>Newsletter and promotional communications</li>
                  <li>Loyalty program and rewards</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">3. User Accounts</h2>
                <p className="text-gray-700 mb-4">
                  To access certain features of our service, you may be required to create an account. You are 
                  responsible for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Providing accurate and complete information</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">4. Product Information</h2>
                <p className="text-gray-700 mb-4">
                  We strive to provide accurate product information, including descriptions, prices, and availability. 
                  However, we do not warrant that product descriptions or other content is accurate, complete, 
                  reliable, current, or error-free.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">5. Pricing and Payment</h2>
                <p className="text-gray-700 mb-4">
                  All prices are listed in Euros (€) and include applicable taxes. We reserve the right to 
                  modify prices at any time. Payment is processed securely through Stripe, and you agree to 
                  provide valid payment information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">6. Shipping and Delivery</h2>
                <p className="text-gray-700 mb-4">
                  We ship to addresses within the Netherlands and select European countries. Delivery times 
                  are estimates and may vary. Risk of loss and title for items pass to you upon delivery.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">7. Returns and Refunds</h2>
                <p className="text-gray-700 mb-4">
                  We accept returns within 14 days of delivery for unused products in original packaging. 
                  Refunds will be processed within 5-7 business days. Shipping costs for returns are the 
                  responsibility of the customer unless the product is defective.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">8. Prohibited Uses</h2>
                <p className="text-gray-700 mb-4">
                  You may not use our service to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful or malicious code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of our service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">9. Intellectual Property</h2>
                <p className="text-gray-700 mb-4">
                  All content on this website, including text, graphics, logos, and software, is the property 
                  of Honeyfy and is protected by copyright and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">10. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  Honeyfy shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages resulting from your use of our service or any products purchased through our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">11. Governing Law</h2>
                <p className="text-gray-700 mb-4">
                  These terms shall be governed by and construed in accordance with the laws of the Netherlands. 
                  Any disputes shall be resolved in the courts of the Netherlands.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">12. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately 
                  upon posting. Your continued use of our service constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">13. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> legal@honeyfy.com<br />
                    <strong>Address:</strong> Honeyfy, Netherlands<br />
                    <strong>Phone:</strong> +31 685 713 773
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
