'use client'

import { FormEvent, memo, useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import { getEditableStyle } from '@/lib/field-layout'

interface Props {
  fields: Record<string, string>
}

function ContactSection({ fields }: Props) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      data-edit-field="bgColor"
      style={{ backgroundColor: fields.bgColor, color: fields.textColor }}
      className="px-6 md:px-10 py-20"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
        <div>
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
              className="text-base md:text-lg leading-relaxed opacity-70 mb-8"
            >
              {fields.subtitle}
            </p>
          )}

          <div className="space-y-3 text-sm">
            {fields.contactEmail && (
              <a
                data-edit-field="contactEmail"
                data-layout-item="true"
                style={getEditableStyle(fields, 'contactEmail')}
                href={`mailto:${fields.contactEmail}`}
                className="flex items-center gap-3 opacity-75 hover:opacity-100 transition-opacity"
              >
                <Mail size={17} />
                <span>{fields.contactEmail}</span>
              </a>
            )}
            {fields.contactPhone && (
              <a
                data-edit-field="contactPhone"
                data-layout-item="true"
                style={getEditableStyle(fields, 'contactPhone')}
                href={`tel:${fields.contactPhone}`}
                className="flex items-center gap-3 opacity-75 hover:opacity-100 transition-opacity"
              >
                <Phone size={17} />
                <span>{fields.contactPhone}</span>
              </a>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ backgroundColor: fields.cardBgColor }}
          className="rounded-2xl border border-black/5 shadow-xl shadow-slate-900/5 p-5 md:p-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="contact-name"
              label={fields.nameLabel || 'Full Name'}
              fieldKey="nameLabel"
              fields={fields}
              autoComplete="name"
              placeholder="Jane Smith"
              required
            />
            <FormField
              id="contact-phone"
              label={fields.phoneLabel || 'Phone Number'}
              fieldKey="phoneLabel"
              fields={fields}
              type="tel"
              autoComplete="tel"
              placeholder="+966 53 148 4519"
            />
          </div>

          <FormField
            id="contact-email"
            label={fields.emailLabel || 'Email Address'}
            fieldKey="emailLabel"
            fields={fields}
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            required
          />

          <label className="block">
            <span
              data-edit-field="messageLabel"
              data-layout-item="true"
              style={getEditableStyle(fields, 'messageLabel')}
              className="block text-xs font-semibold uppercase tracking-wide opacity-60 mb-1.5"
            >
              {fields.messageLabel || 'Message'}
            </span>
            <textarea
              rows={5}
              required
              placeholder="Tell us how we can help..."
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-shadow focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </label>

          <button
            type="submit"
            data-edit-field="buttonText"
            data-layout-item="true"
            style={{
              ...getEditableStyle(fields, 'buttonText'),
              backgroundColor: fields.buttonBg,
              color: fields.buttonTextColor,
            }}
            className="w-full rounded-xl px-4 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            {fields.buttonText || 'Send Message'}
          </button>

          {submitted && (
            <p
              data-edit-field="successMessage"
              data-layout-item="true"
              style={getEditableStyle(fields, 'successMessage')}
              className="text-sm font-medium text-emerald-600"
            >
              {fields.successMessage || 'Thank you. Your message has been received.'}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function FormField({
  id,
  label,
  fieldKey,
  fields,
  type = 'text',
  autoComplete,
  placeholder,
  required = false,
}: {
  id: string
  label: string
  fieldKey: string
  fields: Record<string, string>
  type?: string
  autoComplete?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <label htmlFor={id} className="block">
      <span
        data-edit-field={fieldKey}
        data-layout-item="true"
        style={getEditableStyle(fields, fieldKey)}
        className="block text-xs font-semibold uppercase tracking-wide opacity-60 mb-1.5"
      >
        {label}
      </span>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-shadow focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  )
}

export default memo(ContactSection)
