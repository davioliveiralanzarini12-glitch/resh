import { AdminGuard } from '../../../components/AdminGuard'
import { AdminSidebar } from '../../../components/AdminSidebar'
import { fetchAdminBusinessHours } from '../../../lib/admin'

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

type AdminBusinessHour = {
  id: string
  day_of_week: number
  open_time: string
  close_time: string
  break_start?: string | null
  break_end?: string | null
  is_open: boolean
  professionals?: { name: string }
}

export default async function AdminHoursPage() {
  const hours = (await fetchAdminBusinessHours()) as AdminBusinessHour[]

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:flex-row lg:px-8">
          <AdminSidebar />
          <section className="flex-1 rounded-[36px] border border-white/10 bg-slate-950/85 p-8 shadow-metal">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Horários</p>
              <h1 className="mt-3 text-4xl font-display font-semibold text-white">Configurações de atendimento</h1>
            </div>
            <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-black/60">
              <table className="min-w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-400">
                    <th className="px-5 py-4">Profissional</th>
                    <th className="px-5 py-4">Dia</th>
                    <th className="px-5 py-4">Expediente</th>
                    <th className="px-5 py-4">Pausa</th>
                    <th className="px-5 py-4">Aberto</th>
                  </tr>
                </thead>
                <tbody>
                  {hours.length ? (
                    hours.map((item) => (
                      <tr key={item.id} className="border-b border-white/10 last:border-none hover:bg-white/5">
                        <td className="px-5 py-4 text-slate-200">{item.professionals?.name ?? '-'}</td>
                        <td className="px-5 py-4 text-slate-200">{weekDays[item.day_of_week - 1] ?? item.day_of_week}</td>
                        <td className="px-5 py-4 text-slate-200">{item.open_time} - {item.close_time}</td>
                        <td className="px-5 py-4 text-slate-200">{item.break_start ?? '--'} / {item.break_end ?? '--'}</td>
                        <td className="px-5 py-4 text-slate-200">{item.is_open ? 'Sim' : 'Não'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-5 py-10 text-center text-slate-400">Sem horários cadastrados.</td>
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
