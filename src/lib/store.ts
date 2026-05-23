'use client'

import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { Page, PageSection, ProjectConfig, SectionType } from './types'
import { getSectionDef } from './section-registry'

function uid(): string {
  return crypto.randomUUID()
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function makePage(name: string): Page {
  return { id: uid(), name, slug: slugify(name), sections: [] }
}

interface BuilderStore {
  pages: Page[]
  activePageId: string
  selectedId: string | null
  activeFieldKey: string | null
  previewMode: boolean
  previewDevice: 'desktop' | 'phone'
  previewPageId: string | null

  // Page management
  addPage: (name: string) => void
  removePage: (id: string) => void
  renamePage: (id: string, name: string) => void
  setActivePage: (id: string) => void
  setPreviewPage: (id: string) => void

  // Section management (scoped to active page)
  addSection: (type: SectionType) => void
  removeSection: (id: string) => void
  reorderSections: (next: PageSection[]) => void
  updateField: (id: string, key: string, value: string) => void
  selectSection: (id: string | null) => void
  selectField: (id: string, key: string) => void
  setPreviewMode: (on: boolean) => void
  setPreviewDevice: (device: 'desktop' | 'phone') => void
  importProject: (config: ProjectConfig | { version: string; sections: PageSection[] }) => void
  getExportJSON: () => string
  getPageExportJSON: (pageId: string) => string
}

const initialPage = makePage('Home')

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  pages: [initialPage],
  activePageId: initialPage.id,
  selectedId: null,
  activeFieldKey: null,
  previewMode: false,
  previewDevice: 'desktop',
  previewPageId: null,

  addPage(name) {
    const page = makePage(name)
    set((s) => ({ pages: [...s.pages, page] }))
  },

  removePage(id) {
    set((s) => {
      if (s.pages.length <= 1) return {}
      const pages = s.pages.filter((p) => p.id !== id)
      const activePageId = s.activePageId === id ? pages[0].id : s.activePageId
      return { pages, activePageId, selectedId: null, activeFieldKey: null }
    })
  },

  renamePage(id, name) {
    set((s) => ({
      pages: s.pages.map((p) =>
        p.id === id ? { ...p, name, slug: slugify(name) } : p
      ),
    }))
  },

  setActivePage(id) {
    set({ activePageId: id, selectedId: null, activeFieldKey: null })
  },

  setPreviewPage(id) {
    set({ previewPageId: id })
  },

  addSection(type) {
    const def = getSectionDef(type)
    if (!def) return
    const section: PageSection = { id: uid(), type, fields: { ...def.defaults } }
    set((s) => ({
      pages: s.pages.map((p) =>
        p.id === s.activePageId
          ? { ...p, sections: [...p.sections, section] }
          : p
      ),
      selectedId: section.id,
      activeFieldKey: null,
    }))
  },

  removeSection(id) {
    set((s) => ({
      pages: s.pages.map((p) =>
        p.id === s.activePageId
          ? { ...p, sections: p.sections.filter((sec) => sec.id !== id) }
          : p
      ),
      selectedId: s.selectedId === id ? null : s.selectedId,
      activeFieldKey: s.selectedId === id ? null : s.activeFieldKey,
    }))
  },

  reorderSections(next) {
    set((s) => ({
      pages: s.pages.map((p) =>
        p.id === s.activePageId ? { ...p, sections: next } : p
      ),
    }))
  },

  updateField(id, key, value) {
    set((s) => ({
      pages: s.pages.map((p) =>
        p.id === s.activePageId
          ? {
              ...p,
              sections: p.sections.map((sec) =>
                sec.id === id ? { ...sec, fields: { ...sec.fields, [key]: value } } : sec
              ),
            }
          : p
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
    set((s) => ({
      previewMode: on,
      previewPageId: on ? s.activePageId : null,
      selectedId: null,
      activeFieldKey: null,
    }))
  },

  setPreviewDevice(device) {
    set({ previewDevice: device })
  },

  importProject(config) {
    let pages: Page[]
    if ('pages' in config && Array.isArray(config.pages) && config.pages.length > 0) {
      pages = config.pages
    } else if ('sections' in config && Array.isArray(config.sections) && config.sections.length > 0) {
      // Backward compat: old single-page format
      const home = makePage('Home')
      home.sections = config.sections
      pages = [home]
    } else {
      pages = [makePage('Home')]
    }
    set({
      pages,
      activePageId: pages[0].id,
      selectedId: null,
      activeFieldKey: null,
      previewMode: false,
      previewDevice: 'desktop',
      previewPageId: null,
    })
  },

  getExportJSON() {
    return JSON.stringify({ version: '2.0', pages: get().pages }, null, 2)
  },

  getPageExportJSON(pageId) {
    const page = get().pages.find((p) => p.id === pageId)
    if (!page) return '{}'
    return JSON.stringify({ version: '2.0', pages: [page] }, null, 2)
  },
}))

export { useShallow }
