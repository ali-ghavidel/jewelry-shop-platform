'use client'

import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

function pin() {
  return L.divIcon({
    className: 'zar-pick-pin',
    html: `
      <div style="position:relative;width:32px;height:32px;transform:translate(-50%,-100%);">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#D4AF37" stroke="#0A0A0A" stroke-width="1.2" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,0.5));">
          <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 8 12 8 12s8-6.6 8-12c0-4.4-3.6-8-8-8z"/>
          <circle cx="12" cy="10" r="3.2" fill="#0A0A0A"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [0, 0],
  })
}

function ClickHandler({
  onChange,
}: {
  onChange: (lat: number, lng: number) => void
}) {
  useMapEvents({
    click(e) {
      onChange(
        Number(e.latlng.lat.toFixed(4)),
        Number(e.latlng.lng.toFixed(4)),
      )
    },
  })
  return null
}

export default function LocationPicker({
  lat,
  lng,
  onChange,
}: {
  lat: number
  lng: number
  onChange: (lat: number, lng: number) => void
}) {
  return (
    <div className="h-48 overflow-hidden rounded-lg border border-border">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <ClickHandler onChange={onChange} />
        <Marker position={[lat, lng]} icon={pin()} />
      </MapContainer>
    </div>
  )
}
