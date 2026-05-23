import type { CSSProperties } from 'react'

export const layoutKey = (fieldKey: string, prop: 'x' | 'y' | 'width' | 'height') =>
  `_layout_${fieldKey}_${prop}`

export function getLayoutNumber(
  fields: Record<string, string>,
  fieldKey: string,
  prop: 'x' | 'y' | 'width' | 'height',
  fallback: number
) {
  const value = Number(fields[layoutKey(fieldKey, prop)])
  return Number.isFinite(value) ? value : fallback
}

export function getEditableStyle(
  fields: Record<string, string>,
  fieldKey: string,
  defaults: { width?: number; height?: number } = {}
): CSSProperties {
  const x = getLayoutNumber(fields, fieldKey, 'x', 0)
  const y = getLayoutNumber(fields, fieldKey, 'y', 0)
  const width = getLayoutNumber(fields, fieldKey, 'width', defaults.width ?? 100)
  const height = getLayoutNumber(fields, fieldKey, 'height', defaults.height ?? 0)

  return {
    '--layout-x': `${x}px`,
    '--layout-y': `${y}px`,
    width: `${width}%`,
    maxWidth: '100%',
    ...(height > 0 ? { minHeight: `${height}px` } : {}),
  } as CSSProperties
}
