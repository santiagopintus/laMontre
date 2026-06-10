'use client'

import { createContext, useContext, useState, useEffect, useCallback, startTransition } from 'react'
import type { CartItem, CartEntry } from '@/types'

interface CartContextValue {
  cart: CartEntry[]
  addItem: (item: CartItem) => void
  removeItem: (source: string) => void
  decrementItem: (source: string) => void
  clearCart: () => void
  cartCount: number
  shippingTotal: number
  itemsTotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartEntry[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && (parsed.length === 0 || 'quantity' in parsed[0])) {
          startTransition(() => setCart(parsed as CartEntry[]))
        }
      }
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addItem = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.findIndex((e) => e.item.source === item.source)
      if (existing !== -1) {
        return prev.map((e, i) => (i === existing ? { ...e, quantity: e.quantity + 1 } : e))
      }
      return [...prev, { item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((source: string) => {
    setCart((prev) => prev.filter((e) => e.item.source !== source))
  }, [])

  const decrementItem = useCallback((source: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((e) => e.item.source === source)
      if (idx === -1) return prev
      if (prev[idx].quantity === 1) return prev.filter((_, i) => i !== idx)
      return prev.map((e, i) => (i === idx ? { ...e, quantity: e.quantity - 1 } : e))
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const cartCount = cart.reduce((sum, e) => sum + e.quantity, 0)
  const itemsTotal = cart.reduce((sum, e) => sum + e.item.precio * e.quantity, 0)
  const shippingTotal = cart.length > 0 ? Math.max(...cart.map((e) => e.item.envio)) : 0

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, decrementItem, clearCart, cartCount, shippingTotal, itemsTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
