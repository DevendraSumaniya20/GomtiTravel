import assert from 'node:assert/strict'
import test from 'node:test'
import { createBooking, findBooking, isoDate, MAX_SEATS, quoteFare, withStatus } from './booking.ts'
import { ROUTES, routesTo } from './routes.ts'

const ahmedabad = ROUTES.find((route) => route.id === 'ahmedabad')!

test('fare is per seat times seats', () => {
  assert.equal(quoteFare(ahmedabad, 1), 900)
  assert.equal(quoteFare(ahmedabad, 3), 2700)
})

test('rejects seat counts outside 1..MAX_SEATS and fractions', () => {
  assert.equal(quoteFare(ahmedabad, 0), null)
  assert.equal(quoteFare(ahmedabad, MAX_SEATS + 1), null)
  assert.equal(quoteFare(ahmedabad, 1.5), null)
  assert.equal(quoteFare(ahmedabad, NaN), null)
})

test('isoDate uses the local calendar day', () => {
  assert.equal(isoDate(new Date(2026, 0, 5, 23, 30)), '2026-01-05')
})

test('routesTo filters by destination and returns all for none', () => {
  assert.deepEqual(routesTo(ROUTES, 'ahmedabad'), [ahmedabad])
  assert.equal(routesTo(ROUTES, ''), ROUTES)
  assert.deepEqual(routesTo(ROUTES, 'nowhere'), [])
})

const request = { date: '2026-11-01', seats: 2, name: 'Asha', phone: '9876543210' }
const booking = createBooking(ahmedabad, request, new Date(Date.UTC(2026, 9, 10)))!

test('a booking copies the trip, totals the fare and starts as new', () => {
  assert.match(booking.reference, /^GT-[0-9A-Z]+$/)
  assert.deepEqual(
    { to: booking.to, departs: booking.departs, total: booking.total, status: booking.status },
    { to: 'Ahmedabad', departs: '21:30', total: 1800, status: 'new' },
  )
  assert.equal(createBooking(ahmedabad, { ...request, seats: 0 }, new Date()), null)
})

test('a booking is found only with its reference and the matching mobile number', () => {
  assert.equal(findBooking([booking], ` ${booking.reference.toLowerCase()} `, '9876543210'), booking)
  assert.equal(findBooking([booking], booking.reference, '9000000000'), undefined)
  assert.equal(findBooking([booking], 'GT-NOPE', '9876543210'), undefined)
})

test('withStatus changes only the named booking', () => {
  const other = { ...booking, reference: 'GT-OTHER' }
  assert.deepEqual(
    withStatus([booking, other], booking.reference, 'cancelled').map((item) => item.status),
    ['cancelled', 'new'],
  )
})
