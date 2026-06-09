import { redirect } from 'next/navigation'
import { BookingFlow } from '../../components/BookingFlow'
import { APPBARBER_URL, BOOKING_MODE } from '../../lib/constants'

interface AgendarPageProps {
  searchParams?: { professionalId?: string; serviceId?: string }
}

export default function AgendarPage({ searchParams }: AgendarPageProps) {
  if (BOOKING_MODE === 'appbarber') {
    redirect(APPBARBER_URL)
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_20%),linear-gradient(180deg,#090909_0%,#050505_100%)] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Agendamento premium</p>
              <h1 className="text-5xl font-display font-semibold text-white sm:text-6xl">Agende seu horário no Studio Resh.</h1>
              <p className="max-w-2xl leading-8 text-zinc-300">
                Escolha o profissional, selecione o serviço e reserve o melhor horário. Experiência premium, fluxo simples e resultado de presença.
              </p>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-metal backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Conceito</p>
              <p className="mt-4 leading-7 text-slate-300">Cada etapa do agendamento foi pensada para entregar clareza e luxo, evitando qualquer confusão entre Marcus e Solano.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <BookingFlow initialProfessionalId={searchParams?.professionalId} initialServiceId={searchParams?.serviceId} />
      </section>
    </main>
  )
}
