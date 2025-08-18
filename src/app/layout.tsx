import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import CartSidebar from "@/components/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Honeyfy - Premium Natural Honey",
  description: "Discover the finest natural honey from sustainable beekeeping. Premium quality honey for health-conscious consumers.",
  keywords: "honey, natural honey, premium honey, sustainable beekeeping, organic honey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
          return (
          <html lang="en">
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              <CartProvider>
                <Header />
                <main className="min-h-screen">
                  {children}
                </main>
                <Footer />
                <CartSidebar />
              </CartProvider>
            </body>
          </html>
        );
}
