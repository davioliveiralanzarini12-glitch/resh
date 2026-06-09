import Link from 'next/link'
import { APPBARBER_URL, BOOKING_MODE, INSTAGRAM_URL, PHONE_NUMBER, ADDRESS, MAPS_URL } from '../lib/constants'
import { buildWhatsAppLink } from '../lib/whatsapp'

const CONTACT_MESSAGE = 'Olá, quero agendar um horário no Studio Resh.'

export function ContactSection() {
  const whatsappLink = buildWhatsAppLink(CONTACT_MESSAGE)
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Contato</p>
            <h2 className="text-4xl font-display font-semibold text-white sm:text-5xl">Pronto para reservar seu horário?</h2>
            <p className="max-w-xl leading-8 text-zinc-300">
              Entre em contato pelo WhatsApp, siga nosso Instagram ou faça o agendamento online. O Studio Resh está pronto para entregar presença e acabamento premium.
            </p>
            <div className="space-y-4 text-sm text-slate-300">
              <p><strong>WhatsApp:</strong> <a href={whatsappLink} target="_blank" rel="noreferrer" className="text-slate-100 underline">{PHONE_NUMBER}</a></p>
              <p><strong>Instagram:</strong> <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-slate-100 underline">@studioresh</a></p>
              <p><strong>Endereço:</strong> {ADDRESS}</p>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-metal backdrop-blur-xl">
            <div className="space-y-6">
              <div className="rounded-[24px] border border-white/10 bg-black/60 p-6">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Mapa</p>
                <p className="mt-4 leading-7 text-slate-300">O Studio Resh está localizado em uma área de alto padrão, com fácil acesso e ambiente reservado.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-slate-900 px-6 py-4 text-center text-sm font-semibold text-white transition hover:border-slate-400">
                  Como chegar
                </a>
                {BOOKING_MODE === 'appbarber' ? (
                  <a href={APPBARBER_URL} className="rounded-full bg-slate-100 px-6 py-4 text-center text-sm font-semibold text-black transition hover:shadow-metal">
                    Agendar agora
                  </a>
                ) : (
                  <Link href="/agendar" className="rounded-full bg-slate-100 px-6 py-4 text-center text-sm font-semibold text-black transition hover:shadow-metal">
                    Agendar agora
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
