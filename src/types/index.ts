export interface Watch {
  marca: string
  modelo: string
  precio: number
  tipo: boolean
  smart: boolean
  source: string
}

export interface CartItem extends Watch {
  envio: number
}

export interface CartEntry {
  item: CartItem
  quantity: number
}

export type SortField = 'marca' | 'precio' | 'tipo' | 'smart'
export type SortDirection = 'asc' | 'desc'
