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
    }, 5000)
    return () => clearInterval(interval)
  }, [phrases.length])

  return (
    <section className="text-center py-8">
      <div className="container">
        <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center text-left">
          <div className="hidden md:flex justify-center">
            <div className="max-w-540">
              <Image
                src="/img/Home-watch.png"
                alt="Imagen principal de La Montre"
                width={540}
                height={360}
                priority
                className="h-auto"
              />
            </div>
          </div>
          <div className="hidden md:block text-[2.2rem] leading-relaxed tracking-[0.5px]">
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
        <h2
          className={`text-left text-[3rem] md:text-[3.6rem] py-4 font-normal mb-6 italic transition-opacity duration-1000 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {phrases[currentIndex]}
        </h2>
      </div>

      <hr className="mt-8 border-[#212529] opacity-20 mx-[5%]" />
    </section>
  )
}
