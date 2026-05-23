import { memo } from 'react'
import { getEditableStyle } from '@/lib/field-layout'

interface Props {
  fields: Record<string, string>
}

function GallerySection({ fields }: Props) {
  const images = [
    { src: fields.image1, key: 'image1' },
    { src: fields.image2, key: 'image2' },
    { src: fields.image3, key: 'image3' },
    { src: fields.image4, key: 'image4' },
    { src: fields.image5, key: 'image5' },
    { src: fields.image6, key: 'image6' },
  ].filter((image) => image.src)

  return (
    <section
      data-edit-field="bgColor"
      style={{ backgroundColor: fields.bgColor }}
      className="px-6 md:px-10 py-20"
    >
      <div className="max-w-5xl mx-auto">
        {(fields.title || fields.subtitle) && (
          <div className="text-center mb-12">
            {fields.title && (
              <h2
                data-edit-field="title"
                data-layout-item="true"
                style={getEditableStyle(fields, 'title')}
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-2"
              >
                {fields.title}
              </h2>
            )}
            {fields.subtitle && (
              <p
                data-edit-field="subtitle"
                data-layout-item="true"
                style={getEditableStyle(fields, 'subtitle')}
                className="text-slate-500 mt-2"
              >
                {fields.subtitle}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, i) => (
            <div
              key={i}
              data-edit-field={image.key}
              data-layout-item="true"
              style={getEditableStyle(fields, image.key, { height: 0 })}
              className="aspect-video rounded-xl overflow-hidden bg-slate-200 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-edit-field={image.key}
                src={image.src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(GallerySection)
