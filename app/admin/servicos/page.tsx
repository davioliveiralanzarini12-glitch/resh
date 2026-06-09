import { AdminGuard } from '../../../components/AdminGuard'
import { AdminSidebar } from '../../../components/AdminSidebar'
import { fetchAdminServices } from '../../../lib/admin'

type AdminService = {
  id: string
  professionals?: { name: string }
  service_categories?: { name: string }
  price_label?: string | null
  duration_minutes: number
  active: boolean
}

export default async function AdminServicesPage() {
  const services = (await fetchAdminServices()) as AdminService[]

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:flex-row lg:px-8">
          <AdminSidebar />
          <section className="flex-1 rounded-[36px] border border-white/10 bg-slate-950/85 p-8 shadow-metal">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Serviços</p>
              <h1 className="mt-3 text-4xl font-display font-semibold text-white">Lista de serviços</h1>
            </div>
            <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-black/60">
              <table className="min-w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-400">
                    <th className="px-5 py-4">Profissional</th>
                    <th className="px-5 py-4">Serviço</th>
                    <th className="px-5 py-4">Preço</th>
                    <th className="px-5 py-4">Duração</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length ? (
                    services.map((service) => (
                      <tr key={service.id} className="border-b border-white/10 last:border-none hover:bg-white/5">
                        <td className="px-5 py-4 text-slate-200">{service.professionals?.name ?? '-'}</td>
                        <td className="px-5 py-4 text-slate-200">{service.service_categories?.name ?? '-'}</td>
                        <td className="px-5 py-4 text-slate-200">{service.price_label ?? 'Sob consulta'}</td>
                        <td className="px-5 py-4 text-slate-200">{service.duration_minutes} min</td>
                        <td className="px-5 py-4 text-slate-200">{service.active ? 'Ativo' : 'Inativo'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-slate-400">Nenhum serviço cadastrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </AdminGuard>
  )
}
