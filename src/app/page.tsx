import watches from '@/data/watches.json'
import phrases from '@/data/phrases.json'
import HeroSection from '@/components/HeroSection'
import CatalogSection from '@/components/CatalogSection'
import type { Watch } from '@/types'

export default function Home() {
  return (
    <>
      <HeroSection phrases={phrases as string[]} />
      <CatalogSection watches={watches as Watch[]} />
    </>
  )
}
