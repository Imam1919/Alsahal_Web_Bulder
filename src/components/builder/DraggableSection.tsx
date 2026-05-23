'use client'

import { memo, useRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { GripVertical, Trash2 } from 'lucide-react'
import { PageSection } from '@/lib/types'
import { getSectionDef } from '@/lib/section-registry'
import { useBuilderStore } from '@/lib/store'
import { getLayoutNumber, layoutKey } from '@/lib/field-layout'
import SectionRenderer from '@/components/sections/SectionRenderer'

interface Props {
  section: PageSection
}

function DraggableSection({ section }: Props) {
  const isSelected = useBuilderStore((s) => s.selectedId === section.id)
  const selectSection = useBuilderStore((s) => s.selectSection)
  const selectField = useBuilderStore((s) => s.selectField)
  const updateField = useBuilderStore((s) => s.updateField)
  const removeSection = useBuilderStore((s) => s.removeSection)
  const def = getSectionDef(section.type)
  const itemDragRef = useRef<{
    fieldKey: string
    pointerId: number
    startX: number
    startY: number
    initialX: number
    initialY: number
  } | null>(null)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  function startItemDrag(e: React.PointerEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement
    const layoutTarget = target.closest<HTMLElement>('[data-layout-item]')
    const fieldTarget = target.closest<HTMLElement>('[data-edit-field]')
    const fieldKey = fieldTarget?.dataset.editField

    if (!layoutTarget || !fieldKey) return

    e.stopPropagation()
    e.preventDefault()
    selectField(section.id, fieldKey)

    itemDragRef.current = {
      fieldKey,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initialX: getLayoutNumber(section.fields, fieldKey, 'x', 0),
      initialY: getLayoutNumber(section.fields, fieldKey, 'y', 0),
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function moveItem(e: React.PointerEvent<HTMLDivElement>) {
    const drag = itemDragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return

    const nextX = Math.round(drag.initialX + e.clientX - drag.startX)
    const nextY = Math.round(drag.initialY + e.clientY - drag.startY)
    updateField(section.id, layoutKey(drag.fieldKey, 'x'), String(nextX))
    updateField(section.id, layoutKey(drag.fieldKey, 'y'), String(nextY))
  }

  function endItemDrag(e: React.PointerEvent<HTMLDivElement>) {
    const drag = itemDragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return

    itemDragRef.current = null
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: -10, scale: 0.99 }}
      animate={{ opacity: isDragging ? 0.45 : 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, y: -6 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className={`relative mb-3 rounded-xl overflow-hidden ring-2 cursor-pointer group
        transition-shadow duration-150 ${
          isSelected
            ? 'ring-indigo-500 shadow-2xl shadow-indigo-500/15'
            : isDragging
            ? 'ring-slate-300 shadow-2xl'
            : 'ring-slate-200 hover:ring-indigo-300 hover:shadow-md shadow-sm'
        }`}
      onClick={(e) => {
        e.stopPropagation()
        const fieldTarget = (e.target as HTMLElement).closest<HTMLElement>('[data-edit-field]')
        const fieldKey = fieldTarget?.dataset.editField

        if (fieldKey) {
          selectField(section.id, fieldKey)
          return
        }

        selectSection(section.id)
      }}
      onPointerDown={startItemDrag}
      onPointerMove={moveItem}
      onPointerUp={endItemDrag}
      onPointerCancel={endItemDrag}
    >
      {/* Control bar — always rendered, visibility via opacity */}
      <div
        className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between
          px-3 py-2 transition-all duration-150 pointer-events-none ${
            isSelected
              ? 'opacity-100 bg-indigo-600 pointer-events-auto'
              : 'opacity-0 group-hover:opacity-100 bg-slate-900/85 backdrop-blur-sm group-hover:pointer-events-auto'
          }`}
      >
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="p-0.5 rounded cursor-grab active:cursor-grabbing hover:bg-white/20
              transition-colors touch-none"
            onClick={(e) => e.stopPropagation()}
            title="Drag to reorder"
          >
            <GripVertical size={14} className="text-white/80" />
          </button>
          <span className="text-xs font-medium text-white/90">{def?.label}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            removeSection(section.id)
          }}
          className="p-1 rounded hover:bg-red-500/30 transition-colors"
          title="Delete section"
        >
          <Trash2 size={13} className="text-white/60 hover:text-red-200" />
        </button>
      </div>

      <SectionRenderer section={section} />
    </motion.div>
  )
}

export default memo(DraggableSection)
