import { BookingSummary } from '../types/booking'
import { PHONE_NUMBER } from './constants'

export function buildWhatsAppMessage(booking: BookingSummary) {
  return `Olá, meu nome é ${booking.clientName}. Agendei ${booking.serviceName} com ${booking.professionalName} para o dia ${booking.date} às ${booking.time} no Studio Resh.`
}

export function buildWhatsAppLink(message: string) {
  const number = PHONE_NUMBER.replace(/\D/g, '')
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${encoded}`
}
