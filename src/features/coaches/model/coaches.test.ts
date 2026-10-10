import assert from 'node:assert/strict'
import test from 'node:test'
import { coachFromValues, coachToValues } from './coachForm.ts'
import { COACHES, seatRows } from './coaches.ts'

test('seats are lettered across the aisle and numbered by row', () => {
  assert.deepEqual(seatRows([2, 1], 2), [
    { number: 1, left: ['1A', '1B'], right: ['1C'] },
    { number: 2, left: ['2A', '2B'], right: ['2C'] },
  ])
  assert.deepEqual(seatRows([2, 2], 0), [])
})

test('a coach survives the trip through the form, dropping blank note lines', () => {
  const sleeper = COACHES[0]!
  assert.deepEqual(coachFromValues(coachToValues(sleeper), sleeper.id), sleeper)
  assert.deepEqual(coachFromValues({ ...coachToValues(sleeper), notes: ' a \n\n b ' }, 'x').notes, ['a', 'b'])
})
