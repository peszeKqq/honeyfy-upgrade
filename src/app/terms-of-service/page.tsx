'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-heading">Terms of Service</h1>
              <p className="text-gray-600 mt-1 font-body">Our terms and conditions</p>
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">🍯 Terms of Service - Honeyfy</h2>
                
                <p className="text-gray-600 mb-6 font-body">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>

                <p className="text-gray-600 mb-6 font-body">
                  These Terms of Service ("Terms") govern your use of the Honeyfy website and services. 
                  By accessing or using our services, you agree to be bound by these Terms.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">1. Company Information</h3>
                <p className="text-gray-600 mb-6 font-body">
                  <strong>Honeyfy</strong><br />
                  Dordtselaan 67c 04<br />
                  3081 BG Rotterdam<br />
                  The Netherlands<br />
                  Email: honeyfy.online@gmail.com<br />
                  Chamber of Commerce (KvK): [Your KvK number]<br />
                  VAT Number: [Your VAT number]
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">2. Definitions</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li><strong>"Service"</strong> refers to the Honeyfy website and all related services</li>
                  <li><strong>"User"</strong> refers to any individual or entity using our Service</li>
                  <li><strong>"Products"</strong> refers to honey and related products sold through our Service</li>
                  <li><strong>"Order"</strong> refers to a purchase made through our Service</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">3. Acceptance of Terms</h3>
                <p className="text-gray-600 mb-6 font-body">
                  By accessing or using our Service, you confirm that you accept these Terms and agree to comply with them. 
                  If you do not agree to these Terms, you must not use our Service.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">4. Eligibility</h3>
                <p className="text-gray-600 mb-6 font-body">
                  You must be at least 18 years old to use our Service. By using our Service, you represent and warrant 
                  that you meet this age requirement and have the legal capacity to enter into these Terms.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">5. Account Registration</h3>
                <p className="text-gray-600 mb-4 font-body">When creating an account, you agree to:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">6. Products and Services</h3>
                <p className="text-gray-600 mb-4 font-body">Our Service offers:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li>Premium honey products and related items</li>
                  <li>Online ordering and payment processing</li>
                  <li>Customer support and account management</li>
                  <li>Newsletter and loyalty program</li>
                  <li>Educational content about honey and beekeeping</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">7. Ordering and Payment</h3>
                <p className="text-gray-600 mb-4 font-body">When placing an order:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li>All prices are in Euros (€) and include VAT where applicable</li>
                  <li>Payment is processed securely through our payment partners</li>
                  <li>Orders are confirmed upon successful payment</li>
                  <li>We reserve the right to refuse or cancel orders</li>
                  <li>Product availability is subject to stock levels</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">8. Shipping and Delivery</h3>
                <p className="text-gray-600 mb-4 font-body">Shipping terms:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li>Free shipping on orders over €69 within the Netherlands</li>
                  <li>Standard delivery: 2-3 business days (Netherlands)</li>
                  <li>International shipping: 3-5 business days (Europe)</li>
                  <li>Delivery times are estimates and may vary</li>
                  <li>Risk of loss transfers to you upon delivery</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">9. Returns and Refunds</h3>
                <p className="text-gray-600 mb-4 font-body">Return policy:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li>30-day return policy for unopened products</li>
                  <li>Products must be in original packaging</li>
                  <li>Return shipping costs are the customer's responsibility</li>
                  <li>Refunds are processed within 14 days of return receipt</li>
                  <li>Damaged or defective products are handled separately</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">10. Intellectual Property</h3>
                <p className="text-gray-600 mb-6 font-body">
                  All content on our Service, including text, graphics, logos, images, and software, is owned by Honeyfy 
                  or our licensors and is protected by copyright and other intellectual property laws. You may not use, 
                  reproduce, or distribute our content without permission.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">11. User Conduct</h3>
                <p className="text-gray-600 mb-4 font-body">You agree not to:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li>Use our Service for any illegal or unauthorized purpose</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with or disrupt our Service</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated tools to access our Service</li>
                  <li>Submit false or misleading information</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">12. Privacy and Data Protection</h3>
                <p className="text-gray-600 mb-6 font-body">
                  Your privacy is important to us. Our collection and use of personal data is governed by our Privacy Policy, 
                  which is incorporated into these Terms by reference. We comply with GDPR and Dutch data protection laws.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">13. Disclaimers</h3>
                <p className="text-gray-600 mb-4 font-body">We provide our Service "as is" and make no warranties:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-600 font-body">
                  <li>Service availability and functionality</li>
                  <li>Accuracy of product information</li>
                  <li>Compatibility with your devices</li>
                  <li>Freedom from errors or interruptions</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">14. Limitation of Liability</h3>
                <p className="text-gray-600 mb-6 font-body">
                  To the maximum extent permitted by law, Honeyfy shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages arising from your use of our Service. Our total liability 
                  shall not exceed the amount you paid for the specific product or service.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">15. Indemnification</h3>
                <p className="text-gray-600 mb-6 font-body">
                  You agree to indemnify and hold harmless Honeyfy from any claims, damages, or expenses arising from 
                  your use of our Service or violation of these Terms.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">16. Termination</h3>
                <p className="text-gray-600 mb-6 font-body">
                  We may terminate or suspend your account and access to our Service at any time, with or without cause. 
                  You may terminate your account at any time by contacting us. Upon termination, your right to use our 
                  Service ceases immediately.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">17. Governing Law</h3>
                <p className="text-gray-600 mb-6 font-body">
                  These Terms are governed by and construed in accordance with Dutch law. Any disputes arising from these 
                  Terms or your use of our Service shall be subject to the exclusive jurisdiction of the courts of Rotterdam, 
                  The Netherlands.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">18. Changes to Terms</h3>
                <p className="text-gray-600 mb-6 font-body">
                  We may modify these Terms at any time. We will notify you of material changes by posting the updated 
                  Terms on our website and updating the "Last updated" date. Your continued use of our Service after 
                  such changes constitutes acceptance of the new Terms.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">19. Severability</h3>
                <p className="text-gray-600 mb-6 font-body">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited 
                  or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force 
                  and effect.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">20. Contact Information</h3>
                <p className="text-gray-600 mb-4 font-body">For questions about these Terms, contact us:</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-600 font-body">
                    <strong>Email:</strong> honeyfy.online@gmail.com<br />
                    <strong>Address:</strong> Dordtselaan 67c 04, 3081 BG Rotterdam, The Netherlands<br />
                    <strong>Response Time:</strong> We will respond to your inquiry within 5 business days
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                  <h4 className="text-lg font-bold text-yellow-800 mb-2 font-heading">🍯 Thank You for Choosing Honeyfy</h4>
                  <p className="text-yellow-700 font-body">
                    We appreciate your trust in our products and services. If you have any questions about these Terms 
                    of Service, please don't hesitate to reach out to our customer support team.
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
