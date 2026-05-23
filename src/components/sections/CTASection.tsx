import { memo } from 'react'
import { getEditableStyle } from '@/lib/field-layout'

interface Props {
  fields: Record<string, string>
}

function CTASection({ fields }: Props) {
  return (
    <section
      data-edit-field="bgColor"
      style={{ backgroundColor: fields.bgColor, color: fields.textColor }}
      className="px-6 md:px-10 py-24 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          data-edit-field="title"
          data-layout-item="true"
          style={getEditableStyle(fields, 'title')}
          className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
        >
          {fields.title}
        </h2>
        <p
          data-edit-field="description"
          data-layout-item="true"
          style={getEditableStyle(fields, 'description', { width: 90 })}
          className="opacity-80 text-lg mb-10 leading-relaxed"
        >
          {fields.description}
        </p>
        {fields.btnText && (
          <a
            data-edit-field="btnText"
            data-layout-item="true"
            href={fields.btnUrl || '#'}
            style={{
              ...getEditableStyle(fields, 'btnText', { width: 45 }),
              backgroundColor: fields.btnBg,
              color: fields.btnTextColor,
            }}
            className="inline-block px-10 py-4 rounded-full font-semibold text-sm tracking-wide transition-all hover:scale-105 hover:shadow-xl shadow-lg"
          >
            <span data-edit-field="btnText">{fields.btnText}</span>
          </a>
        )}
      </div>
    </section>
  )
}

export default memo(CTASection)
