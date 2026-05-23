import { memo } from 'react'
import { getEditableStyle } from '@/lib/field-layout'

interface Props {
  fields: Record<string, string>
}

function TestimonialsSection({ fields }: Props) {
  const testimonials = [
    { quote: fields.quote1, author: fields.author1, role: fields.role1, avatar: fields.avatar1, index: 1 },
    { quote: fields.quote2, author: fields.author2, role: fields.role2, avatar: fields.avatar2, index: 2 },
    { quote: fields.quote3, author: fields.author3, role: fields.role3, avatar: fields.avatar3, index: 3 },
  ].filter((t) => t.quote)

  return (
    <section
      data-edit-field="bgColor"
      style={{ backgroundColor: fields.bgColor }}
      className="px-6 md:px-10 py-20"
    >
      <div className="max-w-5xl mx-auto">
        {fields.title && (
          <h2
            data-edit-field="title"
            data-layout-item="true"
            style={getEditableStyle(fields, 'title')}
            className="text-center text-3xl md:text-4xl font-bold text-slate-900 mb-14"
          >
            {fields.title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-slate-50 rounded-2xl p-7 flex flex-col border border-slate-100"
            >
              <div className="text-amber-400 text-sm mb-4">★★★★★</div>
              <p
                data-edit-field={`quote${t.index}`}
                data-layout-item="true"
                style={getEditableStyle(fields, `quote${t.index}`)}
                className="text-slate-600 text-sm leading-relaxed flex-1"
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                {t.avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    data-edit-field={`avatar${t.index}`}
                    data-layout-item="true"
                    style={getEditableStyle(fields, `avatar${t.index}`, { width: 30 })}
                    src={t.avatar}
                    alt={t.author}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div>
                  <div
                    data-edit-field={`author${t.index}`}
                    data-layout-item="true"
                    style={getEditableStyle(fields, `author${t.index}`)}
                    className="font-semibold text-slate-900 text-sm"
                  >
                    {t.author}
                  </div>
                  <div
                    data-edit-field={`role${t.index}`}
                    data-layout-item="true"
                    style={getEditableStyle(fields, `role${t.index}`)}
                    className="text-xs text-slate-400"
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(TestimonialsSection)
