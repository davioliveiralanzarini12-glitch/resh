export type Professional = {
  id: string
  name: string
  slug: string
  active: boolean
  created_at: string
}

export type ServiceCategory = {
  id: string
  name: string
  slug: string
  created_at: string
}

export type ProfessionalService = {
  id: string
  professional_id: string
  service_category_id: string
  price_cents: number | null
  price_label: string | null
  duration_minutes: number
  active: boolean
  created_at: string
}

export type Booking = {
  id: string
  client_name: string
  client_phone: string
  client_email: string | null
  professional_id: string
  professional_service_id: string
  booking_date: string
  start_time: string
  end_time: string
  status: 'pending' | 'confirmed' | 'canceled' | 'completed'
  notes: string | null
  created_at: string
}

export type BusinessHour = {
  id: string
  professional_id: string
  day_of_week: number
  open_time: string
  close_time: string
  break_start: string | null
  break_end: string | null
  is_open: boolean
}

export type BlockedSlot = {
  id: string
  professional_id: string
  date: string
  start_time: string
  end_time: string
  reason: string | null
  created_at: string
}
