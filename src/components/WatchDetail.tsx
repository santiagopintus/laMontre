'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Watch } from '@/types'
import { useCart } from '@/context/CartContext'
import ImageOverlay from './ImageOverlay'
import Button from '@/components/ui/Button'

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

  return (
    <>
      <div className="container py-8">
        <h2 className="mb-8 text-center text-[5.5vw] font-normal md:text-[4rem]">
          {watch.marca} {watch.modelo}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
          <div className="relative">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-100">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#212529] border-t-transparent" />
              </div>
            )}
            <div
              className="relative aspect-square w-full cursor-zoom-in"
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
            <ul className="m-0 mb-6 list-none p-0">
              {[
                { label: 'Marca', value: watch.marca },
                { label: 'Modelo', value: watch.modelo },
                { label: 'Tipo', value: watch.tipo ? 'Digital' : 'Analógico' },
                { label: 'Es smart', value: watch.smart ? 'Sí' : 'No' },
              ].map(({ label, value }) => (
                <li key={label} className="mb-6 text-[1.6rem] font-bold">
                  {label}: <span className="font-normal">{value}</span>
                </li>
              ))}
            </ul>

            <hr className="mb-4 border-[#212529] opacity-20" />

            <div className="mb-1 flex items-center justify-between">
              <h3 className="m-0 text-[3.2rem] font-normal">Precio:</h3>
              <h3 className="m-0 text-[3.2rem] font-normal">
                ${watch.precio.toLocaleString('es-AR')}
              </h3>
            </div>
            <div className="mb-6 flex items-center justify-between">
              <h4 className="m-0 text-[2.1rem] font-normal">Envío:</h4>
              <h4 className="m-0 text-[2.1rem] font-normal">${envio.toLocaleString('es-AR')}</h4>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={handleAddToCart} className="block w-full">
                Agregar al carrito
                {addedCount + itemCount > 0 && (
                  <span className="ml-2">({addedCount + itemCount})</span>
                )}
              </Button>
              <Button href="/cart" className="block w-full">
                Ver carrito
              </Button>
              <Button variant="secondary" href="/" className="block w-full">
                Volver al inicio
              </Button>
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
