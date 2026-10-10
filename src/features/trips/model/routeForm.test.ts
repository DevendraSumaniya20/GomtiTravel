import assert from 'node:assert/strict'
import test from 'node:test'
import { routeFromValues, routeToValues, tripDuration } from './routeForm.ts'
import { ROUTES } from './routes.ts'

test('duration is worked out from the clock times, across midnight', () => {
  for (const route of ROUTES) assert.equal(tripDuration(route.departs, route.arrives), route.duration)
  assert.equal(tripDuration('10:00', '10:00'), '24h')
})

test('a route survives the trip through the form', () => {
  const delhi = ROUTES[0]!
  assert.deepEqual(routeFromValues(routeToValues(delhi), delhi.id), delhi)
})

test('an unticked checkbox, which a form leaves out, means not featured', () => {
  const { featured: _, ...unticked } = routeToValues(ROUTES[0]!)
  assert.equal(routeFromValues(unticked as never, 'x').featured, false)
})
