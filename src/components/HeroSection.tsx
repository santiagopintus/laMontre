'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  phrases: string[]
}

export default function HeroSection({ phrases }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length)
        setVisible(true)
      }, 1000)
    }, 8000)
    return () => clearInterval(interval)
  }, [phrases.length])

  return (
    <section className="py-8 text-center">
      <div className="container">
        <div className="text-left lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="hidden justify-center md:flex">
            <div className="md:max-w-320 lg:max-w-540">
              <Image
                src="/img/Home-watch.png"
                alt="Imagen principal de La Montre"
                width={320}
                height={360}
                priority
                className="h-auto"
              />
            </div>
          </div>
          <div className="hidden text-[1.6rem] leading-relaxed tracking-[0.5px] md:block">
            <p>
              <strong>La Montre</strong> es una tienda online de relojes que busca ayudar quienes
              aman los relojes a conseguir un compañero que esté en sus muñecas a donde sea que
              vayan, según sus preferencias. Tenemos sumergibles, militares, smart, analógicos,
              clasicos y modernos. Si no tenemos el reloj de tus sueños lo conseguimos por ti!
              Esperamos que puedas conseguir lo que buscas!
            </p>
          </div>
        </div>

        {/* Random Phrases Container */}
        <div className="mb-6 flex min-h-[116px] flex-col items-center justify-center py-4 md:min-h-[164px] lg:min-h-[128px]">
          <h2
            className={`text-[1.6rem] leading-normal font-normal italic transition-opacity duration-1000 md:text-[2.4rem] ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {phrases[currentIndex]}
          </h2>
        </div>
      </div>

      <hr className="border-primary mx-[5%] mt-8 opacity-20" />
    </section>
  )
}
