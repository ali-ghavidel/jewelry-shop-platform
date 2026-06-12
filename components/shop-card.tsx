'use client'

import Image from 'next/image'
import { MapPin, Navigation } from 'lucide-react'
import type { Shop } from '@/lib/types'
import { StarRating } from '@/components/star-rating'
import { toPersianDigits } from '@/lib/format'
import { cn } from '@/lib/utils'

export function ShopCard({
  shop,
  active,
  distanceKm,
  onSelect,
}: {
  shop: Shop
  active?: boolean
  distanceKm?: number
  onSelect?: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(shop.id)}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg border p-3 text-right transition-colors',
        active
          ? 'border-primary bg-primary/10'
          : 'border-border bg-card hover:border-primary/40 hover:bg-accent/40',
      )}
    >
      <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
        <Image
          src={shop.imageUrl || '/placeholder.svg'}
          alt={shop.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {shop.name}
          </h3>
        </div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <span>منطقه {shop.district}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <StarRating rating={shop.rating} />
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Navigation className="size-3" aria-hidden="true" />
            {distanceKm !== undefined
              ? `${toPersianDigits(distanceKm.toFixed(1))} کیلومتر`
              : '— کیلومتر'}
          </span>
        </div>
      </div>
    </button>
  )
}
