'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Watch } from '@/types'

interface WatchCardProps {
  watch: Watch
  index: number
}

export default function WatchCard({ watch, index }: WatchCardProps) {
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      onClick={() => router.push(`/watch/${index}`)}
      className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[0.5rem] bg-white p-4 shadow-[0px_5px_8px_-2px_rgba(0,0,0,0.35)] transition-all duration-500 ease-out hover:translate-y-[-3px] hover:shadow-[0px_7px_10px_0px_rgba(0,0,0,0.35)]"
    >
      <div className="relative mt-4 aspect-square w-full">
        {!imageLoaded && <div className="bg-stripe absolute inset-0 animate-pulse rounded" />}
        <Image
          src={`/img/watches/${watch.source}.webp`}
          alt={`Reloj ${watch.marca} ${watch.modelo}`}
          fill
          className={`object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 768px) 67vw, 33vw"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="mt-4">
        <p className="text-primary text-center text-[1.4rem] font-normal">
          {watch.marca} {watch.modelo}
        </p>
        <p className="text-primary text-center text-[2rem] font-normal">
          ${watch.precio.toLocaleString('es-AR')}
        </p>
      </div>

      <div className="bg-secondary absolute bottom-0 left-0 w-full translate-y-full py-8 transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        <p className="text-center text-white">Tipo: {watch.tipo ? 'Digital' : 'Analógico'}</p>
        <p className="text-center text-white">Es smart: {watch.smart ? 'Sí' : 'No'}</p>
      </div>
    </div>
  )
}
