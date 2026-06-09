import { format, parseISO } from 'date-fns'

export function formatDateLabel(value: string) {
  const date = parseISO(value)
  return format(date, "EEEE',' d 'de' MMMM")
}

export function formatBookingDate(value: string) {
  const date = parseISO(value)
  return format(date, 'dd/MM/yyyy')
}

export function buildTimeSlots(start: string, end: string, intervalMinutes: number) {
  const slots: string[] = []
  const startDate = parseISO(`2025-01-01T${start}:00`)
  const endDate = parseISO(`2025-01-01T${end}:00`)
  let current = startDate
  while (current < endDate) {
    slots.push(format(current, 'HH:mm'))
    current = new Date(current.getTime() + intervalMinutes * 60000)
  }
  return slots
}
