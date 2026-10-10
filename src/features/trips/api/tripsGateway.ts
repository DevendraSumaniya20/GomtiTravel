import { localStore } from '../../../shared/lib/localStore.ts'
import { useStore } from '../../../shared/lib/useStore.ts'
import type { Booking } from '../model/booking.ts'
import { ROUTES, type Route } from '../model/routes.ts'

// The one place that knows where trips data lives. With a backend, these stores become API calls
// and the response is mapped to the model types here; the hooks keep their shape.
export const routesStore = localStore<readonly Route[]>('gomti.v2.routes', ROUTES)
export const bookingsStore = localStore<readonly Booking[]>('gomti.v2.bookings', [])

export const useRoutes = () => useStore(routesStore)
export const useBookings = () => useStore(bookingsStore)
