import { TrendingUp } from 'lucide-react'
import { RateCard } from '@/components/rate-card'
import { rates } from '@/lib/mock-data'
import { formatTime } from '@/lib/format'

export function RatesSection() {
  const lastUpdate = rates[0]?.updatedAt ?? new Date().toISOString()

  return (
    <section id="rates" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-3 text-center">
        <span className="mx-auto flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <TrendingUp className="size-4" aria-hidden="true" />
          نرخ لحظه‌ای بازار
        </span>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          قیمت لحظه‌ای طلا، سکه و ارز در مشهد
        </h1>
        <p className="mx-auto max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          به‌روزترین نرخ‌های بازار طلا و ارز را مشاهده کنید و معتبرترین
          طلافروشی‌های شهر مشهد را روی نقشه پیدا کنید.
        </p>
        <p className="text-sm text-muted-foreground">
          آخرین به‌روزرسانی نرخ‌ها: ساعت {formatTime(lastUpdate)}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rates.map((rate) => (
          <RateCard key={rate.id} rate={rate} />
        ))}
      </div>
    </section>
  )
}
