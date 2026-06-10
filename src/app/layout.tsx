import type { Metadata } from 'next'
import { Noto_Serif } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '../components/Header'
import Footer from '@/components/Footer'

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'La Montre',
  description: 'Tu tienda de relojes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={notoSerif.variable}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
