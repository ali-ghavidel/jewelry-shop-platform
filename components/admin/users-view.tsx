'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toPersianDigits } from '@/lib/format'

const users = [
  { id: 'u1', name: 'علی محمدی', role: 'مدیر', comments: 12, active: true },
  { id: 'u2', name: 'مریم احمدی', role: 'کاربر', comments: 5, active: true },
  { id: 'u3', name: 'حسین رضایی', role: 'کاربر', comments: 8, active: true },
  { id: 'u4', name: 'زهرا کریمی', role: 'کاربر', comments: 3, active: false },
  { id: 'u5', name: 'محمد حسینی', role: 'ناظر', comments: 21, active: true },
]

export function UsersView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">کاربران</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          مدیریت کاربران ثبت‌شده در پلتفرم
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            فهرست کاربران
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">کاربر</TableHead>
                  <TableHead className="text-right">نقش</TableHead>
                  <TableHead className="text-right">تعداد نظرات</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="bg-primary/15 text-xs text-primary">
                            {user.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.role}
                    </TableCell>
                    <TableCell className="tabular-nums text-muted-foreground">
                      {toPersianDigits(user.comments)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.active
                            ? 'border-up/30 bg-up/15 text-up'
                            : 'border-border bg-muted text-muted-foreground'
                        }
                      >
                        {user.active ? 'فعال' : 'غیرفعال'}
                      </Badge>
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
