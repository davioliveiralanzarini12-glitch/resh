export function ExperienceSection() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-slate-300">
              A experiência Studio Resh
            </div>
            <h2 className="text-4xl font-display font-semibold text-white sm:text-5xl">
              Viva a experiência Studio Resh.
            </h2>
            <p className="max-w-xl leading-8 text-zinc-300">
              O Studio Resh foi criado para quem valoriza mais do que um corte. Cada atendimento é pensado nos detalhes: acabamento, estilo, barba, sobrancelha, ambiente e experiência. Aqui, o cliente não entra apenas para mudar o visual, mas para sair com mais presença.
            </p>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Seu horário. Seu estilo. Sua experiência.</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-metal backdrop-blur-xl">
            <div className="rounded-[28px] bg-gradient-to-br from-black/80 to-slate-950/80 p-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">Detalhes que elevam cada atendimento</h3>
                <p className="leading-7 text-zinc-300">
                  Ambiente exclusivo, atendimento com foco total no cliente e acabamento com padrão de assinatura. Tudo pensado para um resultado memorável.
                </p>
              </div>
              <div className="mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-5">Conforto e privacidade no tempo certo.</div>
                <div className="rounded-3xl border border-white/10 bg-black/40 p-5">Linha de acabamento premium em cada serviço.</div>
                <div className="rounded-3xl border border-white/10 bg-black/40 p-5">Atendimento por horário marcado sem espera.</div>
                <div className="rounded-3xl border border-white/10 bg-black/40 p-5">Serviço pensado para imagem, postura e estilo.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
