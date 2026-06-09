'use client'

import { useMemo, useState } from 'react'
import { APPBARBER_URL, BOOKING_MODE, PROFESSIONALS, SERVICE_FILTERS } from '../lib/constants'
import { SERVICE_SUMMARY } from '../lib/services'
import { ServiceCard } from './ServiceCard'

export function ServicesSection() {
  const [selectedFilter, setSelectedFilter] = useState('Todos')

  const filteredServices = useMemo(() => {
    if (selectedFilter === 'Todos') {
      return SERVICE_SUMMARY
    }
    return SERVICE_SUMMARY.filter((service) => service.professionalId.toLowerCase() === selectedFilter.toLowerCase())
  }, [selectedFilter])

  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Serviços e valores</p>
            <h2 className="mt-3 text-4xl font-display font-semibold text-white sm:text-5xl">Escolha o profissional antes do serviço.</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {SERVICE_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${selectedFilter === filter ? 'bg-slate-100 text-black' : 'border border-white/10 bg-black/60 text-slate-200 hover:border-slate-400'}`}>
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {filteredServices.map((service) => {
            const professional = PROFESSIONALS.find((item) => item.id === service.professionalId)
            return (
              <ServiceCard
                key={service.id}
                title={service.name}
                professional={`Com ${professional?.name ?? 'Profissional'}`}
                price={service.price}
                duration={`${service.durationMinutes} min`}
                onBook={() => {
                  if (BOOKING_MODE === 'appbarber') {
                    window.location.href = APPBARBER_URL
                    return
                  }
                  const query = new URLSearchParams({ professionalId: service.professionalId, serviceId: service.id }).toString()
                  window.location.href = `/agendar?${query}`
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
