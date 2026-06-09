'use client'

import { useEffect, useMemo, useState } from 'react'
import { addDays, format } from 'date-fns'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { getProfessionalById, getServiceById, getServicesByProfessional } from '../lib/services'
import { PROFESSIONALS } from '../lib/constants'
import { ProfessionalSelector } from './ProfessionalSelector'

function buildDateList() {
  return Array.from({ length: 10 }, (_, index) => {
    const date = addDays(new Date(), index)
    return {
      value: format(date, 'yyyy-MM-dd'),
      label: format(date, "EEEE, dd/MM")
    }
  })
}

export function BookingFlow({ initialProfessionalId, initialServiceId }: { initialProfessionalId?: string; initialServiceId?: string }) {
  const [step, setStep] = useState(1)
  const [professionalId, setProfessionalId] = useState(initialProfessionalId ?? '')
  const [serviceId, setServiceId] = useState(initialServiceId ?? '')
  const [date, setDate] = useState(buildDateList()[0].value)
  const [time, setTime] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [slots, setSlots] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const professional = professionalId ? getProfessionalById(professionalId) : null
  const service = serviceId ? getServiceById(serviceId) : null
  const services = professionalId ? getServicesByProfessional(professionalId) : []

  useEffect(() => {
    if (step === 4 && professionalId && serviceId && date) {
      setStatus('loading')
      fetch(`/api/slots?professionalId=${professionalId}&serviceId=${serviceId}&date=${date}`)
        .then((res) => res.json())
        .then((data: { slots?: Array<{ slot: string }> }) => {
          setSlots(data.slots?.map((item) => item.slot) ?? [])
          setStatus('idle')
        })
        .catch(() => {
          setSlots([])
          setStatus('error')
        })
    }
  }, [professionalId, serviceId, date, step])

  const dateList = useMemo(() => buildDateList(), [])

  const canProceed = () => {
    if (step === 1) return Boolean(professionalId)
    if (step === 2) return Boolean(serviceId)
    if (step === 3) return Boolean(date)
    if (step === 4) return Boolean(time)
    if (step === 5) return Boolean(clientName) && Boolean(clientPhone)
    return true
  }

  const handleConfirm = async () => {
    if (!canProceed() || !professionalId || !serviceId) return
    setStatus('loading')
    setMessage('')

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        professionalId,
        serviceId,
        date,
        time,
        clientName,
        clientPhone,
        clientEmail: clientEmail || null,
        notes: notes || null
      })
    })

    const data = await response.json()
    if (!response.ok) {
      setStatus('error')
      setMessage(data.error || 'Erro ao confirmar o agendamento.')
      return
    }

    setStatus('success')
    setMessage('Horário reservado com sucesso. Te esperamos no Studio Resh.')
    setStep(6)
  }

  return (
    <section className="rounded-[36px] border border-white/10 bg-slate-950/85 p-6 shadow-metal backdrop-blur-xl sm:p-10">
      <div className="mb-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/40 p-5 text-sm uppercase tracking-[0.28em] text-slate-300">
        <span>Agendamento Online</span>
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          {['1 Profissional', '2 Serviço', '3 Data', '4 Horário', '5 Cliente', '6 Confirmação'].map((label, index) => (
            <span key={label} className={index + 1 === step ? 'text-white' : 'text-slate-500'}>{label}</span>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-white">1. Escolha o profissional</h3>
          <ProfessionalSelector
            selectedProfessionalId={professionalId}
            onSelect={(id) => {
              setProfessionalId(id)
              setStep(2)
              setServiceId('')
            }}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-white">2. Escolha o serviço</h3>
          <div className="grid gap-4">
            {services.map((serviceOption) => (
              <button key={serviceOption.id} type="button" onClick={() => { setServiceId(serviceOption.id); setStep(3); }} className={`rounded-[28px] border px-6 py-6 text-left transition ${serviceId === serviceOption.id ? 'border-slate-100 bg-white/10' : 'border-white/10 bg-black/60 hover:border-slate-400'}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lg font-semibold text-white">{serviceOption.name}</span>
                  <span className="text-sm uppercase tracking-[0.2em] text-slate-400">{serviceOption.durationMinutes} min</span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{serviceOption.price}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-white">3. Escolha a data</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {dateList.map((option) => (
              <button key={option.value} type="button" onClick={() => { setDate(option.value); setStep(4) }} className={`rounded-3xl border px-5 py-4 text-left transition ${date === option.value ? 'border-slate-100 bg-white/10' : 'border-white/10 bg-black/60 hover:border-slate-400'}`}>
                <p className="font-semibold text-white">{option.label}</p>
                <p className="mt-2 text-sm text-slate-400">Disponibilidade em breve</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-white">4. Escolha o horário</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {status === 'loading' ? (
              <div className="col-span-full rounded-3xl border border-white/10 bg-black/60 p-6 text-center text-slate-300">
                <Loader2 className="mx-auto animate-spin" size={24} /> Buscando horários...
              </div>
            ) : slots.length ? (
              slots.map((slot) => (
                <button key={slot} type="button" onClick={() => { setTime(slot); setStep(5) }} className={`rounded-3xl border px-4 py-4 text-sm font-semibold transition ${time === slot ? 'border-slate-100 bg-white/10 text-white' : 'border-white/10 bg-black/60 text-slate-200 hover:border-slate-400'}`}>
                  {slot}
                </button>
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-white/10 bg-black/60 p-6 text-center text-slate-300">
                Nenhum horário disponível. Tente outra data.
              </div>
            )}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-white">5. Seus dados</h3>
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm text-slate-300">
              Nome completo
              <input value={clientName} onChange={(event) => setClientName(event.target.value)} className="rounded-3xl border border-white/10 bg-black/60 px-4 py-4 text-white outline-none transition focus:border-slate-300" placeholder="Nome completo" />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              WhatsApp
              <input value={clientPhone} onChange={(event) => setClientPhone(event.target.value)} className="rounded-3xl border border-white/10 bg-black/60 px-4 py-4 text-white outline-none transition focus:border-slate-300" placeholder="(11) 9xxxx-xxxx" />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              E-mail (opcional)
              <input value={clientEmail} onChange={(event) => setClientEmail(event.target.value)} className="rounded-3xl border border-white/10 bg-black/60 px-4 py-4 text-white outline-none transition focus:border-slate-300" placeholder="seu@email.com" />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              Observação (opcional)
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-[120px] rounded-3xl border border-white/10 bg-black/60 px-4 py-4 text-white outline-none transition focus:border-slate-300" placeholder="Algo especial para anotar..." />
            </label>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => setStep(4)} className="rounded-full border border-white/10 bg-black/60 px-6 py-4 text-sm font-semibold text-white transition hover:border-slate-400">
              Voltar
            </button>
            <button type="button" disabled={!canProceed()} onClick={handleConfirm} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-6 py-4 text-sm font-semibold text-black transition disabled:opacity-50">
              Confirmar agendamento
              <ArrowRight size={18} />
            </button>
          </div>
          {status === 'error' && <p className="text-sm text-red-300">{message}</p>}
        </div>
      )}

      {step === 6 && (
        <div className="space-y-6 rounded-[28px] border border-slate-500/20 bg-white/5 p-8">
          <div className="flex items-center gap-3 text-slate-100">
            <CheckCircle2 size={24} />
            <h3 className="text-2xl font-semibold">Horário reservado com sucesso.</h3>
          </div>
          <p className="text-slate-300">Te esperamos no Studio Resh.</p>
          <div className="grid gap-4 rounded-[24px] border border-white/10 bg-black/70 p-6 text-sm text-slate-300">
            <div>
              <span className="block text-xs uppercase tracking-[0.3em] text-slate-500">Profissional</span>
              <p className="mt-2 text-base font-semibold text-white">{professional?.name}</p>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-[0.3em] text-slate-500">Serviço</span>
              <p className="mt-2 text-base font-semibold text-white">{service?.name}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <span className="block text-xs uppercase tracking-[0.3em] text-slate-500">Data</span>
                <p className="mt-2 text-base text-white">{format(new Date(date), 'dd/MM/yyyy')}</p>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.3em] text-slate-500">Horário</span>
                <p className="mt-2 text-base text-white">{time}</p>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-[0.3em] text-slate-500">Duração</span>
                <p className="mt-2 text-base text-white">{service?.durationMinutes} min</p>
              </div>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-[0.3em] text-slate-500">Valor</span>
              <p className="mt-2 text-base text-white">{service?.price}</p>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-[0.3em] text-slate-500">Cliente</span>
              <p className="mt-2 text-base text-white">{clientName}</p>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-[0.3em] text-slate-500">WhatsApp</span>
              <p className="mt-2 text-base text-white">{clientPhone}</p>
            </div>
          </div>
          {message ? <p className="text-slate-300">{message}</p> : null}
        </div>
      )}
    </section>
  )
}
