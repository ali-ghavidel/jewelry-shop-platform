'use client'

import { Store, MessageSquare, Eye, Clock } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { shops, comments } from '@/lib/mock-data'
import { toPersianDigits } from '@/lib/format'

const visitData = [
  { day: 'شنبه', visits: 320 },
  { day: 'یکشنبه', visits: 410 },
  { day: 'دوشنبه', visits: 380 },
  { day: 'سه‌شنبه', visits: 520 },
  { day: 'چهارشنبه', visits: 610 },
  { day: 'پنجشنبه', visits: 720 },
  { day: 'جمعه', visits: 540 },
]

const chartConfig = {
  visits: { label: 'بازدید', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function DashboardView() {
  const pendingComments = comments.filter((c) => c.status === 'pending').length

  const stats = [
    {
      label: 'تعداد طلافروشی‌ها',
      value: shops.length,
      icon: Store,
    },
    {
      label: 'تعداد نظرات',
      value: comments.length,
      icon: MessageSquare,
    },
    {
      label: 'بازدید امروز',
      value: 540,
      icon: Eye,
    },
    {
      label: 'نظرات در انتظار تأیید',
      value: pendingComments,
      icon: Clock,
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">داشبورد</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          نمای کلی از وضعیت پلتفرم زرنرخ مشهد
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border bg-card">
              <CardContent className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-foreground">
                    {toPersianDigits(stat.value)}
                  </p>
                  <p className="text-pretty text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            بازدید هفتگی
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[280px] w-full">
            <AreaChart data={visitData} margin={{ left: 4, right: 4 }}>
              <defs>
                <linearGradient id="fillVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-visits)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-visits)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => toPersianDigits(v)}
                orientation="right"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="visits"
                type="monotone"
                fill="url(#fillVisits)"
                stroke="var(--color-visits)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
