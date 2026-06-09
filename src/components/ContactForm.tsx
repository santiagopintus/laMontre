'use client'

import { useState, useRef } from 'react'

type StatusType = 'success' | 'error' | null

export default function ContactForm() {
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [status, setStatus] = useState<StatusType>(null)
  const [submitting, setSubmitting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showStatus = (type: StatusType) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setStatus(type)
    timerRef.current = setTimeout(() => setStatus(null), 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !mensaje.trim()) {
      showStatus('error')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('https://formspree.io/f/mzbyqbeb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, mensaje }),
      })
      if (res.ok) {
        setEmail('')
        setMensaje('')
        showStatus('success')
      } else {
        showStatus('error')
      }
    } catch {
      showStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase = 'p-4 text-[1.6rem] text-[#212529] border-0 outline-none'

  return (
    <form onSubmit={handleSubmit} className="bg-[#6c757d] text-white p-8 md:px-[10rem]">
      <h2 className="text-[3.6rem] font-normal mb-6">Déjanos tu opinión!</h2>

      <div className="flex flex-col mb-8">
        <label htmlFor="email" className="text-[1.6rem] mb-2">
          Email:
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputBase}
        />
      </div>

      <div className="flex flex-col mb-8">
        <label htmlFor="mensaje" className="text-[1.6rem] mb-2">
          Mensaje:
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          className={`${inputBase} h-40 md:h-60 resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="block w-full md:w-fit px-4 py-[1rem] text-[1.6rem] bg-[#212529] text-white cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#31373d] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Enviando...' : 'Submit'}
      </button>

      {status && (
        <p
          className={`mt-4 p-4 text-white text-[1.6rem] ${
            status === 'success' ? 'bg-[#104b1a]' : 'bg-[#5e0915]'
          }`}
        >
          {status === 'success'
            ? 'Gracias por tu mensaje!'
            : 'Error al enviar. Verificá que los campos no estén vacíos e intentá de nuevo.'}
        </p>
      )}
    </form>
  )
}
