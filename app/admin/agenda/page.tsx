import { AdminGuard } from '../../../components/AdminGuard'
import { AdminSidebar } from '../../../components/AdminSidebar'
import { fetchAdminBookings } from '../../../lib/admin'

type AdminBooking = {
  id: string
  booking_date: string
  start_time: string
  end_time: string
  client_name: string
  status: string
  professionals?: { name: string }
  professional_services?: { service_categories?: { name: string } }
}

export default async function AdminAgendaPage() {
  const bookings = (await fetchAdminBookings()) as AdminBooking[]

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:flex-row lg:px-8">
          <AdminSidebar />
          <section className="flex-1 rounded-[36px] border border-white/10 bg-slate-950/85 p-8 shadow-metal">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Agenda</p>
                <h1 className="mt-3 text-4xl font-display font-semibold text-white">Agendamentos</h1>
              </div>
            </div>
            <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-black/60">
              <table className="min-w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-400">
                    <th className="px-5 py-4">Data</th>
                    <th className="px-5 py-4">Horário</th>
                    <th className="px-5 py-4">Cliente</th>
                    <th className="px-5 py-4">Profissional</th>
                    <th className="px-5 py-4">Serviço</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length ? (
                    bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-white/10 last:border-none hover:bg-white/5">
                        <td className="px-5 py-4 text-slate-200">{booking.booking_date}</td>
                        <td className="px-5 py-4 text-slate-200">{booking.start_time} - {booking.end_time}</td>
                        <td className="px-5 py-4 text-slate-200">{booking.client_name}</td>
                        <td className="px-5 py-4 text-slate-200">{booking.professionals?.name ?? '-'}</td>
                        <td className="px-5 py-4 text-slate-200">{booking.professional_services?.service_categories?.name ?? '-'}</td>
                        <td className="px-5 py-4 text-slate-200 uppercase tracking-[0.18em]">{booking.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-slate-400">Nenhum agendamento encontrado.</td>
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
