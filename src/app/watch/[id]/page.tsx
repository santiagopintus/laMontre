import { notFound } from 'next/navigation'
import watches from '@/data/watches.json'
import WatchDetail from '@/components/WatchDetail'
import type { Watch } from '@/types'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return (watches as Watch[]).map((_, i) => ({ id: String(i) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const watch = (watches as Watch[])[Number(id)]
  if (!watch) return { title: 'Reloj no encontrado' }
  return { title: `${watch.marca} ${watch.modelo} - La Montre` }
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const watch = (watches as Watch[])[Number(id)]
  if (!watch) notFound()
  return <WatchDetail watch={watch} />
}
