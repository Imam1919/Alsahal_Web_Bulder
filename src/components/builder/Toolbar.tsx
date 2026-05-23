'use client'

import { useRef } from 'react'
import { Eye, EyeOff, Download, Upload, Layers, Monitor, Smartphone } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import { PageSection } from '@/lib/types'

export default function Toolbar() {
  const previewMode = useBuilderStore((s) => s.previewMode)
  const previewDevice = useBuilderStore((s) => s.previewDevice)
  const setPreviewMode = useBuilderStore((s) => s.setPreviewMode)
  const setPreviewDevice = useBuilderStore((s) => s.setPreviewDevice)
  const importSections = useBuilderStore((s) => s.importSections)
  const getExportJSON = useBuilderStore((s) => s.getExportJSON)
  const sectionCount = useBuilderStore((s) => s.sections.length)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleExport() {
    const json = getExportJSON()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'page-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string)
        const sections: PageSection[] = Array.isArray(parsed)
          ? parsed
          : parsed?.sections ?? []
        if (sections.length > 0) importSections(sections)
      } catch {
        // silently ignore malformed JSON
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <header className="h-14 flex items-center justify-between px-5 bg-slate-900 border-b border-slate-800 flex-shrink-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
          <Layers size={14} className="text-white" />
        </div>
        <span className="text-white font-semibold text-sm tracking-tight select-none">
          WebBuilder
        </span>
        {!previewMode && sectionCount > 0 && (
          <span className="ml-1 px-1.5 py-0.5 rounded-full bg-indigo-600/30 text-indigo-300 text-[10px] font-medium">
            {sectionCount} {sectionCount === 1 ? 'section' : 'sections'}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />

        <ToolbarBtn icon={<Upload size={14} />} label="Import" onClick={() => fileRef.current?.click()} />
        <ToolbarBtn icon={<Download size={14} />} label="Export" onClick={handleExport} />

        <div className="w-px h-5 bg-slate-700 mx-1" />

        {previewMode && (
          <div className="flex items-center rounded-lg bg-slate-800 p-0.5">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                previewDevice === 'desktop'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor size={13} />
              Desktop
            </button>
            <button
              onClick={() => setPreviewDevice('phone')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                previewDevice === 'phone'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone size={13} />
              Phone Preview
            </button>
          </div>
        )}

        <button
          onClick={() => setPreviewMode(!previewMode)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
            previewMode
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          {previewMode ? <EyeOff size={14} /> : <Eye size={14} />}
          {previewMode ? 'Exit Preview' : 'Preview'}
        </button>
      </div>
    </header>
  )
}

function ToolbarBtn({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-150"
    >
      {icon}
      {label}
    </button>
  )
}
