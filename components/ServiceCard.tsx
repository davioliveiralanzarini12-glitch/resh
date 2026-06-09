import { ArrowRight } from 'lucide-react'

type ServiceCardProps = {
  title: string
  professional: string
  price: string
  duration: string
  onBook: () => void
}

export function ServiceCard({ title, professional, price, duration, onBook }: ServiceCardProps) {
  return (
    <div className="group rounded-[28px] border border-white/10 bg-slate-950/85 p-6 shadow-metal transition hover:-translate-y-1 hover:border-slate-300/20 hover:shadow-glow">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{professional}</span>
        <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-300">{duration}</span>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm leading-7 text-slate-300">{price}</p>
      </div>
      <button onClick={onBook} className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
        Agendar
        <ArrowRight size={16} />
      </button>
    </div>
  )
}
