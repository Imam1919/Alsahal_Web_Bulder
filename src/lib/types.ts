export type SectionType =
  | 'header'
  | 'hero'
  | 'features'
  | 'stats'
  | 'testimonials'
  | 'gallery'
  | 'contact'
  | 'map'
  | 'cta'
  | 'footer'

export interface SectionField {
  key: string
  label: string
  type: 'text' | 'url' | 'color' | 'textarea' | 'checkbox'
}

export interface SectionDefinition {
  type: SectionType
  label: string
  description: string
  fields: SectionField[]
  defaults: Record<string, string>
}

export interface PageSection {
  id: string
  type: SectionType
  fields: Record<string, string>
}

export interface PageConfig {
  version: string
  sections: PageSection[]
}

export interface Page {
  id: string
  name: string
  slug: string
  sections: PageSection[]
}

export interface ProjectConfig {
  version: string
  pages: Page[]
}
