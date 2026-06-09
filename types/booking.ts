export type BookingCreateData = {
  professionalId: string
  serviceId: string
  date: string
  time: string
  clientName: string
  clientPhone: string
  clientEmail?: string
  notes?: string
}

export type BookingSummary = {
  professionalName: string
  serviceName: string
  date: string
  time: string
  duration: number
  priceLabel: string
  clientName: string
  clientPhone: string
}
