'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Layers,
  ArrowRight,
  MousePointer2,
  FileStack,
  Monitor,
  Download,
  LayoutGrid,
  Zap,
  ChevronRight,
} from 'lucide-react'

/* ─── animation helpers ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}
const stagger = { show: { transition: { staggerChildren: 0.09 } } }

/* ─── data ───────────────────────────────────────────────────── */
const features = [
  {
    icon: MousePointer2,
    title: 'Drag & Drop Editor',
    desc: 'Reorder sections instantly with a smooth drag-and-drop canvas. No friction.',
  },
  {
    icon: FileStack,
    title: 'Multi-page Support',
    desc: 'Build complete websites. Add as many pages as you need and navigate between them in preview.',
  },
  {
    icon: Monitor,
    title: 'Live Device Preview',
    desc: 'Switch between desktop and phone preview to see exactly how your site looks on every screen.',
  },
  {
    icon: Download,
    title: 'Export Ready',
    desc: 'Download your entire project or individual pages as JSON. Import back any time.',
  },
  {
    icon: LayoutGrid,
    title: 'Rich Section Library',
    desc: 'Hero, features, gallery, stats, testimonials, contact, CTA, footer — all ready to use.',
  },
  {
    icon: Zap,
    title: 'Zero Code Required',
    desc: 'No HTML, CSS or JavaScript knowledge needed. Everything is point-and-click.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Pick your sections',
    desc: 'Browse the section library and click any section to instantly drop it onto your canvas.',
  },
  {
    num: '02',
    title: 'Customize everything',
    desc: 'Click any section to edit text, colors, images, and layout. Every change is live.',
  },
  {
    num: '03',
    title: 'Preview & export',
    desc: 'Preview on desktop or phone, click nav links to see other pages, then export your project.',
  },
]

/* ─── page ───────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 md:px-14 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/70">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 flex-shrink-0">
            <Layers size={14} className="text-white" />
          </div>
          <span className="font-semibold text-sm tracking-tight">Alsahal WebBuilder</span>
        </div>
        <Link
          href="/builder"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-indigo-600/25"
        >
          Open Builder <ArrowRight size={14} />
        </Link>
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-24 pb-16 overflow-hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-8">
          <div className="w-[800px] h-[500px] rounded-full bg-indigo-700/10 blur-[140px]" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center gap-6 max-w-3xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-xs font-medium"
          >
            <Layers size={11} /> Visual Page Builder
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.07]"
          >
            Build beautiful websites.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              No code required.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-slate-400 leading-relaxed max-w-xl">
            Drag sections, customize content, preview on any device, and export your complete
            multi-page site — all inside one fast visual editor.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap justify-center">
            <Link
              href="/builder"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-2xl shadow-indigo-600/30 transition-all duration-200 hover:scale-[1.03]"
            >
              Start Building <ArrowRight size={15} />
            </Link>
            <a
              href="#features"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-medium text-sm transition-all duration-200"
            >
              See Features <ChevronRight size={14} />
            </a>
          </motion.div>
        </motion.div>

        {/* App mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-16 w-full max-w-5xl"
        >
          <AppMockup />
        </motion.div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section id="features" className="px-6 md:px-14 py-28 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            A complete visual builder packed into a single, fast web app.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:bg-indigo-600/30 transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ── How it works ───────────────────────────────────── */}
      <section className="px-6 md:px-14 py-28 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-slate-400 text-lg">
              From blank canvas to complete website in three steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-slate-700/80 to-transparent -translate-y-px" />
                )}
                <div className="text-5xl font-bold text-indigo-600/25 mb-5 leading-none">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section className="px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-2xl shadow-indigo-600/30 mb-8">
            <Layers size={26} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">
            Ready to build your next website?
          </h2>
          <p className="text-slate-400 text-lg mb-12">
            It&apos;s free, instant, and requires zero setup. Just open the builder and start.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base shadow-2xl shadow-indigo-600/30 transition-all duration-200 hover:scale-[1.03]"
          >
            Open the Builder <ArrowRight size={17} />
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-slate-800/70 px-6 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-indigo-600/70 flex items-center justify-center">
            <Layers size={11} className="text-white" />
          </div>
          <span className="text-slate-400 font-semibold text-sm">Alsahal WebBuilder</span>
        </div>
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} Alsahal WebBuilder — Build anything, visually.
        </p>
      </footer>
    </div>
  )
}

/* ─── App mockup ─────────────────────────────────────────────── */
function AppMockup() {
  return (
    <div className="rounded-xl overflow-hidden ring-1 ring-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]">
      {/* Browser chrome */}
      <div className="bg-slate-800 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 bg-slate-700/80 rounded px-3 py-1 text-xs text-slate-400 text-left truncate">
          localhost:3000/builder
        </div>
        <div className="w-14 flex-shrink-0" />
      </div>

      {/* Builder shell */}
      <div className="flex" style={{ height: 'clamp(260px, 38vw, 440px)', background: '#020817' }}>

        {/* Left sidebar — section library */}
        <div className="w-[14%] max-w-[180px] min-w-[52px] bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden">
          {/* toolbar stub */}
          <div className="h-9 border-b border-slate-800 flex items-center px-2 gap-1.5 flex-shrink-0">
            <div className="w-4 h-4 rounded-md bg-indigo-600 flex-shrink-0" />
            <div className="flex-1 h-2 rounded bg-slate-700" />
          </div>
          {/* page tabs stub */}
          <div className="h-7 border-b border-slate-700 flex items-center px-1.5 gap-1 flex-shrink-0">
            <div className="h-4 w-10 rounded-md bg-indigo-600 text-[7px] text-white flex items-center justify-center font-medium">Home</div>
            <div className="h-4 w-10 rounded-md bg-slate-800 text-[7px] text-slate-500 flex items-center justify-center">About</div>
            <div className="h-4 w-4 rounded-md bg-slate-800 text-slate-500 flex items-center justify-center text-[9px]">+</div>
          </div>
          {/* section list */}
          <div className="flex-1 p-1.5 flex flex-col gap-1 overflow-hidden">
            {['Header', 'Hero', 'Features', 'Stats', 'Gallery', 'Footer'].map((name) => (
              <div
                key={name}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-slate-800/50"
              >
                <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500/50 flex-shrink-0" />
                <span className="text-[8px] text-slate-500 truncate hidden sm:block">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(circle, #334155 0.6px, transparent 0.6px)',
            backgroundSize: '18px 18px',
            backgroundColor: '#0f172a',
          }}
        >
          {/* Canvas sections */}
          <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden">
            {/* Header section — selected */}
            <div className="rounded-lg bg-indigo-950/70 ring-2 ring-indigo-500 flex items-center px-3 gap-3 flex-shrink-0" style={{ height: '14%', minHeight: 40 }}>
              <div className="w-12 h-2 rounded bg-indigo-400/60" />
              <div className="flex-1" />
              <div className="flex gap-2">
                {['Home', 'About', 'Contact'].map((l) => (
                  <div key={l} className="h-1.5 w-7 rounded bg-white/20" />
                ))}
              </div>
            </div>
            {/* Hero section */}
            <div className="rounded-lg bg-slate-800/40 ring-1 ring-slate-700 flex flex-col justify-center px-4 gap-2 flex-shrink-0" style={{ height: '24%', minHeight: 60 }}>
              <div className="w-2/5 h-2 rounded bg-white/50" />
              <div className="w-3/5 h-1.5 rounded bg-white/25" />
              <div className="flex gap-1.5 mt-1">
                <div className="h-4 w-12 rounded-md bg-indigo-500/70" />
                <div className="h-4 w-12 rounded-md bg-white/10" />
              </div>
            </div>
            {/* Features section */}
            <div className="rounded-lg bg-slate-800/30 ring-1 ring-slate-700 flex items-center gap-2 px-3 flex-shrink-0" style={{ height: '18%', minHeight: 48 }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-[70%] rounded bg-white/[0.06] flex flex-col items-center justify-center gap-1">
                  <div className="w-3 h-3 rounded bg-indigo-500/40" />
                  <div className="w-4/5 h-1 rounded bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar — section editor */}
        <div className="w-[15%] max-w-[200px] min-w-[56px] bg-white border-l border-slate-200 flex flex-col overflow-hidden">
          <div className="h-9 border-b border-slate-100 flex items-center px-2 flex-shrink-0">
            <div className="h-2 w-16 rounded bg-slate-200" />
          </div>
          <div className="flex-1 p-2 flex flex-col gap-2.5 overflow-hidden">
            {[
              { label: 'w-8', field: 'bg-slate-100 border border-slate-200' },
              { label: 'w-10', field: 'bg-indigo-400' },
              { label: 'w-6', field: 'bg-slate-100 border border-slate-200' },
              { label: 'w-9', field: 'bg-slate-100 border border-slate-200' },
              { label: 'w-7', field: 'bg-slate-100 border border-slate-200' },
            ].map(({ label, field }, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <div className={`h-1.5 ${label} rounded bg-slate-300`} />
                <div className={`h-4 rounded ${field}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
