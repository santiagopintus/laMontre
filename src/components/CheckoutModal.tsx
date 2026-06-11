'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import type { CartEntry } from '@/types'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemsTotal: number
  shippingTotal: number
  cart: CartEntry[]
}

type PaymentMethod = 'debito' | 'credito'
type Installments = 1 | 3 | 6 | 12

export default function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  itemsTotal,
  shippingTotal,
  cart,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('debito')
  const [installments, setInstallments] = useState<Installments>(1)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const total = itemsTotal + shippingTotal
  const perInstallment = (total / installments).toFixed(2)

  const handleConfirm = () => {
    setPaymentMethod('debito')
    setInstallments(1)
    onConfirm()
  }

  const handleClose = () => {
    setPaymentMethod('debito')
    setInstallments(1)
    onClose()
  }

  const selectBase = 'border border-line bg-white px-3 py-2 text-[1.6rem] w-full'

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-black/70 transition-opacity duration-200 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="bg-surface mx-auto mt-8 mb-8 max-h-[95vh] max-w-[95%] overflow-y-auto rounded-[0.5rem] p-8">
        <h2 className="mb-6 text-[2.4rem] font-normal">Finalizar compra</h2>

        <div className="mb-8 w-full p-8">
          <ul className="m-0 mb-2 p-0">
            {cart.map(({ item, quantity }) => (
              <li key={item.source} className="text-[1.6rem]">
                - {item.marca} {item.modelo} {quantity > 1 ? `(x${quantity})` : ''}
              </li>
            ))}
          </ul>
          <h4 className="m-0 mb-2 text-[2rem] font-normal">
            Envío: ${shippingTotal.toLocaleString('es-AR')}
          </h4>
          Pagarás en {installments} cuotas sin interés de $
          <h3 className="m-0 mb-2 text-[2.4rem] font-normal">
            Total: <span className="font-bold">${total.toLocaleString('es-AR')}</span>
          </h3>
          {paymentMethod === 'credito' && installments > 1 && (
            <p className="text-surface m-0 text-[1.6rem]">
              {Number(perInstallment).toLocaleString('es-AR')}
            </p>
          )}
        </div>

        <form className="mb-8 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-[1.6rem] font-bold">Método de pago:</label>
            <select
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value as PaymentMethod)
                setInstallments(1)
              }}
              className={selectBase}
            >
              <option value="debito">Tarjeta de Débito</option>
              <option value="credito">Tarjeta de Crédito</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[1.6rem] font-bold">Cuotas:</label>
            <select
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value) as Installments)}
              disabled={paymentMethod !== 'credito'}
              className={`${selectBase} disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <option value={1}>1 cuota</option>
              <option value={3}>3 cuotas sin interés</option>
              <option value={6}>6 cuotas sin interés</option>
              <option value={12}>12 cuotas sin interés</option>
            </select>
          </div>
        </form>

        <div className="mb-6">
          <p className="mb-4 text-[1.6rem]">¿Quiere concretar la compra?</p>
          <div className="flex flex-col gap-3 md:flex-row">
            <Button variant="secondary" onClick={handleClose} className="block w-full md:w-fit">
              Cancelar
            </Button>
            <Button onClick={handleConfirm} className="block w-full md:w-fit">
              Comprar
            </Button>
          </div>
        </div>

        <div className="border-primary/20 border-t pt-4">
          <p className="text-muted text-[1.4rem]">
            Esta compra es un simulador y no se le pedirán los datos de su tarjeta
          </p>
        </div>
      </div>
    </div>
  )
}
