import { supabaseAdmin } from './supabase'

function requireAdminClient() {
  if (!supabaseAdmin) {
    return null
  }
  return supabaseAdmin
}

export async function fetchAdminBookings() {
  const client = requireAdminClient()
  if (!client) return []

  const { data, error } = await client
    .from('bookings')
    .select(`*, professionals(name), professional_services(*, service_categories(name))`)
    .order('booking_date', { ascending: true })

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export async function fetchAdminProfessionals() {
  const client = requireAdminClient()
  if (!client) return []

  const { data, error } = await client.from('professionals').select('*').order('name')
  if (error) {
    console.error(error)
    return []
  }
  return data
}

export async function fetchAdminServices() {
  const client = requireAdminClient()
  if (!client) return []

  const { data, error } = await client
    .from('professional_services')
    .select(`*, professionals(name), service_categories(name)`)
    .order('created_at', { ascending: true })
  if (error) {
    console.error(error)
    return []
  }
  return data
}

export async function fetchAdminBusinessHours() {
  const client = requireAdminClient()
  if (!client) return []

  const { data, error } = await client
    .from('business_hours')
    .select(`*, professionals(name)`)
    .order('professional_id', { ascending: true })
    .order('day_of_week', { ascending: true })
  if (error) {
    console.error(error)
    return []
  }
  return data
}

export async function fetchAdminBlockedSlots() {
  const client = requireAdminClient()
  if (!client) return []

  const { data, error } = await client
    .from('blocked_slots')
    .select(`*, professionals(name)`)
    .order('date', { ascending: true })
  if (error) {
    console.error(error)
    return []
  }
  return data
}
