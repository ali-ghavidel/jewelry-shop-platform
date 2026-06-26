import type { Metadata } from 'next'
import { AdminShell } from '@/components/admin/admin-shell'

export const metadata: Metadata = {
  title: 'پنل مدیریت | زرنرخ مشهد',
  description: 'پنل مدیریت نرخ‌ها، طلافروشی‌ها، نظرات و کاربران زرنرخ مشهد',
}

export default function AdminPage() {
  return <AdminShell />
}
