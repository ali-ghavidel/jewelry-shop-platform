import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'

const vazirmatn = Vazirmatn({
  variable: '--font-vazirmatn',
  subsets: ['arabic', 'latin'],
})

export const metadata: Metadata = {
  title: 'زرنرخ مشهد | قیمت لحظه‌ای طلا، سکه و ارز و طلافروشی‌های مشهد',
  description:
    'پلتفرم قیمت لحظه‌ای طلا، سکه و ارز همراه با نقشه و راهنمای طلافروشی‌های معتبر شهر مشهد. مشاهده نرخ‌های به‌روز، آدرس و مسیریابی بهترین طلافروشی‌های مشهد.',
  generator: 'v0.app',
  keywords: [
    'قیمت طلا مشهد',
    'قیمت سکه',
    'قیمت ارز',
    'طلافروشی مشهد',
    'نرخ طلا',
    'طلای ۱۸ عیار',
  ],
  openGraph: {
    title: 'زرنرخ مشهد | قیمت لحظه‌ای طلا و طلافروشی‌های مشهد',
    description:
      'قیمت لحظه‌ای طلا، سکه و ارز و راهنمای کامل طلافروشی‌های مشهد روی نقشه.',
    locale: 'fa_IR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`dark ${vazirmatn.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
