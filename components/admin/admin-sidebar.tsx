'use client'

import Link from 'next/link'
import {
  Coins,
  LayoutDashboard,
  TrendingUp,
  Store,
  MessageSquare,
  Users,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type AdminView =
  | 'dashboard'
  | 'rates'
  | 'shops'
  | 'comments'
  | 'users'

const links: { id: AdminView; label: string; icon: typeof Coins }[] = [
  { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { id: 'rates', label: 'مدیریت نرخ‌ها', icon: TrendingUp },
  { id: 'shops', label: 'طلافروشی‌ها', icon: Store },
  { id: 'comments', label: 'نظرات', icon: MessageSquare },
  { id: 'users', label: 'کاربران', icon: Users },
]

export function AdminSidebar({
  active,
  onChange,
}: {
  active: AdminView
  onChange: (view: AdminView) => void
}) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 border-border bg-sidebar p-4 lg:h-screen lg:w-64 lg:border-l">
      <Link href="/" className="flex items-center gap-2 px-2 pt-2">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Coins className="size-5" aria-hidden="true" />
        </span>
        <span className="text-lg font-bold tracking-tight text-primary">
          زرنرخ مشهد
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = active === link.id
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => onChange(link.id)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )}
            >
              <Icon className="size-4.5 shrink-0" aria-hidden="true" />
              {link.label}
            </button>
          )
        })}
      </nav>

      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
      >
        <ArrowRight className="size-4.5" aria-hidden="true" />
        بازگشت به سایت
      </Link>
    </aside>
  )
}
