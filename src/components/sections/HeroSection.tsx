import { memo } from 'react'
import { getEditableStyle } from '@/lib/field-layout'

interface Props {
  fields: Record<string, string>
}

function HeroSection({ fields }: Props) {
  const hasBgImage = Boolean(fields.bgImage)
  const overlayOpacity = Math.min(
    Math.max(Number(fields.bgOverlayOpacity || 65), 0),
    100
  ) / 100

  return (
    <section
      data-edit-field={hasBgImage ? 'bgImage' : 'bgColor'}
      style={{
        backgroundColor: fields.bgColor,
        color: fields.textColor,
        backgroundImage: hasBgImage ? `url(${fields.bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative px-6 md:px-10 py-28 text-center overflow-x-clip"
    >
      {hasBgImage && (
        <div
          data-edit-field="bgColor"
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: fields.bgColor, opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1
          data-edit-field="title"
          data-layout-item="true"
          style={getEditableStyle(fields, 'title')}
          className="text-4xl md:text-6xl font-bold mb-5 leading-tight tracking-tight"
        >
          {fields.title}
        </h1>
        <p
          data-edit-field="subtitle"
          data-layout-item="true"
          style={getEditableStyle(fields, 'subtitle', { width: 90 })}
          className="text-lg md:text-xl opacity-75 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {fields.subtitle}
        </p>
        {fields.ctaText && (
          <a
            data-edit-field="ctaText"
            data-layout-item="true"
            href={fields.ctaUrl || '#'}
            style={{
              ...getEditableStyle(fields, 'ctaText', { width: 40 }),
              backgroundColor: fields.textColor,
              color: fields.bgColor,
            }}
            className="inline-block px-9 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-85 shadow-lg"
          >
            <span data-edit-field="ctaText">{fields.ctaText}</span>
          </a>
        )}
      </div>
    </section>
  )
}

export default memo(HeroSection)
