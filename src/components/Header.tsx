import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import CartCount from './CartCount'

export default function Header() {
  return (
    <header className="bg-[#e9ecef] py-8 md:py-0">
      <div className="container flex justify-between items-center py-5">
        <Link href="/" className="flex justify-center md:justify-start mb-4 md:mb-0">
          <Image
            src="/img/logo.svg"
            alt="Logo de La Montre"
            width={200}
            height={60}
            priority
            className="max-w-[40rem] h-auto"
          />
        </Link>

        <nav>
          <MobileMenu>
            <ul className="list-none p-0 m-0 text-center md:text-left">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/cart', label: 'Carrito', count: true },
                { href: '/contact', label: 'Contacto' },
              ].map(({ href, label, count }) => (
                <li
                  key={href}
                  className="block md:inline-block py-4 md:py-0 md:px-4 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#212529] hover:after:w-full after:transition-[width] after:duration-500 after:ease-in-out"
                >
                  <Link
                    href={href}
                    className="text-[2.4rem] md:text-[1.6rem] text-[#212529] no-underline hover:tracking-[0.1rem] transition-[letter-spacing] duration-500"
                  >
                    {label}
                    {count && <CartCount />}
                  </Link>
                </li>
              ))}
            </ul>
          </MobileMenu>
        </nav>
      </div>
    </header>
  )
}
