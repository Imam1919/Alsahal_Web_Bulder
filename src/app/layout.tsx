import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'WebBuilder — Visual Page Builder',
  description: 'Build beautiful pages with a visual drag-and-drop editor',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="h-full antialiased font-[var(--font-geist),system-ui,sans-serif] overflow-hidden">
        {children}
      </body>
    </html>
  )
}
