'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {/* You can change this icon - Options: */}
            {/* Option 1: Emoji */}
            <span className="text-2xl">🍯</span>
            
            {/* Option 2: Custom SVG (uncomment to use) */}
            {/* <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg> */}
            
            {/* Option 3: Custom Image (uncomment to use) */}
            {/* <Image src="/logo.png" alt="Honeyfy Logo" width={32} height={32} /> */}
            
            <span className="text-xl font-bold text-gray-900">Honeyfy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-yellow-600 transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-yellow-600 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-yellow-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/search" className="text-gray-700 hover:text-yellow-600 transition-colors">
              🔍
            </Link>
            <CartIcon />
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 mt-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-700 mt-1 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-yellow-600 transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-yellow-600 transition-colors">
                About
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-yellow-600 transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-yellow-600 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
              <Link href="/search" className="text-gray-700 hover:text-yellow-600 transition-colors">
                🔍 Search
              </Link>
              <div className="flex items-center">
                <CartIcon />
                <span className="ml-2 text-gray-700">Cart</span>
              </div>
              <UserMenu />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
