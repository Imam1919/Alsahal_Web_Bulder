'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, X, Download } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'

export default function PageTabs() {
  const pages = useBuilderStore((s) => s.pages)
  const activePageId = useBuilderStore((s) => s.activePageId)
  const previewMode = useBuilderStore((s) => s.previewMode)
  const previewPageId = useBuilderStore((s) => s.previewPageId)
  const addPage = useBuilderStore((s) => s.addPage)
  const removePage = useBuilderStore((s) => s.removePage)
  const renamePage = useBuilderStore((s) => s.renamePage)
  const setActivePage = useBuilderStore((s) => s.setActivePage)
  const setPreviewPage = useBuilderStore((s) => s.setPreviewPage)
  const getPageExportJSON = useBuilderStore((s) => s.getPageExportJSON)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const currentId = previewMode ? (previewPageId ?? activePageId) : activePageId

  useEffect(() => {
    if (editingId) {
      requestAnimationFrame(() => inputRef.current?.select())
    }
  }, [editingId])

  function handleTabClick(id: string) {
    if (editingId === id) return
    if (previewMode) {
      setPreviewPage(id)
    } else {
      setActivePage(id)
    }
  }

  function startRename(id: string, name: string) {
    if (previewMode) return
    setEditingId(id)
    setEditingName(name)
  }

  function commitRename() {
    if (editingId && editingName.trim()) {
      renamePage(editingId, editingName.trim())
    }
    setEditingId(null)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commitRename()
    if (e.key === 'Escape') setEditingId(null)
  }

  function handleAddPage() {
    addPage('New Page')
  }

  function handleDownloadPage(pageId: string, slug: string, e: React.MouseEvent) {
    e.stopPropagation()
    const json = getPageExportJSON(pageId)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${slug}-config.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-9 flex items-center px-3 bg-slate-900 border-b border-slate-700 gap-0.5 overflow-x-auto flex-shrink-0 scrollbar-none">
      {pages.map((page) => {
        const isActive = page.id === currentId
        const isEditing = editingId === page.id

        return (
          <div
            key={page.id}
            onClick={() => handleTabClick(page.id)}
            onDoubleClick={() => startRename(page.id, page.name)}
            className={`group relative flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer select-none transition-all duration-150 flex-shrink-0 ${
              isActive
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {isEditing ? (
              <input
                ref={inputRef}
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={commitRename}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
                className="bg-transparent outline-none min-w-0 w-20 text-white placeholder-indigo-300"
              />
            ) : (
              <span className="max-w-[120px] truncate">{page.name}</span>
            )}

            {/* Download this page button (active tab only, edit mode) */}
            {isActive && !previewMode && !isEditing && (
              <button
                onClick={(e) => handleDownloadPage(page.id, page.slug, e)}
                title={`Download "${page.name}"`}
                className="opacity-0 group-hover:opacity-70 hover:!opacity-100 ml-0.5 transition-opacity"
              >
                <Download size={10} />
              </button>
            )}

            {/* Delete button (not shown when only 1 page, or in preview) */}
            {pages.length > 1 && !previewMode && !isEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removePage(page.id)
                }}
                title={`Delete "${page.name}"`}
                className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity -mr-0.5"
              >
                <X size={10} />
              </button>
            )}
          </div>
        )
      })}

      {!previewMode && (
        <button
          onClick={handleAddPage}
          title="Add new page"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all duration-150 flex-shrink-0 ml-1"
        >
          <Plus size={12} />
          New Page
        </button>
      )}

      {previewMode && (
        <span className="ml-auto text-[10px] text-slate-600 flex-shrink-0 pr-1 select-none">
          Click a page tab to navigate
        </span>
      )}
    </div>
  )
}
