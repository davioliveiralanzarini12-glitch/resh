import Image from 'next/image'
import Link from 'next/link'

const images = [
  '/brand/resh-logo.png',
  '/brand/resh-logo.png',
  '/brand/resh-logo.png',
  '/brand/resh-logo.png',
  '/brand/resh-logo.png',
  '/brand/resh-logo.png'
]

export function GallerySection() {
  return (
    <section id="gallery" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Galeria</p>
            <h2 className="mt-3 text-4xl font-display font-semibold text-white sm:text-5xl">Resultados que falam por si.</h2>
          </div>
          <Link href="https://www.instagram.com/studioresh" target="_blank" className="rounded-full border border-white/10 bg-black/70 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-400">
            Ver Instagram
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, index) => (
            <div key={index} className="group overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#111113] via-[#0b0b0d] to-[#111113] p-1 shadow-metal transition hover:-translate-y-1 hover:shadow-glow">
              <div className="relative h-64 overflow-hidden rounded-[26px] bg-slate-900">
                <Image src={src} alt="Resultado Studio Resh" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover opacity-90 transition duration-500 group-hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
