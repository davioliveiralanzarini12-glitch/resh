import { z } from 'zod'
import { supabaseAdmin } from './supabase'
import { BookingCreateData } from '../types/booking'

function requireSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client is not configured. Configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }
  return supabaseAdmin
}

const bookingInputSchema = z.object({
  professionalId: z.string().min(1),
  serviceId: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  clientName: z.string().min(3),
  clientPhone: z.string().min(8),
  clientEmail: z.string().email().optional(),
  notes: z.string().optional()
})

export async function getAvailableSlots(professionalId: string, serviceId: string, date: string) {
  const client = requireSupabaseAdmin()
  const { data, error } = await client.rpc('get_available_slots', {
    professional_id: professionalId,
    service_id: serviceId,
    target_date: date
  })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as Array<{ slot: string }>
}

export async function createBooking(data: BookingCreateData) {
  const parsed = bookingInputSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((item) => item.message).join(', '))
  }

  const client = requireSupabaseAdmin()
  const { data: response, error } = await client.rpc('create_booking', {
    professional_id: parsed.data.professionalId,
    service_id: parsed.data.serviceId,
    client_name: parsed.data.clientName,
    client_phone: parsed.data.clientPhone,
    client_email: parsed.data.clientEmail,
    notes: parsed.data.notes,
    target_date: parsed.data.date,
    target_time: parsed.data.time
  })

  if (error) {
    throw new Error(error.message)
  }

  return response
}
