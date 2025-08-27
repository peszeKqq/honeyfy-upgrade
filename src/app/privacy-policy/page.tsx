'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-heading">Privacy Policy</h1>
              <p className="text-gray-600 mt-1 font-body">How we protect your personal data</p>
            </div>
            <Link
              href="/"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors font-body"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">🍯 Privacy Policy - Honeyfy</h2>
                
                <p className="text-gray-600 mb-6 font-body">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>

                <p className="text-gray-600 mb-6 font-body">
                  At Honeyfy, we are committed to protecting your privacy and ensuring the security of your personal data. 
                  This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
                  or use our services.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">1. Data Controller</h3>
                <p className="text-gray-600 mb-6 font-body">
                  Honeyfy<br />
                  Dordtselaan 67c 04<br />
                  3081 BG Rotterdam<br />
                  The Netherlands<br />
                  Email: honeyfy.online@gmail.com
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">2. Personal Data We Collect</h3>
                <p className="text-gray-600 mb-4 font-body">We collect the following types of personal data:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, shipping address</li>
                  <li><strong>Account Information:</strong> Username, password, account preferences</li>
                  <li><strong>Order Information:</strong> Purchase history, payment details, shipping information</li>
                  <li><strong>Communication Data:</strong> Messages, feedback, support requests</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
                  <li><strong>Usage Data:</strong> Website interactions, pages visited, time spent on site</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">3. Legal Basis for Processing</h3>
                <p className="text-gray-600 mb-4 font-body">We process your personal data based on the following legal grounds:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li><strong>Contract Performance:</strong> To fulfill orders and provide services</li>
                  <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
                  <li><strong>Consent:</strong> For marketing communications and cookies</li>
                  <li><strong>Legal Obligation:</strong> To comply with tax and accounting requirements</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">4. How We Use Your Data</h3>
                <p className="text-gray-600 mb-4 font-body">We use your personal data for the following purposes:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li>Processing and fulfilling your orders</li>
                  <li>Providing customer support and responding to inquiries</li>
                  <li>Sending order confirmations and shipping updates</li>
                  <li>Managing your account and loyalty program</li>
                  <li>Sending marketing communications (with your consent)</li>
                  <li>Improving our website and services</li>
                  <li>Preventing fraud and ensuring security</li>
                  <li>Complying with legal obligations</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">5. Data Sharing and Transfers</h3>
                <p className="text-gray-600 mb-4 font-body">We may share your data with:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li><strong>Service Providers:</strong> Payment processors, shipping companies, IT services</li>
                  <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Partners:</strong> Only with your explicit consent</li>
                </ul>
                <p className="text-gray-600 mb-6 font-body">
                  We ensure that all data transfers comply with GDPR requirements and implement appropriate safeguards.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">6. Data Retention</h3>
                <p className="text-gray-600 mb-4 font-body">We retain your personal data for:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li><strong>Account Data:</strong> Until you delete your account or 7 years after last activity</li>
                  <li><strong>Order Data:</strong> 7 years (for tax and accounting purposes)</li>
                  <li><strong>Marketing Data:</strong> Until you withdraw consent or 2 years after last interaction</li>
                  <li><strong>Technical Data:</strong> 2 years or as required by law</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">7. Your Rights</h3>
                <p className="text-gray-600 mb-4 font-body">Under GDPR, you have the following rights:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
                  <li><strong>Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">8. Cookies and Tracking</h3>
                <p className="text-gray-600 mb-6 font-body">
                  We use cookies and similar technologies to enhance your browsing experience, analyze website usage, 
                  and provide personalized content. You can manage your cookie preferences through your browser settings 
                  or our cookie consent banner.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">9. Data Security</h3>
                <p className="text-gray-600 mb-6 font-body">
                  We implement appropriate technical and organizational measures to protect your personal data against 
                  unauthorized access, alteration, disclosure, or destruction. These include encryption, secure servers, 
                  and regular security assessments.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">10. International Transfers</h3>
                <p className="text-gray-600 mb-6 font-body">
                  Your data may be transferred to countries outside the European Economic Area (EEA). We ensure such 
                  transfers comply with GDPR requirements through appropriate safeguards such as Standard Contractual 
                  Clauses or adequacy decisions.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">11. Children's Privacy</h3>
                <p className="text-gray-600 mb-6 font-body">
                  Our services are not intended for children under 16 years of age. We do not knowingly collect personal 
                  data from children under 16. If you believe we have collected such data, please contact us immediately.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">12. Changes to This Policy</h3>
                <p className="text-gray-600 mb-6 font-body">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                  posting the new policy on our website and updating the "Last updated" date.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">13. Contact Information</h3>
                <p className="text-gray-600 mb-4 font-body">For privacy-related questions or to exercise your rights, contact us:</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-600 font-body">
                    <strong>Email:</strong> honeyfy.online@gmail.com<br />
                    <strong>Address:</strong> Dordtselaan 67c 04, 3081 BG Rotterdam, The Netherlands<br />
                    <strong>Response Time:</strong> We will respond to your request within 30 days
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">14. Supervisory Authority</h3>
                <p className="text-gray-600 mb-6 font-body">
                  You have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) 
                  if you believe we have not handled your personal data in accordance with GDPR.
                </p>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                  <h4 className="text-lg font-bold text-yellow-800 mb-2 font-heading">🍯 Your Privacy Matters</h4>
                  <p className="text-yellow-700 font-body">
                    We are committed to transparency and protecting your personal data. If you have any questions about 
                    this Privacy Policy or how we handle your information, please don't hesitate to contact us.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
