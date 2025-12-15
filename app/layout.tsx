import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SkinFlow - Advanced CS2 Skin Analytics | Smart Investment Tracking',
  description: 'Track CS2 skin prices with advanced analytics. Identify smart investments, monitor price trends, discover profit opportunities. Real-time data & predictions.',
  keywords: 'CS2 skins, CS2 price tracker, skin analytics, CS2 investment, price predictions, CS2 market analysis, skin price trends',
  openGraph: {
    title: 'SkinFlow - CS2 Skin Analytics & Price Tracking',
    description: 'Smart CS2 skin analytics with price predictions and investment opportunities',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
