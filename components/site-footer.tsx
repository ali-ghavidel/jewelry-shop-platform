import { Coins } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Coins className="size-4" aria-hidden="true" />
          </span>
          <span className="font-bold text-primary">زرنرخ مشهد</span>
        </div>
        <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          مرجع قیمت لحظه‌ای طلا، سکه و ارز و راهنمای طلافروشی‌های معتبر شهر مشهد.
          قیمت‌های نمایش داده شده جنبه اطلاع‌رسانی دارند.
        </p>
        <p className="text-xs text-muted-foreground">
          © تمامی حقوق برای زرنرخ مشهد محفوظ است.
        </p>
      </div>
    </footer>
  )
}
