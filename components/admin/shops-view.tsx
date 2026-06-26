'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { StarRating } from '@/components/star-rating'
import { shops as initialShops, districts } from '@/lib/mock-data'
import type { Shop } from '@/lib/types'
import { toPersianDigits } from '@/lib/format'

const LocationPicker = dynamic(
  () => import('@/components/admin/location-picker'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-48 items-center justify-center rounded-lg border border-border bg-card text-xs text-muted-foreground">
        در حال بارگذاری نقشه...
      </div>
    ),
  },
)

const emptyForm = {
  name: '',
  address: '',
  phone: '',
  workingHours: '',
  district: districts[0].name,
  lat: 36.2972,
  lng: 59.6067,
}

export function ShopsView() {
  const [shops, setShops] = useState<Shop[]>(initialShops)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)

  function handleAdd() {
    if (!form.name.trim()) return
    const newShop: Shop = {
      id: `s${Date.now()}`,
      name: form.name,
      address: form.address,
      phone: form.phone,
      workingHours: form.workingHours,
      district: form.district,
      lat: form.lat,
      lng: form.lng,
      rating: 0,
      imageUrl: '/placeholder.svg',
    }
    setShops((prev) => [newShop, ...prev])
    setForm(emptyForm)
    setOpen(false)
  }

  function handleDelete(id: string) {
    setShops((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">طلافروشی‌ها</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مدیریت فهرست طلافروشی‌های ثبت‌شده
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button className="gap-1.5">
                <Plus className="size-4" aria-hidden="true" />
                افزودن طلافروشی
              </Button>
            }
          />
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>افزودن طلافروشی جدید</DialogTitle>
              <DialogDescription>
                اطلاعات طلافروشی را وارد کرده و موقعیت آن را روی نقشه انتخاب کنید.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="shop-name">نام طلافروشی</Label>
                <Input
                  id="shop-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="مثلاً طلا و جواهر زرین"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="shop-address">آدرس</Label>
                <Input
                  id="shop-address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="آدرس کامل"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="shop-phone">تلفن</Label>
                  <Input
                    id="shop-phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="۰۵۱-..."
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="shop-hours">ساعت کاری</Label>
                  <Input
                    id="shop-hours"
                    value={form.workingHours}
                    onChange={(e) =>
                      setForm({ ...form, workingHours: e.target.value })
                    }
                    placeholder="۹:۰۰ تا ۲۱:۰۰"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>منطقه</Label>
                <Select
                  value={form.district}
                  onValueChange={(v) => setForm({ ...form, district: v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>{(v: string) => v}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((d) => (
                      <SelectItem key={d.id} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>موقعیت روی نقشه</Label>
                <LocationPicker
                  lat={form.lat}
                  lng={form.lng}
                  onChange={(lat, lng) => setForm({ ...form, lat, lng })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="shop-lat" className="text-xs">
                      عرض جغرافیایی
                    </Label>
                    <Input
                      id="shop-lat"
                      value={form.lat}
                      onChange={(e) =>
                        setForm({ ...form, lat: Number(e.target.value) || 0 })
                      }
                      className="tabular-nums"
                      dir="ltr"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="shop-lng" className="text-xs">
                      طول جغرافیایی
                    </Label>
                    <Input
                      id="shop-lng"
                      value={form.lng}
                      onChange={(e) =>
                        setForm({ ...form, lng: Number(e.target.value) || 0 })
                      }
                      className="tabular-nums"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="shop-image">تصویر طلافروشی</Label>
                <Input id="shop-image" type="file" accept="image/*" />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
              >
                انصراف
              </Button>
              <Button onClick={handleAdd}>ثبت طلافروشی</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            فهرست طلافروشی‌ها ({toPersianDigits(shops.length)})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">نام</TableHead>
                  <TableHead className="text-right">منطقه</TableHead>
                  <TableHead className="text-right">تلفن</TableHead>
                  <TableHead className="text-right">امتیاز</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shops.map((shop) => (
                  <TableRow key={shop.id}>
                    <TableCell className="font-medium text-foreground">
                      {shop.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {shop.district}
                    </TableCell>
                    <TableCell className="tabular-nums text-muted-foreground">
                      {shop.phone}
                    </TableCell>
                    <TableCell>
                      <StarRating rating={shop.rating} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="ویرایش"
                        >
                          <Pencil className="size-4" aria-hidden="true" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(shop.id)}
                          aria-label="حذف"
                          className="text-down hover:text-down"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </Button>
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
