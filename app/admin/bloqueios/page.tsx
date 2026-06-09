import { AdminGuard } from '../../../components/AdminGuard'
import { AdminSidebar } from '../../../components/AdminSidebar'
import { fetchAdminBlockedSlots } from '../../../lib/admin'

type AdminBlockedSlot = {
  id: string
  date: string
  start_time: string
  end_time: string
  reason?: string | null
  professionals?: { name: string }
}

export default async function AdminBlocksPage() {
  const blocks = (await fetchAdminBlockedSlots()) as AdminBlockedSlot[]

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:flex-row lg:px-8">
          <AdminSidebar />
          <section className="flex-1 rounded-[36px] border border-white/10 bg-slate-950/85 p-8 shadow-metal">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Bloqueios</p>
              <h1 className="mt-3 text-4xl font-display font-semibold text-white">Horários bloqueados</h1>
            </div>
            <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-black/60">
              <table className="min-w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-400">
                    <th className="px-5 py-4">Profissional</th>
                    <th className="px-5 py-4">Data</th>
                    <th className="px-5 py-4">Horário</th>
                    <th className="px-5 py-4">Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  {blocks.length ? (
                    blocks.map((item) => (
                      <tr key={item.id} className="border-b border-white/10 last:border-none hover:bg-white/5">
                        <td className="px-5 py-4 text-slate-200">{item.professionals?.name ?? '-'}</td>
                        <td className="px-5 py-4 text-slate-200">{item.date}</td>
                        <td className="px-5 py-4 text-slate-200">{item.start_time} - {item.end_time}</td>
                        <td className="px-5 py-4 text-slate-200">{item.reason ?? 'Sem motivo'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-5 py-10 text-center text-slate-400">Sem bloqueios cadastrados.</td>
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
