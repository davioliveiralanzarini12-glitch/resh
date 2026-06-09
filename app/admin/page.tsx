'use client'

import { AdminGuard } from '../../components/AdminGuard'
import { AdminSidebar } from '../../components/AdminSidebar'
import Link from 'next/link'

export default function AdminHomePage() {
  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:flex-row lg:px-8">
          <AdminSidebar />
          <div className="flex-1 rounded-[36px] border border-white/10 bg-slate-950/85 p-8 shadow-metal">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Painel administrativo</p>
                <h1 className="mt-3 text-4xl font-display font-semibold text-white">Bem-vindo ao Studio Resh Admin</h1>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {[
                  { title: 'Agenda do dia', description: 'Ver e confirmar agendamentos.', href: '/admin/agenda' },
                  { title: 'Serviços', description: 'Editar preços e durações.', href: '/admin/servicos' },
                  { title: 'Profissionais', description: 'Gerenciar Marcus e Solano.', href: '/admin/profissionais' }
                ].map((item) => (
                  <Link key={item.title} href={item.href} className="rounded-3xl border border-white/10 bg-black/60 p-6 transition hover:border-slate-400/30 hover:shadow-glow">
                    <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                    <p className="mt-3 text-sm text-slate-300">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </AdminGuard>
  )
}
