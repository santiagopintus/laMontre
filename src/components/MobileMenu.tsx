'use client'

import { useState, useEffect } from 'react'

export default function MobileMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleOpen = () => setIsOpen((prev) => !prev)

  return (
    <>
      <button
        onClick={toggleOpen}
        aria-label="Abrir menú"
        className="flex cursor-pointer flex-col gap-[6px] p-2 md:hidden"
      >
        <span
          className={`block h-[3px] w-7 origin-center bg-[#212529] transition-transform duration-300 ease-[cubic-bezier(0.62,-0.99,0.54,1.9)] ${
            isOpen ? 'translate-y-[9px] rotate-45' : ''
          }`}
        />
        <span
          className={`block h-[3px] w-7 bg-[#212529] transition-transform duration-300 ease-[cubic-bezier(0.62,-0.99,0.54,1.9)] ${
            isOpen ? 'scale-0' : ''
          }`}
        />
        <span
          className={`block h-[3px] w-7 origin-center bg-[#212529] transition-transform duration-300 ease-[cubic-bezier(0.62,-0.99,0.54,1.9)] ${
            isOpen ? 'translate-y-[-9px] -rotate-45' : ''
          }`}
        />
      </button>

      <div className={`${isOpen ? 'flex' : 'hidden'} flex-col md:flex md:flex-row`}>{children}</div>
    </>
  )
}
