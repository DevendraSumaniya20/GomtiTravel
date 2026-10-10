import { formatInr } from '../../../shared/lib/formatInr.ts'
import { bookingsStore, useBookings } from '../api/tripsGateway.ts'
import { STATUS_LABEL, withStatus, type BookingStatus } from '../model/booking.ts'
import './BookingInbox.css'

const ACTIONS: readonly { status: BookingStatus; label: string }[] = [
  { status: 'confirmed', label: 'Confirm' },
  { status: 'cancelled', label: 'Cancel' },
]

/** Admin view of every seat request, newest first. */
export function BookingInbox() {
  const bookings = useBookings()
  if (bookings.length === 0) return <p>No seat requests yet.</p>

  return (
    <div className="booking-inbox">
      <table className="data-table">
        <thead>
          <tr>
            <th scope="col">Reference</th>
            <th scope="col">Passenger</th>
            <th scope="col">Trip</th>
            <th scope="col">Seats</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.toReversed().map((booking) => (
            <tr key={booking.reference}>
              <th scope="row">{booking.reference}</th>
              <td>
                {booking.name}
                <br />
                {booking.phone}
              </td>
              <td>
                {booking.to}
                <br />
                {booking.date}, {booking.departs}
              </td>
              <td>{booking.seats}</td>
              <td>{formatInr(booking.total)}</td>
              <td>
                {STATUS_LABEL[booking.status]}
                <span className="booking-inbox__actions">
                  {ACTIONS.filter((action) => action.status !== booking.status).map((action) => (
                    <button
                      key={action.status}
                      className="link"
                      onClick={() => bookingsStore.write(withStatus(bookings, booking.reference, action.status))}
                      aria-label={`${action.label} ${booking.reference}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
