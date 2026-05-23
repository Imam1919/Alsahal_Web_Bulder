import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'Alsahal WebBuilder — Visual Page Builder',
  description: 'Build beautiful multi-page websites visually. Drag sections, customize content, preview on any device, and export — no code required.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="antialiased font-[var(--font-geist),system-ui,sans-serif]">
        {children}
      </body>
    </html>
  )
}
