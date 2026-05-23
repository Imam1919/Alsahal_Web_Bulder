import { memo } from 'react'
import { getEditableStyle } from '@/lib/field-layout'

interface Props {
  fields: Record<string, string>
}

const DEFAULT_ICONS = ['⚡', '🔒', '📈']

function FeaturesSection({ fields }: Props) {
  const features = [
    {
      title: fields.feature1Title,
      desc: fields.feature1Desc,
      icon: fields.feature1Icon || DEFAULT_ICONS[0],
    },
    {
      title: fields.feature2Title,
      desc: fields.feature2Desc,
      icon: fields.feature2Icon || DEFAULT_ICONS[1],
    },
    {
      title: fields.feature3Title,
      desc: fields.feature3Desc,
      icon: fields.feature3Icon || DEFAULT_ICONS[2],
    },
  ]

  return (
    <section
      data-edit-field="bgColor"
      style={{ backgroundColor: fields.bgColor }}
      className="px-6 md:px-10 py-20"
    >
      <div className="max-w-5xl mx-auto">
        {(fields.title || fields.subtitle) && (
          <div className="text-center mb-14">
            {fields.title && (
              <h2
                data-edit-field="title"
                data-layout-item="true"
                style={getEditableStyle(fields, 'title')}
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
              >
                {fields.title}
              </h2>
            )}
            {fields.subtitle && (
              <p
                data-edit-field="subtitle"
                data-layout-item="true"
                style={getEditableStyle(fields, 'subtitle', { width: 80 })}
                className="text-slate-500 text-lg max-w-xl mx-auto"
              >
                {fields.subtitle}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="text-center group">
              <div
                data-edit-field={`feature${i + 1}Icon`}
                data-layout-item="true"
                style={getEditableStyle(fields, `feature${i + 1}Icon`)}
                className="text-5xl mb-5 transition-transform duration-300 group-hover:scale-110"
              >
                {f.icon}
              </div>
              <h3
                data-edit-field={`feature${i + 1}Title`}
                data-layout-item="true"
                style={getEditableStyle(fields, `feature${i + 1}Title`)}
                className="text-lg font-semibold text-slate-900 mb-3"
              >
                {f.title}
              </h3>
              <p
                data-edit-field={`feature${i + 1}Desc`}
                data-layout-item="true"
                style={getEditableStyle(fields, `feature${i + 1}Desc`)}
                className="text-slate-500 text-sm leading-relaxed"
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(FeaturesSection)
