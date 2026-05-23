'use client'

import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { PageSection, SectionType } from './types'
import { getSectionDef } from './section-registry'

function uid(): string {
  return crypto.randomUUID()
}

interface BuilderStore {
  sections: PageSection[]
  selectedId: string | null
  activeFieldKey: string | null
  previewMode: boolean
  previewDevice: 'desktop' | 'phone'

  addSection: (type: SectionType) => void
  removeSection: (id: string) => void
  reorderSections: (next: PageSection[]) => void
  updateField: (id: string, key: string, value: string) => void
  selectSection: (id: string | null) => void
  selectField: (id: string, key: string) => void
  setPreviewMode: (on: boolean) => void
  setPreviewDevice: (device: 'desktop' | 'phone') => void
  importSections: (sections: PageSection[]) => void
  getExportJSON: () => string
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  sections: [],
  selectedId: null,
  activeFieldKey: null,
  previewMode: false,
  previewDevice: 'desktop',

  addSection(type) {
    const def = getSectionDef(type)
    if (!def) return
    const section: PageSection = { id: uid(), type, fields: { ...def.defaults } }
    set((s) => ({
      sections: [...s.sections, section],
      selectedId: section.id,
      activeFieldKey: null,
    }))
  },

  removeSection(id) {
    set((s) => ({
      sections: s.sections.filter((sec) => sec.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
      activeFieldKey: s.selectedId === id ? null : s.activeFieldKey,
    }))
  },

  reorderSections(next) {
    set({ sections: next })
  },

  updateField(id, key, value) {
    set((s) => ({
      sections: s.sections.map((sec) =>
        sec.id === id ? { ...sec, fields: { ...sec.fields, [key]: value } } : sec
      ),
    }))
  },

  selectSection(id) {
    set({ selectedId: id, activeFieldKey: null })
  },

  selectField(id, key) {
    set({ selectedId: id, activeFieldKey: key })
  },

  setPreviewMode(on) {
    set({ previewMode: on, selectedId: null, activeFieldKey: null })
  },

  setPreviewDevice(device) {
    set({ previewDevice: device })
  },

  importSections(sections) {
    set({
      sections,
      selectedId: null,
      activeFieldKey: null,
      previewMode: false,
      previewDevice: 'desktop',
    })
  },

  getExportJSON() {
    return JSON.stringify({ version: '1.0', sections: get().sections }, null, 2)
  },
}))

export { useShallow }
