'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What types of Polish honey do you offer?",
    answer: "We offer premium Polish honey varieties including Heather Honey, Acacia Honey, Rapeseed Honey, Bee Pollen, Raspberry Honey, Linden Honey, Buckwheat Honey, Multiflower Honey, Forest Honey, and Goldenrod Honey. Each type comes from the pristine southern regions of Poland, including Świętokrzyskie, and has unique flavors and health benefits.",
    category: "Products"
  },
  {
    id: 2,
    question: "Where does your honey come from?",
    answer: "Our honey comes exclusively from the pristine southern regions of Poland, including the Świętokrzyskie region, Carpathian Mountains, Podkarpacie, and Małopolska. These regions are known for their rich biodiversity and traditional beekeeping heritage, ensuring the highest quality pure Polish honey.",
    category: "Quality"
  },
  {
    id: 3,
    question: "How do I know your honey is pure and natural?",
    answer: "All our honey is sourced from trusted Polish beekeepers in southern Poland and undergoes rigorous quality testing. We never add artificial sweeteners, preservatives, or other additives. Every jar is certified organic and contains 100% pure Polish honey from sustainable beekeeping practices.",
    category: "Quality"
  },
  {
    id: 4,
    question: "Do you deliver to shops and bakeries in the Netherlands?",
    answer: "Yes! We currently deliver to 8 shops across the Netherlands, starting from Zuid-Holland. We're actively expanding our cooperation with bakeries, local shops, and Polish shops across the whole Netherlands. Contact us for wholesale inquiries and partnership opportunities.",
    category: "Business"
  },
  {
    id: 5,
    question: "What are the shipping costs and delivery times?",
    answer: "We offer free shipping on orders over €69. Standard delivery takes 2-3 business days within the Netherlands, and 3-5 business days for other European countries. All orders are carefully packaged to ensure your pure Polish honey arrives in perfect condition.",
    category: "Shipping"
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer: "We accept iDEAL, credit cards (Visa, Mastercard, American Express), SEPA Direct Debit, Google Pay, and Apple Pay. All payments are processed securely through Stripe. We do not accept PayPal, Bancontact, or Sofort.",
    category: "Payment"
  },
  {
    id: 7,
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unopened products in their original packaging. If you're not satisfied with your purchase, please contact our customer service team at honeyfy.online@gmail.com or call +31 685713773.",
    category: "Returns"
  },
  {
    id: 8,
    question: "How should I store honey?",
    answer: "Store honey in a cool, dry place away from direct sunlight. While honey doesn't spoil, it may crystallize over time. You can gently warm crystallized honey to restore its liquid consistency. Our pure Polish honey maintains its quality and flavor when stored properly.",
    category: "Storage"
  },
  {
    id: 9,
    question: "Is your honey suitable for vegans?",
    answer: "Honey is not considered vegan as it's produced by bees. However, our honey is 100% natural and ethically sourced from sustainable beekeeping practices in southern Poland. We prioritize the health and well-being of our bee colonies.",
    category: "Dietary"
  },
  {
    id: 10,
    question: "Do you offer bulk or wholesale orders?",
    answer: "Yes, we offer bulk pricing for orders over €200. We're actively expanding our network of partner shops and bakeries across the Netherlands. Please contact us directly for wholesale inquiries, custom pricing, and partnership opportunities.",
    category: "Business"
  },
  {
    id: 11,
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order through your account dashboard. Our customer service team is available to help with any tracking inquiries.",
    category: "Orders"
  },
  {
    id: 12,
    question: "Do you have a loyalty program?",
    answer: "Yes! Sign up for our newsletter to receive a 10% discount on your first order, and stay updated on special offers, new Polish honey varieties, and exclusive deals for Dutch and Polish customers living in the Netherlands.",
    category: "Loyalty"
  },
  {
    id: 13,
    question: "Can I cancel or modify my order?",
    answer: "Orders can be modified or cancelled within 2 hours of placement. Please contact our customer service team immediately at honeyfy.online@gmail.com or call +31 685713773 if you need to make changes.",
    category: "Orders"
  },
  {
    id: 14,
    question: "What makes your Polish honey special?",
    answer: "Our honey comes from the pristine southern regions of Poland, known for their rich biodiversity and traditional beekeeping heritage. Each variety has unique characteristics - from the rare Heather Honey from Polish Highlands to the delicate Acacia Honey. All our honey is 100% pure, organic, and sustainably harvested.",
    category: "Quality"
  },
  {
    id: 15,
    question: "Do you ship to Polish customers in the Netherlands?",
    answer: "Absolutely! We created the Honeyfy sub-brand specifically for the Netherlands market, bringing pure Polish honey from southern regions to Dutch and Polish customers living in the Netherlands. We understand the importance of authentic Polish honey for the Polish community.",
    category: "Shipping"
  },
  {
    id: 16,
    question: "What are your business hours and contact information?",
    answer: "Our business hours are Monday-Friday 9:00 AM - 6:00 PM, Saturday 10:00 AM - 4:00 PM. Contact us at honeyfy.online@gmail.com or call +31 685713773. We're located at Dordtselaan 67c 04, 3081 BG Rotterdam, The Netherlands.",
    category: "Contact"
  }
];

const categories = ['All', 'Products', 'Quality', 'Shipping', 'Returns', 'Storage', 'Dietary', 'Business', 'Payment', 'Orders', 'Loyalty', 'Contact'];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredFAQs = selectedCategory === 'All' 
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      {/* Header */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 font-heading text-gray-900"
          >
            🍯 Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto font-body"
          >
            Find answers to common questions about our honey products and services
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
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6 font-body">
              Can't find what you're looking for? Our customer service team is here to help!
            </p>
            <div className="flex justify-center">
              <a
                href="/contact"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
