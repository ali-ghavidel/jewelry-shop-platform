'use client'

import { useState } from 'react'
import { AdminSidebar, type AdminView } from '@/components/admin/admin-sidebar'
import { DashboardView } from '@/components/admin/dashboard-view'
import { RatesView } from '@/components/admin/rates-view'
import { ShopsView } from '@/components/admin/shops-view'
import { CommentsView } from '@/components/admin/comments-view'
import { UsersView } from '@/components/admin/users-view'

export function AdminShell() {
  const [view, setView] = useState<AdminView>('dashboard')

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar active={view} onChange={setView} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {view === 'dashboard' && <DashboardView />}
        {view === 'rates' && <RatesView />}
        {view === 'shops' && <ShopsView />}
        {view === 'comments' && <CommentsView />}
        {view === 'users' && <UsersView />}
      </main>
    </div>
  )
}
