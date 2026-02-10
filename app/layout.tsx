import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Science Horoscope - 现代八字命理系统',
  description: '精准、极速、现代化的在线八字排盘与分析工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  )
}
