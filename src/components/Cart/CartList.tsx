'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'
import CartItemUnits from './CartItemUnits'

export default function CartList() {
  const { cart, addItem, removeItem, decrementItem } = useCart()

  if (cart.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-primary mb-6 text-[2rem]">
          No sabés cuál llevar? Mirá todos nuestros relojes y elegí el tuyo!
        </p>
        <Button href="/">Ver relojes</Button>
      </div>
    )
  }

  return (
    <div>
      {cart.map(({ item, quantity }, i) => (
        <div
          key={item.source}
          className={`flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-20 ${
            i % 2 === 0 ? 'bg-stripe' : 'bg-white'
          }`}
        >
          <div className="relative h-80 w-full shrink-0 md:h-120 md:w-120">
            <Image
              src={`/img/watches/${item.source}.webp`}
              alt={`${item.marca} ${item.modelo}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 30rem"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="m-0 text-[2.8rem] font-normal">
              {item.marca} {item.modelo}
            </h4>
            <p className="m-0 text-[1.6rem]">Tipo: {item.tipo ? 'Digital' : 'Analógico'}</p>
            <p className="m-0 text-[1.6rem]">Es smart: {item.smart ? 'Sí' : 'No'}</p>
            <CartItemUnits
              quantity={quantity}
              onAdd={() => addItem(item)}
              onDecrease={() => decrementItem(item.source)}
            />
            <p className="m-0 text-[1.6rem]">${(item.precio * quantity).toLocaleString('es-AR')}</p>
            <Button onClick={() => removeItem(item.source)} className="mt-2 w-full md:w-fit">
              Eliminar
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
