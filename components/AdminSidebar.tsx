'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const links = [
  { href: '/admin/agenda', label: 'Agenda' },
  { href: '/admin/servicos', label: 'Serviços' },
  { href: '/admin/profissionais', label: 'Profissionais' },
  { href: '/admin/horarios', label: 'Horários' },
  { href: '/admin/bloqueios', label: 'Bloqueios' }
]

export function AdminSidebar() {
  const [active, setActive] = useState('')

  useEffect(() => {
    setActive(window.location.pathname)
  }, [])

  return (
    <aside className="w-full max-w-[320px] rounded-[32px] border border-white/10 bg-slate-950/85 p-6 shadow-metal lg:h-[calc(100vh-4rem)]">
      <div className="mb-8 space-y-3">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 text-lg font-semibold text-white">R</div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Admin Studio Resh</p>
          <p className="mt-2 text-2xl font-semibold text-white">Painel</p>
        </div>
      </div>
      <nav className="space-y-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={`block rounded-3xl px-5 py-4 text-sm font-medium transition ${active === link.href ? 'bg-white/10 text-white' : 'border border-white/5 text-slate-300 hover:border-slate-400/30'}`}>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
