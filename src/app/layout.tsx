import type { Metadata } from 'next'
import { Noto_Serif } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '../components/Header'

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
          <footer className="py-8 text-center text-[1.4rem] text-[#212529]">
            Desarrollado por{' '}
            <a
              href="https://github.com/SantiagoPintus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF9D5C] no-underline hover:underline"
            >
              Santiago Pintus
            </a>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
