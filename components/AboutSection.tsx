import { Award, Sparkles, Star } from 'lucide-react'

const cards = [
  { title: 'Atendimento profissional', description: 'Profissionais experientes e atendimento com foco no resultado.', icon: Award },
  { title: 'Ambiente premium', description: 'Espaço escuro, sofisticado e confortável para cada cliente.', icon: Sparkles },
  { title: 'Cortes modernos e clássicos', description: 'A combinação perfeita entre tradição e estilo atual.', icon: Star },
  { title: 'Barba e acabamento', description: 'Detalhes finos que transformam o visual do cliente.', icon: Star },
  { title: 'Agendamento online', description: 'Reserva simples e rápida para horário marcado.', icon: Sparkles },
  { title: 'Horário reservado', description: 'Tempo dedicado para cada atendimento sem atropelos.', icon: Award }
]

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <p className="text-sm uppercase tracking-[0.38em] text-slate-400">Quem Somos</p>
          <h2 className="text-4xl font-display font-semibold text-white sm:text-5xl">Barbearia premium com identidade própria.</h2>
          <p className="mx-auto max-w-3xl leading-8 text-zinc-300">
            O Studio Resh une técnica, cuidado e estilo em um ambiente feito para homens que valorizam imagem, conforto e atendimento de qualidade. Do corte clássico ao visual moderno, cada detalhe é pensado para entregar um resultado alinhado com a personalidade de cada cliente.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-metal transition hover:border-slate-400/40 hover:shadow-glow">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-slate-100">
                  <Icon size={20} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
