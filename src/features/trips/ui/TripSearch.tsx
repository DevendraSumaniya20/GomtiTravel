import { useRoutes } from '../api/tripsGateway.ts'
import { ORIGIN } from '../model/routes.ts'
import './TripSearch.css'

type TripSearchProps = {
  destinationId: string
  date: string
  /** Earliest bookable date, `YYYY-MM-DD`. */
  today: string
  onDestinationChange: (destinationId: string) => void
  onDateChange: (date: string) => void
  onSearch: () => void
}

export function TripSearch({ destinationId, date, today, onDestinationChange, onDateChange, onSearch }: TripSearchProps) {
  const routes = useRoutes()

  return (
    <form
      className="trip-search sheet"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch()
      }}
    >
      <label>
        From
        <input value={ORIGIN} readOnly />
      </label>
      <label>
        To
        <select value={destinationId} onChange={(event) => onDestinationChange(event.target.value)}>
          <option value="">Any destination</option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.to}
            </option>
          ))}
        </select>
      </label>
      <label>
        Travel date
        <input type="date" min={today} value={date} onChange={(event) => onDateChange(event.target.value)} />
      </label>
      <button className="btn">Show buses</button>
    </form>
  )
}
