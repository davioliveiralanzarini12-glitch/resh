import Link from 'next/link'
import { ArrowRight, Sparkles, Smartphone } from 'lucide-react'
import { APPBARBER_URL, BOOKING_MODE, WHATSAPP_URL } from '../lib/constants'

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_26%)]" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
              Studio Resh • Premium
            </div>
            <div className="max-w-2xl space-y-6">
              <p className="text-3xl font-display font-semibold uppercase tracking-[0.45em] text-slate-100 sm:text-4xl lg:text-5xl">
                Studio Resh
              </p>
              <div className="space-y-4">
                <h1 className="text-5xl font-display font-semibold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
                  Não é só corte. É presença.
                </h1>
                <p className="max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
                  Cortes, barba e acabamentos feitos com técnica, estilo e atenção aos detalhes. Uma experiência premium para homens que entendem que presença também comunica.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {BOOKING_MODE === 'appbarber' ? (
                <a href={APPBARBER_URL} className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-6 py-4 text-sm font-semibold text-black transition hover:scale-[1.01] hover:shadow-metal">
                  Agendar horário
                  <ArrowRight size={18} />
                </a>
              ) : (
                <Link href="/agendar" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-6 py-4 text-sm font-semibold text-black transition hover:scale-[1.01] hover:shadow-metal">
                  Agendar horário
                  <ArrowRight size={18} />
                </Link>
              )}
              <Link href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 bg-black/65 px-6 py-4 text-sm font-semibold text-white transition hover:border-slate-400">
                Ver serviços
              </Link>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm text-slate-300 hover:text-white">
              <Smartphone size={18} />
              Chamar no WhatsApp
            </a>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
              Atendimento com horário marcado • Experiência premium • Estilo no detalhe
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-metal backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_25%)]" />
            <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-[#101014]/90 to-[#0B0B0D]/95 p-8">
              <div className="flex h-full flex-col justify-between rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_40%)] p-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 rounded-full border border-slate-600 bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.32em] text-slate-300">
                    Experiência Resh
                  </div>
                  <p className="text-3xl font-display font-semibold text-white">Seu estilo começa no detalhe.</p>
                  <p className="text-sm leading-7 text-zinc-300">
                    Um ambiente clássico com acabamento premium, onde o atendimento e o resultado fazem parte da assinatura.
                  </p>
                </div>
                <div className="grid gap-4 pt-6 sm:grid-cols-2">
                  {['Acabamento impecável', 'Profissionais dedicados', 'Agendamento exclusivo', 'Atendimento masculino premium'].map((item) => (
                    <div key={item} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-200">
                      <div className="flex items-center gap-2 text-slate-100">
                        <Sparkles size={18} />
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
