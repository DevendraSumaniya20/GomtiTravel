import { formatInr } from '../../../shared/lib/formatInr.ts'
import { useRoutes } from '../api/tripsGateway.ts'
import { routesTo } from '../model/routes.ts'
import './Timetable.css'

type TimetableProps = {
  /** Empty string shows every route. */
  destinationId: string
  onShowAll: () => void
  onRequestSeat: (routeId: string) => void
}

export function Timetable({ destinationId, onShowAll, onRequestSeat }: TimetableProps) {
  const routes = routesTo(useRoutes(), destinationId)

  return (
    <div className="timetable sheet pane">
      {destinationId && (
        <p className="timetable__filter">
          {routes[0] ? `Showing buses to ${routes[0].to}.` : 'No buses to that destination.'}{' '}
          <button className="link" onClick={onShowAll}>
            Show all routes
          </button>
        </p>
      )}
      <ul>
        {routes.map((route) => (
          <li key={route.id} className="timetable__row">
            <div className="timetable__place">
              <strong>{route.to}</strong>
              <span>{route.drop}</span>
            </div>
            <div className="timetable__time">
              <strong>{route.departs}</strong>
              <span className="timetable__line" aria-hidden="true" />
              <strong>{route.arrives}</strong>
              <span className="timetable__duration">{route.duration}</span>
            </div>
            <span className="timetable__coach">{route.coach}</span>
            <strong className="timetable__fare">{formatInr(route.fare)}</strong>
            <button className="btn" onClick={() => onRequestSeat(route.id)} aria-label={`Request a seat to ${route.to}`}>
              Request seat
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
