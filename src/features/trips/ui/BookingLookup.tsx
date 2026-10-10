import { useState, type FormEvent } from 'react'
import { formatInr } from '../../../shared/lib/formatInr.ts'
import { PhoneField } from '../../../shared/ui/PhoneField.tsx'
import { bookingsStore, useBookings } from '../api/tripsGateway.ts'
import { findBooking, STATUS_LABEL, withStatus } from '../model/booking.ts'
import './BookingLookup.css'

/** Finds a seat request by reference and mobile number, shows its status and lets the passenger cancel it. */
export function BookingLookup() {
  const bookings = useBookings()
  const [query, setQuery] = useState<{ reference: string; phone: string } | null>(null)
  // Looked up on every render, so a status change made in the admin shows at once.
  const booking = query && findBooking(bookings, query.reference, query.phone)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setQuery({ reference: String(form.get('reference')), phone: String(form.get('phone')) })
  }

  return (
    <form className="booking-lookup sheet pane" onSubmit={submit}>
      <h3>Check or cancel a request</h3>
      <label>
        Reference
        <input name="reference" placeholder="GT-…" autoCapitalize="characters" autoComplete="off" required />
      </label>
      <PhoneField label="Mobile number used for the request" />
      <button className="btn">Find request</button>
      <div className="booking-lookup__result" role="status">
        {query && !booking && <p>No request in this browser matches that reference and mobile number.</p>}
        {booking && (
          <>
            <p>
              <strong>{booking.reference}</strong>: {STATUS_LABEL[booking.status]}. {booking.seats}{' '}
              {booking.seats === 1 ? 'seat' : 'seats'} to {booking.to} on {booking.date} at {booking.departs},{' '}
              {formatInr(booking.total)}.
            </p>
            {booking.status !== 'cancelled' && (
              <button
                type="button"
                className="link"
                onClick={() => bookingsStore.write(withStatus(bookings, booking.reference, 'cancelled'))}
              >
                Cancel this request
              </button>
            )}
          </>
        )}
      </div>
      <p className="booking-lookup__policy">Refund and cancellation terms are set by the operator and are not published here yet.</p>
    </form>
  )
}
