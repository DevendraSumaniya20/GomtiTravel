export type Route = {
  id: string
  to: string
  /** Where the bus sets passengers down. */
  drop: string
  departs: string
  arrives: string
  duration: string
  coach: string
  /** Per seat, in rupees. */
  fare: number
  /** Offered as a quick-book card above the timetable. */
  featured?: boolean
}

export const ORIGIN = 'Dwarka'

// Sample timetable. Place names are real; timings and fares are illustrative
// and must be replaced with the operator's real schedule.
export const ROUTES: readonly Route[] = [
  { id: 'ahmedabad', to: 'Ahmedabad', drop: 'Paldi', departs: '21:30', arrives: '06:30', duration: '9h', coach: 'AC Sleeper', fare: 900, featured: true },
  { id: 'vadodara', to: 'Vadodara', drop: 'Vadodara Central Bus Station', departs: '20:00', arrives: '06:45', duration: '10h 45m', coach: 'AC Sleeper', fare: 1100 },
  { id: 'bhuj', to: 'Bhuj', drop: 'Bhuj ST Bus Stand', departs: '21:00', arrives: '05:30', duration: '8h 30m', coach: 'AC Sleeper', fare: 850 },
  { id: 'rajkot', to: 'Rajkot', drop: 'Rajkot Bus Port', departs: '06:00', arrives: '10:30', duration: '4h 30m', coach: 'AC Seater', fare: 450, featured: true },
  { id: 'somnath', to: 'Somnath', drop: 'Somnath Bus Stand', departs: '07:00', arrives: '12:00', duration: '5h', coach: 'AC Seater', fare: 480, featured: true },
  { id: 'jamnagar', to: 'Jamnagar', drop: 'Jamnagar ST Bus Stand', departs: '08:00', arrives: '10:45', duration: '2h 45m', coach: 'Seater', fare: 260 },
  { id: 'porbandar', to: 'Porbandar', drop: 'Porbandar ST Bus Stand', departs: '09:00', arrives: '11:15', duration: '2h 15m', coach: 'Seater', fare: 200 },
]

/** Routes to one destination, or every route when no destination is chosen. */
export function routesTo(routes: readonly Route[], destinationId: string): readonly Route[] {
  return destinationId ? routes.filter((route) => route.id === destinationId) : routes
}
