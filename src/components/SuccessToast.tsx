'use client'

import { useEffect, useState } from 'react'

interface SuccessToastProps {
  isVisible: boolean
  onHide: () => void
  title: string
  body: string
}

export default function SuccessToast({ isVisible, onHide, title, body }: SuccessToastProps) {
  const [fading, setFading] = useState(false)
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const initTimer = setTimeout(() => {
        setDisplay(true)
        setFading(false)
      }, 0)
      const fadeTimer = setTimeout(() => setFading(true), 3000)
      const hideTimer = setTimeout(() => {
        setDisplay(false)
        onHide()
      }, 3500)
      return () => {
        clearTimeout(initTimer)
        clearTimeout(fadeTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [isVisible, onHide])

  if (!display) return null

  return (
    <div
      className={`fixed right-8 bottom-8 bg-white p-16 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.7)] transition-opacity duration-500 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="var(--color-success-icon)" />
          <path
            d="M10 20 L17 27 L30 13"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-primary text-[1.8rem] font-bold">{title}</p>
        <p className="text-primary text-[1.6rem]">{body}</p>
      </div>
    </div>
  )
}
