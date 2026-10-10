import type { Route } from './routes.ts'

export const MAX_SEATS = 6

export type SeatRequest = {
  date: string
  seats: number
  name: string
  phone: string
}

export type BookingStatus = 'new' | 'confirmed' | 'cancelled'

export const STATUS_LABEL: Record<BookingStatus, string> = {
  new: 'Waiting for confirmation',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
}

/** A seat request as it was made. Trip details are copied so later timetable edits do not rewrite it. */
export type Booking = SeatRequest & {
  reference: string
  routeId: string
  to: string
  departs: string
  /** Fare for all seats, in rupees. */
  total: number
  status: BookingStatus
  createdAt: string
}

/** Total fare for a request, or `null` when the seat count is not a whole number from 1 to MAX_SEATS. */
export function quoteFare(route: Route, seats: number): number | null {
  if (!Number.isInteger(seats) || seats < 1 || seats > MAX_SEATS) return null
  return route.fare * seats
}

/** A new booking for this route, or `null` when the seat count cannot be quoted. */
export function createBooking(route: Route, request: SeatRequest, now: Date): Booking | null {
  const total = quoteFare(route, request.seats)
  if (total === null) return null
  return {
    ...request,
    // shortcut: unique per browser only, taken from the clock; the backend must issue references.
    reference: `GT-${now.getTime().toString(36).toUpperCase()}`,
    routeId: route.id,
    to: route.to,
    departs: route.departs,
    total,
    status: 'new',
    createdAt: now.toISOString(),
  }
}

/** The booking with this reference, only if the mobile number matches too. */
export function findBooking(bookings: readonly Booking[], reference: string, phone: string): Booking | undefined {
  const wanted = reference.trim().toUpperCase()
  return bookings.find((booking) => booking.reference === wanted && booking.phone === phone.trim())
}

export function withStatus(bookings: readonly Booking[], reference: string, status: BookingStatus): Booking[] {
  return bookings.map((booking) => (booking.reference === reference ? { ...booking, status } : booking))
}

/** A date as `YYYY-MM-DD` in local time, the format date inputs use. */
export function isoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
