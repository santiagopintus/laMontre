import type { Metadata } from 'next'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: '404 - La Montre',
}

export default function NotFound() {
  return (
    <div className="mx-auto w-fit px-4 py-16 text-center">
      <h2 className="mb-20 text-[3.6rem] font-normal">Creo que te perdiste en el tiempo! :O</h2>
      <p className="mb-10 text-[2rem] text-[#6c757d]">
        No pudimos encontrar la página, o está en desarrollo...
      </p>
      <Button href="/">Volver al inicio</Button>
    </div>
  )
}
