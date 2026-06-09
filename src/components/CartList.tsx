'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartList() {
  const { cart, removeItem } = useCart()

  if (cart.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-[#212529] text-[2rem] mb-6">
          No sabés cuál llevar? Mirá todos nuestros relojes y elegí el tuyo!
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-[1rem] text-[1.6rem] bg-[#212529] text-white no-underline cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#31373d]"
        >
          Ver relojes
        </Link>
      </div>
    )
  }

  return (
    <div>
      {cart.map((item, i) => (
        <div
          key={i}
          className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-20 p-4 ${
            i % 2 === 0 ? 'bg-[#ced4da]' : 'bg-white'
          }`}
        >
          <div className="relative w-full md:w-[30rem] h-[20rem] md:h-[30rem] shrink-0">
            <Image
              src={`/img/watches/${item.source}.webp`}
              alt={`${item.marca} ${item.modelo}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 30rem"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[2.8rem] font-normal m-0">
              {item.marca} {item.modelo}
            </h4>
            <p className="text-[1.6rem] m-0">Tipo: {item.tipo ? 'Digital' : 'Analógico'}</p>
            <p className="text-[1.6rem] m-0">Es smart: {item.smart ? 'Sí' : 'No'}</p>
            <p className="text-[1.6rem] m-0">${item.precio.toLocaleString('es-AR')}</p>
            <button
              onClick={() => removeItem(i)}
              className="mt-2 w-full md:w-fit px-4 py-[1rem] text-[1.6rem] bg-[#212529] text-white cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#31373d]"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
