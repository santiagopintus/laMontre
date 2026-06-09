'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Watch } from '@/types'

interface WatchCardProps {
  watch: Watch
  index: number
}

export default function WatchCard({ watch, index }: WatchCardProps) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      onClick={() => router.push(`/watch/${index}`)}
      className={`group flex flex-col justify-between relative bg-white p-4 rounded-[0.5rem] cursor-pointer overflow-hidden
        transition-all duration-500 ease-out
        shadow-[0px_5px_8px_-2px_rgba(0,0,0,0.35)]
        hover:shadow-[0px_7px_10px_0px_rgba(0,0,0,0.35)] hover:-translate-y-[3px]
        mb-8 md:mb-0
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="relative w-full aspect-square mt-4">
        <Image
          src={`/img/watches/${watch.source}.webp`}
          alt={`Reloj ${watch.marca} ${watch.modelo}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 67vw, 33vw"
        />
      </div>

      <div className="mt-4">
        <p className="text-[#212529] text-center text-[2rem] md:text-[2.5rem] font-normal">
          {watch.marca} {watch.modelo}
        </p>
        <p className="text-[#212529] text-center text-[1.8rem] md:text-[3rem] font-normal">
          ${watch.precio.toLocaleString('es-AR')}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full py-8 bg-[#343a40] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
        <p className="text-white text-center">Tipo: {watch.tipo ? 'Digital' : 'Analógico'}</p>
        <p className="text-white text-center">Es smart: {watch.smart ? 'Sí' : 'No'}</p>
      </div>
    </div>
  )
}
