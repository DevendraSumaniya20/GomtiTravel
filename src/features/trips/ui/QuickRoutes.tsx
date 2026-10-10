import { formatInr } from '../../../shared/lib/formatInr.ts'
import { useRoutes } from '../api/tripsGateway.ts'
import { ORIGIN } from '../model/routes.ts'
import './QuickRoutes.css'

type QuickRoutesProps = {
  onPick: (routeId: string) => void
}

/** One-tap cards for the routes the operator has marked as featured. */
export function QuickRoutes({ onPick }: QuickRoutesProps) {
  const featured = useRoutes().filter((route) => route.featured)
  if (featured.length === 0) return null

  return (
    <ul className="quick-routes">
      {featured.map((route) => (
        <li key={route.id}>
          <button className="quick-routes__card sheet" onClick={() => onPick(route.id)}>
            <span>{ORIGIN} to</span>
            <strong className="quick-routes__to">{route.to}</strong>
            <span>
              {route.departs}, {route.coach}
            </span>
            <strong>{formatInr(route.fare)} a seat</strong>
          </button>
        </li>
      ))}
    </ul>
  )
}
