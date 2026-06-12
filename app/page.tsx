import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { RatesSection } from '@/components/rates-section'
import { ShopsSection } from '@/components/shops-section'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <RatesSection />
        <ShopsSection />
      </main>
      <SiteFooter />
    </div>
  )
}
