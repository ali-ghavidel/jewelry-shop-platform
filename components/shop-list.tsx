'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ShopCard } from '@/components/shop-card'
import type { District, Shop } from '@/lib/types'
import { toPersianDigits } from '@/lib/format'

export function ShopList({
  shops,
  districts,
  search,
  onSearchChange,
  district,
  onDistrictChange,
  activeShopId,
  onSelectShop,
  distances,
}: {
  shops: Shop[]
  districts: District[]
  search: string
  onSearchChange: (value: string) => void
  district: string
  onDistrictChange: (value: string) => void
  activeShopId: string | null
  onSelectShop: (id: string) => void
  distances: Record<string, number>
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="جستجوی نام طلافروشی..."
            className="pr-9"
            aria-label="جستجوی طلافروشی"
          />
        </div>
        <Select value={district} onValueChange={onDistrictChange}>
          <SelectTrigger className="sm:w-44" aria-label="فیلتر منطقه">
            <SelectValue>
              {(value: string) =>
                value === 'all' ? 'همه مناطق' : value
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه مناطق</SelectItem>
            {districts.map((d) => (
              <SelectItem key={d.id} value={d.name}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-xs text-muted-foreground">
        {toPersianDigits(shops.length)} طلافروشی یافت شد
      </p>

      <div className="flex flex-col gap-2 overflow-y-auto pl-1 lg:max-h-[520px]">
        {shops.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            طلافروشی‌ای با این مشخصات یافت نشد.
          </p>
        ) : (
          shops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              active={activeShopId === shop.id}
              distanceKm={distances[shop.id]}
              onSelect={onSelectShop}
            />
          ))
        )}
      </div>
    </div>
  )
}
