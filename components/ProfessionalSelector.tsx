import { PROFESSIONALS } from '../lib/constants'

type ProfessionalSelectorProps = {
  selectedProfessionalId: string
  onSelect: (professionalId: string) => void
}

export function ProfessionalSelector({ selectedProfessionalId, onSelect }: ProfessionalSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PROFESSIONALS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className={`rounded-[28px] border px-6 py-6 text-left transition ${
            selectedProfessionalId === item.id
              ? 'border-slate-100 bg-white/10'
              : 'border-white/10 bg-black/60 hover:border-slate-400'
          }`}
        >
          <p className="text-lg font-semibold text-white">{item.name}</p>
          <p className="mt-2 text-sm leading-7 text-slate-300">{item.role}</p>
        </button>
      ))}
    </div>
  )
}
