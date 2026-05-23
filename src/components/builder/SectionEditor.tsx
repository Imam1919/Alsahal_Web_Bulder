'use client'

import { memo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PenLine, Plus, Trash2 } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import { getSectionDef } from '@/lib/section-registry'
import { SectionField } from '@/lib/types'
import { getLayoutNumber, layoutKey } from '@/lib/field-layout'

export default function SectionEditor() {
  const updateField = useBuilderStore((s) => s.updateField)
  const activeFieldKey = useBuilderStore((s) => s.activeFieldKey)
  // Targeted selector: only re-renders when the selected section's data changes
  const section = useBuilderStore((s) => {
    if (!s.selectedId) return undefined
    const page = s.pages.find((p) => p.id === s.activePageId)
    return page?.sections.find((sec) => sec.id === s.selectedId)
  })
  const def = section ? getSectionDef(section.type) : null

  return (
    <div className="h-full bg-white flex flex-col border-l border-slate-100">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 flex-shrink-0">
        <PenLine size={13} className="text-slate-400" />
        <h2 className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.15em]">
          {def ? `Edit: ${def.label}` : 'Properties'}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {section && def ? (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex-1 overflow-y-auto"
          >
            <div className="p-4 space-y-4">
              {activeFieldKey && (
                <ItemLayoutControl
                  fields={section.fields}
                  fieldKey={activeFieldKey}
                  onChange={(prop, value) =>
                    updateField(section.id, layoutKey(activeFieldKey, prop), String(value))
                  }
                />
              )}

              <ScrollEffectControl
                fields={section.fields}
                onChange={(key, value) => updateField(section.id, key, value)}
              />

              {def.fields.map((field: SectionField) => (
                section.type === 'header' && field.key === 'navLinks' ? (
                  <NavLinksControl
                    key={field.key}
                    names={section.fields.navLinks ?? ''}
                    urls={section.fields.navUrls ?? ''}
                    isActive={activeFieldKey === 'navLinks' || activeFieldKey === 'navUrls'}
                    onChange={(names, urls) => {
                      updateField(section.id, 'navLinks', names)
                      updateField(section.id, 'navUrls', urls)
                    }}
                  />
                ) : section.type === 'header' && field.key === 'navUrls' ? null : (
                <FieldControl
                  key={field.key}
                  field={field}
                  value={section.fields[field.key] ?? ''}
                  isActive={activeFieldKey === field.key}
                  onChange={(val) => updateField(section.id, field.key, val)}
                />
                )
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
              <PenLine size={22} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-400">Nothing selected</p>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-[160px]">
              Click any section on the canvas to edit its content
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SCROLL_EFFECTS = [
  { value: 'none', label: 'None' },
  { value: 'fade-up', label: 'Fade Up' },
  { value: 'fade-down', label: 'Fade Down' },
  { value: 'fade-left', label: 'Fade Left' },
  { value: 'fade-right', label: 'Fade Right' },
  { value: 'zoom-in', label: 'Zoom In' },
  { value: 'blur-in', label: 'Blur In' },
  { value: 'flip-up', label: 'Flip Up' },
]

function ScrollEffectControl({
  fields,
  onChange,
}: {
  fields: Record<string, string>
  onChange: (key: string, value: string) => void
}) {
  const effect = fields._scrollEffect ?? 'none'
  const duration = Math.min(Math.max(Number(fields._scrollDuration || 0.55), 0.15), 2)
  const delay = Math.min(Math.max(Number(fields._scrollDelay || 0), 0), 1.5)
  const replay = fields._scrollReplay === 'true'

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-3">
      <div>
        <p className="text-xs font-semibold text-slate-600">Scroll Effect</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Animation when this section enters view</p>
      </div>

      <label className="block">
        <span className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
          Effect
        </span>
        <select
          value={effect}
          onChange={(e) => onChange('_scrollEffect', e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          {SCROLL_EFFECTS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <SliderRow
        label="Duration"
        value={duration}
        min={0.15}
        max={2}
        step={0.05}
        suffix="s"
        onChange={(v) => onChange('_scrollDuration', String(v))}
      />
      <SliderRow
        label="Delay"
        value={delay}
        min={0}
        max={1.5}
        step={0.05}
        suffix="s"
        onChange={(v) => onChange('_scrollDelay', String(v))}
      />

      <label className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500">
        <input
          type="checkbox"
          checked={replay}
          onChange={(e) => onChange('_scrollReplay', String(e.target.checked))}
          className="accent-indigo-600"
        />
        Replay when scrolling back
      </label>
    </div>
  )
}

function ItemLayoutControl({
  fields,
  fieldKey,
  onChange,
}: {
  fields: Record<string, string>
  fieldKey: string
  onChange: (prop: 'x' | 'y' | 'width' | 'height', value: number) => void
}) {
  const x = getLayoutNumber(fields, fieldKey, 'x', 0)
  const y = getLayoutNumber(fields, fieldKey, 'y', 0)
  const width = getLayoutNumber(fields, fieldKey, 'width', 100)
  const height = getLayoutNumber(fields, fieldKey, 'height', 0)

  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3 ring-1 ring-indigo-100 space-y-3">
      <div>
        <p className="text-xs font-semibold text-indigo-700">Selected Item Layout</p>
        <p className="text-[11px] text-indigo-400 mt-0.5">{fieldKey}</p>
      </div>

      <SliderRow label="Move Right / Left" value={x} min={-240} max={240} onChange={(v) => onChange('x', v)} />
      <SliderRow label="Move Down / Up" value={y} min={-160} max={240} onChange={(v) => onChange('y', v)} />
      <SliderRow label="Width" value={width} min={10} max={100} suffix="%" onChange={(v) => onChange('width', v)} />
      <SliderRow label="Min Height" value={height} min={0} max={500} onChange={(v) => onChange('height', v)} />

      <button
        type="button"
        onClick={() => {
          onChange('x', 0)
          onChange('y', 0)
          onChange('width', 100)
          onChange('height', 0)
        }}
        className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-100 transition-colors"
      >
        Reset Layout
      </button>
    </div>
  )
}

function SliderRow({
  label,
  value,
  min,
  max,
  suffix = 'px',
  step = 1,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  suffix?: string
  step?: number
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          {value}{suffix}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </label>
  )
}

interface NavLinkItem {
  name: string
  url: string
}

function parseNavLinks(names: string, urls: string): NavLinkItem[] {
  const nameList = names.split(',').map((name) => name.trim())
  const urlList = urls.split(',').map((url) => url.trim())
  const count = Math.max(nameList.length, urlList.length, 1)

  return Array.from({ length: count }, (_, index) => ({
    name: nameList[index] ?? '',
    url: urlList[index] ?? '',
  }))
}

function serializeNavLinks(items: NavLinkItem[]) {
  return {
    names: items.map((item) => item.name).join(','),
    urls: items.map((item) => item.url).join(','),
  }
}

function NavLinksControl({
  names,
  urls,
  isActive,
  onChange,
}: {
  names: string
  urls: string
  isActive: boolean
  onChange: (names: string, urls: string) => void
}) {
  const items = parseNavLinks(names, urls)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive) return
    ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [isActive])

  function updateItems(next: NavLinkItem[]) {
    const serialized = serializeNavLinks(next)
    onChange(serialized.names, serialized.urls)
  }

  function updateItem(index: number, key: keyof NavLinkItem, value: string) {
    updateItems(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    )
  }

  function addItem() {
    updateItems([...items, { name: 'New Link', url: '#' }])
  }

  function removeItem(index: number) {
    updateItems(items.filter((_, itemIndex) => itemIndex !== index))
  }

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ' +
    'transition-shadow placeholder:text-slate-300'

  return (
    <div
      ref={ref}
      className={`space-y-3 rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-indigo-50/70 p-3 ring-2 ring-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.12),0_10px_30px_rgba(99,102,241,0.18)]'
          : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
          Nav Links
        </label>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition-colors"
        >
          <Plus size={13} />
          Add Nav Link
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 bg-white p-3 space-y-3"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-slate-500">
                Nav Link {index + 1}
              </p>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-1 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Remove nav link"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Nav Link Name
              </label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                Nav Link Link
              </label>
              <input
                type="url"
                value={item.url}
                onChange={(e) => updateItem(index, 'url', e.target.value)}
                className={inputClass}
                placeholder="https://"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface FieldControlProps {
  field: SectionField
  value: string
  isActive: boolean
  onChange: (v: string) => void
}

const FieldControl = memo(function FieldControl({
  field,
  value,
  isActive,
  onChange,
}: FieldControlProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const base =
    'w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ' +
    'transition-shadow placeholder:text-slate-300'

  useEffect(() => {
    if (!isActive) return
    ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [isActive])

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onChange(event.target.result)
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div
      ref={ref}
      className={`rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-indigo-50/70 p-3 ring-2 ring-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.12),0_10px_30px_rgba(99,102,241,0.18)]'
          : ''
      }`}
    >
      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
        {field.label}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${base} resize-none leading-relaxed`}
        />
      ) : field.type === 'color' ? (
        <div className="flex items-center gap-2">
          <div className="relative flex-shrink-0">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white"
            />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${base} flex-1 font-mono text-xs`}
            placeholder="#000000"
          />
        </div>
      ) : field.type === 'checkbox' ? (
        <label className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="text-sm font-medium text-slate-600">
            {value === 'true' ? 'Enabled' : 'Disabled'}
          </span>
          <input
            type="checkbox"
            checked={value === 'true'}
            onChange={(e) => onChange(String(e.target.checked))}
            className="h-4 w-4 accent-indigo-600"
          />
        </label>
      ) : field.type === 'url' ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={base}
            placeholder="https://"
          />
          {field.key.toLowerCase().includes('image') && (
            <>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              >
                Upload Image
              </button>
            </>
          )}
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
    </div>
  )
})
