import { useState, type FormEvent } from 'react'
import { formatInr } from '../../../shared/lib/formatInr.ts'
import { PhoneField } from '../../../shared/ui/PhoneField.tsx'
import { bookingsStore, useRoutes } from '../api/tripsGateway.ts'
import { createBooking, MAX_SEATS, type Booking } from '../model/booking.ts'
import { ORIGIN } from '../model/routes.ts'
import './BookingForm.css'

type BookingFormProps = {
  /** The chosen route; the first route is used until one is picked. */
  routeId: string
  /** Date carried over from the trip search, if one was picked. */
  date: string
  /** Earliest bookable date, `YYYY-MM-DD`. */
  today: string
  onRouteChange: (routeId: string) => void
}

export function BookingForm({ routeId, date, today, onRouteChange }: BookingFormProps) {
  const routes = useRoutes()
  const [saved, setSaved] = useState<Booking | null>(null)
  const route = routes.find((candidate) => candidate.id === routeId) ?? routes[0]

  if (!route) return <p className="sheet pane">No routes are open for seat requests right now.</p>

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const booking = createBooking(
      route,
      {
        date: String(form.get('date')),
        seats: Number(form.get('seats')),
        name: String(form.get('name')).trim(),
        phone: String(form.get('phone')),
      },
      new Date(),
    )
    if (!booking) return
    bookingsStore.write([...bookingsStore.read(), booking])
    setSaved(booking)
  }

  return (
    <form className="booking-form sheet pane" onSubmit={submit}>
      <label className="booking-form__route">
        Route
        <select value={route.id} onChange={(event) => onRouteChange(event.target.value)}>
          {routes.map((option) => (
            <option key={option.id} value={option.id}>
              {ORIGIN} to {option.to}, {option.departs}, {option.coach}
            </option>
          ))}
        </select>
      </label>
      <label>
        Travel date
        <input key={date} name="date" type="date" min={today} defaultValue={date || today} required />
      </label>
      <label>
        Seats
        <input name="seats" type="number" min="1" max={MAX_SEATS} defaultValue="1" required />
      </label>
      <label>
        Your name
        <input name="name" autoComplete="name" required />
      </label>
      <PhoneField />
      <button className="btn">Request seats</button>
      <p className="booking-form__result" role="status">
        {saved && (
          <>
            Request <strong>{saved.reference}</strong> saved: {saved.name}, {saved.seats} {saved.seats === 1 ? 'seat' : 'seats'} to{' '}
            {saved.to} on {saved.date} at {saved.departs}, {formatInr(saved.total)}. Keep the reference to check or cancel it. This
            preview stores requests in this browser only; nothing reaches the operator yet.
          </>
        )}
      </p>
    </form>
  )
}
