'use client'

import { useRef, useEffect } from 'react'

interface ImageOverlayProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export default function ImageOverlay({ src, alt, isOpen, onClose }: ImageOverlayProps) {
  const gestureAreaRef = useRef<HTMLDivElement>(null)
  const scaleElementRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (isOpen) {
      if (scaleElementRef.current) {
        scaleElementRef.current.style.transform = ''
        scaleElementRef.current.removeAttribute('data-x')
        scaleElementRef.current.removeAttribute('data-y')
      }
      if (gestureAreaRef.current) {
        gestureAreaRef.current.style.transform = ''
        gestureAreaRef.current.removeAttribute('data-x')
        gestureAreaRef.current.removeAttribute('data-y')
      }
    }
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    let mounted = true
    let cleanup: (() => void) | null = null

    const setup = async () => {
      const { default: interact } = await import('interactjs')
      if (!mounted || !gestureAreaRef.current) return

      const angleScale = { angle: 0, scale: 1 }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function dragMoveListener(event: any) {
        const target = gestureAreaRef.current!
        const x = parseFloat(target.getAttribute('data-x') ?? '0') + event.dx
        const y = parseFloat(target.getAttribute('data-y') ?? '0') + event.dy
        target.style.transform = `translate(${x}px, ${y}px)`
        target.setAttribute('data-x', String(x))
        target.setAttribute('data-y', String(y))
      }

      interact(gestureAreaRef.current)
        .gesturable({
          listeners: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            start(event: any) {
              angleScale.angle -= event.angle
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            move(event: any) {
              const currentAngle = event.angle + angleScale.angle
              const currentScale = event.scale * angleScale.scale
              if (scaleElementRef.current) {
                scaleElementRef.current.style.transform = `rotate(${currentAngle}deg) scale(${currentScale})`
              }
              dragMoveListener(event)
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            end(event: any) {
              angleScale.angle += event.angle
              angleScale.scale *= event.scale
            },
          },
        })
        .draggable({ listeners: { move: dragMoveListener }, inertia: true })

      cleanup = () => {
        if (gestureAreaRef.current) {
          try {
            interact(gestureAreaRef.current).unset()
          } catch {}
        }
      }
    }

    setup()

    return () => {
      mounted = false
      cleanup?.()
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 w-full h-full bg-black/70" onClick={onClose} />
      <div
        ref={gestureAreaRef}
        className="absolute z-[111] top-0 left-0 touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={scaleElementRef}
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${src}`}
          alt={alt}
          className="select-none w-[95vw] h-auto md:w-auto md:h-[95vh] md:mt-20 md:-translate-x-1/2"
          draggable={false}
        />
      </div>
    </div>
  )
}
