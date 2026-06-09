'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'
import { APPBARBER_URL, BOOKING_MODE, HOME_SECTIONS, WHATSAPP_URL } from '../lib/constants'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link href="#home" className="flex items-center gap-3 font-display text-lg font-semibold tracking-[0.24em] text-slate-100">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-white/10 to-slate-800 shadow-metal">
            R
          </span>
          Studio Resh
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {HOME_SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="text-sm text-zinc-300 transition hover:text-white">
              {section.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {BOOKING_MODE === 'appbarber' ? (
            <a href={APPBARBER_URL} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-300 px-5 py-3 text-sm font-semibold text-black shadow-metal transition hover:brightness-110">
              Agendar agora
              <ChevronRight size={16} />
            </a>
          ) : (
            <Link href="/agendar" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-300 px-5 py-3 text-sm font-semibold text-black shadow-metal transition hover:brightness-110">
              Agendar agora
              <ChevronRight size={16} />
            </Link>
          )}
        </div>

        <button className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-black/95 px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {HOME_SECTIONS.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="text-base text-zinc-200" onClick={() => setOpen(false)}>
                {section.label}
              </a>
            ))}
            <Link href="/agendar" className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-slate-400" onClick={() => setOpen(false)}>
              Agendar agora
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-slate-400">
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      ) : null}
      </header>
      <div className="lg:hidden">
        {BOOKING_MODE === 'appbarber' ? (
          <a href={APPBARBER_URL} className="mobile-fixed-booking mx-6 inline-flex w-[calc(100%-3rem)] items-center justify-center rounded-full bg-slate-100 px-6 py-4 text-center text-sm font-semibold text-black shadow-metal transition hover:brightness-110">
            Agendar
          </a>
        ) : (
          <a href="/agendar" className="mobile-fixed-booking mx-6 inline-flex w-[calc(100%-3rem)] items-center justify-center rounded-full bg-slate-100 px-6 py-4 text-center text-sm font-semibold text-black shadow-metal transition hover:brightness-110">
            Agendar
          </a>
        )}
      </div>
    </>
  )
}
