import { memo } from 'react'
import { MapPin } from 'lucide-react'
import { getEditableStyle } from '@/lib/field-layout'

interface Props {
  fields: Record<string, string>
}

const DEFAULT_ADDRESS = '123 Business Street, New York, NY 10001'

function getMapSrc(fields: Record<string, string>) {
  if (fields.mapEmbedUrl?.trim()) return fields.mapEmbedUrl.trim()

  const address = fields.address?.trim() || DEFAULT_ADDRESS
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
}

function getMapHeight(value: string | undefined) {
  const height = Number(value)
  if (!Number.isFinite(height)) return 420
  return Math.min(Math.max(height, 240), 720)
}

function MapSection({ fields }: Props) {
  const mapSrc = getMapSrc(fields)
  const mapHeight = getMapHeight(fields.mapHeight)

  return (
    <section
      data-edit-field="bgColor"
      style={{ backgroundColor: fields.bgColor, color: fields.textColor }}
      className="px-6 md:px-10 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-8 lg:gap-10 items-stretch">
          <div
            style={{ backgroundColor: fields.cardBgColor }}
            className="rounded-2xl border border-black/5 p-6 md:p-8 shadow-xl shadow-slate-900/5"
          >
            {fields.title && (
              <h2
                data-edit-field="title"
                data-layout-item="true"
                style={getEditableStyle(fields, 'title')}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                {fields.title}
              </h2>
            )}

            {fields.subtitle && (
              <p
                data-edit-field="subtitle"
                data-layout-item="true"
                style={getEditableStyle(fields, 'subtitle', { width: 90 })}
                className="text-base leading-relaxed opacity-70 mb-8"
              >
                {fields.subtitle}
              </p>
            )}

            {fields.address && (
              <div
                data-edit-field="address"
                data-layout-item="true"
                style={getEditableStyle(fields, 'address')}
                className="flex gap-3 text-sm leading-relaxed opacity-80"
              >
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <p>{fields.address}</p>
              </div>
            )}
          </div>

          <div
            data-edit-field="mapEmbedUrl"
            data-layout-item="true"
            style={getEditableStyle(fields, 'mapEmbedUrl')}
            className="overflow-hidden rounded-2xl border border-black/10 bg-slate-100 shadow-xl shadow-slate-900/5 min-h-[240px]"
          >
            <iframe
              title={fields.title || 'Location map'}
              src={mapSrc}
              width="100%"
              height={mapHeight}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(MapSection)
