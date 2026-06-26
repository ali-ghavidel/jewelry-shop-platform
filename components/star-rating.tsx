import { Star } from 'lucide-react'
import { formatRating } from '@/lib/format'
import { cn } from '@/lib/utils'

export function StarRating({
  rating,
  showValue = true,
  className,
}: {
  rating: number
  showValue?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={cn(
              'size-3.5',
              i < Math.round(rating)
                ? 'fill-primary text-primary'
                : 'fill-muted text-muted',
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-medium tabular-nums text-muted-foreground">
          {formatRating(rating)}
        </span>
      )}
      <span className="sr-only">{`امتیاز ${rating} از ۵`}</span>
    </div>
  )
}
