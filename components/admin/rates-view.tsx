'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { rates as initialRates } from '@/lib/mock-data'
import type { Rate } from '@/lib/types'
import { toPersianDigits } from '@/lib/format'

const intervals: Record<string, string> = {
  '60': 'هر ۱ دقیقه',
  '300': 'هر ۵ دقیقه',
  '900': 'هر ۱۵ دقیقه',
  '3600': 'هر ۱ ساعت',
}

export function RatesView() {
  const [rates, setRates] = useState<Rate[]>(initialRates)
  const [interval, setIntervalValue] = useState('300')

  function toggleSource(id: string) {
    setRates((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, source: r.source === 'api' ? 'manual' : 'api' }
          : r,
      ),
    )
  }

  function updatePrice(id: string, price: number) {
    setRates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, price } : r)),
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">مدیریت نرخ‌ها</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            منبع و مقدار نرخ‌ها را مدیریت کنید
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            بازه به‌روزرسانی
          </Label>
          <Select value={interval} onValueChange={setIntervalValue}>
            <SelectTrigger className="w-44">
              <SelectValue>{(v: string) => intervals[v]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(intervals).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            فهرست نرخ‌ها
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">عنوان</TableHead>
                  <TableHead className="text-right">قیمت (تومان)</TableHead>
                  <TableHead className="text-right">منبع</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium text-foreground">
                      {rate.name}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        inputMode="numeric"
                        value={toPersianDigits(rate.price.toLocaleString('en-US'))}
                        onChange={(e) => {
                          const raw = e.target.value
                            .replace(/[۰-۹]/g, (d) =>
                              String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)),
                            )
                            .replace(/[^\d]/g, '')
                          updatePrice(rate.id, Number(raw) || 0)
                        }}
                        disabled={rate.source === 'api'}
                        className="w-40 tabular-nums disabled:opacity-60"
                        aria-label={`قیمت ${rate.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={rate.source === 'api'}
                          onCheckedChange={() => toggleSource(rate.id)}
                          aria-label={`منبع ${rate.name}`}
                        />
                        <span className="text-xs font-medium text-muted-foreground">
                          {rate.source === 'api' ? 'API' : 'دستی'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
