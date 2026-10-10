import type { Field } from '../../../shared/lib/records.ts'
import type { Route } from './routes.ts'

export type RouteValues = Record<'to' | 'drop' | 'departs' | 'arrives' | 'coach' | 'fare' | 'featured', string>

export function routeFields(coachNames: readonly string[]): Field[] {
  return [
    { name: 'to', label: 'Destination' },
    { name: 'drop', label: 'Drop point' },
    { name: 'departs', label: 'Departs', type: 'time' },
    { name: 'arrives', label: 'Arrives', type: 'time' },
    { name: 'coach', label: 'Coach', type: 'select', options: coachNames },
    { name: 'fare', label: 'Fare per seat, in rupees', type: 'number', min: 1 },
    { name: 'featured', label: 'Show as a quick-book card', type: 'checkbox' },
  ]
}

/** Time on the road between two `HH:MM` clock times, e.g. "8h 45m". An arrival earlier than the departure is the next day. */
export function tripDuration(departs: string, arrives: string): string {
  const minutes = (time: string) => {
    const [hours = 0, mins = 0] = time.split(':').map(Number)
    return hours * 60 + mins
  }
  // shortcut: a trip is at most 24 hours; store an arrival day when a longer route appears.
  const total = (minutes(arrives) - minutes(departs) + 1440) % 1440 || 1440
  const mins = total % 60
  return `${Math.floor(total / 60)}h${mins ? ` ${mins}m` : ''}`
}

export function routeToValues(route: Route): RouteValues {
  const { to, drop, departs, arrives, coach, fare, featured } = route
  return { to, drop, departs, arrives, coach, fare: String(fare), featured: featured ? 'on' : '' }
}

export function routeFromValues(values: RouteValues, id: string): Route {
  const { to, drop, departs, arrives, coach, fare, featured } = values
  return {
    id,
    to: to.trim(),
    drop: drop.trim(),
    departs,
    arrives,
    duration: tripDuration(departs, arrives),
    coach,
    fare: Number(fare),
    featured: featured === 'on',
  }
}
