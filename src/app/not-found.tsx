import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - La Montre',
}

export default function NotFound() {
  return (
    <div className="mx-auto w-fit px-4 py-16 text-center">
      <h2 className="mb-20 text-[3.6rem] font-normal">Creo que te perdiste en el tiempo! :O</h2>
      <p className="mb-10 text-[2rem] text-[#6c757d]">
        No pudimos encontrar la página, o está en desarrollo...
      </p>
      <Link
        href="/"
        className="inline-block cursor-pointer bg-[#212529] px-4 py-[1rem] text-[1.6rem] text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#31373d]"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
