const reviews = [
  {
    quote: 'Ambiente muito bom, atendimento no horário e corte impecável.',
    author: 'Gabriel S.'
  },
  {
    quote: 'Dá para ver o cuidado nos detalhes. Experiência diferenciada.',
    author: 'Felipe M.'
  },
  {
    quote: 'Não é só cortar cabelo, é sair de lá com outra presença.',
    author: 'Rafael T.'
  }
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Avaliações</p>
          <h2 className="mt-3 text-4xl font-display font-semibold text-white sm:text-5xl">O que dizem sobre o Studio Resh.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.author} className="rounded-[28px] border border-white/10 bg-slate-950/85 p-8 shadow-metal transition hover:-translate-y-1 hover:border-slate-400/20">
              <p className="text-lg leading-8 text-slate-200">“{review.quote}”</p>
              <p className="mt-6 text-sm uppercase tracking-[0.3em] text-slate-500">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
