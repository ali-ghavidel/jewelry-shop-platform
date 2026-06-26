import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { Rate } from '@/lib/types'
import { formatPercent, formatPrice, formatTime } from '@/lib/format'
import { cn } from '@/lib/utils'

export function RateCard({ rate }: { rate: Rate }) {
  const isUp = rate.changePercent >= 0

  return (
    <Card className="gap-0 border-border bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-pretty text-sm font-medium text-muted-foreground">
          {rate.name}
        </h3>
        <span
          className={cn(
            'flex shrink-0 items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums',
            isUp
              ? 'bg-up/10 text-up'
              : 'bg-down/10 text-down',
          )}
        >
          {isUp ? (
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          ) : (
            <ArrowDownLeft className="size-3.5" aria-hidden="true" />
          )}
          {formatPercent(rate.changePercent)}٪
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tabular-nums text-foreground">
          {formatPrice(rate.price)}
        </span>
        <span className="text-xs text-muted-foreground">تومان</span>
      </div>

      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="size-3.5" aria-hidden="true" />
        <span>آخرین به‌روزرسانی: {formatTime(rate.updatedAt)}</span>
      </div>
    </Card>
  )
}
