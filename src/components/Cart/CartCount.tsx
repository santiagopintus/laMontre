'use client'

import { useCart } from '@/context/CartContext'

export default function CartCount() {
  const { cartCount: itemCount } = useCart()
  if (itemCount === 0) return null
  return <span className="ml-1">({itemCount})</span>
}
