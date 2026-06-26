'use client'

import { useEffect, useMemo } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import { Navigation, Phone, Clock, MapPin } from 'lucide-react'
import type { Shop } from '@/lib/types'
import { StarRating } from '@/components/star-rating'

const MASHHAD_CENTER: [number, number] = [36.2972, 59.6067]

function goldPin(active: boolean) {
  const size = active ? 42 : 34
  const color = active ? '#FFD700' : '#D4AF37'
  return L.divIcon({
    className: 'zar-pin',
    html: `
      <div style="position:relative;width:${size}px;height:${size}px;transform:translate(-50%,-100%);">
        <svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" stroke="#0A0A0A" stroke-width="1.2" style="filter:drop-shadow(0 3px 4px rgba(0,0,0,0.5));">
          <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 8 12 8 12s8-6.6 8-12c0-4.4-3.6-8-8-8z"/>
          <circle cx="12" cy="10" r="3.2" fill="#0A0A0A"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [0, 0],
  })
}

function userPin() {
  return L.divIcon({
    className: 'zar-user-pin',
    html: `<div style="width:18px;height:18px;transform:translate(-50%,-50%);border-radius:9999px;background:#3b82f6;border:3px solid #fff;box-shadow:0 0 0 4px rgba(59,130,246,0.3);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [0, 0],
  })
}

function MapController({
  center,
  zoom,
}: {
  center: [number, number]
  zoom: number
}) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.8 })
  }, [center, zoom, map])
  return null
}

export default function ShopMap({
  shops,
  activeShopId,
  onSelectShop,
  userLocation,
}: {
  shops: Shop[]
  activeShopId: string | null
  onSelectShop: (id: string) => void
  userLocation: [number, number] | null
}) {
  const activeShop = useMemo(
    () => shops.find((s) => s.id === activeShopId),
    [shops, activeShopId],
  )

  const center: [number, number] = activeShop
    ? [activeShop.lat, activeShop.lng]
    : userLocation ?? MASHHAD_CENTER

  const zoom = activeShop || userLocation ? 15 : 13

  return (
    <MapContainer
      center={MASHHAD_CENTER}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapController center={center} zoom={zoom} />

      {userLocation && (
        <Marker position={userLocation} icon={userPin()}>
          <Popup>موقعیت شما</Popup>
        </Marker>
      )}

      {shops.map((shop) => (
        <Marker
          key={shop.id}
          position={[shop.lat, shop.lng]}
          icon={goldPin(shop.id === activeShopId)}
          eventHandlers={{ click: () => onSelectShop(shop.id) }}
        >
          <Popup>
            <div className="w-56 p-3 text-right" dir="rtl">
              <h3 className="text-sm font-bold text-foreground">{shop.name}</h3>
              <div className="mt-1.5">
                <StarRating rating={shop.rating} />
              </div>
              <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                <span>{shop.address}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">{shop.phone}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{shop.workingHours}</span>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
              >
                <Navigation className="size-3.5" aria-hidden="true" />
                مسیریابی
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
