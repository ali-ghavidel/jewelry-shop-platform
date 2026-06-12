'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/star-rating'
import { comments as initialComments, shops } from '@/lib/mock-data'
import type { Comment, CommentStatus } from '@/lib/types'

const statusMeta: Record<
  CommentStatus,
  { label: string; className: string }
> = {
  pending: {
    label: 'در انتظار',
    className: 'bg-primary/15 text-primary border-primary/30',
  },
  approved: {
    label: 'تأیید شده',
    className: 'bg-up/15 text-up border-up/30',
  },
  rejected: {
    label: 'رد شده',
    className: 'bg-down/15 text-down border-down/30',
  },
}

function shopName(id: string) {
  return shops.find((s) => s.id === id)?.name ?? '—'
}

export function CommentsView() {
  const [comments, setComments] = useState<Comment[]>(initialComments)

  function setStatus(id: string, status: CommentStatus) {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">نظرات</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          بررسی و تأیید نظرات ثبت‌شده توسط کاربران
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            مدیریت نظرات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">کاربر</TableHead>
                  <TableHead className="text-right">طلافروشی</TableHead>
                  <TableHead className="text-right">امتیاز</TableHead>
                  <TableHead className="text-right">متن نظر</TableHead>
                  <TableHead className="text-right">وضعیت</TableHead>
                  <TableHead className="text-right">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="font-medium text-foreground">
                      {comment.userName}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {shopName(comment.shopId)}
                    </TableCell>
                    <TableCell>
                      <StarRating rating={comment.rating} showValue={false} />
                    </TableCell>
                    <TableCell className="max-w-xs text-pretty text-muted-foreground">
                      {comment.text}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusMeta[comment.status].className}
                      >
                        {statusMeta[comment.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setStatus(comment.id, 'approved')}
                          disabled={comment.status === 'approved'}
                          aria-label="تأیید"
                          className="text-up hover:text-up disabled:opacity-40"
                        >
                          <Check className="size-4" aria-hidden="true" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setStatus(comment.id, 'rejected')}
                          disabled={comment.status === 'rejected'}
                          aria-label="رد"
                          className="text-down hover:text-down disabled:opacity-40"
                        >
                          <X className="size-4" aria-hidden="true" />
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
