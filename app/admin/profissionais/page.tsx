import { AdminGuard } from '../../../components/AdminGuard'
import { AdminSidebar } from '../../../components/AdminSidebar'
import { fetchAdminProfessionals } from '../../../lib/admin'

type AdminProfessional = {
  id: string
  name: string
  slug: string
  active: boolean
}

export default async function AdminProfessionalsPage() {
  const professionals = (await fetchAdminProfessionals()) as AdminProfessional[]

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:flex-row lg:px-8">
          <AdminSidebar />
          <section className="flex-1 rounded-[36px] border border-white/10 bg-slate-950/85 p-8 shadow-metal">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Profissionais</p>
              <h1 className="mt-3 text-4xl font-display font-semibold text-white">Marcus e Solano</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {professionals.length ? (
                professionals.map((prof) => (
                  <div key={prof.id} className="rounded-[28px] border border-white/10 bg-black/60 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{prof.slug}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">{prof.name}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-300">Status: {prof.active ? 'Ativo' : 'Inativo'}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-[28px] border border-white/10 bg-black/60 p-6 text-slate-400">Nenhum profissional cadastrado.</div>
              )}
            </div>
          </section>
        </div>
      </main>
    </AdminGuard>
  )
}
