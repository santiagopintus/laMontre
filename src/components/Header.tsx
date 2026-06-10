import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from './MobileMenu'
import CartCount from './CartCount'

export default function Header() {
  return (
    <header className="bg-[#e9ecef] py-8 md:py-0">
      <div className="container flex items-center justify-between py-5">
        <Link href="/" className="mb-4 flex justify-center md:mb-0 md:justify-start">
          <Image
            src="./img/logo.svg"
            alt="Logo de La Montre"
            width={200}
            height={60}
            priority
            className="h-auto max-w-160"
          />
        </Link>

        <nav>
          <MobileMenu>
            <ul className="m-0 list-none p-0 text-center md:text-left">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/cart', label: 'Carrito', count: true },
                { href: '/contact', label: 'Contacto' },
              ].map(({ href, label, count }) => (
                <li
                  key={href}
                  className="relative block py-4 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#212529] after:transition-[width] after:duration-500 after:ease-in-out hover:after:w-full md:inline-block md:px-4 md:py-0"
                >
                  <Link
                    href={href}
                    className="text-[2.4rem] text-[#212529] no-underline transition-[letter-spacing] duration-500 hover:tracking-[0.1rem] md:text-[1.6rem]"
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
