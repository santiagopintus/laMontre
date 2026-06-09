'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Watch } from '@/types'
import { useCart } from '@/context/CartContext'
import ImageOverlay from './ImageOverlay'

interface WatchDetailProps {
  watch: Watch
}

export default function WatchDetail({ watch }: WatchDetailProps) {
  const { addItem, itemCount } = useCart()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [addedCount, setAddedCount] = useState(0)

  const envio = Math.round(watch.precio * 0.03)
  const imageSrc = `/img/watches/${watch.source}.webp`
  const imageAlt = `${watch.marca} ${watch.modelo}`

  const handleAddToCart = () => {
    addItem({ ...watch, envio })
    setAddedCount((prev) => prev + 1)
  }

  const btnBase =
    'block w-full px-4 py-[1rem] text-[1.6rem] text-center no-underline cursor-pointer transition-all duration-200 hover:-translate-y-0.5'

  return (
    <>
      <div className="container py-8">
        <h2 className="text-[5.5vw] md:text-[4rem] font-normal text-center mb-8">
          {watch.marca} {watch.modelo}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
          <div className="relative">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
                <div className="w-10 h-10 border-4 border-[#212529] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <div
              className="relative w-full aspect-square cursor-zoom-in"
              onClick={() => setOverlayOpen(true)}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className={`object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <ul className="list-none p-0 m-0 mb-6">
              {[
                { label: 'Marca', value: watch.marca },
                { label: 'Modelo', value: watch.modelo },
                { label: 'Tipo', value: watch.tipo ? 'Digital' : 'Analógico' },
                { label: 'Es smart', value: watch.smart ? 'Sí' : 'No' },
              ].map(({ label, value }) => (
                <li key={label} className="font-bold mb-6 text-[1.6rem]">
                  {label}: <span className="font-normal">{value}</span>
                </li>
              ))}
            </ul>

            <hr className="border-[#212529] opacity-20 mb-4" />

            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[3.2rem] font-normal m-0">Precio:</h3>
              <h3 className="text-[3.2rem] font-normal m-0">
                ${watch.precio.toLocaleString('es-AR')}
              </h3>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-[2.1rem] font-normal m-0">Envío:</h4>
              <h4 className="text-[2.1rem] font-normal m-0">${envio.toLocaleString('es-AR')}</h4>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className={`${btnBase} bg-[#212529] text-white hover:bg-[#31373d]`}
              >
                Agregar al carrito
                {addedCount + itemCount > 0 && (
                  <span className="ml-2">({addedCount + itemCount})</span>
                )}
              </button>
              <Link
                href="/cart"
                className={`${btnBase} bg-[#212529] text-white hover:bg-[#31373d]`}
              >
                Ver carrito
              </Link>
              <Link
                href="/"
                className={`${btnBase} bg-transparent border-2 border-[#212529] text-[#212529] hover:bg-[#d9d9d9]`}
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ImageOverlay
        src={imageSrc}
        alt={imageAlt}
        isOpen={overlayOpen}
        onClose={() => setOverlayOpen(false)}
      />
    </>
  )
}
