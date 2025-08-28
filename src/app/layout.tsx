import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/TopBar'
import FooterWrapper from '@/components/FooterWrapper'
import CartSidebarWrapper from '@/components/CartSidebarWrapper'
import FloatingContactWidget from '@/components/FloatingContactWidget'
import TrustedStoreBadge from '@/components/TrustedStoreBadge'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { OrderProvider } from '@/contexts/OrderContext'
import StructuredData from '@/components/StructuredData'
import { generateOrganizationStructuredData } from '@/lib/seo'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import HreflangTagsServer from '@/components/HreflangTagsServer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Honeyfy - Premium Polish Honey | Buy Organic Honey Online',
  description: 'Discover the finest Polish honey delivered to the Netherlands. Organic, pure, and sustainably sourced honey products. Free shipping on orders over €69.',
  keywords: 'Polish honey, organic honey, buy honey online, Dutch honey, premium honey, honey delivery Netherlands, pure honey, natural honey, sustainable honey',
  authors: [{ name: 'Honeyfy' }],
  creator: 'Honeyfy',
  publisher: 'Honeyfy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: 'http://localhost:3000',
  },
      openGraph: {
      title: 'Honeyfy - Premium Polish Honey | Buy Organic Honey Online',
      description: 'Discover the finest Polish honey delivered to the Netherlands. Organic, pure, and sustainably sourced honey products. Free shipping on orders over €69.',
      url: 'http://localhost:3000',
      siteName: 'Honeyfy',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Honeyfy - Premium Polish Honey',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Honeyfy - Premium Polish Honey | Buy Organic Honey Online',
    description: 'Discover the finest Polish honey delivered to the Netherlands. Organic, pure, and sustainably sourced honey products.',
    images: ['/logo.png'],
    creator: '@honeyfy_nl',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <HreflangTagsServer pathname="/" currentLocale="en" />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <GoogleAnalytics />
        <StructuredData data={generateOrganizationStructuredData()} />
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              {/* Top Bar and Header - Combined in TopBar component */}
              <TopBar />
              
              {/* Main Content */}
              <main>
                {children}
              </main>
              
              {/* Footer */}
              <FooterWrapper />
              
              {/* Cart Sidebar */}
              <CartSidebarWrapper />
              
              {/* Floating Contact Widget */}
              <FloatingContactWidget />
              
              {/* Trusted Store Badge */}
              <TrustedStoreBadge />
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
