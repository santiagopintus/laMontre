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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=menu&display=optional"
        />
      </head>
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
