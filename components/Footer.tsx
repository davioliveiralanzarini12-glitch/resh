import Link from 'next/link'
import { INSTAGRAM_URL, WHATSAPP_URL } from '../lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/90 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-lg font-semibold tracking-[0.24em] text-white">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10">R</span>
            Studio Resh
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-400">Não é só corte. É presença.</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
          <Link href="/agendar" className="transition hover:text-white">Agendar</Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="transition hover:text-white">WhatsApp</a>
        </div>
      </div>
    </footer>
  )
}
