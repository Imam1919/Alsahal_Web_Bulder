'use client'

import { memo, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { getEditableStyle } from '@/lib/field-layout'

interface Props {
  fields: Record<string, string>
}

function HeaderSection({ fields }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const stickyHeader = fields.stickyHeader !== 'false'
  const compactHeader = fields.compactHeader !== 'false'
  const links = (fields.navLinks ?? '')
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean)
  const urls = (fields.navUrls ?? '')
    .split(',')
    .map((url) => url.trim())

  return (
    <header
      data-edit-field="bgColor"
      style={{ backgroundColor: fields.bgColor, color: fields.textColor }}
      className={`relative px-6 md:px-10 flex items-center justify-between shadow-sm transition-all duration-200 ${
        stickyHeader ? 'sticky top-0 z-50' : ''
      } ${compactHeader ? 'py-2.5' : 'py-4'}`}
    >
      <span
        data-edit-field="logo"
        data-layout-item="true"
        style={getEditableStyle(fields, 'logo', { width: 25 })}
        className="text-xl font-bold tracking-tight"
      >
        {fields.logo}
      </span>
      <nav className="hidden md:flex items-center gap-7">
        {links.map((link, index) => (
          <a
            key={link}
            data-edit-field="navLinks"
            data-layout-item="true"
            style={getEditableStyle(fields, 'navLinks', { width: 20 })}
            href={urls[index] || '#'}
            className="text-sm font-medium hover:opacity-60 transition-opacity"
          >
            {link}
          </a>
        ))}
      </nav>
      <button
        style={{ borderColor: fields.textColor, color: fields.textColor }}
        className={`border rounded-full px-4 text-sm font-medium hover:opacity-70 transition-opacity hidden md:block ${
          compactHeader ? 'py-1' : 'py-1.5'
        }`}
      >
        Get in touch
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setMenuOpen((open) => !open)
        }}
        style={{ borderColor: fields.textColor, color: fields.textColor }}
        className={`md:hidden rounded-lg border flex items-center justify-center hover:opacity-70 transition-opacity ${
          compactHeader ? 'w-9 h-9' : 'w-10 h-10'
        }`}
        title={menuOpen ? 'Close menu' : 'Open menu'}
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {menuOpen && (
        <div
          style={{ backgroundColor: fields.bgColor, color: fields.textColor }}
          className="absolute left-4 right-4 top-[calc(100%+8px)] z-40 md:hidden rounded-xl border border-black/10 shadow-xl overflow-hidden"
        >
          <nav className="flex flex-col p-2">
            {links.map((link, index) => (
              <a
                key={`${link}-${index}`}
                data-edit-field="navLinks"
                href={urls[index] || '#'}
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen(false)
                }}
                className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors"
              >
                {link}
              </a>
            ))}
            <button
              type="button"
              style={{ borderColor: fields.textColor, color: fields.textColor }}
              className="mt-2 border rounded-full px-4 py-2 text-sm font-medium hover:opacity-70 transition-opacity"
            >
              Get in touch
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default memo(HeaderSection)
