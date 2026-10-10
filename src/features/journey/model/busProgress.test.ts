import assert from 'node:assert/strict'
import test from 'node:test'
import { busProgress, nearestStop } from './busProgress.ts'

test('bus sits on each stop at its section top and interpolates between', () => {
  const tops = [0, 1000, 1400, 3000]
  assert.equal(busProgress(-50, tops), 0)
  assert.equal(busProgress(0, tops), 0)
  assert.equal(busProgress(500, tops), 0.5 / 3)
  assert.equal(busProgress(1000, tops), 1 / 3)
  assert.equal(busProgress(1400, tops), 2 / 3)
  assert.equal(busProgress(2200, tops), 2.5 / 3)
  assert.equal(busProgress(9999, tops), 1)
})

test('handles a last section the page cannot scroll to, and too few stops', () => {
  assert.equal(busProgress(1400, [0, 1400, 1400]), 1)
  assert.equal(busProgress(10, [0]), 0)
  assert.equal(busProgress(10, []), 0)
})

test('nearest stop switches halfway between two stops', () => {
  assert.equal(nearestStop(0, 6), 0)
  assert.equal(nearestStop(0.09, 6), 0)
  assert.equal(nearestStop(0.11, 6), 1)
  assert.equal(nearestStop(1, 6), 5)
})
