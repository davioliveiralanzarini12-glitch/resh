import { NextResponse } from 'next/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@studioresh.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'ReshAdm2026!'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email ?? '').trim()
    const password = String(body.password ?? '').trim()

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 })
    }

    const token = Buffer.from(`${email}:${password}`).toString('base64')
    return NextResponse.json({ token, email })
  } catch {
    return NextResponse.json({ error: 'Erro no login.' }, { status: 400 })
  }
}
