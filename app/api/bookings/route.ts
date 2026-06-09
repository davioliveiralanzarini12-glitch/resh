import { NextResponse } from 'next/server'
import { createBooking } from '../../../lib/booking'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const booking = await createBooking(body)
    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
