'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react'
import { useBuilderStore } from '@/lib/store'
import Toolbar from './Toolbar'
import SectionLibrary from './SectionLibrary'
import Canvas from './Canvas'
import SectionEditor from './SectionEditor'

const SIDEBAR_W = 260
const EDITOR_W = 300

export default function BuilderClient() {
  const previewMode = useBuilderStore((s) => s.previewMode)
  // Default library open only on wider screens — set after mount to avoid SSR mismatch
  const [libOpen, setLibOpen] = useState(true)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setLibOpen(window.innerWidth >= 1024)
    })
    const onResize = () => {
      if (window.innerWidth < 768) setLibOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      {/* Top toolbar */}
      <Toolbar />

      {/* Main layout */}
      <div className="flex flex-1 min-h-0 relative">
        {/* ── Left: Section Library ─────────────────────────────── */}
        <AnimatePresence initial={false}>
          {!previewMode && libOpen && (
            <motion.aside
              key="library"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: SIDEBAR_W, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="flex-shrink-0 overflow-hidden border-r border-slate-800"
              style={{ width: SIDEBAR_W }}
            >
              <SectionLibrary />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Center: Canvas ────────────────────────────────────── */}
        <div className="relative flex-1 min-w-0 flex flex-col">
          {/* Library toggle (hidden in preview) */}
          <AnimatePresence>
            {!previewMode && (
              <motion.button
                key="lib-toggle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLibOpen((v) => !v)}
                title={libOpen ? 'Collapse library' : 'Expand library'}
                className="absolute top-3 left-3 z-10 w-7 h-7 rounded-lg bg-white border border-slate-200
                  shadow-sm flex items-center justify-center text-slate-500 hover:text-indigo-600
                  hover:border-indigo-300 transition-all duration-150"
              >
                {libOpen ? <PanelLeftClose size={14} /> : <PanelLeftOpen size={14} />}
              </motion.button>
            )}
          </AnimatePresence>

          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-100">
            <Canvas />
          </main>
        </div>

        {/* ── Right: Section Editor ─────────────────────────────── */}
        <AnimatePresence initial={false}>
          {!previewMode && (
            <motion.aside
              key="editor"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: EDITOR_W, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="flex-shrink-0 overflow-hidden border-l border-slate-800"
              style={{ width: EDITOR_W }}
            >
              <SectionEditor />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
