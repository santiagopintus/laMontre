import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - La Montre',
}

export default function NotFound() {
  return (
    <div className="w-fit mx-auto text-center py-16 px-4">
      <h2 className="text-[3.6rem] font-normal mb-20">Creo que te perdiste en el tiempo! :O</h2>
      <p className="text-[2rem] mb-10 text-[#6c757d]">
        No pudimos encontrar la página, o está en desarrollo...
      </p>
      <Link
        href="/"
        className="inline-block px-4 py-[1rem] text-[1.6rem] bg-[#212529] text-white no-underline cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#31373d]"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
