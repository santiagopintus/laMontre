import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto - La Montre',
}

export default function ContactPage() {
  return (
    <div className="container py-8 pb-20">
      <ContactForm />
    </div>
  )
}
