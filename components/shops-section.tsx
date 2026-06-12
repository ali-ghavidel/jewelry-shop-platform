'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { LocateFixed, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShopList } from '@/components/shop-list'
import { shops as allShops, districts } from '@/lib/mock-data'

const ShopMap = dynamic(() => import('@/components/shop-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-card text-sm text-muted-foreground">
      در حال بارگذاری نقشه...
    </div>
  ),
})

const MASHHAD_CENTER: [number, number] = [36.2972, 59.6067]

function distanceKm(
  [lat1, lng1]: [number, number],
  [lat2, lng2]: [number, number],
) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function ShopsSection() {
  const [search, setSearch] = useState('')
  const [district, setDistrict] = useState('all')
  const [activeShopId, setActiveShopId] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  )
  const [locating, setLocating] = useState(false)

  const filteredShops = useMemo(() => {
    return allShops.filter((shop) => {
      const matchesSearch = shop.name
        .toLowerCase()
        .includes(search.trim().toLowerCase())
      const matchesDistrict =
        district === 'all' || shop.district === district
      return matchesSearch && matchesDistrict
    })
  }, [search, district])

  const distances = useMemo(() => {
    const origin = userLocation ?? MASHHAD_CENTER
    const result: Record<string, number> = {}
    for (const shop of allShops) {
      result[shop.id] = distanceKm(origin, [shop.lat, shop.lng])
    }
    return result
  }, [userLocation])

  function handleLocate() {
    if (!('geolocation' in navigator)) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude])
        setActiveShopId(null)
        setLocating(false)
      },
      () => {
        // Fallback to Mashhad center if permission denied
        setUserLocation(MASHHAD_CENTER)
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }

  return (
    <section
      id="shops"
      className="border-t border-border bg-background/40"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-3 text-center">
          <span className="mx-auto flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Store className="size-4" aria-hidden="true" />
            راهنمای فروشگاه‌ها
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            طلافروشی‌های مشهد
          </h2>
          <p className="mx-auto max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            معتبرترین طلافروشی‌های شهر مشهد را روی نقشه ببینید، اطلاعات تماس و
            ساعت کاری آن‌ها را مشاهده کنید و مسیر را پیدا کنید.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="order-1 lg:order-2 lg:col-span-3">
            <div className="relative h-[400px] overflow-hidden rounded-xl border border-border lg:h-[580px]">
              <ShopMap
                shops={filteredShops}
                activeShopId={activeShopId}
                onSelectShop={setActiveShopId}
                userLocation={userLocation}
              />
              <Button
                onClick={handleLocate}
                disabled={locating}
                size="sm"
                className="absolute bottom-4 left-4 z-[1000] gap-1.5 shadow-lg"
              >
                <LocateFixed className="size-4" aria-hidden="true" />
                {locating ? 'در حال یافتن...' : 'موقعیت من'}
              </Button>
            </div>
          </div>

          <div className="order-2 lg:order-1 lg:col-span-2">
            <ShopList
              shops={filteredShops}
              districts={districts}
              search={search}
              onSearchChange={setSearch}
              district={district}
              onDistrictChange={setDistrict}
              activeShopId={activeShopId}
              onSelectShop={setActiveShopId}
              distances={distances}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
