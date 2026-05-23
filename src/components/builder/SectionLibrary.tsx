'use client'

import { motion } from 'framer-motion'
import {
  LayoutTemplate,
  Monitor,
  LayoutGrid,
  BarChart3,
  MessageSquare,
  Mail,
  MapPinned,
  ImageIcon,
  Zap,
  AlignJustify,
  Plus,
} from 'lucide-react'
import { SECTION_DEFINITIONS } from '@/lib/section-registry'
import { useBuilderStore } from '@/lib/store'
import { SectionType } from '@/lib/types'

const ICONS: Record<SectionType, React.ReactNode> = {
  header:       <LayoutTemplate size={15} />,
  hero:         <Monitor size={15} />,
  features:     <LayoutGrid size={15} />,
  stats:        <BarChart3 size={15} />,
  testimonials: <MessageSquare size={15} />,
  gallery:      <ImageIcon size={15} />,
  contact:      <Mail size={15} />,
  map:          <MapPinned size={15} />,
  cta:          <Zap size={15} />,
  footer:       <AlignJustify size={15} />,
}

export default function SectionLibrary() {
  const addSection = useBuilderStore((s) => s.addSection)

  return (
    <div className="h-full bg-slate-900 flex flex-col select-none">
      <div className="px-4 py-3 border-b border-slate-800/80">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.15em]">
          Sections
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 space-y-1">
        {SECTION_DEFINITIONS.map((def, i) => (
          <motion.button
            key={def.type}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.045, duration: 0.25 }}
            onClick={() => addSection(def.type as SectionType)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
              hover:bg-slate-800 active:bg-slate-700/80 transition-all duration-150 group"
          >
            {/* Icon badge */}
            <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-indigo-600/20
              flex items-center justify-center text-slate-400 group-hover:text-indigo-400
              transition-all duration-200 flex-shrink-0 border border-slate-700 group-hover:border-indigo-500/30">
              {ICONS[def.type as SectionType]}
            </div>

            {/* Label */}
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors leading-tight">
                {def.label}
              </div>
              <div className="text-[11px] text-slate-600 group-hover:text-slate-400 truncate transition-colors mt-0.5">
                {def.description}
              </div>
            </div>

            {/* Add icon */}
            <Plus
              size={13}
              className="text-slate-700 group-hover:text-indigo-400 transition-colors flex-shrink-0"
            />
          </motion.button>
        ))}
      </div>

      <div className="p-3 border-t border-slate-800/80">
        <p className="text-[10px] text-slate-600 text-center">
          Click to add to canvas
        </p>
      </div>
    </div>
  )
}
