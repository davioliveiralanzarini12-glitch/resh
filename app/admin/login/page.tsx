'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@studioresh.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setError(data.error || 'Falha no login.')
      return
    }

    localStorage.setItem('studio-resh-admin-token', data.token)
    window.location.href = '/admin/agenda'
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl rounded-[36px] border border-white/10 bg-slate-950/90 p-10 shadow-metal backdrop-blur-xl">
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 text-lg font-semibold text-white">
              R
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Login Admin</p>
              <h1 className="text-3xl font-semibold text-white">Acesso ao painel Studio Resh</h1>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <label className="grid gap-2 text-slate-300">
              E-mail
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="rounded-3xl border border-white/10 bg-black/60 px-4 py-4 text-white outline-none transition focus:border-slate-300" />
            </label>
            <label className="grid gap-2 text-slate-300">
              Senha
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="rounded-3xl border border-white/10 bg-black/60 px-4 py-4 text-white outline-none transition focus:border-slate-300" />
            </label>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-100 px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-50">
              {loading ? 'Validando...' : 'Entrar no painel'}
              <ArrowRight size={18} />
            </button>
          </form>
          <p className="mt-6 text-sm text-slate-500">
            Sem credenciais? Ajuste os valores de <span className="font-semibold text-slate-200">ADMIN_EMAIL</span> e <span className="font-semibold text-slate-200">ADMIN_PASSWORD</span>.
          </p>
          <div className="mt-6 text-sm text-slate-400">
            <Link href="/" className="text-slate-200 underline">Voltar ao site</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
