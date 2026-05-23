import { memo } from 'react'
import { getEditableStyle } from '@/lib/field-layout'

interface Props {
  fields: Record<string, string>
}

function StatsSection({ fields }: Props) {
  const stats = [
    { number: fields.stat1Number, label: fields.stat1Label, index: 1 },
    { number: fields.stat2Number, label: fields.stat2Label, index: 2 },
    { number: fields.stat3Number, label: fields.stat3Label, index: 3 },
    { number: fields.stat4Number, label: fields.stat4Label, index: 4 },
  ].filter((s) => s.number)

  return (
    <section
      data-edit-field="bgColor"
      style={{ backgroundColor: fields.bgColor, color: fields.textColor }}
      className="px-6 md:px-10 py-20"
    >
      <div className="max-w-5xl mx-auto">
        {fields.title && (
          <h2
            data-edit-field="title"
            data-layout-item="true"
            style={getEditableStyle(fields, 'title')}
            className="text-center text-2xl font-bold mb-14 opacity-90"
          >
            {fields.title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <div
                data-edit-field={`stat${s.index}Number`}
                data-layout-item="true"
                style={getEditableStyle(fields, `stat${s.index}Number`)}
                className="text-4xl md:text-5xl font-bold mb-2 tracking-tight"
              >
                {s.number}
              </div>
              <div
                data-edit-field={`stat${s.index}Label`}
                data-layout-item="true"
                style={getEditableStyle(fields, `stat${s.index}Label`)}
                className="text-sm opacity-55 uppercase tracking-widest"
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(StatsSection)
