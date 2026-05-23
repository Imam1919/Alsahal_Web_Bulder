import { memo } from 'react'
import { getEditableStyle } from '@/lib/field-layout'

interface Props {
  fields: Record<string, string>
}

function FooterSection({ fields }: Props) {
  const links = (fields.links ?? '')
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean)

  return (
    <footer
      data-edit-field="bgColor"
      style={{ backgroundColor: fields.bgColor, color: fields.textColor }}
      className="px-6 md:px-10 py-14"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <div>
            <div
              data-edit-field="logo"
              data-layout-item="true"
              style={getEditableStyle(fields, 'logo', { width: 50 })}
              className="text-xl font-bold text-white mb-2"
            >
              {fields.logo}
            </div>
            <p
              data-edit-field="tagline"
              data-layout-item="true"
              style={getEditableStyle(fields, 'tagline')}
              className="text-sm opacity-50 max-w-xs leading-relaxed"
            >
              {fields.tagline}
            </p>
          </div>
          <nav className="flex gap-6 flex-wrap">
            {links.map((link) => (
              <a
                key={link}
                data-edit-field="links"
                data-layout-item="true"
                style={getEditableStyle(fields, 'links', { width: 20 })}
                href="#"
                className="text-sm opacity-50 hover:opacity-90 transition-opacity"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p
            data-edit-field="copyright"
            data-layout-item="true"
            style={getEditableStyle(fields, 'copyright')}
            className="text-xs opacity-35"
          >
            {fields.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default memo(FooterSection)
