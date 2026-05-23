'use client'

import { memo } from 'react'
import type { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'
import { PageSection } from '@/lib/types'
import HeaderSection from './HeaderSection'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import StatsSection from './StatsSection'
import TestimonialsSection from './TestimonialsSection'
import GallerySection from './GallerySection'
import CTASection from './CTASection'
import FooterSection from './FooterSection'

interface Props {
  section: PageSection
}

const EFFECTS = new Set([
  'fade-up',
  'fade-down',
  'fade-left',
  'fade-right',
  'zoom-in',
  'blur-in',
  'flip-up',
])

function getScrollVariants(effect: string): Variants {
  switch (effect) {
    case 'fade-up':
      return { hidden: { opacity: 0, y: 56 }, visible: { opacity: 1, y: 0 } }
    case 'fade-down':
      return { hidden: { opacity: 0, y: -56 }, visible: { opacity: 1, y: 0 } }
    case 'fade-left':
      return { hidden: { opacity: 0, x: 64 }, visible: { opacity: 1, x: 0 } }
    case 'fade-right':
      return { hidden: { opacity: 0, x: -64 }, visible: { opacity: 1, x: 0 } }
    case 'zoom-in':
      return { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } }
    case 'blur-in':
      return {
        hidden: { opacity: 0, filter: 'blur(18px)' },
        visible: { opacity: 1, filter: 'blur(0px)' },
      }
    case 'flip-up':
      return {
        hidden: { opacity: 0, rotateX: 18, y: 34 },
        visible: { opacity: 1, rotateX: 0, y: 0 },
      }
    default:
      return { hidden: { opacity: 1 }, visible: { opacity: 1 } }
  }
}

function SectionRenderer({ section }: Props) {
  const f = section.fields
  const effect = f._scrollEffect ?? 'none'
  const duration = Math.min(Math.max(Number(f._scrollDuration || 0.55), 0.15), 2)
  const delay = Math.min(Math.max(Number(f._scrollDelay || 0), 0), 1.5)
  const replay = f._scrollReplay === 'true'

  let content: ReactNode

  switch (section.type) {
    case 'header':       content = <HeaderSection fields={f} />; break
    case 'hero':         content = <HeroSection fields={f} />; break
    case 'features':     content = <FeaturesSection fields={f} />; break
    case 'stats':        content = <StatsSection fields={f} />; break
    case 'testimonials': content = <TestimonialsSection fields={f} />; break
    case 'gallery':      content = <GallerySection fields={f} />; break
    case 'cta':          content = <CTASection fields={f} />; break
    case 'footer':       content = <FooterSection fields={f} />; break
    default:
      content = (
        <div className="p-10 bg-slate-100 text-center text-slate-400 text-sm">
          Unknown section type
        </div>
      )
  }

  if (!EFFECTS.has(effect)) return content

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !replay, amount: 0.22 }}
      variants={getScrollVariants(effect)}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1000 }}
    >
      {content}
    </motion.div>
  )
}

export default memo(SectionRenderer)
