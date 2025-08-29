'use client';

import { motion } from 'framer-motion';
import HreflangTagsServer from '@/components/HreflangTagsServer';

export default function CookiePolicyPage() {
  return (
    <>
      <HreflangTagsServer pathname="/cookie-policy" currentLocale="en" />
      
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
                Cookie Policy
              </h1>
              <p className="text-lg text-gray-600 font-body">
                Last updated: January 2024
              </p>
            </div>

            <div className="prose prose-lg max-w-none font-body">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">1. What Are Cookies?</h2>
                <p className="text-gray-700 mb-4">
                  Cookies are small text files that are placed on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences, 
                  analyzing how you use our site, and personalizing content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">2. How We Use Cookies</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our site</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Used for advertising and promotional purposes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">3. Types of Cookies We Use</h2>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Essential Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    These cookies are necessary for the website to function properly. They enable basic functions 
                    like page navigation, access to secure areas, and shopping cart functionality.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Session management</li>
                    <li>Security features</li>
                    <li>Shopping cart functionality</li>
                    <li>User authentication</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Analytics Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Google Analytics</li>
                    <li>Page view tracking</li>
                    <li>User behavior analysis</li>
                    <li>Performance monitoring</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Functional Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your language preferences and login status.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Language preferences</li>
                    <li>User preferences</li>
                    <li>Form data retention</li>
                    <li>Personalized content</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Marketing Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    These cookies are used to track visitors across websites to display relevant and 
                    engaging advertisements.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-4">
                    <li>Social media integration</li>
                    <li>Advertising networks</li>
                    <li>Retargeting campaigns</li>
                    <li>Conversion tracking</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">4. Third-Party Cookies</h2>
                <p className="text-gray-700 mb-4">
                  We may use third-party services that place cookies on your device:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Google Analytics:</strong> Website analytics and performance tracking</li>
                  <li><strong>Stripe:</strong> Payment processing and security</li>
                  <li><strong>Social Media:</strong> Facebook, Instagram, and TikTok integration</li>
                  <li><strong>Email Marketing:</strong> Newsletter and promotional communications</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">5. Managing Your Cookie Preferences</h2>
                <p className="text-gray-700 mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies</li>
                  <li><strong>Cookie Consent:</strong> Use our cookie consent banner to manage preferences</li>
                  <li><strong>Opt-Out Tools:</strong> Use industry opt-out mechanisms for advertising cookies</li>
                  <li><strong>Contact Us:</strong> Reach out to us for assistance with cookie management</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">6. Cookie Duration</h2>
                <p className="text-gray-700 mb-4">
                  Cookies have different lifespans:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent Cookies:</strong> Remain on your device for a set period</li>
                  <li><strong>First-Party Cookies:</strong> Set by our website directly</li>
                  <li><strong>Third-Party Cookies:</strong> Set by external services we use</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">7. Your Rights</h2>
                <p className="text-gray-700 mb-4">
                  Under GDPR and other privacy laws, you have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Accept or decline non-essential cookies</li>
                  <li>Withdraw consent at any time</li>
                  <li>Request information about cookies we use</li>
                  <li>Delete cookies from your device</li>
                  <li>Opt-out of tracking cookies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">8. Updates to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. We will notify you of any 
                  material changes by posting the updated policy on our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">9. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@honeyfy.com<br />
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
