'use client'

import { useState, useMemo } from 'react'
import type { Watch, SortField, SortDirection } from '@/types'
import WatchCard from './WatchCard'

const SORT_LABELS: Record<SortField, { asc: string; desc: string }> = {
  marca: { asc: 'A → Z', desc: 'Z → A' },
  precio: { asc: 'Menor a mayor', desc: 'Mayor a menor' },
  tipo: { asc: 'Digital primero', desc: 'Analógico primero' },
  smart: { asc: 'Smart primero', desc: 'No smart primero' },
}

interface CatalogSectionProps {
  watches: Watch[]
}

export default function CatalogSection({ watches }: CatalogSectionProps) {
  const [sortField, setSortField] = useState<SortField>('marca')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const sortedWatches = useMemo(() => {
    return watches
      .map((watch, idx) => ({ watch, idx }))
      .sort((a, b) => {
        const dir = sortDirection === 'asc' ? 1 : -1
        const wa = a.watch,
          wb = b.watch
        if (sortField === 'precio') return (wa.precio - wb.precio) * dir
        if (sortField === 'tipo') {
          if (wa.tipo === wb.tipo) return 0
          return (wa.tipo ? -1 : 1) * dir
        }
        if (sortField === 'smart') {
          if (wa.smart === wb.smart) return 0
          return (wa.smart ? -1 : 1) * dir
        }
        return wa.marca.localeCompare(wb.marca) * dir
      })
  }, [watches, sortField, sortDirection])

  const handleFieldChange = (field: SortField) => {
    setSortField(field)
    setSortDirection('asc')
  }

  const selectBase = 'border border-[#d1d8de] bg-white px-3 py-2 text-[1.6rem] cursor-pointer'

  return (
    <section className="container pb-20">
      <div className="mb-10 flex flex-col text-center md:flex-row md:items-center md:justify-between md:text-left">
        <h2 className="mb-4 text-[3.6rem] font-normal md:mb-0">Elige tu reloj favorito!</h2>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label htmlFor="orden" className="text-[1.6rem]">
            Ordenar por:
          </label>
          <div className="flex flex-col gap-2 md:flex-row">
            <select
              id="orden"
              value={sortField}
              onChange={(e) => handleFieldChange(e.target.value as SortField)}
              className={`${selectBase} w-full md:w-fit`}
            >
              <option value="marca">Marca</option>
              <option value="precio">Precio</option>
              <option value="tipo">Tipo</option>
              <option value="smart">Smart o no</option>
            </select>
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value as SortDirection)}
              className={`${selectBase} w-full md:w-fit`}
            >
              <option value="asc">{SORT_LABELS[sortField].asc}</option>
              <option value="desc">{SORT_LABELS[sortField].desc}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {sortedWatches.map(({ watch, idx }) => (
          <WatchCard key={idx} watch={watch} index={idx} />
        ))}
      </div>
    </section>
  )
}
