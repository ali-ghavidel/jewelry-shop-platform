import Link from 'next/link'
import { Coins } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/#rates', label: 'نرخ‌ها' },
  { href: '/#shops', label: 'طلافروشی‌ها' },
  { href: '/admin', label: 'پنل مدیریت' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Coins className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-primary">
            زرنرخ مشهد
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/admin"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:hidden"
        >
          مدیریت
        </Link>
      </div>
    </header>
  )
}
