'use client'

import { useState } from 'react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCenter,
  DragOverlay,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { AnimatePresence, motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { useBuilderStore, useShallow } from '@/lib/store'
import DraggableSection from './DraggableSection'
import SectionRenderer from '@/components/sections/SectionRenderer'

export default function Canvas() {
  const sections = useBuilderStore(useShallow((s) => s.sections))
  const previewMode = useBuilderStore((s) => s.previewMode)
  const previewDevice = useBuilderStore((s) => s.previewDevice)
  const reorderSections = useBuilderStore((s) => s.reorderSections)
  const selectSection = useBuilderStore((s) => s.selectSection)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (over && active.id !== over.id) {
      const oldIdx = sections.findIndex((s) => s.id === active.id)
      const newIdx = sections.findIndex((s) => s.id === over.id)
      reorderSections(arrayMove(sections, oldIdx, newIdx))
    }
  }

  const activeSection = activeId ? sections.find((s) => s.id === activeId) : null

  /* ── Empty state ─────────────────────────────────────────────── */
  if (sections.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center px-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center mb-5 mx-auto">
            <Layers size={26} className="text-slate-400" />
          </div>
          <p className="text-base font-semibold text-slate-500 mb-2">Your page is empty</p>
          <p className="text-sm text-slate-400 leading-relaxed">
            {previewMode
              ? 'Exit preview mode to add sections'
              : 'Click a section in the library to add it'}
          </p>
        </motion.div>
      </div>
    )
  }

  /* ── Preview mode ────────────────────────────────────────────── */
  if (previewMode) {
    const page = (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="min-h-full bg-white"
      >
        {sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </motion.div>
    )

    if (previewDevice === 'phone') {
      return (
        <div className="min-h-full bg-slate-200 py-6 px-3 flex justify-center">
          <div className="w-full max-w-[390px] min-h-[844px] bg-white rounded-[28px] overflow-y-auto overflow-x-hidden shadow-2xl ring-8 ring-slate-900">
            {page}
          </div>
        </div>
      )
    }

    return (
      page
    )
  }

  /* ── Edit mode with DnD ──────────────────────────────────────── */
  return (
    <div
      className="min-h-full py-4 px-4"
      style={{
        backgroundImage:
          'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      onClick={() => selectSection(null)}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => setActiveId(active.id as string)}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence mode="popLayout">
            {sections.map((section) => (
              <DraggableSection key={section.id} section={section} />
            ))}
          </AnimatePresence>
        </SortableContext>

        <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
          {activeSection && (
            <div className="rounded-xl overflow-hidden ring-2 ring-indigo-500 shadow-2xl shadow-indigo-500/20 opacity-95 rotate-[0.3deg]">
              <SectionRenderer section={activeSection} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
