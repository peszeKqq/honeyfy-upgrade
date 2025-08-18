import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🍯</span>
              <span className="text-xl font-bold">Honeyfy</span>
            </div>
            <p className="text-gray-300 mb-4">
              Premium natural honey from sustainable beekeeping practices. 
              Every jar contains nature's finest nectar.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                🐦
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
              />
              <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-r transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Honeyfy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
