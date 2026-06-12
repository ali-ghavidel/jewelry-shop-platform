const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => faDigits[Number(d)])
}

/** Format a Toman price (number) into a grouped Persian string */
export function formatPrice(price: number): string {
  return toPersianDigits(price.toLocaleString('en-US'))
}

export function formatPercent(value: number): string {
  const abs = Math.abs(value).toFixed(2)
  return toPersianDigits(abs)
}

export function formatTime(iso: string): string {
  const date = new Date(iso)
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return toPersianDigits(time)
}

export function formatRating(rating: number): string {
  return toPersianDigits(rating.toFixed(1))
}
