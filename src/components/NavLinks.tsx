'use client'

import { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

export default function NavLinks({ children }: { children: React.ReactNode }) {
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
        className="flex cursor-pointer flex-col gap-1.5 p-2 md:hidden"
      >
        {isOpen ? <CloseIcon sx={{ fontSize: '32px' }} /> : <MenuIcon sx={{ fontSize: '32px' }} />}
      </button>

      <div
        className={`${isOpen ? 'flex' : 'hidden'} bg-surface absolute right-0 z-50 w-full flex-col p-4 shadow md:relative md:right-auto md:flex md:flex-row md:p-0 md:shadow-none`}
      >
        {children}
      </div>
    </>
  )
}
