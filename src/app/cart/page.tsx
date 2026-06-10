'use client'

import { useState, useCallback } from 'react'
import { useCart } from '@/context/CartContext'
import CartList from '@/components/CartList'
import CheckoutModal from '@/components/CheckoutModal'
import SuccessToast from '@/components/SuccessToast'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const { cart, clearCart, itemCount, shippingTotal, itemsTotal } = useCart()
  const [showModal, setShowModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleConfirmPurchase = useCallback(() => {
    clearCart()
    setShowModal(false)
    setShowToast(true)
  }, [clearCart])

  return (
    <div className="container py-8 pb-20">
      <h3 className="mb-6 text-[3.2rem] font-normal">
        Carrito{' '}
        {itemCount === 0 ? (
          <span className="text-[#6c757d]">(vacío)</span>
        ) : (
          <span>({itemCount})</span>
        )}
      </h3>

      <CartList />

      {cart.length > 0 && (
        <>
          <div className="mt-6 mb-4">
            <h4 className="m-0 mb-1 text-[2.8rem] font-normal">
              Envío: ${shippingTotal.toLocaleString('es-AR')}
            </h4>
            <h4 className="m-0 text-[2.8rem] font-normal">
              Total: ${itemsTotal.toLocaleString('es-AR')}
            </h4>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <Button onClick={clearCart} className="block w-full md:w-fit">
              Vaciar carrito
            </Button>
            <Button onClick={() => setShowModal(true)} className="block w-full md:w-fit">
              Ir a comprar
            </Button>
          </div>
        </>
      )}

      <CheckoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmPurchase}
        itemsTotal={itemsTotal}
        shippingTotal={shippingTotal}
        itemCount={itemCount}
      />

      <SuccessToast isVisible={showToast} onHide={() => setShowToast(false)} />
    </div>
  )
}
