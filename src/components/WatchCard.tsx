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
      className={`group relative mb-8 flex cursor-pointer flex-col justify-between overflow-hidden rounded-[0.5rem] bg-white
        p-4 shadow-[0px_5px_8px_-2px_rgba(0,0,0,0.35)] transition-all
        duration-500
        ease-out hover:translate-y-[-3px]
        hover:shadow-[0px_7px_10px_0px_rgba(0,0,0,0.35)] md:mb-0
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
    >
      <div className="relative mt-4 aspect-square w-full">
        <Image
          src={`./img/watches/${watch.source}.webp`}
          alt={`Reloj ${watch.marca} ${watch.modelo}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 67vw, 33vw"
        />
      </div>

      <div className="mt-4">
        <p className="text-center text-[2rem] font-normal text-[#212529] md:text-[2.5rem]">
          {watch.marca} {watch.modelo}
        </p>
        <p className="text-center text-[1.8rem] font-normal text-[#212529] md:text-[3rem]">
          ${watch.precio.toLocaleString('es-AR')}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full translate-y-full bg-[#343a40] py-8 transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        <p className="text-center text-white">Tipo: {watch.tipo ? 'Digital' : 'Analógico'}</p>
        <p className="text-center text-white">Es smart: {watch.smart ? 'Sí' : 'No'}</p>
      </div>
    </div>
  )
}
