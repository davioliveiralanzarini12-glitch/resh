import { NextResponse } from 'next/server'
import { getAvailableSlots } from '../../../lib/booking'

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams
    const professionalId = searchParams.get('professionalId')
    const serviceId = searchParams.get('serviceId')
    const date = searchParams.get('date')

    if (!professionalId || !serviceId || !date) {
      return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 })
    }

    const slots = await getAvailableSlots(professionalId, serviceId, date)
    return NextResponse.json({ slots })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
