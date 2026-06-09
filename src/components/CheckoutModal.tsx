'use client'

import { useState, useEffect } from 'react'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemsTotal: number
  shippingTotal: number
  itemCount: number
}

type PaymentMethod = 'debito' | 'credito'
type Installments = 1 | 3 | 6 | 12

export default function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  itemsTotal,
  shippingTotal,
  itemCount,
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

  const selectBase = 'border border-[#d1d8de] bg-white px-3 py-2 text-[1.6rem] w-full'

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/70 overflow-y-auto transition-opacity duration-200 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-[#e9ecef] max-w-[95%] mx-auto mt-8 mb-8 p-8 max-h-[95vh] overflow-y-auto">
        <h2 className="text-[3.6rem] font-normal mb-6">Finalizar compra</h2>

        <div className="bg-[#343a40] text-[#e9ecef] p-8 w-full mb-8">
          <h4 className="text-[2.8rem] font-normal m-0 mb-2">
            {itemCount} {itemCount === 1 ? 'reloj' : 'relojes'}
          </h4>
          <h4 className="text-[2.8rem] font-normal m-0 mb-2">
            Envío: ${shippingTotal.toLocaleString('es-AR')}
          </h4>
          <h3 className="text-[3.2rem] font-normal m-0 mb-2">
            Total: ${total.toLocaleString('es-AR')}
          </h3>
          {paymentMethod === 'credito' && installments > 1 && (
            <p className="text-[#e9ecef] text-[1.6rem] m-0">
              Pagarás en {installments} cuotas sin interés de $
              {Number(perInstallment).toLocaleString('es-AR')}
            </p>
          )}
        </div>

        <form className="flex flex-col gap-4 mb-8" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[1.6rem]">Método de pago:</label>
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
            <label className="font-bold text-[1.6rem]">Cuotas:</label>
            <select
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value) as Installments)}
              disabled={paymentMethod !== 'credito'}
              className={`${selectBase} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <option value={1}>1 cuota</option>
              <option value={3}>3 cuotas sin interés</option>
              <option value={6}>6 cuotas sin interés</option>
              <option value={12}>12 cuotas sin interés</option>
            </select>
          </div>
        </form>

        <div className="mb-6">
          <p className="text-[1.6rem] mb-4">¿Quiere concretar la compra?</p>
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={handleClose}
              className="block w-full md:w-fit px-4 py-[1rem] text-[1.6rem] bg-transparent border-2 border-[#212529] text-[#212529] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d9d9d9]"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="block w-full md:w-fit px-4 py-[1rem] text-[1.6rem] bg-[#212529] text-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#31373d]"
            >
              Comprar
            </button>
          </div>
        </div>

        <div className="border-t border-[#212529]/20 pt-4">
          <p className="text-[1.4rem] text-[#6c757d]">
            Esta compra es un simulador y no se le pedirán los datos de su tarjeta
          </p>
        </div>
      </div>
    </div>
  )
}
