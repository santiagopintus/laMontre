'use client'

import { createContext, useContext, useState, useEffect, useCallback, startTransition } from 'react'
import type { CartItem } from '@/types'

interface CartContextValue {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (index: number) => void
  clearCart: () => void
  itemCount: number
  shippingTotal: number
  itemsTotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart')
      if (stored) startTransition(() => setCart(JSON.parse(stored)))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addItem = useCallback((item: CartItem) => {
    setCart((prev) => [...prev, item])
  }, [])

  const removeItem = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const itemCount = cart.length
  const shippingTotal = cart.length > 0 ? Math.max(...cart.map((i) => i.envio)) : 0
  const itemsTotal = cart.reduce((sum, i) => sum + i.precio, 0)

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clearCart, itemCount, shippingTotal, itemsTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
